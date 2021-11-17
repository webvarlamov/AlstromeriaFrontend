import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {HasId, Pageable} from "../../../service/http/model/pageable";
import {ColumnSizeChangeRequest} from "./components/cell-resize/cell-resize.component";
import {TableUtilsService} from "./table-utils-service";
import {CollDragService} from "./components/coll-dragger/coll-drag.service";
import {TableValidatorService} from "./table-validator.service";
import {TableColumn} from "./models/dataModels/tableColumn";
import {TableRow} from "./models/dataModels/tableRow";
import {PageNumberChangeRequest} from "./models/changeRequest/pageNumberChangeRequest";
import {SelectionChangeRequest} from "./models/changeRequest/selectionChangeRequest";
import {TableSelectionConfig} from "./models/config/tableSelectionConfig";
import {SelectionMode} from "./models/config/selectionMode";
import {SortOrder, TableSort} from "./models/dataModels/tableSort";
import {ColumnPositionChangeRequest} from "./models/changeRequest/column-position-change.request";
import {SortChangeRequest} from "./models/changeRequest/sort-change-request";
import {PageSizeChangeRequest} from "./models/changeRequest/pageSizeChangeRequest";

export const DEFAULT_COLUMN_WIDTH = 200;
export const DEFAULT_PAGE_INPUT_SIZE = 5;


export const DEFAULT_SELECTION_CONFIG: TableSelectionConfig = {
  sticky: true,
  useSelection: true,
  selectionMode: SelectionMode.MULTI,
  columnWidth: '35px',
}

export const DEFAULT_PAGING_CONFIG: TablePagingConfig = {
  showPagination: true,
  pageSizes: [10, 50, 100],
  showPageSizeSelector: true,
}

export interface TablePagingConfig {
  showPagination: boolean;
  pageSizes: Array<Number>,
  showPageSizeSelector: boolean,
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TableUtilsService, CollDragService, TableValidatorService]
})
export class TableComponent<Entity extends HasId> implements OnInit, AfterViewInit, OnChanges {
  public defaultColumnWidth: string = DEFAULT_COLUMN_WIDTH + 'px';

  @ViewChild('tableHeaderRow', {static: false}) tableHeaderRow: ElementRef;

  // --- Configuration ---  //
  @Input() public id: string;
  @Input() public domainType: string;
  @Input() public columns: Array<TableColumn> = [];
  @Input() public sorting: Array<TableSort> = [];
  @Input() public selectionConfig: TableSelectionConfig = {...DEFAULT_SELECTION_CONFIG}
  @Input() public pagingConfig: TablePagingConfig = {...DEFAULT_PAGING_CONFIG}

  // --- Data ---  //
  @Input() public page: Pageable<Entity>
  @Input() public selectedEntities: Array<HasId> = [];

  // --- EventEmitters ---  //
  @Output() public onPageNumberChangeRequest: EventEmitter<PageNumberChangeRequest> = new EventEmitter();
  @Output() public onSelectionChangeRequest: EventEmitter<SelectionChangeRequest> = new EventEmitter();
  @Output() public onTableComponentInit: EventEmitter<TableComponent<Entity>> = new EventEmitter();
  @Output() public onAfterTableComponentViewInit: EventEmitter<TableComponent<Entity>> = new EventEmitter();
  @Output() public onTableComponentDestroy: EventEmitter<void> = new EventEmitter();
  @Output() public onColumnSizeChangeRequest: EventEmitter<ColumnSizeChangeRequest> = new EventEmitter();
  @Output() public onColumnPositionChangeRequest: EventEmitter<ColumnPositionChangeRequest> = new EventEmitter();
  @Output() public onSortChangeRequest: EventEmitter<SortChangeRequest> = new EventEmitter();
  @Output() public onPageSizeChangeRequest: EventEmitter<PageSizeChangeRequest> = new EventEmitter();

  public trackByIdValue(index: number, item: TableRow) {
    return item.id;
  };

