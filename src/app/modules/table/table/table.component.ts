import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component, ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges, ViewChild
} from '@angular/core';
import {HasId, Pageable} from "../../../service/http/model/pageable";
import {ColumnSizeChangeRequest} from "./components/cell-resize/cell-resize.component";
import {TableUtilsService} from "./table-utils-service";
import {CollDragService} from "./components/coll-dragger/coll-drag.service";
import {ColumnPositionChangeRequest} from "./components/coll-dragger/coll-dragger.component";

export const DEFAULT_COLUMN_WIDTH = 200;

export interface TableColumn {
  index?: number
  id: string;
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

export interface TableSelectionConfig {
  useSelection: boolean;
  columnWidth: string;
  sticky: boolean;
  selectionMode: SelectionMode;
}

export enum SelectionMode {
  MULTI = 'multi',
  SINGLE = 'single'
}

export const DEFAULT_SELECTION_CONFIG: TableSelectionConfig = {
  sticky: true,
  useSelection: true,
  selectionMode: SelectionMode.MULTI,
  columnWidth: '35px',
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TableUtilsService, CollDragService]
})
export class TableComponent<Entity extends HasId> implements OnInit, AfterViewInit, OnChanges {
  public defaultColumnWidth: string = DEFAULT_COLUMN_WIDTH + 'px';

  @ViewChild('tableHeaderRow', {static: false}) tableHeaderRow: ElementRef;

  @Input()
  public page: Pageable<Entity>
  @Input()
  public domainType: string;
  @Input()
  public columns: Array<TableColumn> = [];
  @Input()
  public selectedEntities: Array<HasId> = [];
  @Input()
  public selectionConfig: TableSelectionConfig = DEFAULT_SELECTION_CONFIG

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
  @Output()
  public onColumnSizeChangeRequest: EventEmitter<ColumnSizeChangeRequest> = new EventEmitter();
  @Output()
  public onColumnPositionChangeRequest: EventEmitter<ColumnPositionChangeRequest> = new EventEmitter();

  public trackByIdValue(index: number, item: TableRow) {
    return item.id;
  };

  constructor(
    private tableUtilsService: TableUtilsService,
    private collDragService: CollDragService
  ) {}

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
    return this.page?.page?.number + 1;
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

    this.collDragService
      .setTableHeaderRowElementRef(this.tableHeaderRow)
      .setTableColumns(this.columns)
  }

  public ngOnChanges(changes: SimpleChanges): void {
    const columns = changes.columns;
    const currentValue = columns?.currentValue;
    if (currentValue != null) {
      this.collDragService.setTableColumns(currentValue);
    }
  }

  public onRowSelectionCheckboxChange(row: TableRow, checked: boolean) {
    const selectionChangeRequest = this.tableUtilsService
      .calcSelectionChangeRequest(row, checked, this.selectedEntities);
    this.onSelectionChangeRequest.emit(selectionChangeRequest)
  }

  public onColumnSizeChange($event: ColumnSizeChangeRequest) {
    const columnSizeChangeRequest = this.tableUtilsService
      .addCandidatesToColumnSizeChangeRequest($event, this.columns);
    this.onColumnSizeChangeRequest.emit(columnSizeChangeRequest)
  }

  public onColumnPositionChange($event: ColumnPositionChangeRequest) {
    const columnMoveChangeRequest = this.tableUtilsService
      .addCandidatesToColumnMoveLeftChangeRequest($event, this.columns);
    this.onColumnPositionChangeRequest.emit(columnMoveChangeRequest)
  }
}
