// app.component.ts
import { Component, ElementRef, ViewChild } from '@angular/core';
import { PdfViewerComponent } from 'ng2-pdf-viewer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-pdf-viewer-app';
  pdfSrc = "https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf";

  @ViewChild('myCanvas') private myCanvas: ElementRef<HTMLCanvasElement>;
  public context: CanvasRenderingContext2D;
  @ViewChild(PdfViewerComponent) private pdfComponent: PdfViewerComponent;

  renderText = true;
  originalSize = false;
  fitToPage = false;
  showAll = true;
  autoresize = false;
  showBorders = true;
  renderTextModes = [0, 1, 2];
  renderTextMode = 1;
  rotation = 0;
  zoom = 1;
  zoomScale = 'page-width';
  zoomScales = ['page-width', 'page-fit', 'page-height'];
  pdfQuery = '';
  totalPages: number;

  zoomIn() {
    this.zoom += 0.05;
  }

  zoomOut() {
    if (this.zoom > 0.05)
      this.zoom -= 0.05;
  }

  rotateDoc() {
    this.rotation += 90;
  }

  // Event for search operation
  searchQueryChanged(newQuery: string) {
    if (newQuery !== this.pdfQuery) {
      this.pdfQuery = newQuery;
      this.pdfComponent.pdfFindController.executeCommand('find', {
        query: this.pdfQuery,
        highlightAll: true
      });
    } else {
      this.pdfComponent.pdfFindController.executeCommand('findagain', {
        query: this.pdfQuery,
        highlightAll: true
      });
    }
    this.context = this.myCanvas.nativeElement.getContext('2d');
    this.context.beginPath();
    // var editedboundingBox = this.getOuterRectanglePoints(boundingBox);
    // this.context.moveTo(editedboundingBox[0],editedboundingBox[1]);
    // this.context.lineTo(editedboundingBox[2],editedboundingBox[3]);
    // this.context.lineTo(editedboundingBox[4],editedboundingBox[5]);
    // this.context.lineTo(editedboundingBox[6],editedboundingBox[7]);
    // this.context.lineTo(editedboundingBox[0],editedboundingBox[1]);
    this.context.fillStyle = 'rgb(255, 153, 171, 0.3)';
    this.context.fill();
    this.context.strokeStyle = 'darkred';
    this.context.lineWidth = 2;
    this.context.stroke();
    this.context.closePath();
  }

  // Event handler when new PDF file is selected
  onFileSelected() {
    const $pdf: any = document.querySelector('#file');

    if (typeof FileReader !== 'undefined') {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.pdfSrc = e.target.result;
      };

      reader.readAsArrayBuffer($pdf.files[0]);
    }
  }

  callBackFn(event) {
    console.log('callBackFn', event);
    // Setting total number of pages
    this.totalPages = event._pdfInfo.numPages
  }
  pageRendered(event) {
    console.log('pageRendered', event);
  }
  textLayerRendered(event) {
    console.log('textLayerRendered', event);
  }
  onError(event) {
    console.error('onError', event);
  }
  onProgress(event) {
    console.log('onProgress', event);
  }
}
