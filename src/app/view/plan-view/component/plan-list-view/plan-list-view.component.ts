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
import {TableSelectionConfig} from "../../../../modules/table-module/table/models/config/tableSelectionConfig";
import {SelectionMode} from "../../../../modules/table-module/table/models/config/selectionMode";
import {ListViewTableInitialState} from "../../../view/state/list-view-table-initial.state";
import {ListViewFiltersInitialState} from "../../../view/state/list-view-filters-initial.state";
import {ListViewConfigInitialState} from "../../../view/state/list-view-config-initial.state";
import {TableRow} from "../../../../modules/table-module/table/models/dataModels/tableRow";

@Component({
  selector: 'app-plan-list-view',
  templateUrl: './plan-list-view.component.html',
  styleUrls: ['./plan-list-view.component.css'],
})
export class PlanListViewComponent extends ListViewComponent<any> implements OnInit {
  public listViewConfigInitialState: ListViewConfigInitialState = {
    domainType: 'plans',
    projection: ''
  }

  public listViewTableInitialState: ListViewTableInitialState = {
    listViewTableColumns: [
      {id: '0', caption: "ID", dataField: "id"},
      {id: '1', caption: "Name", dataField: "name"},
      {id: '2', caption: "Description", dataField: "description"},
    ],
    listViewTableSorting: []
  }

  public listViewFilterInitialState: ListViewFiltersInitialState = {
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

  onHelloClick($event: MouseEvent, row: TableRow) {
    console.log($event, row)
  }
}
