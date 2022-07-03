import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterExpressionBuilderComponent } from './filter-expression-builder.component';

describe('FilterExpressionBuilderComponent', () => {
  let component: FilterExpressionBuilderComponent;
  let fixture: ComponentFixture<FilterExpressionBuilderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterExpressionBuilderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterExpressionBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
