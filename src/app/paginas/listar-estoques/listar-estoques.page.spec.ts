import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListarEstoquesPage } from './listar-estoques.page';

describe('ListarEstoquesPage', () => {
  let component: ListarEstoquesPage;
  let fixture: ComponentFixture<ListarEstoquesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarEstoquesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
