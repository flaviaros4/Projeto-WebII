import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitacaoManutencao } from './solicitacao-de-manutencao';

describe('SolicitacaoDeManutencao', () => {
  let component: SolicitacaoManutencao;
  let fixture: ComponentFixture<SolicitacaoManutencao>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolicitacaoManutencao]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolicitacaoManutencao);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
