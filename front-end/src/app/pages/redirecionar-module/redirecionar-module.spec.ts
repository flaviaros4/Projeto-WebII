import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RedirecionarModule } from './redirecionar-module';

describe('RedirecionarModule', () => {
  let component: RedirecionarModule;
  let fixture: ComponentFixture<RedirecionarModule>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RedirecionarModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RedirecionarModule);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
