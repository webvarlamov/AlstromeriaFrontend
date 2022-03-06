import {Directive, ElementRef, HostListener} from "@angular/core";

@Directive({
  selector: 'SuggestionOwner'
})
export abstract class SuggestionOwner {
  public showSuggestions: boolean = false;
  public showSelectedPopover: boolean = false;

  constructor(
    public elementRef: ElementRef
  ) {
  }

  @HostListener('document:click', ['$event.target'])
  public onClick(target: HTMLElement): void {
    if (!this.elementRef.nativeElement.contains(target)) {
      this.showSuggestions = false;
      this.showSelectedPopover = false;
    }
  }

  public onInputClick(input: HTMLInputElement) {
    this.showSuggestions = true
  }

  public abstract onInputSuggestionEvent(event: SuggestionEvent): void;
}

export class SuggestionEvent {

}
