
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PollutionSummary } from './pollution-summary';
import { Pollution } from '../../models/pollution';

describe('PollutionSummary', () => {
  let component: PollutionSummary;
  let fixture: ComponentFixture<PollutionSummary>;

  // Données fictives utilisées pour tester le récapitulatif.
  const pollutionTest: Pollution = {
    id: 1,
    titre: 'Pollution de test',
    type: 'Air',
    description: 'Description de test',
    date: '2026-11-20',
    codePostal: '67000',
    ville: 'Strasbourg',
    pays: 'France',
    latitude: 48.5734,
    longitude: 7.7521,
    indiceDangerosite: 35
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PollutionSummary],
    }).compileComponents();

    fixture = TestBed.createComponent(PollutionSummary);
    component = fixture.componentInstance;

    // Transmet les données obligatoires au composant.
    component.pollution = pollutionTest;

    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display pollution information', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.textContent).toContain('Pollution de test');
    expect(compiled.textContent).toContain('Strasbourg');
    expect(compiled.textContent).toContain('35');
  });
});
