import {Component, Injector, OnInit} from '@angular/core';
import {ListViewComponent} from "../../../view/component/list-view/list-view.component";
import {InputComponentValueChangeRequest} from "../../../../modules/input-components/components/input-component/input.component";
import {DataAccessService} from "../../../../service/http/service/data-access-service.service";

@Component({
  selector: 'app-plan-list-view',
  templateUrl: './plan-list-view.component.html',
  styleUrls: ['./plan-list-view.component.css'],
})
export class PlanListViewComponent extends ListViewComponent<any> implements OnInit {

  onFilterBarValueChangeRequest(changeRequest: InputComponentValueChangeRequest) {

  }


  constructor(
    public dataAccessService: DataAccessService,
    public injector: Injector
  ) {
    super(injector);
  }
}
