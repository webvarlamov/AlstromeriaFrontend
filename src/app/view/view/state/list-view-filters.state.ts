import {BehaviorSubject} from "rxjs";
import {ListViewFiltersInitialState} from "./list-view-filters-initial.state";
import {FilterValuesByAttributeKey} from "../component/list-view/filter-values-by-attribute.key";
import {FilterConfigByAttributeKey} from "../component/list-view/filter-config-by-attribute.key";

export class ListViewFiltersState {
    public listViewFilterValuesByAttributeKey$: BehaviorSubject<FilterValuesByAttributeKey>;
    public listViewFilterConfigByAttributeKey$: BehaviorSubject<FilterConfigByAttributeKey>;

    constructor(initialState?: ListViewFiltersInitialState) {
        this.listViewFilterValuesByAttributeKey$ = new BehaviorSubject(initialState?.listViewFilterValuesByAttributeKey ? initialState.listViewFilterValuesByAttributeKey : {})
        this.listViewFilterConfigByAttributeKey$ = new BehaviorSubject(initialState?.listViewFilterConfigByAttributeKey ? initialState.listViewFilterConfigByAttributeKey : {})
    }
}
