import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudCategorias } from './categorias';

describe('CrudCategorias', () => {
  let component: CrudCategorias;
  let fixture: ComponentFixture<CrudCategorias>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrudCategorias]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrudCategorias);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
