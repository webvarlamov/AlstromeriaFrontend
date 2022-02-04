import {
  EditTableRowItemCellInputComponent, EditTableRowItemCellInputComponentEvent
} from "../../../../modules/table-module/table/cell-template-components/edit-table-row-item-cell-input/edit-table-row-item-cell-input.component";
import {
  EditTableRowItemCellButtonComponent
} from "../../../../modules/table-module/table/cell-template-components/edit-table-row-item-cell-button/edit-table-row-item-cell-button.component";
import {
  TableCellDynamicComponentEventHandler
} from "../../../../modules/table-module/table/models/common/table-cell-dynamic-component-event-handler";
import {TableRow} from "../../../../modules/table-module/table/models/dataModels/tableRow";
import {TableColumn} from "../../../../modules/table-module/table/models/dataModels/tableColumn";

export class EditTableRowItemCellInputComponentEventHandler extends TableCellDynamicComponentEventHandler {
  constructor() {
    super();
  }

  handleEvent(
    tableRow: TableRow,
    tableColumn: TableColumn,
    $event: EditTableRowItemCellInputComponentEvent
  ) {
  }
}

export const planListViewTableInitialState: any = {
  tableItemsList: [],
  tablePage: {
    size: 50,
    pagesCount: 21,
    itemsCount: 1002,
    page: 0,
  },
  tableColumns: [
    {id: '0', caption: "ID", dataField: "id",},
    {id: '1', caption: "Name", dataField: "name"},
    {
      id: '2',
      caption: "Description",
      dataField: "description",
      dynamicCellComponent: EditTableRowItemCellInputComponent,
      dynamicCellComponentEventHandler: new EditTableRowItemCellInputComponentEventHandler()
    },
    {
      id: '3',
      caption: "Edit",
      dataField: "",
      dynamicCellComponent: EditTableRowItemCellButtonComponent,
      width: "45px"
    },
  ]
}
