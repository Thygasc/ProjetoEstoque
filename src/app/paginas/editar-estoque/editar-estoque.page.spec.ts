import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarEstoquePage } from './editar-estoque.page';

describe('EditarEstoquePage', () => {
  let component: EditarEstoquePage;
  let fixture: ComponentFixture<EditarEstoquePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarEstoquePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
