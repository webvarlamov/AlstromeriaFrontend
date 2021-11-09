import { Injectable } from '@angular/core';
import { ToFilterExpressionTransformator } from "../model/to-filter-expression-transformator";
import {FilterExpression} from "../../http/model/filter-expression";
import {ListViewFiltersState} from "../../../view/view/state/list-view-filters.state";
import {ListViewConfigState} from "../../../view/view/state/list-view-config.state";

@Injectable({
  providedIn: 'root'
})
export class ToFilterExpressionTransformatorService extends ToFilterExpressionTransformator{
  constructor() {
    super()
  }

  public buildFilterExpressionFrom(listViewFilterState: ListViewFiltersState, listViewConfigState: ListViewConfigState) {
    return FilterExpression.empty();
  }
}
