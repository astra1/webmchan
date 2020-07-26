import { Component, OnInit, ViewChild } from "@angular/core";
import { faVolumeUp, faVolumeOff } from "@fortawesome/free-solid-svg-icons";
import { MatSlider } from "@angular/material/slider";
import { Store, Select } from "@ngxs/store";
import { SetVolumeLevel } from "app/core/store/webmchan/states/player/player.actions";
import { PlayerState } from "app/core/store/webmchan/states/player/player.state";
import { Observable } from "rxjs";
import { FormControl } from "@angular/forms";
import { distinctUntilChanged } from "rxjs/operators";

@Component({
  selector: "app-volume-slider",
  templateUrl: "./volume-slider.component.html",
  styleUrls: ["./volume-slider.component.scss"],
})
export class VolumeSliderComponent implements OnInit {
  faVolumeMax = faVolumeUp;
  faVolumeOff = faVolumeOff;

  volumeControl = new FormControl(100);

  @Select(PlayerState.volumeLevel)
  volumeLevel$: Observable<number>;

  // @ViewChild("volumeSlider", { static: true })
  // volumeSlider: MatSlider;

  readonly MAX_VOLUME_LEVEL = 100;
  readonly MIN_VOLUME_LEVEL = 0;
  readonly VOLUME_SLIDER_STEP = 5;

  private mutedVolumeValue: number;

  constructor(private store: Store) {}

  ngOnInit() {
    this.volumeControl.valueChanges
      .pipe(distinctUntilChanged())
      .subscribe((lvl) => this.store.dispatch(new SetVolumeLevel(lvl)));
  }

  onVolumeScroll(event: any) {
    const step = this.VOLUME_SLIDER_STEP;
    let newValue = this.volumeControl.value;

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

    this.volumeControl.setValue(newValue);
  }

  toggleMute() {
    if (this.volumeControl.value > 0) {
      this.mutedVolumeValue = this.volumeControl.value;
      this.volumeControl.setValue(0);
    } else {
      this.volumeControl.setValue(this.mutedVolumeValue);
    }
  }
}
