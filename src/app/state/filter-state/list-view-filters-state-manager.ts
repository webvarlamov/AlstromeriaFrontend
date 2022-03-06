import {FilterValueConfigTuple, ListViewFiltersState} from "./list-view-filters.state";
import {combineLatest, Observable} from "rxjs";
import {map} from "rxjs/operators";
import {FilterComponentConfig} from "../../view/view/component/list-view/filter-component.config";

export class ListViewFiltersStateManager {
  public state: ListViewFiltersState;
  public filtersByAttributeKey$: Observable<{ [attributeKey: string]: FilterValueConfigTuple }>;

  constructor(args: {
    listViewFiltersState?: ListViewFiltersState
  }) {
    this.state = args.listViewFiltersState != null ? args.listViewFiltersState : new ListViewFiltersState()
    this.filtersByAttributeKey$ = this.createFiltersByAttributeKey();
  }

  private createFiltersByAttributeKey(): Observable<{ [attributeKey: string]: FilterValueConfigTuple }> {
    return combineLatest([
      this.state.filterConfigByAttributeKey$,
      this.state.filterValuesByAttributeKey$
    ]).pipe(
      map(([config, values]) => {
        const result: {[attributeKey: string]: any} = {};

        Object.keys(config).forEach(attributeKey => {
          result[attributeKey] = {
            config: config[attributeKey] as FilterComponentConfig<any>,
            value: values[attributeKey] as any
          }
        });

        return result;
      }));
  }

  public updateValueByAttributeKey(attributeKey: any, value: string): void {
    this.state.filterValuesByAttributeKey$.next(
      {...this.state.filterValuesByAttributeKey$.getValue(), [attributeKey]: value}
    );
  }
}
