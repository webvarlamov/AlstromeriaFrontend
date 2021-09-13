import {Directive, ElementRef, HostListener, OnInit} from "@angular/core";

@Directive({
  selector: 'Suggestion'
})
export class SelectedInputValuesTemplateSupport {
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
}
