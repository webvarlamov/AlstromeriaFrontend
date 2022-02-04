import {Directive, Injector} from '@angular/core';
import {ListViewComponent} from "./list-view.component";

@Directive({
  selector: 'app-filterable-list-view-component'
})
export class FilterableListViewComponent<T> extends ListViewComponent<T> {
  public listViewFiltersAsyncState: any = {};
  public listViewFiltersAsyncStateManager: any = {};

  constructor(public injector: Injector,) {
    super(injector);
  }
}
