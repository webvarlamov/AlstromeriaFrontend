import { EditTableRowItemCellInputComponentEvent } from "../../../../modules/table-module/table/cell-template-components/edit-table-row-item-cell-input/edit-table-row-item-cell-input.component";
import { TableCellDynamicComponentEventHandler } from "../../../../modules/table-module/table/models/common/table-cell-dynamic-component-event-handler";
import { TableRow } from "../../../../modules/table-module/table/models/dataModels/tableRow";
import { TableColumn } from "../../../../modules/table-module/table/models/dataModels/tableColumn";

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
