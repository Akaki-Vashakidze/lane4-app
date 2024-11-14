import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AthleteStyleResultsComponent } from './athlete-style-results.component';

describe('AthleteStyleResultsComponent', () => {
  let component: AthleteStyleResultsComponent;
  let fixture: ComponentFixture<AthleteStyleResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AthleteStyleResultsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AthleteStyleResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
