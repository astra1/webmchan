import { Component, OnInit } from '@angular/core';
import { faVolumeUp, faVolumeDown } from '@fortawesome/free-solid-svg-icons';
import { PlayerService } from '../../core/services/player.service';

@Component({
  selector: 'app-volume-slider',
  templateUrl: './volume-slider.component.html',
  styleUrls: ['./volume-slider.component.css']
})
export class VolumeSliderComponent implements OnInit {

  faVolumeMax = faVolumeUp;
  faVolumeMin = faVolumeDown;

  constructor(private ps: PlayerService) { }

  ngOnInit() {
  }

  onVolumeChange(event: any) {
    this.ps.setVolume(event.value);
  }

}
