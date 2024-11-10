import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AthleteResultsComponent } from './athlete-results.component';

describe('AthleteResultsComponent', () => {
  let component: AthleteResultsComponent;
  let fixture: ComponentFixture<AthleteResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AthleteResultsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AthleteResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
