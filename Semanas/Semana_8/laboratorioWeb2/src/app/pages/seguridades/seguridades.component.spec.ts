import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeguridadesComponent } from './seguridades.component';

describe('SeguridadesComponent', () => {
  let component: SeguridadesComponent;
  let fixture: ComponentFixture<SeguridadesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SeguridadesComponent]
    });
    fixture = TestBed.createComponent(SeguridadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
