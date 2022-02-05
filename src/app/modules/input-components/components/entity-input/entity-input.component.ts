import {ChangeDetectionStrategy, Component, ElementRef, Injector, OnInit} from '@angular/core';
import {ListViewInputComponent} from "../list-view-input-component/list-view-input-component.directive";

@Component({
  selector: 'app-entity-input',
  templateUrl: "../list-view-input-component/list-view-input-component.directive.html",
  styleUrls: ['./entity-input.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntityInputComponent extends ListViewInputComponent implements OnInit {
  constructor(
    public injector: Injector,
    public elementRef: ElementRef,
  ) {
    super(elementRef);
  }
}
