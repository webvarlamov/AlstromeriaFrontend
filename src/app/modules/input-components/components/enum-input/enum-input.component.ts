import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ListViewInputComponent} from "../list-view-input-component/list-view-input-component.directive";


@Component({
  selector: 'app-enum-input',
  templateUrl: "../list-view-input-component/list-view-input-component.directive.html",
  styleUrls: ['./enum-input.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EnumInputComponent extends ListViewInputComponent implements OnInit {
}
