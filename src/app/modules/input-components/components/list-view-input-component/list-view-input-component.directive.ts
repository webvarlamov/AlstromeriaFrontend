import {Directive, Input} from '@angular/core';
import {InputComponent} from "../input-component/input.component";
import {
  ColumnPositionChangeRequest
} from "../../../table-module/table/models/changeRequest/column-position-change.request";
import {ColumnSizeChangeRequest} from "../../../table-module/table/components/cell-resize/cell-resize.component";
import {SortChangeRequest} from "../../../table-module/table/models/changeRequest/sort-change-request";
import {SelectionChangeRequest} from "../../../table-module/table/models/changeRequest/selectionChangeRequest";
import {PageSizeChangeRequest} from "../../../table-module/table/models/changeRequest/pageSizeChangeRequest";
import {PageNumberChangeRequest} from "../../../table-module/table/models/changeRequest/pageNumberChangeRequest";
import {ListViewTableAsyncStateManager} from "../../../../view/view/state2/list-view-table-async-state-manager";
import {ListViewTableAsyncState} from "../../../../view/view/state2/list-view-table-async-state";
import {TableSelectionConfig} from "../../../table-module/table/models/config/tableSelectionConfig";
import {SelectionMode} from "../../../table-module/table/models/config/selectionMode";

@Directive({
  selector: '[appListViewInputComponent]'
})
export class ListViewInputComponent extends InputComponent<any, any> {
  @Input()
  public label: string = 'Label has not been overridden'
  @Input()
  public listViewTableAsyncStateManager: ListViewTableAsyncStateManager = new ListViewTableAsyncStateManager(
    new ListViewTableAsyncState()
  );

  @Input()
  public selectionConfig: TableSelectionConfig = {
    useSelection: true,
    columnWidth: '40px',
    sticky: true,
    selectionMode: SelectionMode.MULTI
  };

  public onColumnMoveChangeRequest($event: ColumnPositionChangeRequest) {
    this.listViewTableAsyncStateManager.changeTableColumns($event.candidates)
  }

  public onColumnSizeChangeRequest($event: ColumnSizeChangeRequest) {
    this.listViewTableAsyncStateManager.changeTableColumns($event.candidates)
  }

  public onSortChangeRequest($event: SortChangeRequest) {
    this.listViewTableAsyncStateManager.changeTableSorting($event.candidates)
  }

  public onTableSelectionChangeRequest($event: SelectionChangeRequest) {
    this.listViewTableAsyncStateManager.changeTableSelected($event.candidates)
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

  public onTableRowClickEvent(event: any) {
    console.log(event)
  }

  public getListViewTableAsyncStateManager(): ListViewTableAsyncStateManager {
    return this.listViewTableAsyncStateManager;
  }
}
