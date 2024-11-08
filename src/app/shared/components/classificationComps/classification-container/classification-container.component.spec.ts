import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassificationContainerComponent } from './classification-container.component';

describe('ClassificationContainerComponent', () => {
  let component: ClassificationContainerComponent;
  let fixture: ComponentFixture<ClassificationContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClassificationContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClassificationContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
