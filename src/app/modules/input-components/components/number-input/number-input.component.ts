import {Component, OnInit} from '@angular/core';
import {InputComponent, InputComponentConfig, InputComponentValue} from "../input-component/input.component";

@Component({
  selector: 'app-number-input',
  templateUrl: './number-input.component.html',
  styleUrls: ['./number-input.component.css']
})
export class NumberInputComponent extends InputComponent<InputComponentConfig<any>, InputComponentValue> implements OnInit {
}
