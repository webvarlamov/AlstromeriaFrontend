import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {PropertyView} from "../property-view/property-view";
import {KeyValue} from "@angular/common";

@Component({
  selector: 'app-object-property-view',
  templateUrl: './object-property-view.component.html',
  styleUrls: ['./object-property-view.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ObjectPropertyViewComponent extends PropertyView implements OnInit {
  @Input()
  public value: any | KeyValue<unknown, unknown>;
  @Input()
  public key: any;

  ngOnInit(): void {
  }
}
