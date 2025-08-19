import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitacaoDeManutencao } from './solicitacao-de-manutencao';

describe('SolicitacaoDeManutencao', () => {
  let component: SolicitacaoDeManutencao;
  let fixture: ComponentFixture<SolicitacaoDeManutencao>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolicitacaoDeManutencao]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolicitacaoDeManutencao);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
