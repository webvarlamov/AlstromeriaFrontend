import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CrudToolbarComponent} from './components/crud-toolbar/crud-toolbar.component';
import {SaveOrCancelToolbarComponent} from './components/save-or-cancel-toolbar/save-or-cancel-toolbar.component';
import {FilterBarComponent} from './components/filter-bar/filter-bar.component';
import {InputComponentsModule} from "../input-components/input-components.module";


@NgModule({
  declarations: [
    CrudToolbarComponent,
    SaveOrCancelToolbarComponent,
    FilterBarComponent
  ],
  exports: [
    CrudToolbarComponent,
    SaveOrCancelToolbarComponent,
    FilterBarComponent
  ],
  imports: [
    CommonModule,
    InputComponentsModule
  ]
})
export class CommonComponentsModule {
}
