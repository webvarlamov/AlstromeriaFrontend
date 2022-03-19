import { Range } from './range';

export class FilterExpression {
  public operator: FilterExpressionOperator;
  public expressions?: FilterExpression[];
  public ranges?: Range[];

  constructor(params: FilterExpressionInterface) {
    this.operator = params.operator;
    this.expressions = params.expressions;
    this.ranges = params.ranges;
  }

  public static empty(): FilterExpression {
    return new FilterExpression({
      operator: FilterExpressionOperator.AND,
      expressions: [],
      ranges: []
    })
  }
}

export interface FilterExpressionInterface {
  operator: FilterExpressionOperator;
  expressions?: FilterExpression[];
  ranges?: Range[];
}

export enum FilterExpressionOperator {
  AND = 'AND', OR = 'OR'
}
