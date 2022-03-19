import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FilterExpression, FilterExpressionOperator} from "../../../../../service/http/model/filter-expression";
import {Range} from "../../../../../service/http/model/range";
import {RangeOperator} from "../../../../../service/http/model/range-operator.enum";
import {
  AddNewObjectToArrayRequest,
  DeleteObjectFromArrayRequest, PrimitiveValueChangeRequest, TypeGraph
} from "../../../../object-view-module/components/object-view/object-view.component";

@Component({
  selector: 'app-string-master-input',
  templateUrl: './string-master-input.component.html',
  styleUrls: ['./string-master-input.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StringMasterInputComponent implements OnInit {

  public objectState: FilterExpression = new FilterExpression({
    operator: FilterExpressionOperator.AND,
    ranges: undefined,
    expressions: [
      new FilterExpression({
        operator: FilterExpressionOperator.AND,
        ranges: [
          new Range({
            property: "property",
            operator: RangeOperator.IN,
            values: ["123", "gfds", "Arra"]
          })
        ],
        expressions: [
          new FilterExpression({
            operator: FilterExpressionOperator.AND,
            ranges: [
              new Range({
                property: "property",
                operator: RangeOperator.IN,
                values: ["123", "gfds", "Arra"]
              })
            ],
            expressions: []

          })
        ]

      })
    ]
  })

  public entityGraph: TypeGraph & any = {
    "FilterExpression": {
      operator: "Enum<FilterExpressionOperator>",
      expressions: "Array<FilterExpression>",
      ranges: "Array<Range>"
    },
    "FilterExpressionOperator": {
      AND: 'AND',
      OR: 'OR'
    },
    "Range": {
      exclude: "boolean",
      operator: "Enum<RangeOperator>",
      property: "string",
      value1: "any",
      value2: "any",
      values: "Array<any>",
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

  public onAddNewObjectToArrayRequest($event: AddNewObjectToArrayRequest): void {
    console.log($event)
  }

  public onDeleteObjectFromArrayRequest($event: DeleteObjectFromArrayRequest): void {
    console.log($event)
  }

  public onPrimitiveValueChangeRequest($event: PrimitiveValueChangeRequest) {
    console.log($event)
  }
}
