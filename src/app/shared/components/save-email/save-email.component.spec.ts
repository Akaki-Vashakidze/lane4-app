import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveEmailComponent } from './save-email.component';

describe('SaveEmailComponent', () => {
  let component: SaveEmailComponent;
  let fixture: ComponentFixture<SaveEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaveEmailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaveEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
