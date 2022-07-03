import {ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output} from '@angular/core';
import {TypeGraph} from "../../../../object-view-module/components/object-view/model/type.graph";
import {StringFilterComponentRangeOperatorType} from "../../../../filter-components-module/models/filter-component-value";
import {BasicFilterExpressionBuilderTypeGraph} from "../config/filter-expression-object-view.config";
import {FilterDetailComponent} from "../common/filter-detail-component";

@Component({
  selector: 'app-string-filter-details',
  templateUrl: '../common/filter-details.component.html',
  styleUrls: ['./string-filter-details.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StringFilterDetailsComponent extends FilterDetailComponent implements OnInit {

  public ngOnInit(): void {
    console.log(this.filterDetailState)
  }

  public typeGraph: TypeGraph & any = {
    ...BasicFilterExpressionBuilderTypeGraph,
    "RangeOperator": StringFilterComponentRangeOperatorType,
    "Range": Object.assign({},
      BasicFilterExpressionBuilderTypeGraph.Range,
      {
        value1: "string",
        value2: "string",
        values: "Array<string>",
      }
    )
  };
}
