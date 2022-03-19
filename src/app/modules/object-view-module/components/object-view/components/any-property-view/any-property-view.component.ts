import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {PropertyView} from "../property-view/property-view";

@Component({
  selector: 'app-any-property-view',
  templateUrl: './any-property-view.component.html',
  styleUrls: ['./any-property-view.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AnyPropertyViewComponent extends PropertyView implements OnInit {
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

}
