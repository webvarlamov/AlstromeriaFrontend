import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from "./table/table.component";
import { CellResizeComponent } from './table/components/cell-resize/cell-resize.component';
import { CollDraggerComponent } from './table/components/coll-dragger/coll-dragger.component';
import { ColumnControlsComponent } from './table/components/column-controlls/column-controls.component';
import { NullValueCellDisplayComponent } from './table/cell-template-components/null-value-cell-display/null-value-cell-display.component';
import { CellTemplateResolverComponent } from './table/components/cell-template-resolver/cell-template-resolver.component';

@NgModule({
  declarations: [
    TableComponent,
    CellResizeComponent,
    CollDraggerComponent,
    ColumnControlsComponent,
    NullValueCellDisplayComponent,
    CellTemplateResolverComponent,
  ],
  exports: [
    TableComponent
  ],
  imports: [
    CommonModule
  ],
  providers: []
})
export class TableModule { }
