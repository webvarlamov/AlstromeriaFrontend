import {Component, OnInit} from '@angular/core';
import {InputComponent, InputComponentConfig, InputComponentValue} from "../input-component/input.component";

@Component({
  selector: 'app-boolean-input',
  templateUrl: './boolean-input.component.html',
  styleUrls: ['./boolean-input.component.css']
})
export class BooleanInputComponent extends InputComponent<InputComponentConfig<any>, InputComponentValue> implements OnInit {
}
