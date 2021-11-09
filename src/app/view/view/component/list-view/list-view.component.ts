import {Directive, Injector, OnInit} from "@angular/core";
import {
  PageNumberChangeRequest,
  SelectionChangeRequest,
  TableComponent
} from "../../../../modules/table/table/table.component";
import {DataAccessService} from "../../../../service/http/service/data-access-service.service";
import {ToFilterExpressionTransformatorService} from "../../../../service/transformation/service/to-filter-expression-transformator.service";
import {ListViewState} from "../../state/list-view.state";
import {ListViewEntitiesStateManager, ListViewStateManager} from "../../state/list-view-state.manager";
import {ListViewConfigInitialState} from "../../state/list-view-config-initial.state";
import {ListViewTableInitialState} from "../../state/list-view-table-initial.state";
import {ListViewFiltersInitialState} from "../../state/list-view-filters-initial.state";
import {ColumnSizeChangeRequest} from "../../../../modules/table/table/components/cell-resize/cell-resize.component";
import {ColumnPositionChangeRequest} from "../../../../modules/table/table/components/coll-dragger/coll-dragger.component";

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

  ngOnInit(): void {}

  public onPageNumberChangeRequest($event: PageNumberChangeRequest) {
    const dataAccessService = this.injector.get(DataAccessService);
    const transformator = this.injector.get(ToFilterExpressionTransformatorService);
    this.listViewStateManager.loadPageToState({
      listViewState: this.listViewState,
      dataAccessService,
      transformator,
      options: { page: $event.pageNumber }
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
}
