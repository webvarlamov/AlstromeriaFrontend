import {FilterComponentConfig} from "./filter-component.config";

export interface FilterConfigByAttributeKey {
    [attributeKey: string]: FilterComponentConfig<any>
}
