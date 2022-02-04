import {Component, Injector, OnInit} from '@angular/core';
import {TableSelectionConfig} from "../../../../modules/table-module/table/models/config/tableSelectionConfig";
import {SelectionMode} from "../../../../modules/table-module/table/models/config/selectionMode";
import {ListViewTableAsyncState} from "../../../view/state2/list-view-table-async-state";
import {PlanRepositoryService} from "../../../../repository/plan-repository.service";
import {
  RemoteEntityListViewTableAsyncStateManager
} from "../../../view/state2/remote-entity-list-view-table-async-state-manager";
import {FilterableListViewComponent} from "../../../view/component/list-view/filterable-list-view-component.directive";

@Component({
  selector: 'app-plan-list-view',
  templateUrl: './plan-list-view.component.html',
  styleUrls: ['./plan-list-view.component.css'],
})
export class PlanListViewComponent extends FilterableListViewComponent<any> implements OnInit {
  public listViewTableAsyncState: ListViewTableAsyncState = new ListViewTableAsyncState({
    tableItemsList: [],
    tableColumns: [{id: '0', caption: "ID", dataField: "id"}],
    tablePage: {
      page: 0,
      size: 0,
      pagesCount: 0,
      itemsCount: 0,
    }
  });
  public listViewTableAsyncStateManager: RemoteEntityListViewTableAsyncStateManager
    = new RemoteEntityListViewTableAsyncStateManager(this.listViewTableAsyncState, this.repository)

  public tableSelectionConfig: TableSelectionConfig = {
    useSelection: true,
    columnWidth: '40px',
    sticky: true,
    selectionMode: SelectionMode.MULTI
  };

  constructor(
    public injector: Injector,
    public repository: PlanRepositoryService
  ) {
    super(injector);
  }

  ngOnInit() {
    super.ngOnInit();
  }
}



