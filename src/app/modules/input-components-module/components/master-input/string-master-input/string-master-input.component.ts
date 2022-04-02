import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FilterExpression} from "../../../../../service/http/model/filter-expression";
import {TypeGraph} from "../../../../object-view-module/components/object-view/model/type.graph";
import {
  ObjectStateChangeRequest
} from "../../../../object-view-module/components/object-view/model/object-state-change.request";
import {
  CommonRequestImpl,
  RequestPurpose
} from "../../../../object-view-module/components/object-view/model/common.request";
import {RequestType} from "../../../../object-view-module/components/object-view/model/request.type";

@Component({
  selector: 'app-string-master-input',
  templateUrl: './string-master-input.component.html',
  styleUrls: ['./string-master-input.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StringMasterInputComponent implements OnInit {

  public objectState: FilterExpression = new FilterExpression({
    expressions: []
  })

  public typeGraph: TypeGraph & any = {
    "FilterExpression": {
      operator: "Enum<FilterExpressionOperator>",
      expressions: "Array<FilterExpression>",
      ranges: "Array<Range>",
    },
    "FilterExpressionOperator": {
      AND: 'AND',
      OR: 'OR'
    },
    "Range": {
      exclude: "boolean",
      operator: "Enum<RangeOperator>",
      property: "string",
      value1: "string",
      value2: "string",
      values: "Array<string>",
    },
    "RangeOperator": {
      EQ: 'EQ',
      NE: 'NE',
      LE: 'LE',
      GE: 'GE',
      LT: 'LT',
      GT: 'GT',
      IN: 'IN',
      BT: 'BT',
      LIKE: 'LIKE',
      ISMEMBER: 'ISMEMBER',
      STARTWITH: 'STARTWITH',
      ENDWITH: 'ENDWITH'
    }
  };

  public propertyNameLocalisation: any = {
    expressions: "Выражения",
    ranges: "Ограничения",
    operator: "Оператор",
    value1: "Значение 1",
    value2: "Значение 2",
    values: "Значения",
    exclude: "Исключено",
    property: "Свойство"
  }

  public rootObjectTypeName: string = "FilterExpression";

  public enumMembersLocalisation: any = {
    "RangeOperator": {
      EQ: 'Равно',
      NE: 'Не равно',
      LE: 'Меньше либо равно',
      GE: 'Больше либо равно',
      LT: 'Меньше',
      GT: 'Больще',
      IN: 'Входит в значения',
      BT: 'Между',
      LIKE: 'Похож',
      ISMEMBER: 'Является элементом',
      STARTWITH: 'Начинается с',
      ENDWITH: 'Кончается на'
    },
    "FilterExpressionOperator": {
      AND: 'И',
      OR: 'Или'
    }
  };

  public constructor() {
  }

  public ngOnInit(): void {
  }

  public onObjectStateChangeRequestEvent($event: ObjectStateChangeRequest) {
    const payload:CommonRequestImpl = $event.payload;

    if (payload.requestPurpose === RequestPurpose.DEFINE) {
      this.onObjectStateDefineRequest($event)
    } else if (payload.requestPurpose === RequestPurpose.DELETE) {
      this.onObjectStateDeleteRequest($event)
    } else if (payload.requestPurpose === RequestPurpose.CHANGE) {
      this.onObjectStateChangeRequest($event)
    }
  }

  public onObjectStateDefineRequest($event: ObjectStateChangeRequest): void {
   let payload = $event.payload;
   let typeFinderService = $event.typeFinderService;

   if (typeFinderService.isArray(payload.subject.valueType)) {
     payload.owner.currentValue[payload.metaInf.key] = [];
   } else if (typeFinderService.isObject(payload.subject.valueType, this.typeGraph)) {
     payload.owner.currentValue[payload.metaInf.key] = {};
   } else if(typeFinderService.isString(payload.subject.valueType)) {
     payload.owner.currentValue[payload.metaInf.key] = '';
   } else if(typeFinderService.isNumber(payload.subject.valueType)) {
     payload.owner.currentValue[payload.metaInf.key] = 100;
   }
  }

  public onObjectStateDeleteRequest($event: ObjectStateChangeRequest): void {
    let payload = $event.payload;
    let typeFinderService = $event.typeFinderService;

    if (typeFinderService.isObject(payload.owner.valueType, this.typeGraph)) {
      delete payload.owner.currentValue[payload.metaInf.key];
    }

    if (typeFinderService.isArray(payload.owner.valueType)) {
      (payload.owner.currentValue as Array<any>)
        .splice(payload.metaInf.key, 1)
    }
  }

  public onObjectStateChangeRequest($event: ObjectStateChangeRequest): void {
    let payload = $event.payload;
    let typeFinderService = $event.typeFinderService;

    if (payload.requestType == RequestType.DELETE_ALL_ARRAY_ITEMS) {
      if (payload.owner.currentValue[payload.metaInf.key] != null) {
        payload.owner.currentValue[payload.metaInf.key] = [];
      }
    }

    if (payload.requestType == RequestType.ADD_ARRAY_ITEM) {
      if (typeFinderService.isArray(payload.subject.valueType)) {
        (payload.owner.currentValue as Array<any>).push([]);
      } else if (typeFinderService.isObject(payload.subject.valueType, this.typeGraph)) {
        (payload.owner.currentValue as Array<any>).push({});
      } else if (typeFinderService.isEnum(payload.subject.valueType)) {
        (payload.owner.currentValue as Array<any>).push(undefined);
      } else {
        (payload.owner.currentValue as Array<any>).push(undefined);
      }
    }

    if (payload.requestType == RequestType.CHANGE_OBJECT_PROPERTY_VALUE) {
      payload.owner.currentValue[payload.metaInf.key] = payload.subject.nextValue;
    }

    if (payload.requestType == RequestType.CHANGE_ARRAY_ITEM_VALUE) {
      payload.owner.currentValue[payload.metaInf.key] = payload.subject.nextValue;
    }
  }
}
