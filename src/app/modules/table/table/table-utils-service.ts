import {ColumnSizeChangeRequest} from "./components/cell-resize/cell-resize.component";
import {HasId} from "../../../service/http/model/pageable";
import {Injectable} from "@angular/core";
import {TableRow} from "./models/dataModels/tableRow";
import {SelectionChangeRequest} from "./models/changeRequest/selectionChangeRequest";
import {TableColumn} from "./models/dataModels/tableColumn";
import {ColumnPositionChangeRequest} from "./models/changeRequest/column-position-change.request";
import {SortChangeRequest} from "./models/changeRequest/sort-change-request";
import {TableSort} from "./models/dataModels/tableSort";

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

  public calcSingleSelectionChangeRequest(eventEntity: HasId, checked: boolean, selectedEntities: Array<HasId>): SelectionChangeRequest {
    let selectedCandidates = [];

    if (checked) {
      selectedCandidates = selectedEntities
        .concat([eventEntity])
    } else {
      selectedCandidates = selectedEntities
        .filter(entity => entity.id !== eventEntity.id)
    }

    return {
      currentSelectedEntities: checked ? [eventEntity] : [],
      currentDeselectedEntities: checked ? [] : [eventEntity],
      selectedCandidates,
      checked
    }
  }

  public calcMultiSelectionChangeRequest(eventEntities: Array<HasId>, setSelection: boolean, selectedEntities: Array<HasId>): SelectionChangeRequest {
    let selectedCandidates = [];

    if (setSelection) {
      selectedCandidates = selectedEntities.concat(eventEntities)
    } else {
      selectedCandidates = selectedEntities.filter(se => {
        return eventEntities.find(ee => ee.id == se.id) == null;
      })
    }

    return {
      currentSelectedEntities: setSelection ? eventEntities : [],
      currentDeselectedEntities: setSelection ? [] : eventEntities,
      selectedCandidates,
      checked: setSelection
    }
  }

  public changeColumnPosition(tableColumns: Array<TableColumn>, currentIndex: number, targetIndex: number, position: 'before' | 'after'): Array<TableColumn> {
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

  public calsSortingCandidates($event: SortChangeRequest, sorting: Array<TableSort>): SortChangeRequest {
    const sortFromEvent: TableSort = {
      dataField: $event.dataField,
      order: $event.sortOrder
    }

    if ($event.enabled) {
      let candidates = [...sorting].filter(s => s.dataField != sortFromEvent.dataField);
      candidates.push(sortFromEvent);
      return {...$event, sortCandidates: candidates}
    } else {
      let candidates = [...sorting].filter(s => s.dataField != sortFromEvent.dataField);
      return {...$event, sortCandidates: candidates}
    }
  }
}
