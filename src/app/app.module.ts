import { HashLocationStrategy, LocationStrategy } from "@angular/common";
import { ErrorHandler, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BoardListModule } from "./board-list/board-list.module";
import { CoreModule } from "./core/core.module";
import { NgxsStoreModule } from "./core/store/store.module";
import { NotfoundComponent } from "./notfound/notfound.component";
import { PlayerControlModule } from "./player-control/player-control.module";
import { SettingsModule } from "./settings/settings.module";
import { SentryErrorHandler } from "./shared/sentry.erorrhandler";
import { SharedModule } from "./shared/shared.module";
import { SidenavModule } from "./sidenav/sidenav.module";
import { ZeroModule } from "./zero/zero.module";

@NgModule({
  declarations: [AppComponent, NotfoundComponent],
  imports: [
    BrowserModule,
    CoreModule,
    SharedModule,
    BoardListModule,
    PlayerControlModule,
    SettingsModule,
    SidenavModule,
    ZeroModule,
    AppRoutingModule,
    NgxsStoreModule,
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    {
      provide: ErrorHandler,
      useClass: SentryErrorHandler,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
