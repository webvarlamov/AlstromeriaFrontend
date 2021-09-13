import {Directive, Injector, OnInit} from "@angular/core";
import {emptyPageable, Pageable} from "../../../../service/http/model/pageable";
import {
  PageNumberChangeRequest,
  SelectionChangeRequest,
  TableComponent
} from "../../../../modules/table/table/table.component";
import {DataAccessService} from "../../../../service/http/service/data-access-service.service";
import {take, tap} from "rxjs/operators";
import {ToFilterExpressionTransformatorService} from "../../../../service/transformation/service/to-filter-expression-transformator.service";
import {FilterExpression} from "../../../../service/http/model/filter-expression";
import {EntitiesLoadOptions} from "../../../../service/http/model/entities-load-options";
import {ListViewState} from "./list-view.state";
import {
  InputComponentConfig,
  InputComponentType,
  InputConfigInterface
} from "../../../../modules/input-components/components/input-component/input.component";

export class FilterValuesByAttributeKey {
  [attributeKey: string]: any
}

export interface FilterConfigInterface extends InputConfigInterface {

}

export class FilterComponentConfig<T> extends InputComponentConfig<T> {
  constructor(initial: FilterConfigInterface) {
    super(initial);
  }
}

export interface FilterConfigByAttributeKey {
  [attributeKey: string]: FilterComponentConfig<any>
}

export class ListViewStateManager {

  public loadPage(
    listViewState: ListViewState,
    dataAccessService: DataAccessService,
    transformator?: ToFilterExpressionTransformatorService,
    options?: EntitiesLoadOptions
  ): Promise<Pageable<any>> {
    const filterExpression: FilterExpression = transformator?.buildFilterExpressionFrom(
      listViewState.listViewFilterState,
      listViewState.listViewConfigState
    );

    return dataAccessService.loadEntities("plans", options, filterExpression)
      .pipe(
        take(1),
        tap(pageable => listViewState.listViewTableState.listViewTablePage$.next(pageable))
      ).toPromise()
  }

  public loadPage$(dataAccessService: DataAccessService, domainType: string, options: EntitiesLoadOptions, filterExpression: FilterExpression) {
    return dataAccessService.loadEntities(domainType, options, filterExpression)
  }
}

@Directive({
  selector: "app-list-view-component",
})
export class ListViewComponent<T> implements OnInit {
  public listViewStateManager: ListViewStateManager = new ListViewStateManager();

  public listViewConfigInitialState = {
    domainType: 'plans',
    projection: ''
  }

  public listViewTableInitialState = {
    listViewTableColumns: [
      {caption: "ID", dataField: "id"},
      {caption: "Name", dataField: "name"},
      {caption: "Description", dataField: "description"},
    ]
  }

  public listViewFilterInitialState = {
    listViewFilterConfigByAttributeKey: {
      id: new FilterComponentConfig({
        attributeKey: 'id',
        componentType: InputComponentType.STRING,
        caption: 'id',
        suggestionsConfig: {}
      }),
      name: new FilterComponentConfig({
        attributeKey: 'name',
        componentType: InputComponentType.STRING,
        caption: 'name',
      }),
      description: new FilterComponentConfig({
        attributeKey: 'description',
        componentType: InputComponentType.STRING,
        caption: 'description',
      }),
    }
  }

  public listViewState: ListViewState = new ListViewState({
    listViewConfigInitialState: this.listViewConfigInitialState,
    listViewTableInitialState: this.listViewTableInitialState,
    listViewFilterInitialState: this.listViewFilterInitialState
  });

  constructor(
    public injector: Injector,
  ) {
  }

  ngOnInit(): void {
  }

  public onPageNumberChangeRequest($event: PageNumberChangeRequest) {
    const dataAccessService = this.injector.get(DataAccessService);
    const transformator = this.injector.get(ToFilterExpressionTransformatorService);

    this.listViewStateManager.loadPage(
      this.listViewState,
      dataAccessService,
      transformator,
      {
        page: $event.pageNumber
      }).then();
  }

  public onTableComponentInit($event: TableComponent<any>) {
    const dataAccessService = this.injector.get(DataAccessService);
    const transformator = this.injector.get(ToFilterExpressionTransformatorService);

    this.listViewStateManager.loadPage(this.listViewState, dataAccessService, transformator).then();
  }

  public onAfterTableComponentViewInit($event: TableComponent<any>) {
  }

  public onTableSelectionChangeRequest($event: SelectionChangeRequest) {
    this.listViewState
      .listViewTableState
      .listViewTableSelected$
      .next($event.selectedCandidates)
  }
}
