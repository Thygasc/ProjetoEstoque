import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CadastroUsuariosPage } from './cadastro-usuarios.page';

describe('CadastroUsuariosPage', () => {
  let component: CadastroUsuariosPage;
  let fixture: ComponentFixture<CadastroUsuariosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroUsuariosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
