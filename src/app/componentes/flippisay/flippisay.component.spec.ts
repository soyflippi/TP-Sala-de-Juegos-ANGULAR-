import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlippisayComponent } from './flippisay.component';

describe('FlippisayComponent', () => {
  let component: FlippisayComponent;
  let fixture: ComponentFixture<FlippisayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlippisayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlippisayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
