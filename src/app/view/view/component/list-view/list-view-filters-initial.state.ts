import {FilterConfigByAttributeKey, FilterValuesByAttributeKey} from "./list-view.component";

export interface ListViewFiltersInitialState {
    listViewFilterValuesByAttributeKey?: FilterValuesByAttributeKey,
    listViewFilterConfigByAttributeKey?: FilterConfigByAttributeKey
}
