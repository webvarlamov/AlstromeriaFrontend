import {Component, OnInit} from '@angular/core';
import {InputComponent, InputComponentConfig, InputComponentValue} from "../input-component/input.component";

@Component({
  selector: 'app-period-input',
  templateUrl: './period-input.component.html',
  styleUrls: ['./period-input.component.css']
})
export class PeriodInputComponent extends InputComponent<InputComponentConfig<any>, InputComponentValue> implements OnInit {
}