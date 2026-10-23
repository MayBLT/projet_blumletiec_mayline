import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InscriptionForm } from './inscription-form';

describe('InscriptionForm', () => {
  let component: InscriptionForm;
  let fixture: ComponentFixture<InscriptionForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InscriptionForm],
    }).compileComponents();

    fixture = TestBed.createComponent(InscriptionForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
