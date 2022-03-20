import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {PropertyView} from "../property-view/property-view";

@Component({
  selector: 'app-number-property-view',
  templateUrl: './number-property-view.component.html',
  styleUrls: ['./number-property-view.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NumberPropertyViewComponent extends PropertyView implements OnInit {
  @Input()
  public value: any;
  @Input()
  public key: any;

  public onInputValueChange(value: string): void {
    this.root.onNumberInputValueChange({
      value: value,
      key: this.key,
      owner: this.owner,
      previousValue: this.value,
      path: this.path as string
    })
  }

  public onDefineValueButtonClick() {
    this.root.onDefineValueButtonClick({
      owner: this.owner,
      path: this.path as string,
      key: this.key,
      type: this.type,
    })
  }
}
