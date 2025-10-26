import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubadminDashboard } from './subadmin-dashboard';

describe('SubadminDashboard', () => {
  let component: SubadminDashboard;
  let fixture: ComponentFixture<SubadminDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubadminDashboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubadminDashboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
