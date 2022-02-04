import {Component, ElementRef, Injector, OnInit} from '@angular/core';
import {InputComponent, InputComponentConfig, InputComponentValue} from "../input-component/input.component";
import {ListViewComponent} from "../../../../view/view/component/list-view/list-view.component";
import {ListViewTableAsyncState} from "../../../../view/view/state2/list-view-table-async-state";
import {
  RemoteEntityListViewTableAsyncStateManager
} from "../../../../view/view/state2/remote-entity-list-view-table-async-state-manager";
import {TableSelectionConfig} from "../../../table-module/table/models/config/tableSelectionConfig";
import {SelectionMode} from "../../../table-module/table/models/config/selectionMode";
import {PlanRepositoryService} from "../../../../repository/plan-repository.service";
import {
  ColumnPositionChangeRequest
} from "../../../table-module/table/models/changeRequest/column-position-change.request";
import {ColumnSizeChangeRequest} from "../../../table-module/table/components/cell-resize/cell-resize.component";
import {SortChangeRequest} from "../../../table-module/table/models/changeRequest/sort-change-request";
import {SelectionChangeRequest} from "../../../table-module/table/models/changeRequest/selectionChangeRequest";
import {PageSizeChangeRequest} from "../../../table-module/table/models/changeRequest/pageSizeChangeRequest";
import {PageNumberChangeRequest} from "../../../table-module/table/models/changeRequest/pageNumberChangeRequest";
import {ListViewTableAsyncStateManager} from "../../../../view/view/state2/list-view-table-async-state-manager";
import {TablePagingConfig} from "../../../table-module/table/table.component";

@Component({
  selector: 'app-boolean-input',
  templateUrl: './boolean-input.component.html',
  styleUrls: ['./boolean-input.component.css']
})
export class BooleanInputComponent extends InputComponent<InputComponentConfig<any>, InputComponentValue> implements OnInit {
  public listViewTableAsyncState: ListViewTableAsyncState = new ListViewTableAsyncState({
    tableItemsList: [
      {id: '0', value: false, caption: 'Нет'},
      {id: '1', value: true, caption: 'Да'},
    ],
    tablePage: {
      size: 10,
      pagesCount: 1,
      itemsCount: 2,
      page: 0,
    },
    tableColumns: [
      {id: '0', caption: "Значение", dataField: "caption"}
    ]
  });

  public listViewTableAsyncStateManager: ListViewTableAsyncStateManager
    = new ListViewTableAsyncStateManager(this.listViewTableAsyncState);

  public tableSelectionConfig: TableSelectionConfig = {
    useSelection: true,
    columnWidth: '40px',
    sticky: true,
    selectionMode: SelectionMode.MULTI
  };
  pagingConfig: TablePagingConfig = {
    showPagination: false,
  };

  constructor(
    public injector: Injector,
    public elementRef: ElementRef,
    public repository: PlanRepositoryService
  ) {
    super(elementRef);
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
