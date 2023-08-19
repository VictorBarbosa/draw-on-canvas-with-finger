import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawImageWithCameraComponent } from './draw-image-with-camera.component';

describe('DrawImageWithCameraComponent', () => {
  let component: DrawImageWithCameraComponent;
  let fixture: ComponentFixture<DrawImageWithCameraComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DrawImageWithCameraComponent]
    });
    fixture = TestBed.createComponent(DrawImageWithCameraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
