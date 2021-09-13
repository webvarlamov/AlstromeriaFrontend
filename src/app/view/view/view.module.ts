import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListViewComponent } from './component/list-view/list-view.component';
import { DetailViewComponent } from './component/detail-view/detail-view.component';



// @ts-ignore
@NgModule({
  declarations: [
    ListViewComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ViewModule { }
