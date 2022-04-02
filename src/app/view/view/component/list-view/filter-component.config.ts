import {InputComponentConfig} from "../../../../modules/input-components-module/components/input-component/input.component";
import {FilterConfigInterface} from "./filter-config.interface";

export class FilterComponentConfig<T> extends InputComponentConfig<T> {
    constructor(initial: FilterConfigInterface) {
        super(initial);
    }
}
