import {HasId, Pageable} from "../../../service/http/model/pageable";
import {TableColumn} from "../../../modules/table-module/table/models/dataModels/tableColumn";
import {TableSort} from "../../../modules/table-module/table/models/dataModels/tableSort";

export interface ListViewTableInitialState {
    listViewTablePage?: Pageable<Pageable<any>>;
    listViewTableColumns?: Array<TableColumn>;
    listViewTableSelected?: Array<HasId>;
    listViewTableSorting?: Array<TableSort>
}
