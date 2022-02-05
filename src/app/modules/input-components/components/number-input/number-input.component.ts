import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ListViewInputComponent} from "../list-view-input-component/list-view-input-component.directive";

@Component({
  selector: 'app-number-input',
  templateUrl: "../list-view-input-component/list-view-input-component.directive.html",
  styleUrls: ['./number-input.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NumberInputComponent extends ListViewInputComponent implements OnInit {
  ngOnInit() {
  }
}
