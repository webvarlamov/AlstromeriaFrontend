import {FilterValuesByAttributeKey} from "../component/list-view/filter-values-by-attribute.key";
import {FilterConfigByAttributeKey} from "../component/list-view/filter-config-by-attribute.key";

export interface ListViewFiltersInitialState {
    listViewFilterValuesByAttributeKey?: FilterValuesByAttributeKey,
    listViewFilterConfigByAttributeKey?: FilterConfigByAttributeKey
}
