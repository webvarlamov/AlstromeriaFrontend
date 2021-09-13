import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveOrCancelToolbarComponent } from './save-or-cancel-toolbar.component';

describe('SaveOrCancelToolbarComponent', () => {
  let component: SaveOrCancelToolbarComponent;
  let fixture: ComponentFixture<SaveOrCancelToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaveOrCancelToolbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveOrCancelToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
