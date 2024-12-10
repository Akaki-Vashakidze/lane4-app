import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeatsPdfBackupComponent } from './heats-pdf-backup.component';

describe('HeatsPdfBackupComponent', () => {
  let component: HeatsPdfBackupComponent;
  let fixture: ComponentFixture<HeatsPdfBackupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeatsPdfBackupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeatsPdfBackupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
