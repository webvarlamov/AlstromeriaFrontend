import {Directive, Injector, OnInit} from "@angular/core";
import {
  ColumnPositionChangeRequest
} from "../../../../modules/table-module/table/models/changeRequest/column-position-change.request";
import {
  ColumnSizeChangeRequest
} from "../../../../modules/table-module/table/components/cell-resize/cell-resize.component";
import {SortChangeRequest} from "../../../../modules/table-module/table/models/changeRequest/sort-change-request";
import {
  SelectionChangeRequest
} from "../../../../modules/table-module/table/models/changeRequest/selectionChangeRequest";
import {PageSizeChangeRequest} from "../../../../modules/table-module/table/models/changeRequest/pageSizeChangeRequest";
import {
  PageNumberChangeRequest
} from "../../../../modules/table-module/table/models/changeRequest/pageNumberChangeRequest";
import {ListViewTableAsyncState} from "../../state2/list-view-table-async-state";
import {ListViewTableAsyncStateManager} from "../../state2/list-view-table-async-state-manager";

@Directive({
  selector: "app-list-view-component",
})
export class ListViewComponent<T> implements OnInit {
  public listViewTableAsyncState: ListViewTableAsyncState = new ListViewTableAsyncState({
    tableItemsList: [],
    tablePage: {
      size: 10,
      pagesCount: 0,
      itemsCount: 0,
      page: 0,
    },
    tableColumns: []
  });
  public listViewTableAsyncStateManager: ListViewTableAsyncStateManager = new ListViewTableAsyncStateManager(this.listViewTableAsyncState);

  constructor(
    public injector: Injector
  ) {
  }

  ngOnInit(): void {
  }

  public onColumnMoveChangeRequest($event: ColumnPositionChangeRequest) {
    this.listViewTableAsyncState.nextTableColumnsList($event.candidates);
  }

  public onColumnSizeChangeRequest($event: ColumnSizeChangeRequest) {
    this.listViewTableAsyncState.nextTableColumnsList($event.candidates)
  }

  public onSortChangeRequest($event: SortChangeRequest) {
    this.listViewTableAsyncStateManager.changeTableSorting($event.candidates)
  }

  public onTableSelectionChangeRequest($event: SelectionChangeRequest) {
    this.listViewTableAsyncState.nextTableSelectedList($event.candidates)
  }

  public onPageSizeChangeRequest($event: PageSizeChangeRequest) {
    this.listViewTableAsyncStateManager.changeTablePage($event.candidate);
  }

  public onPageNumberChangeRequest($event: PageNumberChangeRequest) {
    this.listViewTableAsyncStateManager.changeTablePage($event.candidate);
  }

  public onDeleteItemsRequest() {
    this.listViewTableAsyncStateManager.deleteTableItems();
  }
}
