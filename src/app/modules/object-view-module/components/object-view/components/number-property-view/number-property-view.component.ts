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

  ngOnInit(): void {
  }

}
