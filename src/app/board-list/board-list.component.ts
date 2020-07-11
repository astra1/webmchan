import { SidenavStateService } from "./../core/services/sidenav-state.service";
import {
  faBars,
  faBolt,
  faBook,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { ApiService } from "./../core/services/Api.service";
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from "@angular/core";
import { IBoard } from "../core/models/models";
import { map } from "rxjs/operators";
import { SettingsService, ISettings } from "../settings/settings.service";
import { forkJoin } from "rxjs";

@Component({
  selector: "app-board-list",
  templateUrl: "./board-list.component.html",
  styleUrls: ["./board-list.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardListComponent implements OnInit {
  nswf = false;
  boards: IBoard[] = [];

  // fontAwesome
  faBars = faBars;
  faBolt = faBolt;
  faBook = faBook;
  faEnvelope = faEnvelope;

  constructor(
    private api: ApiService,
    private cd: ChangeDetectorRef,
    private settingsService: SettingsService,
    private sidenavState: SidenavStateService
  ) {}

  ngOnInit() {
    forkJoin(this.api.getBoards(), this.settingsService.get())
      .pipe(
        map(([boardList, settings]) => {
          this.nswf = settings && settings.nswf;
          return this.nswf
            ? boardList
            : boardList.filter(
                (b) => b.category.toLocaleLowerCase().trim() !== "взрослым"
              );
        })
      )
      .subscribe((boards) => {
        this.boards = boards;
        this.cd.markForCheck();
      });
  }

  toggleSidenav() {
    this.sidenavState.toggle();
  }

  renew() {
    console.log("not renew");
  }
}
