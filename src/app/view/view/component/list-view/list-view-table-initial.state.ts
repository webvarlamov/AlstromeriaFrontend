import {HasId, Pageable} from "../../../../service/http/model/pageable";
import {TableColumn} from "../../../../modules/table/table/table.component";

export interface ListViewTableInitialState {
    listViewTablePage?: Pageable<Pageable<any>>;
    listViewTableColumns?: Array<TableColumn>;
    listViewTableSelected?: Array<HasId>;
}
