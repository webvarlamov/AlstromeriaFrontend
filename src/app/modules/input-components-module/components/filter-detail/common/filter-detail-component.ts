import {ObjectViewHolder} from "./object-view-holder";
import {
  BasicFilterExpressionBuilderTypeGraph,
  FilterExpressionBuilderEnumMembersLocalisation,
  FilterExpressionBuilderPropertyLocalisation,
  FilterExpressionBuilderRootObjectTypeName
} from "../config/filter-expression-object-view.config";
import {TypeGraph} from "../../../../object-view-module/components/object-view/model/type.graph";
import {Input} from "@angular/core";
import {FilterExpression} from "../../../../../service/http/model/filter-expression";

export abstract class FilterDetailComponent extends ObjectViewHolder {
  @Input()
  public objectState: FilterExpression = new FilterExpression({
    expressions: []
  });

  @Input()
  public typeGraph: TypeGraph & any = BasicFilterExpressionBuilderTypeGraph;
  @Input()
  public propertyNameLocalisation: any = FilterExpressionBuilderPropertyLocalisation;
  @Input()
  public rootObjectTypeName: string = FilterExpressionBuilderRootObjectTypeName;
  @Input()
  public enumMembersLocalisation: any = FilterExpressionBuilderEnumMembersLocalisation;
}
