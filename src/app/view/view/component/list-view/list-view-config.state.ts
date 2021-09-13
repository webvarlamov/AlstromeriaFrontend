import {BehaviorSubject} from "rxjs";
import {ListViewConfigInitialState} from "./list-view-config-initial.state";

export class ListViewConfigState {
    public domainType$: BehaviorSubject<string>;
    public projection$: BehaviorSubject<string>

    constructor(initialState?: ListViewConfigInitialState) {
        this.domainType$ = new BehaviorSubject(initialState?.domainType ? initialState.domainType : null)
        this.projection$ = new BehaviorSubject(initialState?.projection ? initialState.projection : null)
    }
}
