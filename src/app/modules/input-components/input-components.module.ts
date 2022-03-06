import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StringInputComponent } from './components/string-input/string-input.component';
import { NumberInputComponent } from './components/number-input/number-input.component';
import { EnumInputComponent } from './components/enum-input/enum-input.component';
import { BooleanInputComponent } from './components/boolean-input/boolean-input.component';
import { DateTimeInputComponent } from './components/date-time-input/date-time-input.component';
import { PeriodInputComponent } from './components/period-input/period-input.component';
import { EntityInputComponent } from "./components/entity-input/entity-input.component";
import { TableModule } from "../table-module/table.module";
import { InputSuggestionComponent } from './components/input-suggestion/input-suggestion.component';



@NgModule({
    declarations: [
        StringInputComponent,
        NumberInputComponent,
        EnumInputComponent,
        BooleanInputComponent,
        DateTimeInputComponent,
        PeriodInputComponent,
        EntityInputComponent,
        InputSuggestionComponent
    ],
    exports: [
        StringInputComponent,
        NumberInputComponent,
        BooleanInputComponent,
        DateTimeInputComponent,
        EntityInputComponent,
        PeriodInputComponent,
        EnumInputComponent,
        InputSuggestionComponent
    ],
  imports: [
    CommonModule,
    TableModule
  ]
})
export class InputComponentsModule { }
