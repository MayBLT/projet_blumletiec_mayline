import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PollutionList } from './pollution-list';

describe('PollutionList', () => {
  let component: PollutionList;
  let fixture: ComponentFixture<PollutionList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PollutionList],
    }).compileComponents();

    fixture = TestBed.createComponent(PollutionList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
