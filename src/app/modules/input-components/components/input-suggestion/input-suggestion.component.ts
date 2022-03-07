import {Component, Input, OnInit} from '@angular/core';
import {TableSelectionConfig} from "../../../table-module/table/models/config/tableSelectionConfig";
import {SelectionMode} from "../../../table-module/table/models/config/selectionMode";
import {
  ColumnPositionChangeRequest
} from "../../../table-module/table/models/changeRequest/column-position-change.request";
import {ColumnSizeChangeRequest} from "../../../table-module/table/components/cell-resize/cell-resize.component";
import {SortChangeRequest} from "../../../table-module/table/models/changeRequest/sort-change-request";
import {SelectionChangeRequest} from "../../../table-module/table/models/changeRequest/selectionChangeRequest";
import {PageSizeChangeRequest} from "../../../table-module/table/models/changeRequest/pageSizeChangeRequest";
import {PageNumberChangeRequest} from "../../../table-module/table/models/changeRequest/pageNumberChangeRequest";
import {InputComponent, SuggestionOwnerInputEvent} from "../input-component/input.component";
import {TableRowClickEvent} from "../../../table-module/table/models/event/table-row-click-event";
import {ListViewTableStateManager} from "../../../../state/list-view-state/list-view-table-state-manager";
import {
  SuggestionFilterableListViewStateManager
} from "../../../../state/list-view-state/suggestion-filterable-list-view-state-manager";
import {InputSuggestionEventType} from "../input-component/suggestions.directive";

@Component({
  selector: 'app-input-suggestion',
  templateUrl: './input-suggestion.component.html',
  styleUrls: ['./input-suggestion.component.css']
})
export class InputSuggestionComponent implements OnInit {
  public owner: InputComponent<any, any>;

  @Input()
  public suggestionListViewTableStateManager: ListViewTableStateManager & SuggestionFilterableListViewStateManager;

  @Input()
  public selectionConfig: TableSelectionConfig = {
    useSelection: true,
    columnWidth: '40px',
    sticky: true,
    selectionMode: SelectionMode.MULTI
  };

  ngOnInit(): void {
    this.suggestionListViewTableStateManager?.updateItems().then()
  }

  public onColumnMoveChangeRequest($event: ColumnPositionChangeRequest) {
    this.suggestionListViewTableStateManager.changeTableColumns($event.candidates)
  }

  public onColumnSizeChangeRequest($event: ColumnSizeChangeRequest) {
    this.suggestionListViewTableStateManager.changeTableColumns($event.candidates)
  }

  public onSortChangeRequest($event: SortChangeRequest) {
    this.suggestionListViewTableStateManager.changeTableSorting($event.candidates)
  }

  public onTableSelectionChangeRequest($event: SelectionChangeRequest) {
    this.suggestionListViewTableStateManager.changeTableSelected($event.candidates)
    this.owner.onInputSuggestionEvent({
      type: InputSuggestionEventType.SELECTION_CHANGE,
      data: $event
    })
  }

  public onPageSizeChangeRequest($event: PageSizeChangeRequest) {
    this.suggestionListViewTableStateManager.changeTablePage($event.candidate);
  }

  public onPageNumberChangeRequest($event: PageNumberChangeRequest) {
    this.suggestionListViewTableStateManager.changeTablePage($event.candidate);
  }

  public onTableRowClickEvent($event: TableRowClickEvent) {
    this.owner.onInputSuggestionEvent({
      type: InputSuggestionEventType.ROW_CLICK,
      data: $event
    })
  }

  public onOwnerInputValueChangeEvent(args: SuggestionOwnerInputEvent) {
    this.suggestionListViewTableStateManager.onSuggestionOwnerValueChangeEvent(args);
    this.suggestionListViewTableStateManager.updateItems().then();
  }
}
