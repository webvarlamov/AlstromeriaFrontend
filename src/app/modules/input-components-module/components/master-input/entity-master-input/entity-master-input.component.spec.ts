import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityMasterInputComponent } from './entity-master-input.component';

describe('EntityMasterInputComponent', () => {
  let component: EntityMasterInputComponent;
  let fixture: ComponentFixture<EntityMasterInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntityMasterInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntityMasterInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
