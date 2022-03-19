import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {PropertyView} from "../property-view/property-view";

@Component({
  selector: 'app-boolean-property-view',
  templateUrl: './boolean-property-view.component.html',
  styleUrls: ['./boolean-property-view.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BooleanPropertyViewComponent extends PropertyView implements OnInit {
  @Input()
  public value: any;
  @Input()
  public key: any;

  public onInputValueChange(value: string): void {
    this.root.onBooleanInputValueChange({
      value: value,
      key: this.key,
      owner: this.owner,
      previousValue: this.value,
      path: this.path as string
    })
  }
}
