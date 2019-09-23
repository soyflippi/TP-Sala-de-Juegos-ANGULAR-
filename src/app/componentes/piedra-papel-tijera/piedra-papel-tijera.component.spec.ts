import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PiedraPapelTijeraComponent } from './piedra-papel-tijera.component';

describe('PiedraPapelTijeraComponent', () => {
  let component: PiedraPapelTijeraComponent;
  let fixture: ComponentFixture<PiedraPapelTijeraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PiedraPapelTijeraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PiedraPapelTijeraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
