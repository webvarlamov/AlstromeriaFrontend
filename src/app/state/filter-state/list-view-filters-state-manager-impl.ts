import {ListViewFiltersState} from "./list-view-filters.state";
import {combineLatest, Observable} from "rxjs";
import {map, take} from "rxjs/operators";
import {FilterValuesByAttributeKey} from "../../view/view/component/list-view/filter-values-by-attribute.key";
import {FilterConfigByAttributeKey} from "../../view/view/component/list-view/filter-config-by-attribute.key";

export class ListViewFiltersStateManagerImpl implements ListViewFiltersStateManager {
  public listViewFilterState: ListViewFiltersState;

  constructor(args: {
    listViewFiltersState?: ListViewFiltersState
  }) {
    this.listViewFilterState = args.listViewFiltersState != null ? args.listViewFiltersState : new ListViewFiltersState()
  }

  public getListViewFiltersStateData(): Observable<ListViewFiltersStateData> {
    return combineLatest([
      this.listViewFilterState.filterConfigByAttributeKey$,
      this.listViewFilterState.filterValuesByAttributeKey$
    ]).pipe(
      take(1),
      map(([filterConfigByAttributeKey, filterValuesByAttributeKey]) => {
        return {filterConfigByAttributeKey, filterValuesByAttributeKey}
      }),
    )
  }
}

export interface ListViewFiltersStateManager {
  getListViewFiltersStateData(): Observable<ListViewFiltersStateData>
}

export interface ListViewFiltersStateData {
  filterConfigByAttributeKey: FilterConfigByAttributeKey;
  filterValuesByAttributeKey: FilterValuesByAttributeKey<any>;
}
