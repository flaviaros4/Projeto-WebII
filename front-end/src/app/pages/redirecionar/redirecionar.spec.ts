import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Redirecionar } from './redirecionar';

describe('Redirecionar', () => {
  let component: Redirecionar;
  let fixture: ComponentFixture<Redirecionar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Redirecionar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Redirecionar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
