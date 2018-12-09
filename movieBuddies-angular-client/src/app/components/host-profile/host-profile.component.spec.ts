import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HostProfileComponent } from './host-profile.component';

describe('HostProfileComponent', () => {
  let component: HostProfileComponent;
  let fixture: ComponentFixture<HostProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HostProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HostProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
