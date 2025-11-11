import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEfetuarOrcamento } from './modal-efetuar-orcamento';

describe('ModalEfetuarOrcamento', () => {
  let component: ModalEfetuarOrcamento;
  let fixture: ComponentFixture<ModalEfetuarOrcamento>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalEfetuarOrcamento]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalEfetuarOrcamento);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
