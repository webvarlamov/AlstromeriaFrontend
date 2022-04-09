import {Component, Injector, OnInit} from '@angular/core';
import {TableSelectionConfig} from "../../../../modules/table-components-module/table/models/config/tableSelectionConfig";
import {SelectionMode} from "../../../../modules/table-components-module/table/models/config/selectionMode";
import {PlanRepository} from "../../../../repository/plan-repository.service";
import {FilterableListViewComponent} from "../../../view/component/list-view/filterable-list-view-component.directive";
import {StoryRepositoryService} from "../../../../repository/story-repository.service";
import {ListViewTableState} from "../../../../state/list-view-state/list-view-table-state";
import {
  RemoteFilterableListViewStateManager
} from "../../../../state/list-view-state/remote-filterable-list-view-state-manager";
import {
  SuggestionValueRemoteFilterableListViewStateManager
} from "../../../../state/list-view-state/suggestion-value-remote-filterable-list-view-state-manager";
import {
  InputComponentConfig,
  InputComponentType,
  InputConfigInterface
} from "../../../../modules/input-components-module/components/input-component/input.component";
import {ListViewFiltersStateManager} from "../../../../state/filter-state/list-view-filters-state-manager";
import {ListViewFiltersState} from "../../../../state/filter-state/list-view-filters.state";
import {ListViewTableInitialState} from "../../../../state/list-view-state/list-view-table-initial-state";
import {
  DefaultFilterExpressionBuilderImpl
} from "../../../../service/http/service/default-filter-expression-builder-impl";
import {FilterComponentConfig} from "../../../view/component/list-view/filter-component.config";
import {RangeOperator} from "../../../../service/http/model/range-operator.enum";
import {
  SuggestionEntityRemoteFilterableListViewStateManager
} from "../../../../state/list-view-state/suggestion-entity-remote-filterable-list-view-state-manager";
import {ListViewTableStateManager} from "../../../../state/list-view-state/list-view-table-state-manager";
import {
  BooleanInputListViewTableStateManager
} from "../../../../modules/input-components-module/components/boolean-input/boolean-input-list-view-table-state-manager";

@Component({
  selector: 'app-plan-list-view',
  templateUrl: './plan-list-view.component.html',
  styleUrls: ['./plan-list-view.component.css'],
})
export class PlanListViewComponent extends FilterableListViewComponent<any> implements OnInit {
  public initialState: ListViewTableInitialState = {
    tableItemsList: [],
    tableColumns: [
      {id: '0', caption: "ID", dataField: "id"},
      {id: '1', caption: "Name", dataField: "name"},
      {id: '2', caption: "Description", dataField: "description"},
    ],
    tablePage: {
      page: 0,
      size: 0,
      pagesCount: 0,
      itemsCount: 0,
    }
  }
  public listViewTableAsyncState: ListViewTableState = new ListViewTableState(this.initialState);
  public listViewTableAsyncStateManager: RemoteFilterableListViewStateManager =
    new RemoteFilterableListViewStateManager({
    listViewTableState: this.listViewTableAsyncState,
    repository: this.planRepository,
    listViewFiltersStateManager: new ListViewFiltersStateManager({}),
    filterExpressionBuilder: new DefaultFilterExpressionBuilderImpl()
  });
  public storyFilterManager: SuggestionEntityRemoteFilterableListViewStateManager =
    new SuggestionEntityRemoteFilterableListViewStateManager({
      listViewTableState: new ListViewTableState({
        tablePage: {
          page: 0,
          size: 50,
          pagesCount: 0,
          itemsCount: 0,
        },
        tableColumns: [
          {
            id: "id",
            caption: "ID",
            dataField: "id"
          }
        ]
      }),
      repository: this.storyRepository,
      listViewFiltersStateManager: new ListViewFiltersStateManager({}),
      filterExpressionBuilder: new DefaultFilterExpressionBuilderImpl()
    });
  public booleanFilterManager: any = new BooleanInputListViewTableStateManager();

  public stringFilterContextManager: any;
  public stringFilterManager: SuggestionValueRemoteFilterableListViewStateManager =
    new SuggestionValueRemoteFilterableListViewStateManager({
      listViewTableState: new ListViewTableState({
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
      repository: this.planRepository,
      attributeKey: "name",
      listViewFiltersStateManager: new ListViewFiltersStateManager({
        listViewFiltersState: new ListViewFiltersState({
          listViewFilterConfigByAttributeKey: {
            name: new FilterComponentConfig<any>({
              attributeKey: "name",
              caption: "Имя",
              componentType: InputComponentType.STRING,
              operator: RangeOperator.STARTWITH
            })
          },
          listViewFilterValuesByAttributeKey: {
            name: ''
          }
        })
      }),
      filterExpressionBuilder: new DefaultFilterExpressionBuilderImpl()
    });

  public numberFilterManager: SuggestionValueRemoteFilterableListViewStateManager =
    new SuggestionValueRemoteFilterableListViewStateManager({
      listViewTableState: new ListViewTableState({
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
      repository: this.planRepository,
      attributeKey: "num",
      listViewFiltersStateManager: new ListViewFiltersStateManager({
        listViewFiltersState: new ListViewFiltersState({
          listViewFilterConfigByAttributeKey: {
            num: new FilterComponentConfig<any>({
              attributeKey: "num",
              caption: "Значение",
              componentType: InputComponentType.NUMBER,
              operator: RangeOperator.GE
            })
          },
          listViewFilterValuesByAttributeKey: {
            num: "0"
          }
        })
      }),
      filterExpressionBuilder: new DefaultFilterExpressionBuilderImpl()
    });


  public stringSelectionConfig: TableSelectionConfig = {
    sticky: true,
    useSelection: false,
    selectionMode: SelectionMode.SINGLE,
    columnWidth: '35px',
  };
  public tableSelectionConfig: TableSelectionConfig = {
    sticky: true,
    useSelection: true,
    selectionMode: SelectionMode.MULTI,
    columnWidth: '35px',
  };
  public stringInputConfig: InputConfigInterface = new InputComponentConfig({
    attributeKey: 'name',
    caption: 'caption',
    componentType: InputComponentType.STRING,
    operator: RangeOperator.STARTWITH
  });

  public numberInputConfig: InputConfigInterface = new InputComponentConfig({
    attributeKey: 'num',
    caption: 'caption',
    componentType: InputComponentType.NUMBER,
    operator: RangeOperator.EQ
  });

  public enumFilterManager: any = new ListViewTableStateManager(new ListViewTableState({
    tableItemsList: [
      {id: '1', value: '1', caption: 'В работе'},
      {id: '2', value: '2', caption: 'Тестировать'},
    ],
    tableColumns: [
      {id: '1', dataField: 'caption', caption: 'Значение'},
    ]
  }))

  constructor(
    public injector: Injector,
    public planRepository: PlanRepository,
    public storyRepository: StoryRepositoryService,
  ) {
    super(injector);
  }

  ngOnInit() {
    super.ngOnInit();
    this.listViewTableAsyncStateManager.updateItems().then();
  }
}



