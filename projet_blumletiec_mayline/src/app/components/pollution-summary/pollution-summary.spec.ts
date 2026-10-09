import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PollutionSummary } from './pollution-summary';

describe('PollutionSummary', () => {
  let component: PollutionSummary;
  let fixture: ComponentFixture<PollutionSummary>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PollutionSummary],
    }).compileComponents();

    fixture = TestBed.createComponent(PollutionSummary);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