  constructor(
    private tableUtilsService: TableUtilsService,
    private collDragService: CollDragService,
    private tableValidatorService: TableValidatorService
  ) {
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

  get getSorting(): { [dataField: string]: SortOrder } {
    const sorting: { [dataField: string]: SortOrder } = {};
    this.sorting.forEach(si => {
      sorting[si.dataField] = si.order
    })
    return sorting;
  }

  get getColumns(): Array<TableColumn> {
    return this.columns ? this.columns : [];
  }

  get getPageNumber(): number {
    return this.page?.page?.number + 1;
  }

  get getPageInputSize(): number {
    return this.page != null && this.page.page != null
      ? this.page.page.totalPages?.toString()?.length + 3
      : DEFAULT_PAGE_INPUT_SIZE
  }


  ngOnInit(): void {
    this.tableValidatorService.validate(this)
    this.onTableComponentInit.next(this);
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

  public onRowSelectionCheckboxChange(row: TableRow, checked: boolean) {
    const selectionChangeRequest = this.tableUtilsService
      .calcSingleSelectionChangeRequest(row.data, checked, this.selectedEntities);
    this.onSelectionChangeRequest.emit(selectionChangeRequest)
  }

  public onHeaderSelectionCheckboxChange(checkbox: HTMLInputElement) {
    const entities: Array<HasId> = this.page._embedded[this.domainType];
    const selectionChangeRequest = this.tableUtilsService
      .calcMultiSelectionChangeRequest(entities, checkbox.checked, this.selectedEntities);
    this.onSelectionChangeRequest.emit(selectionChangeRequest)
  }

  public onColumnSizeChange($event: ColumnSizeChangeRequest) {
    const columnSizeChangeRequest = this.tableUtilsService
      .addCandidatesToColumnSizeChangeRequest($event, this.columns);
    this.onColumnSizeChangeRequest.emit(columnSizeChangeRequest)
  }

  public onColumnPositionChange($event: ColumnPositionChangeRequest) {
    const columnMoveChangeRequest = this.tableUtilsService
      .addCandidatesToColumnMoveChangeRequest($event, this.columns);
    this.onColumnPositionChangeRequest.emit(columnMoveChangeRequest)
  }

  public onSortChange($event: SortChangeRequest): any {
    const sortChangeRequest = this.tableUtilsService.calsSortingCandidates($event, this.sorting);
    this.onSortChangeRequest.emit(sortChangeRequest);
  }

  // Pagination
  public previousPageNavButtonClick(): void {
    this.onPageNumberChangeRequest.emit({
      pageNumber: this.page.page.number - 1
    })
  }

  public onUserPageNumberInput(pageNumber: string) {
    const candidate = parseInt(pageNumber, 10) - 1;
    if (candidate < this.page.page.totalPages && candidate >= 0) {
      this.onPageNumberChangeRequest.emit({
        pageNumber: parseInt(pageNumber, 10) - 1
      })
    }
  }

  public nextPageNavButtonClick(): void {
    this.onPageNumberChangeRequest.emit({
      pageNumber: this.page.page.number + 1
    })
  }

  public ngOnChanges(changes: SimpleChanges): void {
    this.setTableColumnsToCollDragService(changes)
  }

  private setTableColumnsToCollDragService(changes: SimpleChanges) {
    const columnsChanges = changes.columns;
    const currentValueTableColumns: Array<TableColumn> = columnsChanges?.currentValue;
    if (currentValueTableColumns != null) {
      this.collDragService.setTableColumns(currentValueTableColumns);
    }
  }

  get totalCheckboxIsIndeterminate(): boolean {
    const selectedOnPage = this.selectedEntities
      .filter(se => this.getPageEntities().find(pe => pe.id == se.id) != null);

    return this.selectedEntities.length != 0
      && selectedOnPage.length != 0
      && selectedOnPage.length != this.getPageEntities().length;
  }

  get totalCheckboxIsChecked(): boolean {
    return this.selectedEntities.length != 0
      && this.selectedEntities
        .filter(se => this.getPageEntities()
          .find(pe => pe.id == se.id) != null)
        .length > 0;
  }

  public getPageEntities(): Array<HasId> {
    return this.page._embedded[this.domainType];
  }

  public onPageSizeSelectorChange(pageSizeSelectorValue: string) {
    this.onPageSizeChangeRequest.emit({
      pageSize: parseInt(pageSizeSelectorValue, 10)
    })
  }
}
