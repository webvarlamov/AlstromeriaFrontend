import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {PropertyView} from "../property-view/property-view";
import {KeyValue} from "@angular/common";
import {BehaviorSubject, fromEvent, merge, of} from "rxjs";
import {delay, switchMap, take, tap} from "rxjs/operators";

@Component({
  selector: 'app-object-property-view',
  templateUrl: './object-property-view.component.html',
  styleUrls: ['./object-property-view.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ObjectPropertyViewComponent extends PropertyView implements OnInit {
  @Input()
  public value: any | KeyValue<unknown, unknown>;
  @Input()
  public key: any;

  public showControlsContextMenu$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)

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
}
