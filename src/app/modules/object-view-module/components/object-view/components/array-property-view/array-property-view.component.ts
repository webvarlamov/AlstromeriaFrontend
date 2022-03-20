import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {PropertyView} from "../property-view/property-view";
import {BehaviorSubject, fromEvent, merge, of} from "rxjs";
import {delay, switchMap, take, tap} from "rxjs/operators";

@Component({
  selector: 'app-array-property-view',
  templateUrl: './array-property-view.component.html',
  styleUrls: ['./array-property-view.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArrayPropertyViewComponent extends PropertyView implements OnInit {
  @Input()
  public value: any | Array<unknown>;
  @Input()
  public key: any;

  public showControlsContextMenu$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public onAddNewElementToArrayButtonClick(): void {
    this.root.onAddNewElementToArrayButtonClick({
      owner: this.value,
      ownerKey: this.key,
      path: this.path as string,
      subjectType: this.typeFinderService.getArrayElementType(this.type),
      subjectOwnerType: this.type,
    })
  }

  public onDeleteObjectFromArrayButtonClick(arrayItem: any): void {
    this.root.onDeleteObjectFromArrayButtonClick({
      owner: this.value,
      ownerKey: this.key,
      subject: arrayItem,
      path: this.path as string
    });
  }

  public onUserContextMenuCall($event: MouseEvent) {
    of([]).pipe(
      delay(10),
      tap(() => this.showControlsContextMenu$.next(true)),
      switchMap(() => merge(
        fromEvent(document, 'contextmenu').pipe(take(1)),
        fromEvent(document, 'click').pipe(take(1)),
      )),
      tap(() => this.showControlsContextMenu$.next(false)),
    ).toPromise().then();
    return false;
  }

  public onDefineValueButtonClick(): void {
    this.root.onDefineValueButtonClick({
      owner: this.owner,
      path: this.path as string,
      key: this.key,
      type: this.type
    })
  }
}
