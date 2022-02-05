import {Directive, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SelectedInputValuesTemplateSupport} from "./suggestions.directive";
import {HasId, Pageable} from "../../../../service/http/model/pageable";
import {FilterExpression} from "../../../../service/http/model/filter-expression";
import {Observable} from "rxjs";
import {ListViewState} from "../../../../view/view/state/list-view.state";
import {DataAccessServiceImpl} from "../../../../service/http/service/data-access-service.service";
import {ListViewStateManager} from "../../../../view/view/state/list-view-state.manager";


export enum InputComponentType {
  BOOLEAN = 'boolean',
  BOOLEAN_LIST = 'boolean-list',
  DATETIME = 'date-time',
  DATETIME_LIST = 'date-time-list',
  ENTITY = 'entity',
  ENTITY_LIST = 'entity-list',
  ENUM = 'enum',
  ENUM_LIST = 'enum-list',
  NUMBER = 'number',
  NUMBER_LIST = 'number-list',
  STRING = 'string',
  STRING_LIST = 'string-list',
  PERIOD = 'period'
}


export interface InputComponentValueChangeRequest {
  attributeKey: string;
  value: InputComponentValue;
  config: InputComponentConfig<any>;
}

export interface InputComponentData {
  attributeKey: string;
  config: InputComponentConfig<any>;
  value: InputComponentValue;
}

export abstract class InputComponentValue {
  value: any = null;
  type: InputComponentType;

  abstract get(): any;

  constructor(value: any) {
    this.value = value;
  }
}

export class BooleanInputComponentValue extends InputComponentValue {
  get(): boolean {
    return this.value;
  }

  constructor(value: boolean) {
    super(value);
    this.type = InputComponentType.BOOLEAN;
  }
}

export class BooleanListInputComponentValue extends InputComponentValue {
  get(): Array<boolean> {
    return this.value
  }

  constructor(value: Array<boolean>) {
    super(value);
    this.type = InputComponentType.BOOLEAN_LIST;
  }
}

export class DateTimeInputComponentValue extends InputComponentValue {
  get(): Date {
    return this.value
  }

  constructor(value: Date) {
    super(value);
    this.type = InputComponentType.DATETIME;
  }
}

export class DateTimeListInputComponentValue extends InputComponentValue {
  get(): Array<Date> {
    return this.value
  }

  constructor(value: Array<Date>) {
    super(value);
    this.type = InputComponentType.DATETIME_LIST;
  }
}

export class PeriodInputComponentValue extends InputComponentValue {
  get(): { startDate: Date, endDate: Date } {
    return this.value;
  }

  constructor(value: { startDate: Date, endDate: Date }) {
    super(value);
    this.type = InputComponentType.PERIOD;
  }
}

export class EntityInputComponentValue extends InputComponentValue {
  get(): HasId {
    return this.value
  }

  constructor(value: HasId) {
    super(value);
    this.type = InputComponentType.ENTITY;
  }
}

export class EntityListInputComponentValue extends InputComponentValue {
  get(): Array<HasId> {
    return this.value
  }

  constructor(value: Array<HasId>) {
    super(value);
    this.type = InputComponentType.ENTITY_LIST;
  }
}

export class EnumInputComponentValue extends InputComponentValue {
  get(): HasId {
    return this.value
  }

  constructor(value: HasId) {
    super(value);
    this.type = InputComponentType.ENUM;
  }
}

export class EnumListInputComponentValue extends InputComponentValue {
  get(): Array<HasId> {
    return this.value
  }

  constructor(value: Array<HasId>) {
    super(value);
    this.type = InputComponentType.ENUM_LIST;
  }
}

export class NumberInputComponentValue extends InputComponentValue {
  get(): number {
    return this.value
  }

  constructor(value: number) {
    super(value);
    this.type = InputComponentType.NUMBER;
  }
}

export class NumberListInputComponentValue extends InputComponentValue {
  get(): Array<number> {
    return this.value
  }

  constructor(value: Array<number>) {
    super(value);
    this.type = InputComponentType.NUMBER_LIST;
  }
}

export class StringInputComponentValue extends InputComponentValue {
  get(): string {
    return this.value
  }

  constructor(value: string) {
    super(value);
    this.type = InputComponentType.STRING;
  }
}

export class StringListInputComponentValue extends InputComponentValue {
  get(): Array<string> {
    return this.value
  }

  constructor(value: Array<string>) {
    super(value);
    this.type = InputComponentType.STRING_LIST;
  }
}

export interface InputConfigInterface {
  attributeKey: string;
  caption: string;
  componentType: InputComponentType
  suggestionsConfig?: InputComponentSuggestionsConfigInterface
}

export class InputComponentConfig<T> implements InputConfigInterface {
  attributeKey: string;
  caption: string;
  componentType: InputComponentType;
  suggestionsConfig: InputComponentSuggestionsConfigInterface;

  constructor(initial: InputConfigInterface) {
    this.attributeKey = initial?.attributeKey;
    this.caption = initial?.caption;
    this.componentType = initial?.componentType
    this.suggestionsConfig = initial.suggestionsConfig;
  }
}

export interface InputComponentSuggestionsConfigInterface {
  suggestionsUrl?: string;
  suggestionsByProperty: string;
  suggestionsListViewState: ListViewState;
  suggestionsListViewStateManager: ListViewStateManager;
  suggestionsDataAccessService: DataAccessServiceImpl;
}

@Directive({
  selector: 'app-input-component-directive'
})
export class InputComponent
  <C extends InputComponentConfig<any>, V extends InputComponentValue>
  extends SelectedInputValuesTemplateSupport implements OnInit {

  @Input() config: C;
  @Input() value: V;

  @Output()
  public onInputComponentValueChangeRequest: EventEmitter<InputComponentValueChangeRequest> = new EventEmitter();

  ngOnInit(): void {
  }
}
