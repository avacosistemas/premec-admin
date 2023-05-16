import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutocompleteDesplegableComponent } from './autocomplete-desplegable.component';

describe('AutocompleteDesplegableComponent', () => {
  let component: AutocompleteDesplegableComponent;
  let fixture: ComponentFixture<AutocompleteDesplegableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutocompleteDesplegableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutocompleteDesplegableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
