import {BehaviorSubject} from "rxjs";
import {emptyPageable, HasId, Pageable} from "../../../service/http/model/pageable";
import {TableColumn} from "../../../modules/table/table/table.component";
import {ListViewTableInitialState} from "./list-view-table-initial.state";

export class ListViewTableState {
    public listViewTablePage$: BehaviorSubject<Pageable<any>>;
    public listViewTableColumns$: BehaviorSubject<Array<TableColumn>>;
    public listViewTableSelected$: BehaviorSubject<Array<HasId>>;

    constructor(initialState?: ListViewTableInitialState) {
        this.listViewTablePage$ = new BehaviorSubject(initialState?.listViewTablePage ? initialState.listViewTablePage : emptyPageable);
        this.listViewTableColumns$ = new BehaviorSubject(initialState?.listViewTableColumns ? initialState.listViewTableColumns : []);
        this.listViewTableSelected$ = new BehaviorSubject(initialState?.listViewTableSelected ? initialState.listViewTableSelected : []);
    }
}
