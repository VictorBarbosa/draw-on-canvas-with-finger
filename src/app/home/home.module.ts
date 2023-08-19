import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { DrawImageWithCameraComponent } from '../draw-image-with-camera/draw-image-with-camera.component';
import { CanvasVideoComponent } from '../componets/canvas-video/canvas-video.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage,
    DrawImageWithCameraComponent,
    CanvasVideoComponent
  ]
})
export class HomePageModule { }
