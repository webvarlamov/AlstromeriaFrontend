import {RangeOperator} from './range-operator.enum';

export interface RangeInterface {
  exclude: boolean;
  operator: RangeOperator;
  property: string;
  value1?: any;
  value2?: any;
  values?: any[];
}

export class Range {
  exclude: boolean;
  operator: RangeOperator;
  property: string;
  value1?: any;
  value2?: any;
  values?: any[];

  constructor(params: RangeInterface) {
    this.exclude = params.exclude;
    this.operator = params.operator;
    this.property = params.property;
    this.value1 = params.value1;
    this.value2 = params.value2;
    this.values = params.values;
  }
}
