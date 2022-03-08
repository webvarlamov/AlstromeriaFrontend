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

  ngOnInit(): void {
  }

}
