import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {InputComponent} from "../input-component/input.component";
import {SuggestionEvent} from "../input-component/suggestions.directive";

@Component({
  selector: 'app-boolean-input',
  templateUrl: "../list-view-input-component/list-view-input-component.directive.html",
  styleUrls: ['./boolean-input.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BooleanInputComponent extends InputComponent<any, any> implements OnInit {
  onInputSuggestionEvent(event: SuggestionEvent): void {
  }
}
