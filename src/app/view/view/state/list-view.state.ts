import {ListViewTableState} from "./list-view-table.state";
import {ListViewTableInitialState} from "./list-view-table-initial.state";
import {ListViewFiltersState} from "./list-view-filters.state";
import {ListViewFiltersInitialState} from "./list-view-filters-initial.state";
import {ListViewConfigState} from "./list-view-config.state";
import {ListViewConfigInitialState} from "./list-view-config-initial.state";

export class ListViewState {
    public listViewFilterState: ListViewFiltersState;
    public listViewTableState: ListViewTableState;
    public listViewConfigState: ListViewConfigState;

    constructor(initialState?: {
        listViewFilterInitialState?: ListViewFiltersInitialState,
        listViewTableInitialState?: ListViewTableInitialState,
        listViewConfigInitialState?: ListViewConfigInitialState
    }) {
        this.listViewFilterState = new ListViewFiltersState(initialState?.listViewFilterInitialState ? initialState.listViewFilterInitialState : null)
        this.listViewTableState = new ListViewTableState(initialState?.listViewTableInitialState ? initialState.listViewTableInitialState : null)
        this.listViewConfigState = new ListViewConfigState(initialState?.listViewConfigInitialState ? initialState.listViewConfigInitialState : null)
    }
}
