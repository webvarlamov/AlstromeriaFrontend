import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './components/input-component/input.component';
import { StringInputComponent } from './components/string-input/string-input.component';
import { NumberInputComponent } from './components/number-input/number-input.component';
import { EnumInputComponent } from './components/enum-input/enum-input.component';
import { BooleanInputComponent } from './components/boolean-input/boolean-input.component';
import { DateTimeInputComponent } from './components/date-time-input/date-time-input.component';
import { PeriodInputComponent } from './components/period-input/period-input.component';
import {EntityInputComponent} from "./components/entity-input/entity-input.component";
import {SelectedInputValuesTemplateSupport} from "./components/input-component/suggestions.directive";
import {TableModule} from "../table-module/table.module";
import { ListViewInputComponent } from './components/list-view-input-component/list-view-input-component.directive';



@NgModule({
    declarations: [
        SelectedInputValuesTemplateSupport,
        InputComponent,
        StringInputComponent,
        NumberInputComponent,
        EnumInputComponent,
        BooleanInputComponent,
        DateTimeInputComponent,
        PeriodInputComponent,
        EntityInputComponent,
        ListViewInputComponent
    ],
  exports: [
    InputComponent,
    StringInputComponent,
    NumberInputComponent,
    BooleanInputComponent,
    DateTimeInputComponent,
    EntityInputComponent,
    PeriodInputComponent,
    EnumInputComponent
  ],
  imports: [
    CommonModule,
    TableModule
  ]
})
export class InputComponentsModule { }
