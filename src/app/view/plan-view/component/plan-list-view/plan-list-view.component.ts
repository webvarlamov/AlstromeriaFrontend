import {Component, Injector, OnInit} from '@angular/core';
import {TableSelectionConfig} from "../../../../modules/table-module/table/models/config/tableSelectionConfig";
import {SelectionMode} from "../../../../modules/table-module/table/models/config/selectionMode";
import {
  ListViewTableAsyncInitialState,
  ListViewTableAsyncState
} from "../../../view/state2/list-view-table-async-state";
import {PlanRepository} from "../../../../repository/plan-repository.service";
import {
  RemoteEntityListViewTableAsyncStateManager
} from "../../../view/state2/remote-entity-list-view-table-async-state-manager";
import {FilterableListViewComponent} from "../../../view/component/list-view/filterable-list-view-component.directive";
import {StoryRepositoryService} from "../../../../repository/story-repository.service";
import {
  RemoteEntityPropertySuggestionListViewTableAsyncStateManager
} from "../../../view/state2/remote-entity-property-suggestion-list-view-table-async-state-manager";

@Component({
  selector: 'app-plan-list-view',
  templateUrl: './plan-list-view.component.html',
  styleUrls: ['./plan-list-view.component.css'],
})
export class PlanListViewComponent extends FilterableListViewComponent<any> implements OnInit {
  public initialState: ListViewTableAsyncInitialState = {
    tableItemsList: [],
    tableColumns: [
      {id: '0', caption: "ID", dataField: "id"},
      {id: '0', caption: "Name", dataField: "name"},
      {id: '0', caption: "Description", dataField: "description"},
    ],
    tablePage: {
      page: 0,
      size: 0,
      pagesCount: 0,
      itemsCount: 0,
    }
  }
  public listViewTableAsyncState: ListViewTableAsyncState = new ListViewTableAsyncState(this.initialState);
  public listViewTableAsyncStateManager: RemoteEntityListViewTableAsyncStateManager
    = new RemoteEntityListViewTableAsyncStateManager(this.listViewTableAsyncState, this.planRepository)

  /* Entity filter */
  public storyFilterManager: RemoteEntityListViewTableAsyncStateManager =
    new RemoteEntityListViewTableAsyncStateManager(
      new ListViewTableAsyncState({
        tableColumns: [
          {
            id: "name",
            caption: "Имя",
            dataField: "name"
          }
        ]
      }),
      this.storyRepository
    );

  /* String filter */
  public stringFilterManager: RemoteEntityPropertySuggestionListViewTableAsyncStateManager =
    new RemoteEntityPropertySuggestionListViewTableAsyncStateManager(
      new ListViewTableAsyncState({
        tablePage: {
          page: 0,
          size: 50,
          pagesCount: 0,
          itemsCount: 0,
        },
        tableColumns: [{
          id: "value",
          caption: "Значение",
          dataField: "value"
        }]
      }),
      this.planRepository,
      "name"
    );

  public stringSelectionConfig: TableSelectionConfig = {
    sticky: true,
    useSelection: true,
    selectionMode: SelectionMode.SINGLE,
    columnWidth: '35px',
  }

  public tableSelectionConfig: TableSelectionConfig = {
    sticky: true,
    useSelection: true,
    selectionMode: SelectionMode.MULTI,
    columnWidth: '35px',
  };

  constructor(
    public injector: Injector,
    public planRepository: PlanRepository,
    public storyRepository: StoryRepositoryService,
  ) {
    super(injector);
  }

  ngOnInit() {
    super.ngOnInit();
  }
}



