import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { faBars, faBolt } from "@fortawesome/free-solid-svg-icons";
import { Observable, Subject } from "rxjs";
import { pluck } from "rxjs/operators";
import { IThread } from "../core/models/models";
import { SidenavStateService } from "./../core/services/sidenav-state.service";

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

  threads$: Observable<IThread[]>;
  destroy$: Subject<void> = new Subject();

  constructor(
    private route: ActivatedRoute,
    private sidenavService: SidenavStateService
  ) { }

  ngOnInit() {
    this.threads$ = this.route.data.pipe(pluck("threads"));
  }

  getThreadThumbnail(thread: IThread) {
    const file = thread.files[0];
    return file ? file.thumbnail : "";
  }

  onNotFoundThumbnail(imgEl: HTMLImageElement) {
    console.warn(imgEl);
  }

  getThreadImage(thread: IThread) {
    const file = thread.files[0];

    if ((file && file.type === 10) || file.type === 6) {
      return file.thumbnail;
    }

    return file ? file.path : "";
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
