import {FilterStateChangeRequest} from "../common/filter-state-change-request";
import {ListViewFiltersStateManager} from "../../../../../state/filter-state/list-view-filters-state-manager-impl";

export class ListViewFilterDetailEventManagerImpl {
  public listViewFiltersStateManager: ListViewFiltersStateManager;

  constructor(listViewFiltersStateManager: ListViewFiltersStateManager) {
    this.listViewFiltersStateManager = listViewFiltersStateManager;
  }

  public onFilterDetailsEvent(event: FilterStateChangeRequest) {
    console.log(event, this.listViewFiltersStateManager)
  }
}
