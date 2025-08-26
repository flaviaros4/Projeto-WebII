import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaFuncionario } from './pagina-funcionario';

describe('PaginaFuncionario', () => {
  let component: PaginaFuncionario;
  let fixture: ComponentFixture<PaginaFuncionario>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginaFuncionario]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginaFuncionario);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
