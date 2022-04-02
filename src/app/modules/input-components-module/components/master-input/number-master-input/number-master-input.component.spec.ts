import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberMasterInputComponent } from './number-master-input.component';

describe('NumberMasterInputComponent', () => {
  let component: NumberMasterInputComponent;
  let fixture: ComponentFixture<NumberMasterInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NumberMasterInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NumberMasterInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
