import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CostumerCommentsComponent } from './costumer-comments.component';

describe('CostumerCommentsComponent', () => {
  let component: CostumerCommentsComponent;
  let fixture: ComponentFixture<CostumerCommentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CostumerCommentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CostumerCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
