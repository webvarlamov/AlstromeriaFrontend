import {Directive, Injector, OnInit} from "@angular/core";
import {TableComponent} from "../../../../modules/table-module/table/table.component";
import {DataAccessService} from "../../../../service/http/service/data-access-service.service";
import {ToFilterExpressionTransformatorService} from "../../../../service/transformation/service/to-filter-expression-transformator.service";
import {ListViewState} from "../../state/list-view.state";
import {ListViewEntitiesStateManager, ListViewStateManager} from "../../state/list-view-state.manager";
import {ListViewConfigInitialState} from "../../state/list-view-config-initial.state";
import {ListViewTableInitialState} from "../../state/list-view-table-initial.state";
import {ListViewFiltersInitialState} from "../../state/list-view-filters-initial.state";
import {ColumnSizeChangeRequest} from "../../../../modules/table-module/table/components/cell-resize/cell-resize.component";
import {PageNumberChangeRequest} from "../../../../modules/table-module/table/models/changeRequest/pageNumberChangeRequest";
import {SelectionChangeRequest} from "../../../../modules/table-module/table/models/changeRequest/selectionChangeRequest";
import {ColumnPositionChangeRequest} from "../../../../modules/table-module/table/models/changeRequest/column-position-change.request";
import {SortChangeRequest} from "../../../../modules/table-module/table/models/changeRequest/sort-change-request";
import {PageSizeChangeRequest} from "../../../../modules/table-module/table/models/changeRequest/pageSizeChangeRequest";

@Directive({
  selector: "app-list-view-component",
})
export class ListViewComponent<T> implements OnInit {
  public listViewStateManager: ListViewStateManager = this.injector.get(ListViewEntitiesStateManager);
  public listViewConfigInitialState: ListViewConfigInitialState = null;
  public listViewTableInitialState: ListViewTableInitialState = null;
  public listViewFilterInitialState: ListViewFiltersInitialState = null;

  public listViewState: ListViewState = null;

  constructor(
    public injector: Injector,
  ) {
  }

  ngOnInit(): void {
  }

  public onPageNumberChangeRequest($event: PageNumberChangeRequest) {
    const dataAccessService = this.injector.get(DataAccessService);
    const transformator = this.injector.get(ToFilterExpressionTransformatorService);
    this.listViewStateManager.loadPageToState({
      listViewState: this.listViewState,
      dataAccessService,
      transformator,
      options: {page: $event.pageNumber}
    }).then();
  }

  public onTableComponentInit($event: TableComponent<any>) {
    const dataAccessService = this.injector.get(DataAccessService);
    const transformator = this.injector.get(ToFilterExpressionTransformatorService);
    this.listViewStateManager.loadPageToState({
      listViewState: this.listViewState,
      dataAccessService,
      transformator
    }).then();
  }

  public onTableSelectionChangeRequest($event: SelectionChangeRequest) {
    this.listViewState
      .listViewTableState
      .listViewTableSelected$
      .next($event.selectedCandidates)
  }

  public onColumnSizeChangeRequest($event: ColumnSizeChangeRequest) {
    this.listViewState
      .listViewTableState
      .listViewTableColumns$
      .next($event.columnCandidates)
  }

  public onColumnMoveChangeRequest($event: ColumnPositionChangeRequest) {
    this.listViewState
      .listViewTableState
      .listViewTableColumns$
      .next($event.candidates)
  }

  public onSortChangeRequest($event: SortChangeRequest) {
    this.listViewState
      .listViewTableState
      .listViewTableSorting$
      .next($event.sortCandidates)
    // const dataAccessService = this.injector.get(DataAccessService);
    // const transformator = this.injector.get(ToFilterExpressionTransformatorService);
    //
    // this.listViewStateManager.loadPageToState({
    //   listViewState: this.listViewState,
    //   dataAccessService,
    //   transformator,
    //   options: {
    //     sort: $event.sortCandidates.map(s => {
    //       return {
    //         selector: s.dataField,
    //         desc: s.order === SortOrder.DESC
    //       }
    //     })
    //   }
    // }).then();
  }

  public onPageSizeChangeRequest($event: PageSizeChangeRequest) {
    this.listViewState
      .listViewTableState
      .listViewTablePageSize$
      .next($event.pageSize)

    console.log(this.listViewState);
  }
}
