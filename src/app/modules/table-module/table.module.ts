import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from "./table/table.component";
import { CellResizeComponent } from './table/components/cell-resize/cell-resize.component';
import { CollDraggerComponent } from './table/components/coll-dragger/coll-dragger.component';
import { ColumnControlsComponent } from './table/components/column-controlls/column-controls.component';

@NgModule({
  declarations: [
    TableComponent,
    CellResizeComponent,
    CollDraggerComponent,
    ColumnControlsComponent,
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
