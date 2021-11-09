import {ListViewConfigInitialState} from "./list-view-config-initial.state";

export class ListViewConfigState {
    public domainType: string;
    public projection: string;

    constructor(initialState?: ListViewConfigInitialState) {
        this.domainType = initialState?.domainType ? initialState.domainType : null
        this.projection = initialState?.projection ? initialState.projection : null
    }
}
