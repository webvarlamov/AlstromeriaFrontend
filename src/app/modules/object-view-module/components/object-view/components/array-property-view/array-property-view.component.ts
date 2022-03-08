import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {PropertyView} from "../property-view/property-view";

@Component({
  selector: 'app-array-property-view',
  templateUrl: './array-property-view.component.html',
  styleUrls: ['./array-property-view.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArrayPropertyViewComponent extends PropertyView implements OnInit {
  @Input()
  public value: any | Array<unknown>;
  @Input()
  public key: any;

  ngOnInit(): void {
  }

}
