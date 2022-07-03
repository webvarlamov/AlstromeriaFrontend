import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppFilterExpressionRangeComponent } from './app-filter-expression-range.component';

describe('RangeComponent', () => {
  let component: AppFilterExpressionRangeComponent;
  let fixture: ComponentFixture<AppFilterExpressionRangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppFilterExpressionRangeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppFilterExpressionRangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
