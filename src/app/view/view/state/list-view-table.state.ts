import {BehaviorSubject} from "rxjs";
import {emptyPageable, HasId, Pageable} from "../../../service/http/model/pageable";
import {ListViewTableInitialState} from "./list-view-table-initial.state";
import {TableColumn} from "../../../modules/table-module/table/models/dataModels/tableColumn";
import {TableSort} from "../../../modules/table-module/table/models/dataModels/tableSort";

export class ListViewTableState {
    public listViewTablePage$: BehaviorSubject<Pageable<any>>;
    public listViewTablePageSize$: BehaviorSubject<number>;
    public listViewTableColumns$: BehaviorSubject<Array<TableColumn>>;
    public listViewTableSelected$: BehaviorSubject<Array<HasId>>;
    public listViewTableSorting$: BehaviorSubject<Array<TableSort>>

    constructor(initialState?: ListViewTableInitialState) {
        this.listViewTablePage$ = new BehaviorSubject(initialState?.listViewTablePage ? initialState.listViewTablePage : emptyPageable);
        this.listViewTablePageSize$ = new BehaviorSubject(initialState?.listViewTablePageSize != null ? initialState?.listViewTablePageSize : 20);
        this.listViewTableColumns$ = new BehaviorSubject(initialState?.listViewTableColumns ? initialState.listViewTableColumns : []);
        this.listViewTableSelected$ = new BehaviorSubject(initialState?.listViewTableSelected ? initialState.listViewTableSelected : []);
        this.listViewTableSorting$ = new BehaviorSubject<Array<TableSort>>(initialState?.listViewTableSorting ? initialState.listViewTableSorting : [])
    }
}
