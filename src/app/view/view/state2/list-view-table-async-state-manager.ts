import {ListViewTableAsyncState} from "./list-view-table-async-state";
import {Page} from "../../../service/http/model/page";
import {TableSort} from "../../../modules/table-module/table/models/dataModels/tableSort";
import {HasId} from "../../../service/http/model/pageable";
import {TableColumn} from "../../../modules/table-module/table/models/dataModels/tableColumn";
import {take, tap} from "rxjs/operators";
import {combineLatest} from "rxjs";

export class ListViewTableAsyncStateManager {
  public listViewTableAsyncState: ListViewTableAsyncState;

  constructor(listViewTableAsyncState: ListViewTableAsyncState) {
    this.listViewTableAsyncState = listViewTableAsyncState;
  }

  public changeTablePage(page: Page): void {
    this.listViewTableAsyncState.nextTablePage(page);
  }

  public changeTableItems(tableItemsList: Array<HasId>): void {
    this.listViewTableAsyncState.nextTableItemsList(tableItemsList);
  }

  public changeTableSorting(tableSorting: Array<TableSort>): void {
    this.listViewTableAsyncState.nextTableSorting(tableSorting);
  }

  public changeTableSelected(tableSelectedList: Array<HasId>): void {
    this.listViewTableAsyncState.nextTableSelectedList(tableSelectedList);
  }

  public changeTableColumns(tableColumnsList: Array<TableColumn>): void {
    this.listViewTableAsyncState.nextTableColumnsList(tableColumnsList);
  }

  public deleteTableItems(): Promise<any> {
    return combineLatest([
      this.listViewTableAsyncState.tableSelectedList$,
      this.listViewTableAsyncState.tableItemsList$
    ]).pipe(
      take(1),
      tap(([selectedItems, tableItems]) => {
        const tableItemsCandidates = tableItems.filter(ti => selectedItems.find(si => si.id == ti.id) == null);
        this.listViewTableAsyncState.nextTableItemsList(tableItemsCandidates);
        this.listViewTableAsyncState.nextTableSelectedList([]);
      })
    ).toPromise();
  }
}

