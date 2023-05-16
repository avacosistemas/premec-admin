import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportImageComponent } from './Import-Image.component';

describe('ImportImageComponent', () => {
  let component: ImportImageComponent;
  let fixture: ComponentFixture<ImportImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
