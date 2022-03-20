import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PropertyView} from "./components/property-view/property-view";
import 'reflect-metadata';
import {TypeFinderService} from "./type-finder-service";

export enum ObjectStateChangeRequestType {
  AddNewElementToArrayRequest = "AddNewElementToArrayRequest",
  DeleteElementFromArrayRequest = "DeleteElementFromArrayRequest",
  PrimitiveValueChangeRequest = "PrimitiveValueChangeRequest",
  DefineValueRequest = "DefineValueRequest",
}

export interface ObjectStateChangeRequest {
  requestType: ObjectStateChangeRequestType,
  payload: AddNewElementToArrayRequest
    | DeleteElementFromArrayRequest
    | PrimitiveValueChangeRequest
    | DefineValueRequest
}

export interface DefineValueRequest {
  owner: any;
  path: string;
  key: any;
  type: string;
}

export interface AddNewElementToArrayRequest {
  owner: any;
  ownerKey: any;
  path: string;
  subjectType: string;
  subjectOwnerType: string;
}

export interface DeleteElementFromArrayRequest {
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

export interface TypeGraph extends Object {
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
  public onObjectStateChangeRequest: EventEmitter<ObjectStateChangeRequest> = new EventEmitter<ObjectStateChangeRequest>();

  @Input()
  public typeFinderService: TypeFinderService = new TypeFinderService();

  constructor() {
    super();
  }

  public onAddNewElementToArrayButtonClick(request: AddNewElementToArrayRequest): void {
    this.onObjectStateChangeRequest.emit({
      requestType: ObjectStateChangeRequestType.AddNewElementToArrayRequest,
      payload: request
    })
  }

  public onDeleteObjectFromArrayButtonClick(request: DeleteElementFromArrayRequest): void {
    this.onObjectStateChangeRequest.emit({
      requestType: ObjectStateChangeRequestType.DeleteElementFromArrayRequest,
      payload: request
    })
  }

  public onBooleanInputValueChange(request: PrimitiveValueChangeRequest): void {
    this.onObjectStateChangeRequest.emit({
      requestType: ObjectStateChangeRequestType.PrimitiveValueChangeRequest,
      payload: request
    })
  }

  public onNumberInputValueChange(request: PrimitiveValueChangeRequest): void {
    this.onObjectStateChangeRequest.emit({
      requestType: ObjectStateChangeRequestType.PrimitiveValueChangeRequest,
      payload: request
    })
  }

  public onStringInputValueChange(request: PrimitiveValueChangeRequest): void {
    this.onObjectStateChangeRequest.emit({
      requestType: ObjectStateChangeRequestType.PrimitiveValueChangeRequest,
      payload: request
    })
  }

  public onDefineValueButtonClick(request: DefineValueRequest): void {
    this.onObjectStateChangeRequest.emit({
      requestType: ObjectStateChangeRequestType.DefineValueRequest,
      payload: request
    })
  }
}
