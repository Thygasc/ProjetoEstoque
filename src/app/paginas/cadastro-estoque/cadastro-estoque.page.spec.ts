import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CadastroEstoquePage } from './cadastro-estoque.page';

describe('CadastroEstoquePage', () => {
  let component: CadastroEstoquePage;
  let fixture: ComponentFixture<CadastroEstoquePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroEstoquePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
