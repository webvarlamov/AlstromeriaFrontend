import {ColumnSizeChangeRequest} from "./components/cell-resize/cell-resize.component";
import {SelectionChangeRequest, TableColumn, TableRow} from "./table.component";
import {HasId} from "../../../service/http/model/pageable";
import {Injectable} from "@angular/core";
import {ColumnPositionChangeRequest} from "./components/coll-dragger/coll-dragger.component";

@Injectable()
export class TableUtilsService {
  public addCandidatesToColumnSizeChangeRequest($event: ColumnSizeChangeRequest, columns: Array<TableColumn>): ColumnSizeChangeRequest {
    const changeableColumn = columns
      .find(column => column.id === $event.column.id);

    const changeableColumnIndex = columns
      .indexOf(changeableColumn);

    const afterChangeableColumn = {...changeableColumn, width: $event.nextColumnSize};

    const candidates = [...columns];
    candidates[changeableColumnIndex] = afterChangeableColumn;

    return {...$event, columnCandidates: candidates}
  }

  public addCandidatesToColumnMoveLeftChangeRequest($event: ColumnPositionChangeRequest, columns: Array<TableColumn>): ColumnPositionChangeRequest {
    const currentIndex = columns
      .map(column => column.id)
      .indexOf($event.column.id);

    const tableColumns = this.changeColumnPosition(
      [...columns],
      currentIndex,
      $event.nextPosition.index,
      $event.nextPosition.position
    );

    return {...$event, candidates: tableColumns};
  }

  public calcSelectionChangeRequest(row: TableRow, checked: boolean, selectedEntities: Array<HasId>): SelectionChangeRequest {
    let selectedCandidates = [];

    if (checked) {
      selectedCandidates = selectedEntities
        .concat(selectedEntities)
        .concat(row.data)
    } else {
      selectedCandidates = selectedEntities
        .filter(entity => entity.id !== row.data.id)
    }

    return {
      currentSelectedEntities: checked ? [row.data] : [],
      currentDeselectedEntities: checked ? [] : [row.data],
      selectedCandidates,
      checked
    }
  }

  public changeColumnPosition(tableColumns: Array<TableColumn> , currentIndex: number , targetIndex: number, position: 'before' | 'after' ): Array<TableColumn> {
    const currentTableColumn = {...tableColumns[currentIndex]};
    const targetTableColumn = {...tableColumns[targetIndex]};
    const result: Array<TableColumn> = [];

    tableColumns
      .filter(tableColumn => tableColumn.id != currentTableColumn.id)
      .forEach(tableColumn => {
        if (tableColumn.id !== targetTableColumn.id) {
          result.push(tableColumn)
        } else {
          if (position == 'before') {
            result.push(currentTableColumn)
            result.push(tableColumn)
          } else if (position == 'after') {
            result.push(tableColumn)
            result.push(currentTableColumn)
          }
        }
    })

    return result;
  };
}
