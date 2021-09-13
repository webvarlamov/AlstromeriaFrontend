import {Component, ElementRef, OnInit} from '@angular/core';
import {
  InputComponent,
  InputComponentConfig,
  InputComponentValue,
  StringInputComponentValue
} from "../input-component/input.component";
import {BehaviorSubject, pipe, Subject} from "rxjs";
import {map, switchMap} from "rxjs/operators";

@Component({
  selector: 'app-string-input',
  templateUrl: './string-input.component.html',
  styleUrls: ['./string-input.component.css']
})
export class StringInputComponent extends InputComponent<InputComponentConfig<string>, StringInputComponentValue> implements OnInit {


  // inputValue$: Subject<string> = new Subject<string>();
  // // suggestionList$ = this.inputValue$.pipe(
  // //   switchMap(searchValue => {
  // //     return this.config.suggestionConfig.dataAccessService.loadSuggestions(
  // //       this.config.suggestionConfig.domainType,
  // //       searchValue,
  // //       this.config.suggestionConfig.searchAttributeKey
  // //     )
  // //   })
  // // )
  //
  // get getValue(): string {
  //   return this.value.data;
  // }
  //
  // public onInput(inputValue: string) {
  //   this.inputValue$.next(inputValue);
  //   // this.changeInputComponentDataRequest({
  //   //   attributeKey: this.config.attributeKey,
  //   //   config: {...this.config},
  //   //   value:  {...this.value, data: inputValue}
  //   // })
  // }
  //
  // constructor(
  //   public elementRef: ElementRef
  // ) {
  //   super(elementRef);
  //   // this.suggestionList$.subscribe(console.log)
  // }
}
