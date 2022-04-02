import {ListViewTableState} from "./list-view-table-state";
import {PagingAndSortingRepositoryAsync} from "../../service/http/repository/paging-and-sorting-repository-async";
import {combineLatest, of} from "rxjs";
import {Page} from "../../service/http/model/page";
import {TableSort} from "../../modules/table-components-module/table/models/dataModels/tableSort";
import {ResponsePage} from "../../service/http/model/response-page";
import {HasId} from "../../service/http/model/pageable";
import {map, switchMap, take, tap} from "rxjs/operators";
import {FilterableListViewTableStateManager} from "./filterable-list-view-table-state-manager";
import {ListViewFiltersStateManager} from "../filter-state/list-view-filters-state-manager";
import {FilterExpressionBuilder} from "../../service/http/service/filter-expression-builder";
import {FilterExpression} from "../../service/http/model/filter-expression";

export class RemoteFilterableListViewStateManager extends FilterableListViewTableStateManager {
  public repository: PagingAndSortingRepositoryAsync<any>;
  public fetchStrategy: string;
  public filterExpressionBuilder: FilterExpressionBuilder;

  constructor(
    args: {
      listViewTableState: ListViewTableState,
      listViewFiltersStateManager: ListViewFiltersStateManager,
      repository: PagingAndSortingRepositoryAsync<any>,
      fetchStrategy?: string,
      filterExpressionBuilder: FilterExpressionBuilder
    }
  ) {
    super(args);
    this.repository = args.repository;
    this.fetchStrategy = args.fetchStrategy;
    this.filterExpressionBuilder = args.filterExpressionBuilder;
  }

  public changeTablePage(page: Page): void {
    this.listViewTableAsyncState.nextTablePage(page);

    this.updateItems().then();
  }

  public changeTableSorting(tableSorting: Array<TableSort>) {
    this.listViewTableAsyncState.nextTableSorting(tableSorting);

    this.updateItems().then();
  }

  public loadFromRemote(): Promise<ResponsePage<HasId>> {
    return combineLatest([
      this.listViewTableAsyncState.tablePage$,
      this.listViewTableAsyncState.tableSorting$,
      this.listViewFiltersStateManager.filtersByAttributeKey$.pipe(
        switchMap(filtersByAttributeKey => {
          return this.filterExpressionBuilder ?
            this.filterExpressionBuilder.build(filtersByAttributeKey)
            : of(FilterExpression.empty());
        }),
        take(1)
      )
    ]).pipe(
      take(1),
      switchMap(([page, sort, filterExpression]) => this.repository.findAllEntitiesOnPage({
        page: page,
        sort: sort,
        fetchStrategy: this.fetchStrategy,
        filterExpression: filterExpression
      }))
    ).toPromise();
  }

  public updateItems(): Promise<boolean> {
    return this.loadFromRemote().then(responsePage => {
      this.listViewTableAsyncState.nextTableItemsList(responsePage.items);
      this.listViewTableAsyncState.nextTablePage({
        size: responsePage.size,
        page: responsePage.page,
        pagesCount: responsePage.pagesCount,
        itemsCount: responsePage.itemsCount,
      })

      return true;
    })
  }

  public deleteTableItems(): Promise<any> {
    return this.listViewTableAsyncState.tableSelectedList$.pipe(
      take(1),
      switchMap(selectedItems => {
        return this.repository.deleteAllEntities({entities: selectedItems})
      }),
      switchMap(() => {
        return this.updateItems();
      })
    ).toPromise();
  }
}
