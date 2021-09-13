import {Component, OnInit} from '@angular/core';
import {InputComponent, InputComponentConfig, InputComponentValue} from "../input-component/input.component";

@Component({
  selector: 'app-entity-input',
  templateUrl: './entity-input.component.html',
  styleUrls: ['./entity-input.component.css']
})
export class EntityInputComponent extends InputComponent<InputComponentConfig<any>, InputComponentValue> implements OnInit {

}
