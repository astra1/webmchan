import { SharedModule } from "./../shared/shared.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PlayerControlComponent } from "./player-control.component";
import { VolumeSliderComponent } from "./volume-slider/volume-slider.component";
import { TrackProgressComponent } from "./track-progress/track-progress.component";
import { TrackQueueComponent } from "./track-queue/track-queue.component";
import { CopyUrlDialogComponent } from "./copy-url-dialog/copy-url-dialog.component";

@NgModule({
    imports: [CommonModule, SharedModule],
    declarations: [
        PlayerControlComponent,
        VolumeSliderComponent,
        TrackProgressComponent,
        TrackQueueComponent,
        CopyUrlDialogComponent,
    ],
    exports: [PlayerControlComponent, CopyUrlDialogComponent]
})
export class PlayerControlModule {}
