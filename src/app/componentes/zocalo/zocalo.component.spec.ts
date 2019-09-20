import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZocaloComponent } from './zocalo.component';

describe('ZocaloComponent', () => {
  let component: ZocaloComponent;
  let fixture: ComponentFixture<ZocaloComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZocaloComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZocaloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
