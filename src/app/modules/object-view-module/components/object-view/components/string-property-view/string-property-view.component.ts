import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {PropertyView} from "../property-view/property-view";

@Component({
  selector: 'app-string-property-view',
  templateUrl: './string-property-view.component.html',
  styleUrls: ['./string-property-view.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StringPropertyViewComponent extends PropertyView implements OnInit {
  @Input()
  public value: any;
  @Input()
  public key: any;

  public onInputValueChange(value: string): void {
    this.root.onStringInputValueChange({
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
