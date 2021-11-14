import {Component, ElementRef, Injector, OnInit} from '@angular/core';
import {
  InputComponent,
  InputComponentConfig,
  StringInputComponentValue
} from "../input-component/input.component";
import {TableComponent} from "../../../table/table/table.component";
import {ToFilterExpressionTransformatorService} from "../../../../service/transformation/service/to-filter-expression-transformator.service";
import {ListViewEntityPropertyStateManager} from "../../../../view/view/state/list-view-state.manager";
import {config} from "rxjs";
import {PageNumberChangeRequest} from "../../../table/table/models/changeRequest/pageNumberChangeRequest";
import {SelectionChangeRequest} from "../../../table/table/models/changeRequest/selectionChangeRequest";

@Component({
  selector: 'app-string-input',
  templateUrl: './string-input.component.html',
  styleUrls: ['./string-input.component.css']
})
export class StringInputComponent extends InputComponent<InputComponentConfig<string>, StringInputComponentValue> implements OnInit {

  async ngOnInit() {
    super.ngOnInit();
  }

  constructor(
    public injector: Injector,
    public elementRef: ElementRef
  ) {
    super(elementRef);
  }

// inputValue$: Subject<string> = new Subject<string>();
  // // suggestionList$ = this.inputValue$.pipe(
  // //   switchMap(searchValue => {
  // //     return this.config.suggestionConfig.dataAccessService.loadSuggestions(
  // //       this.config.suggestionConfig.domainType,
  // //       searchValue,
  // //       this.config.suggestionConfig.searchAttributeKey
  // //     )
  // //   })
  // // )
  //
  // get getValue(): string {
  //   return this.value.data;
  // }
  //
  // public onInput(inputValue: string) {
  //   this.inputValue$.next(inputValue);
  //   // this.changeInputComponentDataRequest({
  //   //   attributeKey: this.config.attributeKey,
  //   //   config: {...this.config},
  //   //   value:  {...this.value, data: inputValue}
  //   // })
  // }
  //
  // constructor(
  //   public elementRef: ElementRef
  // ) {
  //   super(elementRef);
  //   // this.suggestionList$.subscribe(console.log)
  // }
  public onSuggestionsTableComponentInit($event: TableComponent<any>) {
    let listViewStateManager = this.config.suggestionsConfig.suggestionsListViewStateManager;
    let listViewState = this.config.suggestionsConfig.suggestionsListViewState;
    let dataAccessService = this.config.suggestionsConfig.suggestionsDataAccessService;
    let transformator = this.injector.get(ToFilterExpressionTransformatorService);
    let suggestionsByProperty = this.config.suggestionsConfig.suggestionsByProperty;

    (listViewStateManager as ListViewEntityPropertyStateManager).loadPageToState({
      listViewState,
      dataAccessService,
      transformator,
      suggestionsByProperty
    }).then()
  }

  public onPageNumberChangeRequest($event: PageNumberChangeRequest) {
    let listViewStateManager = this.config.suggestionsConfig.suggestionsListViewStateManager;
    let listViewState = this.config.suggestionsConfig.suggestionsListViewState;
    let dataAccessService = this.config.suggestionsConfig.suggestionsDataAccessService;
    let transformator = this.injector.get(ToFilterExpressionTransformatorService);


    listViewStateManager.loadPageToState({
      listViewState,
      dataAccessService,
      transformator,
      options: {
        page: $event.pageNumber
      }
    }).then();
  }

  public onTableSelectionChangeRequest($event: SelectionChangeRequest) {
    let listViewState = this.config.suggestionsConfig.suggestionsListViewState;

    listViewState
      .listViewTableState
      .listViewTableSelected$
      .next($event.selectedCandidates)
  }
}
