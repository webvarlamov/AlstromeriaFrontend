import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {InputComponent,} from "../input-component/input.component";
import {InputSuggestionEvent, InputSuggestionEventType} from "../input-component/suggestions.directive";

@Component({
  selector: 'app-string-input',
  templateUrl: "../list-view-input-component/list-view-input-component.directive.html",
  styleUrls: ['./string-input.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StringInputComponent extends InputComponent<any, any> implements OnInit {
  public inputPlaceholder: string = 'Введите значение';

  onInputSuggestionEvent(event: InputSuggestionEvent): void {
    if (event.type === InputSuggestionEventType.ROW_CLICK) {

    }
  }
}
