import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PropertyView} from "./components/property-view/property-view";
import 'reflect-metadata';
import {TypeFinderService} from "./type-finder-service";

export interface AddNewObjectToArrayRequest {
  owner: any;
  ownerKey: any;
  path: string;
}

export interface DeleteObjectFromArrayRequest {
  owner: any;
  subject: any;
  ownerKey: any;
  path: string;
}

export interface PrimitiveValueChangeRequest {
  owner: any;
  previousValue: any;
  value: any;
  path: string;
  key: any;
}

export interface TypeGraph extends Object{
}

@Component({
  selector: 'app-object-view',
  templateUrl: './object-view.component.html',
  styleUrls: ['./object-view.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ObjectViewComponent extends PropertyView implements OnInit {
  @Input()
  public objectState: any = {}

  @Output()
  public onAddNewObjectToArrayRequest: EventEmitter<AddNewObjectToArrayRequest> = new EventEmitter<AddNewObjectToArrayRequest>();
  @Output()
  public onDeleteObjectFromArrayRequest: EventEmitter<DeleteObjectFromArrayRequest> = new EventEmitter<DeleteObjectFromArrayRequest>();
  @Output()
  public onPrimitiveValueChangeRequest: EventEmitter<PrimitiveValueChangeRequest> = new EventEmitter<PrimitiveValueChangeRequest>();

  @Input()
  public typeFinderService: TypeFinderService = new TypeFinderService();

  constructor() {
    super();
  }

  public onAddNewObjectToArrayButtonClick(request: AddNewObjectToArrayRequest): void {
    this.onAddNewObjectToArrayRequest.emit(request)
  }

  public onDeleteObjectFromArrayButtonClick(request: DeleteObjectFromArrayRequest): void {
   this.onDeleteObjectFromArrayRequest.emit(request)
  }

  public onBooleanInputValueChange(request: PrimitiveValueChangeRequest): void  {
    this.onPrimitiveValueChangeRequest.emit(request);
  }

  public onNumberInputValueChange(request: PrimitiveValueChangeRequest): void  {
    this.onPrimitiveValueChangeRequest.emit(request);
  }

  public onStringInputValueChange(request: PrimitiveValueChangeRequest): void {
    this.onPrimitiveValueChangeRequest.emit(request);
  }
}
