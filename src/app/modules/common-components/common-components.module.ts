import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CrudToolbarComponent} from './components/crud-toolbar/crud-toolbar.component';
import {SaveOrCancelToolbarComponent} from './components/save-or-cancel-toolbar/save-or-cancel-toolbar.component';
import {FilterBarComponent} from './components/filter-bar/filter-bar.component';
import {InputComponentsModule} from "../input-components/input-components.module";
import {AcceptRejectButtonsComponent} from "./components/accept-reject-buttons/accept-reject-buttons.component";


@NgModule({
  declarations: [
    CrudToolbarComponent,
    SaveOrCancelToolbarComponent,
    FilterBarComponent,
    AcceptRejectButtonsComponent
  ],
  exports: [
    CrudToolbarComponent,
    SaveOrCancelToolbarComponent,
    FilterBarComponent,
    AcceptRejectButtonsComponent
  ],
  imports: [
    CommonModule,
    InputComponentsModule
  ]
})
export class CommonComponentsModule {
}
