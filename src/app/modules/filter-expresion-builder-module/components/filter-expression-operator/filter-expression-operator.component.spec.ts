import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterExpressionOperatorComponent } from './filter-expression-operator.component';

describe('FilterExpressionOperatorComponent', () => {
  let component: FilterExpressionOperatorComponent;
  let fixture: ComponentFixture<FilterExpressionOperatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterExpressionOperatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterExpressionOperatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
