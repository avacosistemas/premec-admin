import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatepickerTimeComponent } from './datepicker-time.component';

describe('DatepickerTimeComponent', () => {
  let component: DatepickerTimeComponent;
  let fixture: ComponentFixture<DatepickerTimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatepickerTimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatepickerTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
