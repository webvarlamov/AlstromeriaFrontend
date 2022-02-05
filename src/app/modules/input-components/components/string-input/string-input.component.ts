import {ChangeDetectionStrategy, Component, ElementRef, Injector, OnInit} from '@angular/core';
import {
  InputComponent,
  InputComponentConfig,
  StringInputComponentValue
} from "../input-component/input.component";
import {TableComponent} from "../../../table-module/table/table.component";
import {
  ToFilterExpressionTransformatorService
} from "../../../../service/transformation/service/to-filter-expression-transformator.service";
import {ListViewEntityPropertyStateManager} from "../../../../view/view/state/list-view-state.manager";
import {config} from "rxjs";
import {PageNumberChangeRequest} from "../../../table-module/table/models/changeRequest/pageNumberChangeRequest";
import {SelectionChangeRequest} from "../../../table-module/table/models/changeRequest/selectionChangeRequest";
import {ListViewTableAsyncState} from "../../../../view/view/state2/list-view-table-async-state";
import {
  RemoteEntityListViewTableAsyncStateManager
} from "../../../../view/view/state2/remote-entity-list-view-table-async-state-manager";
import {TableSelectionConfig} from "../../../table-module/table/models/config/tableSelectionConfig";
import {SelectionMode} from "../../../table-module/table/models/config/selectionMode";
import {PlanRepository} from "../../../../repository/plan-repository.service";
import {
  ColumnPositionChangeRequest
} from "../../../table-module/table/models/changeRequest/column-position-change.request";
import {ColumnSizeChangeRequest} from "../../../table-module/table/components/cell-resize/cell-resize.component";
import {SortChangeRequest} from "../../../table-module/table/models/changeRequest/sort-change-request";
import {PageSizeChangeRequest} from "../../../table-module/table/models/changeRequest/pageSizeChangeRequest";
import {ListViewInputComponent} from "../list-view-input-component/list-view-input-component.directive";

@Component({
  selector: 'app-string-input',
  templateUrl: "../list-view-input-component/list-view-input-component.directive.html",
  styleUrls: ['./string-input.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StringInputComponent extends ListViewInputComponent implements OnInit {
  constructor(
    public injector: Injector,
    public elementRef: ElementRef,
  ) {
    super(elementRef);
  }
}
