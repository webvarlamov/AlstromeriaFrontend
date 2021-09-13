import {Component, OnInit} from '@angular/core';
import {InputComponent, InputComponentConfig, InputComponentValue} from "../input-component/input.component";


@Component({
  selector: 'app-date-time-input',
  templateUrl: './date-time-input.component.html',
  styleUrls: ['./date-time-input.component.css']
})
export class DateTimeInputComponent extends InputComponent<InputComponentConfig<any>, InputComponentValue> implements OnInit {
}
