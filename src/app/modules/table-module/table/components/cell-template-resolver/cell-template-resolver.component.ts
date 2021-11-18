import {
  ChangeDetectionStrategy,
  Component,
  ComponentFactoryResolver,
  Input,
  OnInit, TemplateRef,
  ViewContainerRef
} from '@angular/core';
import {TableRow} from "../../models/dataModels/tableRow";

@Component({
  selector: 'app-cell-template-resolver',
  templateUrl: './cell-template-resolver.component.html',
  styleUrls: ['./cell-template-resolver.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CellTemplateResolverComponent implements OnInit {
  @Input() templateRef: TemplateRef<any>;
  @Input() row: TableRow;

  constructor(
    public viewContainerRef: ViewContainerRef,
    public componentFactoryResolver: ComponentFactoryResolver
  ) { }

  ngOnInit(): void {
    // console.log(this.templateRef);
    if (this.templateRef != null)
      this.viewContainerRef.insert(
        this.templateRef.createEmbeddedView({row: this.row})
      )
    // console.log("ngOnInit")
    // const componentFactory = this.componentFactoryResolver.resolveComponentFactory(NullValueCellDisplayComponent);
    // this.viewContainerRef.createComponent(componentFactory);
    // this.viewContainerRef.createEmbeddedView(this.templateRef);
    // this.viewContainerRef.createComponent()
  }

}
