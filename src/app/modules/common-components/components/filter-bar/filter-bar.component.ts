import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {
  InputComponentValueChangeRequest,
  InputComponentData
} from "../../../input-components/components/input-component/input.component";
import {FilterValuesByAttributeKey} from "../../../../view/view/component/list-view/filter-values-by-attribute.key";
import {FilterComponentConfig} from "../../../../view/view/component/list-view/filter-component.config";
import {FilterConfigByAttributeKey} from "../../../../view/view/component/list-view/filter-config-by-attribute.key";

export interface FilterComponentsDataDict {
  [attributeKey: string]: InputComponentData
}

export class FilterBarComponentConfig {

}

@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.css']
})
export class FilterBarComponent implements OnInit {
  @Input()
  public filterValuesByAttributeKey: FilterValuesByAttributeKey
  @Input()
  public filterConfigByAttributeKey: FilterConfigByAttributeKey
  @Input()
  public filterBarComponentConfig: FilterBarComponentConfig


  @Input()
  public filterComponentsInputData: FilterComponentsDataDict = {};
  @Output()
  public onFilterValueChangeRequest: EventEmitter<InputComponentValueChangeRequest> = new EventEmitter();

  public trackByAttributeKey(index: number, item: { key: string, value: FilterComponentConfig<any>}): string {
    return item.key;
  }

  constructor() {
  }

  ngOnInit(): void {
  }

}
