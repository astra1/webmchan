import { SettingsModule } from './settings/settings.module';
import { BoardListModule } from './board-list/board-list.module';
import { SidenavModule } from './sidenav/sidenav.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { PlayerControlModule } from './player-control/player-control.module';
import { ZeroModule } from './zero/zero.module';
import { HashLocationStrategy } from '@angular/common';
import { LocationStrategy } from '@angular/common';
import { NotfoundComponent } from './notfound/notfound.component';

@NgModule({
  declarations: [
    AppComponent,
    NotfoundComponent,
  ],
  imports: [
    BrowserModule,
    CoreModule,
    SharedModule,
    BoardListModule,
    PlayerControlModule,
    SettingsModule,
    SidenavModule,
    ZeroModule,
    AppRoutingModule
  ],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent]
})
export class AppModule { }
