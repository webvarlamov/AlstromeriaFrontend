import {Component, Injector, OnInit} from '@angular/core';
import {ListViewComponent} from "../../../view/component/list-view/list-view.component";
import {
  InputComponentSuggestionsConfig,
  InputComponentType,
} from "../../../../modules/input-components/components/input-component/input.component";
import {DataAccessService} from "../../../../service/http/service/data-access-service.service";
import {FilterComponentConfig} from "../../../view/component/list-view/filter-component.config";
import {ListViewState} from "../../../view/state/list-view.state";
import {ListViewEntityPropertyStateManager} from "../../../view/state/list-view-state.manager";
import {SelectionMode, TableSelectionConfig} from "../../../../modules/table/table/table.component";

@Component({
  selector: 'app-plan-list-view',
  templateUrl: './plan-list-view.component.html',
  styleUrls: ['./plan-list-view.component.css'],
})
export class PlanListViewComponent extends ListViewComponent<any> implements OnInit {
  public listViewConfigInitialState = {
    domainType: 'plans',
    projection: ''
  }

  public listViewTableInitialState = {
    listViewTableColumns: [
      {id: '0', caption: "0", dataField: "0"},
      {id: '1', caption: "1", dataField: "1"},
      {id: '2', caption: "2", dataField: "2"},
      {id: '3', caption: "3", dataField: "3"},
      {id: '4', caption: "4", dataField: "4"},
      {id: '5', caption: "5", dataField: "5"},
      {id: '6', caption: "6", dataField: "6"},
      {id: '7', caption: "7", dataField: "7"},
      {id: '8', caption: "8", dataField: "8"},
    ]
  }

  public listViewFilterInitialState = {
    listViewFilterConfigByAttributeKey: {
      id: new FilterComponentConfig({
        attributeKey: 'id',
        componentType: InputComponentType.STRING,
        caption: 'id',
        suggestionsConfig: this.getFilterComponentSuggestionsConfig()
      }),
      name: new FilterComponentConfig({
        attributeKey: 'name',
        componentType: InputComponentType.STRING,
        caption: 'name',
        suggestionsConfig: this.getFilterComponentSuggestionsConfig()
      }),
      description: new FilterComponentConfig({
        attributeKey: 'description',
        componentType: InputComponentType.STRING,
        caption: 'description',
        suggestionsConfig: this.getFilterComponentSuggestionsConfig()
      }),
    }
  }

  public listViewState = new ListViewState({
    listViewConfigInitialState: this.listViewConfigInitialState,
    listViewTableInitialState: this.listViewTableInitialState,
    listViewFilterInitialState: this.listViewFilterInitialState
  });

  public selectionConfig: TableSelectionConfig = {
    useSelection: true,
    columnWidth: '40px',
    sticky: true,
    selectionMode: SelectionMode.MULTI
  };

  private getFilterComponentSuggestionsConfig(): InputComponentSuggestionsConfig {
    return new InputComponentSuggestionsConfig({
      suggestionsByProperty: 'booleans',
      suggestionsListViewState: new ListViewState({
        listViewConfigInitialState: {domainType: 'users'},
        listViewTableInitialState: {
          listViewTableColumns: [
            {id: "booleans", caption: "Usernames", dataField: "booleans"}
          ]
        },
      }),
      suggestionsListViewStateManager: this.injector.get(ListViewEntityPropertyStateManager),
      suggestionsDataAccessService: this.injector.get(DataAccessService)
    });
  }

  constructor(
    public injector: Injector
  ) {
    super(injector);
  }
}
