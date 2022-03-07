import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CrudToolbarComponent} from './components/crud-toolbar/crud-toolbar.component';
import {SaveOrCancelToolbarComponent} from './components/save-or-cancel-toolbar/save-or-cancel-toolbar.component';
import {FilterBarComponent} from './components/filter-bar/filter-bar.component';
import {InputComponentsModule} from "../input-components/input-components.module";
import {AcceptRejectButtonsComponent} from "./components/accept-reject-buttons/accept-reject-buttons.component";
import {ModalableDirective} from "./components/modal-window/model/modalable.directive";
import {ModalWindowComponent} from "./components/modal-window/modal-window.component";


@NgModule({
  declarations: [
    CrudToolbarComponent,
    SaveOrCancelToolbarComponent,
    FilterBarComponent,
    AcceptRejectButtonsComponent,
    ModalableDirective,
    ModalWindowComponent
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
