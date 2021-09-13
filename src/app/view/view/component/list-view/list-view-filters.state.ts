import {BehaviorSubject} from "rxjs";
import {
    FilterConfigByAttributeKey,
    FilterValuesByAttributeKey
} from "./list-view.component";
import {ListViewFiltersInitialState} from "./list-view-filters-initial.state";

export class ListViewFiltersState {
    public listViewFilterValuesByAttributeKey$: BehaviorSubject<FilterValuesByAttributeKey>;
    public listViewFilterConfigByAttributeKey$: BehaviorSubject<FilterConfigByAttributeKey>;

    constructor(initialState?: ListViewFiltersInitialState) {
        this.listViewFilterValuesByAttributeKey$ = new BehaviorSubject(initialState?.listViewFilterValuesByAttributeKey ? initialState.listViewFilterValuesByAttributeKey : {})
        this.listViewFilterConfigByAttributeKey$ = new BehaviorSubject(initialState?.listViewFilterConfigByAttributeKey ? initialState.listViewFilterConfigByAttributeKey : {})
    }
}
