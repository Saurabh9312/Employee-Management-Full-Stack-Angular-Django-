import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Signinform } from './signinform';

describe('Signinform', () => {
  let component: Signinform;
  let fixture: ComponentFixture<Signinform>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Signinform]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Signinform);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
