import { ThreadComponent } from "./thread/thread.component";
import { ZeroComponent } from "./zero.component";
import { NgModule } from "@angular/core";
import { ZeroRoutingModule } from "./zero-routing.module";
import { SharedModule } from "../shared/shared.module";
import { VideoComponent } from "app/zero/thread/video/video.component";

@NgModule({
  imports: [SharedModule, ZeroRoutingModule],
  declarations: [ZeroComponent, ThreadComponent, VideoComponent],
})
export class ZeroModule {}
