import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCompetitionsPanelComponent } from './new-competitions-panel.component';

describe('NewCompetitionsPanelComponent', () => {
  let component: NewCompetitionsPanelComponent;
  let fixture: ComponentFixture<NewCompetitionsPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewCompetitionsPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewCompetitionsPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
