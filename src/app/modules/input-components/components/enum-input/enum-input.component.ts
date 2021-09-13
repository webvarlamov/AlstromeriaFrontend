import {Component, OnInit} from '@angular/core';
import {InputComponent, InputComponentConfig, InputComponentValue} from "../input-component/input.component";


@Component({
  selector: 'app-enum-input',
  templateUrl: './enum-input.component.html',
  styleUrls: ['./enum-input.component.css']
})
export class EnumInputComponent extends InputComponent<InputComponentConfig<any>, InputComponentValue> implements OnInit {
}
