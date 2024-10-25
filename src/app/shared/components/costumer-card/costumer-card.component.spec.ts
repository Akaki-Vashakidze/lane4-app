import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CostumerCardComponent } from './costumer-card.component';

describe('CostumerCardComponent', () => {
  let component: CostumerCardComponent;
  let fixture: ComponentFixture<CostumerCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CostumerCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CostumerCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
