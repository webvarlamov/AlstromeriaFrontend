import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import {HasId, Pageable} from "../../../service/http/model/pageable";

export interface TableColumn {
  index?: number
  dataField: string;
  caption?: string;
  width?: string
}

export interface TableRow {
  id: string;
  data: any;
  selected?: boolean;
}

export interface PageNumberChangeRequest {
  pageNumber: number;
}

export interface SelectionChangeRequest {
  currentSelectedEntities: Array<HasId>;
  currentDeselectedEntities: Array<HasId>;
  selectedCandidates: Array<HasId>;
  checked: boolean;
}

export interface TableConfig {
  selectionConfig: TableSelectionConfig;
}

export interface TableSelectionConfig {
  useSelection: boolean;
  columnWidth: string;
  sticky: boolean;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent<Entity extends { id: string }> implements OnInit, AfterViewInit, OnChanges {
  public defaultColumnWidth: string = '200px';

  @Input()
  public page: Pageable<Entity>
  @Input()
  public domainType: string;
  @Input()
  public columns: Array<TableColumn> = [];
  @Input()
  public selectedEntities: Array<HasId> = [];
  @Input()
  public config: TableConfig = {
    selectionConfig: {
      sticky: true,
      useSelection: true,
      columnWidth: '25px',
    }
  }

  @Output()
  public onPageNumberChangeRequest: EventEmitter<PageNumberChangeRequest> = new EventEmitter();
  @Output()
  public onSelectionChangeRequest: EventEmitter<SelectionChangeRequest> = new EventEmitter();
  @Output()
  public onTableComponentInit: EventEmitter<TableComponent<Entity>> = new EventEmitter();
  @Output()
  public onAfterTableComponentViewInit: EventEmitter<TableComponent<Entity>> = new EventEmitter();
  @Output()
  public onTableComponentDestroy: EventEmitter<void> = new EventEmitter();

  public trackByIdValue(index: number, item: TableRow) {
    return item.id;
  };

  constructor() {
  }

  get getRows(): Array<TableRow> {
    const selectedEntitiesIds: Array<string> = this.selectedEntities.map(hasId => hasId.id);
    return this.page?._embedded[this.domainType]?.map((entity: Entity) => {
      return {
        id: entity.id,
        data: entity,
        selected: selectedEntitiesIds.includes(entity.id)
      }
    });
  }

  get getColumns(): Array<TableColumn> {
    return this.columns ? this.columns : [];
  }

  get getPageNumber(): number {
    const number = this.page?.page?.number + 1;
    console.log(number);
    return number;
  }

  ngOnInit(): void {
    this.onTableComponentInit.next(this);
  }

  public previousPageNavButtonClick(): void {
    this.onPageNumberChangeRequest.emit({
      pageNumber: this.page.page.number - 1
    })
  }

  public onUserPageNumberInput(pageNumber: string) {
    this.onPageNumberChangeRequest.emit({
      pageNumber: parseInt(pageNumber, 10) - 1
    })
  }

  public nextPageNavButtonClick(): void {
    this.onPageNumberChangeRequest.emit({
      pageNumber: this.page.page.number + 1
    })
  }

  public get isNetPageDisabled(): boolean {
    return this.page?.page?.number + 1 === this.page?.page?.totalPages;
  }

  public get isPreviousPageDisabled(): boolean {
    return this?.page?.page?.number === 0;
  }

  public ngAfterViewInit(): void {
    this.onAfterTableComponentViewInit.emit(this);
  }

  public ngOnChanges(changes: SimpleChanges): void {
  }

  public onRowSelectionCheckboxChange(row: TableRow, checked: boolean) {
    let selectedCandidates = [];

    if (checked) {
      selectedCandidates = this.selectedEntities
        .concat(this.selectedEntities)
        .concat(row.data)
    } else {
      selectedCandidates = this.selectedEntities
        .filter(entity => entity.id !== row.data.id)
    }

    this.onSelectionChangeRequest.emit({
      currentSelectedEntities: checked ? [row.data] : [],
      currentDeselectedEntities: checked ? [] : [row.data],
      selectedCandidates,
      checked
    })
  }
}
