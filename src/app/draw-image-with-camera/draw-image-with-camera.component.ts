/**
 * This classe I demonstrate how it's possible to use object detection techniques to detect
 * the tip of a finger and track its position on the screen.
 */

import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import * as tf from '@tensorflow/tfjs';
import { Boxes } from 'object-detection-from-yolo-to-tensorflow';

@Component({
  selector: 'app-draw-image-with-camera',
  templateUrl: './draw-image-with-camera.component.html',
  styleUrls: ['./draw-image-with-camera.component.scss']
})
export class DrawImageWithCameraComponent implements OnDestroy {

  /**
   * Create a HTML Canvas reference
   */
  @ViewChild('canvasVideo', { static: true }) canvasVideo: ElementRef<HTMLCanvasElement> | null = null

  /**
   * Create a HTML Canvas reference
   */
  @ViewChild('canvasDraw', { static: true }) canvasDraw: ElementRef<HTMLCanvasElement> | null = null

  /**
   * Create a HTML Canvas reference
   */
  @ViewChild('canvasDisplay', { static: true }) canvasDisplay: ElementRef<HTMLCanvasElement> | null = null

  /**
   * Create a HTML Canvas reference
   */
  @ViewChild('video', { static: true }) video: ElementRef<HTMLVideoElement> | null = null

  /**
   * Create a HTML Canvas reference
   */
  @ViewChild('img', { static: true }) img: ElementRef<HTMLImageElement> | null = null

  /**
   * Object reference to the tensorflow model
   */
  model: tf.GraphModel<string | tf.io.IOHandler> | null = null;

  /**
   * Variable the last move
   */
  private _firstLine: boolean = false;
  private get firstLine(): boolean {
    return this._firstLine;
  }
  private set firstLine(v: boolean) {
    this._firstLine = v;
  }

  /**
   * Variable the last move
   */
  private _lastMove: any = {};
  private get lastMove(): any {
    return this._lastMove;
  }
  private set lastMove(v: any) {
    this._lastMove = v;
  }


  /**
   * Constructor
   */
  constructor() {
    const dbName = 'finger_model'
    tf.loadGraphModel(`assets/${dbName}/model.json`,).then(async (model: tf.GraphModel<string | tf.io.IOHandler>) => {
      this.model = model;
    });
  }



  /**
   * Start the webbam
   */
  ngOnInit(): void {

  }


  /**
   * ng On Destroy
   */
  ngOnDestroy(): void {
    this.model?.dispose();
    this.model?.disposeIntermediateTensors();
    tf.disposeVariables();
  }

  /**
   * Draw a circle over the finger
   * @param ctx
   * @param x
   * @param y
   */
  private drawCircle(ctx: CanvasRenderingContext2D, x: number, y: number) {
    const radius = 5;
    const fillColor = 'red';
    ctx.beginPath();
    ctx.arc(x + 20, y + 15, radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = fillColor;
    ctx.fill();
    ctx.closePath();
  }

  /**
   * Draw Tracking
   * @param x
   * @param y
   */
  drawTracking(x: number, y: number) {
    const ctxDisplay = this.canvasDraw?.nativeElement.getContext('2d');
    if (ctxDisplay) {

      if (!this.firstLine) {
        ctxDisplay.moveTo(x, y);
        this.firstLine = true
      } else {
        ctxDisplay.moveTo(this.lastMove.x, this.lastMove.y);
      }
      this.lastMove = { x: x, y: y }
      ctxDisplay.lineTo(x, y);
      ctxDisplay.stroke();
      ctxDisplay.closePath()
    }
  }

  /**
   * Join canvas
   */
  joinCanvas() {
    const canvasVideo = this.canvasVideo?.nativeElement;
    const canvasDraw = this.canvasDraw?.nativeElement;
    const canvasDisplay = this.canvasDisplay?.nativeElement;

    if (canvasDraw && canvasVideo && canvasDisplay) {
      const ctxDisplay = canvasDisplay.getContext('2d');

      canvasDisplay.width = canvasVideo.width;
      canvasDisplay.height = canvasVideo.height;

      ctxDisplay?.drawImage(canvasVideo, 0, 0)
      ctxDisplay?.drawImage(canvasDraw, 0, 0)

    }
  }

  /**
   * Clear Canvas
   */
  clearCanvas() {

    this.firstLine = true;

    this.lastMove = {};

    const canvas = this.canvasDraw?.nativeElement

    const context = this.canvasDraw?.nativeElement.getContext('2d');

    if (context && canvas) {

      context.clearRect(0, 0, canvas.width, canvas.height);

      context.save();

      context.beginPath();

      context.stroke();

      context.restore();

      context.stroke();
    }
  }

  /**
   *
   * @param predition
   */
  predictionReturn(predition: { canvas: HTMLCanvasElement, boxes: Boxes[] | null }) {
    const canvas = predition.canvas;
    const ctx = canvas?.getContext('2d')

    if (predition.boxes && predition.canvas && ctx) {
      predition.boxes.forEach(boundingBox => {
        this.drawCircle(ctx, boundingBox.box.x, boundingBox.box.y)
        this.drawTracking(boundingBox.box.x, boundingBox.box.y);
      });
    }
    this.joinCanvas();
  }

  // drawGrid(context: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
  //   // context.clearRect(0, 0, canvas.width, canvas.height);
  //   // context.save();
  //   context.strokeStyle = 'grey';
  //   context.beginPath();
  //   context.lineWidth = 3
  //   for (var x = 0; x < 700; x += 50) {
  //     context.moveTo(x, 0);
  //     context.lineTo(x, 500);
  //   }
  //   for (var y = 0; y < 700; y += 50) {
  //     context.moveTo(0, y);
  //     context.lineTo(700, y);
  //   }
  //   context.stroke();
  // }
}
