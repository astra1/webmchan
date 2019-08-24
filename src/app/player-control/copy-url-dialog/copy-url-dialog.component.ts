import { ElectronService } from './../../core/services/electron.service';
import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit
} from '@angular/core';
import { Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-copy-url-dialog',
  templateUrl: './copy-url-dialog.component.html',
  styleUrls: ['./copy-url-dialog.component.css']
})
export class CopyUrlDialogComponent implements AfterViewInit {
  @ViewChild('urlInput', { static: true })
  urlInput: ElementRef;

  constructor(
    public dialogRef: MatDialogRef<CopyUrlDialogComponent>,
    private es: ElectronService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngAfterViewInit() {
    this.urlInput.nativeElement.select();
  }

  onCloseClick() {
    this.dialogRef.close();
  }
}
