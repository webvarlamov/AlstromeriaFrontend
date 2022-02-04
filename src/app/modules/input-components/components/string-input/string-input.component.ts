import {Component, ElementRef, Injector, OnInit} from '@angular/core';
import {
  InputComponent,
  InputComponentConfig,
  StringInputComponentValue
} from "../input-component/input.component";
import {TableComponent} from "../../../table-module/table/table.component";
import {
  ToFilterExpressionTransformatorService
} from "../../../../service/transformation/service/to-filter-expression-transformator.service";
import {ListViewEntityPropertyStateManager} from "../../../../view/view/state/list-view-state.manager";
import {config} from "rxjs";
import {PageNumberChangeRequest} from "../../../table-module/table/models/changeRequest/pageNumberChangeRequest";
import {SelectionChangeRequest} from "../../../table-module/table/models/changeRequest/selectionChangeRequest";
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
import {PageSizeChangeRequest} from "../../../table-module/table/models/changeRequest/pageSizeChangeRequest";

@Component({
  selector: 'app-string-input',
  templateUrl: './string-input.component.html',
  styleUrls: ['./string-input.component.css']
})
export class StringInputComponent extends InputComponent<InputComponentConfig<string>, StringInputComponentValue> implements OnInit {
  public listViewTableAsyncState: ListViewTableAsyncState = new ListViewTableAsyncState({
    tableItemsList: [],
    tablePage: {
      size: 50,
      pagesCount: 21,
      itemsCount: 1002,
      page: 0,
    },
    tableColumns: [
      {id: '0', caption: "ID", dataField: "id"}
    ]
  });

  public listViewTableAsyncStateManager: RemoteEntityListViewTableAsyncStateManager
    = new RemoteEntityListViewTableAsyncStateManager(this.listViewTableAsyncState, this.repository);

  public tableSelectionConfig: TableSelectionConfig = {
    useSelection: true,
    columnWidth: '40px',
    sticky: true,
    selectionMode: SelectionMode.MULTI
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
