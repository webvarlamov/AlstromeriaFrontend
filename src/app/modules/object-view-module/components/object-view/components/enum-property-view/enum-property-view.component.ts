import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {PropertyView} from "../property-view/property-view";

@Component({
  selector: 'app-enum-property-view',
  templateUrl: './enum-property-view.component.html',
  styleUrls: ['./enum-property-view.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EnumPropertyViewComponent extends PropertyView implements OnInit {
  @Input()
  public value: any;
  @Input()
  public key: any;

  ngOnInit(): void {
  }

  public onInputValueChange(value: string): void {

  }

  public getEnumMembers(): Array<{label: string, value: string}> {
    let enumMemberType = this.typeFinderService.getEnumMemberType(this.type);
    let typeGraphElement = this.typeGraph[enumMemberType];
    if (typeGraphElement != null) {
      const pairArray = Object.entries(typeGraphElement).map(entry => {
        return {
          label: this.enumMembersLocalisation[enumMemberType][entry[0]],
          value: entry[0]
        }
      });
      return pairArray;
    } else {
      return []
    }
  }
}
