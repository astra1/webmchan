import { Component, OnInit, ViewChild } from '@angular/core';
import { faVolumeUp, faVolumeDown } from '@fortawesome/free-solid-svg-icons';
import { PlayerService } from '../../core/services/player.service';
import { MatSlider } from '@angular/material';

@Component({
  selector: 'app-volume-slider',
  templateUrl: './volume-slider.component.html',
  styleUrls: ['./volume-slider.component.css'],
})
export class VolumeSliderComponent implements OnInit {
  faVolumeMax = faVolumeUp;
  faVolumeMin = faVolumeDown;
  @ViewChild('volumeSlider')
  volumeSlider: MatSlider;

  constructor(private ps: PlayerService) {}

  ngOnInit() {}

  onVolumeChange(event: any) {
    this.ps.setVolume(event.value);
  }

  onVolumeScroll(event: any) {
    const step = this.volumeSlider.step;
    let newValue = this.volumeSlider.value;

    if (event.deltaY > 0) {
      newValue += step;
    } else {
      newValue -= step;
    }

    if (newValue > 100) {
      newValue = 100;
    } else if (newValue < 0) {
      newValue = 0;
    }

    this.ps.setVolume(newValue);
    this.volumeSlider.value = newValue;
  }

  onMute() {
    this.ps.setVolume(0);
    this.volumeSlider.value = 0;
  }

  onMaxVolume() {
    this.ps.setVolume(100);
    this.volumeSlider.value = 100;
  }
}
