import {ChangeDetectionStrategy, Component, ElementRef, Injector, OnInit} from '@angular/core';
import {ListViewTableAsyncState} from "../../../../view/view/state2/list-view-table-async-state";
import {ListViewTableAsyncStateManager} from "../../../../view/view/state2/list-view-table-async-state-manager";
import {TablePagingConfig} from "../../../table-module/table/table.component";
import {ListViewInputComponent} from "../list-view-input-component/list-view-input-component.directive";

@Component({
  selector: 'app-boolean-input',
  templateUrl: "../list-view-input-component/list-view-input-component.directive.html",
  styleUrls: ['./boolean-input.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BooleanInputComponent extends ListViewInputComponent implements OnInit {
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

  pagingConfig: TablePagingConfig = {
    showPagination: false,
  };

  constructor(
    public injector: Injector,
    public elementRef: ElementRef,
  ) {
    super(elementRef);
  }
}
