import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutePatchComponent } from './route-patch.component';

describe('RoutePatchComponent', () => {
  let component: RoutePatchComponent;
  let fixture: ComponentFixture<RoutePatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoutePatchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RoutePatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
