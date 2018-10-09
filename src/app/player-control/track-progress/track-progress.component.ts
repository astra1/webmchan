import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  selector: 'app-track-progress',
  templateUrl: './track-progress.component.html',
  styleUrls: ['./track-progress.component.css']
})
export class TrackProgressComponent implements OnInit {
  @Input()
  progressLength = 1;

  @Input()
  currentProgress = 0;

  @Output()
  progressChange: EventEmitter<number> = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  onProgressChange(event: any) {
    this.progressChange.next(event.value);
  }
}
