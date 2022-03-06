import {ListViewTableState} from "./list-view-table-state";
import {ListViewTableStateManager} from "./list-view-table-state-manager";
import {ListViewFiltersStateManager} from "../filter-state/list-view-filters-state-manager";


export class FilterableListViewTableStateManager extends ListViewTableStateManager {
  public listViewFiltersStateManager: ListViewFiltersStateManager;

  constructor(
    args: {
      listViewTableState: ListViewTableState,
      listViewFiltersStateManager: ListViewFiltersStateManager;
    }
  ) {
    super(args.listViewTableState);
    this.listViewFiltersStateManager = args.listViewFiltersStateManager
  }
}

