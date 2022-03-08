import {ChangeDetectionStrategy, Component, Input, OnInit, Type} from '@angular/core';
import {PropertyView} from "./components/property-view/property-view";

@Component({
  selector: 'app-object-view',
  templateUrl: './object-view.component.html',
  styleUrls: ['./object-view.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ObjectViewComponent extends PropertyView implements OnInit {
  @Input()
  public type: Type<any>;

  @Input()
  public objectState: any = {
    "operator": "AND",
    "expressions": [
      {
        "operator": "AND",
        "ranges": [
          {
            "exclude": false,
            "operator": "LIKE",
            "property": "fullname",
            "value1": "a"
          },
          {
            "exclude": false,
            "operator": "LIKE",
            "property": "fullname",
            "value1": "a"
          }
        ]
      },
      {
        "operator": "AND",
        "ranges": [
          {
            "exclude": false,
            "operator": "LIKE",
            "property": "fullname",
            "value1": "a"
          },
          {
            "exclude": false,
            "operator": "LIKE",
            "property": "fullname",
            "value1": "a"
          }
        ]
      }]
  };

  constructor() {
    super();
  }

  ngOnInit(): void {
  }
}
