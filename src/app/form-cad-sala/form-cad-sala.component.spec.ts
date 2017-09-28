import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCadSalaComponent } from './form-cad-sala.component';

describe('FormCadSalaComponent', () => {
  let component: FormCadSalaComponent;
  let fixture: ComponentFixture<FormCadSalaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormCadSalaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCadSalaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
