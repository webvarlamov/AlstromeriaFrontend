import {ListViewState} from "./list-view.state";
import {DataAccessService} from "../../../service/http/service/data-access-service.service";
import {ToFilterExpressionTransformatorService} from "../../../service/transformation/service/to-filter-expression-transformator.service";
import {EntitiesLoadOptions} from "../../../service/http/model/entities-load-options";
import {emptyPageable, Pageable} from "../../../service/http/model/pageable";
import {FilterExpression} from "../../../service/http/model/filter-expression";
import {take} from "rxjs/operators";
import {Injectable} from "@angular/core";
import {of} from "rxjs";

interface LoadPageToStateParams {
  listViewState: ListViewState,
  dataAccessService: DataAccessService,
  transformator?: ToFilterExpressionTransformatorService,
  options?: EntitiesLoadOptions
}

export abstract class ListViewStateManager {
  abstract loadPageToState(params: LoadPageToStateParams): Promise<Pageable<any>>;
}

@Injectable({providedIn: 'root'})
export class ListViewEntitiesStateManager extends ListViewStateManager {
  public loadPageToState(params: LoadPageToStateParams): Promise<Pageable<any>> {
    const filterExpression: FilterExpression = params.transformator?.buildFilterExpressionFrom(
      params.listViewState.listViewFilterState,
      params.listViewState.listViewConfigState
    );

    return params.dataAccessService.loadEntities(
      params.listViewState.listViewConfigState.domainType,
      params.options,
      filterExpression
    ).pipe(take(1))
      .toPromise()
      .then(pageable => {
        params.listViewState.listViewTableState.listViewTablePage$.next(pageable);
        return pageable;
      }
    )
  }
}

@Injectable({providedIn: 'root'})
export class ListViewEntityPropertyStateManager extends ListViewStateManager {
  loadPageToState(params: LoadPageToStateParams & { suggestionsByProperty: string }): Promise<Pageable<any>> {
    const filterExpression: FilterExpression = params.transformator?.buildFilterExpressionFrom(
      params.listViewState.listViewFilterState,
      params.listViewState.listViewConfigState
    );

    return params.dataAccessService.loadSuggestionsPage(
      params.listViewState.listViewConfigState.domainType,
      '',
      params.suggestionsByProperty,
      filterExpression
    )
      .pipe(take(1))
      .toPromise()
      .then(
        pageable => {
          params.listViewState.listViewTableState.listViewTablePage$.next(pageable);
          return pageable;
        }
      );
  }
}
