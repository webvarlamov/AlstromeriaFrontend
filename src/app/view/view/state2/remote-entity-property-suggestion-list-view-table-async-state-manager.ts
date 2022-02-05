import {PagingAndSortingRepositoryAsync} from "../../../service/http/repository/paging-and-sorting-repository-async";
import {ListViewTableAsyncState} from "./list-view-table-async-state";
import {switchMap, take, tap} from "rxjs/operators";
import {Page} from "../../../service/http/model/page";
import {ListViewTableAsyncStateManager} from "./list-view-table-async-state-manager";
import {BehaviorSubject, combineLatest} from "rxjs";
import {FilterExpression} from "../../../service/http/model/filter-expression";
import {ResponsePage} from "../../../service/http/model/response-page";
import {HasId} from "../../../service/http/model/pageable";
import {TableSort} from "../../../modules/table-module/table/models/dataModels/tableSort";

export class RemoteEntityPropertySuggestionListViewTableAsyncStateManager extends ListViewTableAsyncStateManager {
  public repository: PagingAndSortingRepositoryAsync<any>;
  public propertyName: string;

  constructor(
    listViewTableAsyncState: ListViewTableAsyncState,
    repository: PagingAndSortingRepositoryAsync<any>,
    propertyName: string
  ) {
    super(listViewTableAsyncState);
    this.repository = repository;
    this.propertyName = propertyName;

    this.updateItems();
  }

  public changeTablePage(page: Page): void {
    this.listViewTableAsyncState.nextTablePage(page);

    this.updateItems();
  }

  public changeTableSorting(tableSorting: Array<TableSort>) {
    this.listViewTableAsyncState.nextTableSorting(tableSorting);

    this.updateItems();
  }

  public load(): Promise<ResponsePage<HasId>> {
    return combineLatest([
      this.listViewTableAsyncState.tablePage$,
      this.listViewTableAsyncState.tableSorting$,
      new BehaviorSubject(FilterExpression.empty())
    ]).pipe(
      tap((args) => {console.log(args)}),
      take(1),
      switchMap(([page, sort, filterExpression]) => this.repository.findAllSuggestionsOnPage({
        page,
        sort,
        filterExpression,
        propertyName: this.propertyName
      }))
    ).toPromise();
  }

  public updateItems(): Promise<any> {
    return this.load().then(responsePage => {
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
