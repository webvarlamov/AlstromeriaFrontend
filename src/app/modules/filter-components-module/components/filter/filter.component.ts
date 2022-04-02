import {AfterViewInit, Component, ContentChild, OnInit} from '@angular/core';
import {InputComponent} from "../../../input-components-module/components/input-component/input.component";
@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit, AfterViewInit {
  @ContentChild('filterComponentContent') inputComponent!: InputComponent<any, any>;

  constructor() { }

  public ngOnInit(): void {
  }

  public ngAfterViewInit(): void  {
  }
}
