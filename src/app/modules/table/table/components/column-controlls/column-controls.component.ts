import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TableColumn} from "../../table.component";
import {ColumnPositionChangeRequest} from "../coll-dragger/coll-dragger.component";

export enum ColumnMoveDirection {
  LEFT = -1, RIGHT = 1
}

@Component({
  selector: 'app-column-controls',
  templateUrl: './column-controls.component.html',
  styleUrls: ['./column-controls.component.css']
})
export class ColumnControlsComponent implements OnInit {
  @Output()
  public onColumnPositionChangeRequest: EventEmitter<ColumnPositionChangeRequest> = new EventEmitter();
  @Input()
  public column: TableColumn;

  constructor() { }

  ngOnInit(): void {
  }

  public onSortAscClick() {

  }

  public onSortDescClick() {

  }

  public onColumnPositionChange($event: ColumnPositionChangeRequest) {
    this.onColumnPositionChangeRequest.emit($event)
  }
}
