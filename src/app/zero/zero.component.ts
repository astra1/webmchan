import { SidenavStateService } from "./../core/services/sidenav-state.service";
import { environment } from "./../../environments/environment";
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy,
} from "@angular/core";
import { Observable, Subject } from "rxjs";
import { IThread } from "../core/models/models";
import { faBars, faBolt } from "@fortawesome/free-solid-svg-icons";
import { Select } from "@ngxs/store";
import { ThreadState } from "../core/store/imageboard/thread/thread.state";

@Component({
  selector: "app-zero",
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./zero.component.html",
  styleUrls: ["./zero.component.scss"],
})
export class ZeroComponent implements OnInit, OnDestroy {
  isThreadImgPreviewOpen = false;
  cols = 3;

  // fontawesome
  faBars = faBars;
  faBolt = faBolt;

  @Select(ThreadState.threadList) threads$: Observable<IThread[]>;
  destroy$: Subject<void> = new Subject();

  constructor(private sidenavService: SidenavStateService) {}

  ngOnInit() {}

  getThreadThumbnail(thread: IThread) {
    const file = thread.files[0];
    return file ? `${environment.dvachApiUrl}${file.thumbnail}` : "";
  }

  getThreadImage(thread: IThread) {
    const file = thread.files[0];

    if ((file && file.type === 10) || file.type === 6) {
      return `${environment.dvachApiUrl}${file.thumbnail}`;
    }

    return file ? `${environment.dvachApiUrl}${file.path}` : "";
  }

  toggleSidenav() {
    this.sidenavService.toggle();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  trackByThreadId(thread: IThread) {
    return thread.num;
  }
}
