import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PlanListViewComponent} from './component/plan-list-view/plan-list-view.component';
import { PlanDetailViewComponent } from './component/plan-detail-view/plan-detail-view.component';
import {RouterModule} from "@angular/router";
import {CommonComponentsModule} from "../../modules/common-components/common-components.module";
import {InputComponentsModule} from "../../modules/input-components/input-components.module";
import {TableModule} from "../../modules/table-module/table.module";


@NgModule({
    declarations: [
        PlanListViewComponent,
        PlanDetailViewComponent
    ],
    exports: [
        PlanListViewComponent
    ],
  imports: [
    RouterModule.forChild([
      {path: '', component: PlanListViewComponent}
    ]),
    CommonModule,
    CommonComponentsModule,
    InputComponentsModule,
    TableModule,
  ]
})
export class PlanViewModule { }
