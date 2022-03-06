import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {InputComponent, InputComponentConfig, InputComponentValue} from "../input-component/input.component";
import {SuggestionEvent} from "../input-component/suggestions.directive";

@Component({
  selector: 'app-period-input',
  templateUrl: './period-input.component.html',
  styleUrls: ['./period-input.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PeriodInputComponent extends InputComponent<InputComponentConfig<any>, InputComponentValue> implements OnInit {
  onInputSuggestionEvent(event: SuggestionEvent): void {
  }
}
