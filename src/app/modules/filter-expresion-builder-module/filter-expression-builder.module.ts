import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterExpressionBuilderComponent } from './components/filter-expression-builder/filter-expression-builder.component';
import { FilterExpressionComponent } from './components/filter-expression/filter-expression.component';
import { FilterExpressionOperatorComponent } from './components/filter-expression-operator/filter-expression-operator.component';
import { AppFilterExpressionRangeComponent } from './components/filter-expression-range/app-filter-expression-range.component';
import {FieldsetModuleModule} from "../fieldset-components-module/fieldset-module.module";
import {ObjectViewModule} from "../object-view-module/object-view.module";



@NgModule({
  declarations: [
    FilterExpressionBuilderComponent,
    FilterExpressionComponent,
    FilterExpressionOperatorComponent,
    AppFilterExpressionRangeComponent
  ],
  exports: [
    FilterExpressionBuilderComponent
  ],
    imports: [
        CommonModule,
        FieldsetModuleModule,
        ObjectViewModule
    ]
})
export class FilterExpressionBuilderModule { }
