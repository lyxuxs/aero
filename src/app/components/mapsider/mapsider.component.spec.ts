import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapsiderComponent } from './mapsider.component';

describe('MapsiderComponent', () => {
  let component: MapsiderComponent;
  let fixture: ComponentFixture<MapsiderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MapsiderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MapsiderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
