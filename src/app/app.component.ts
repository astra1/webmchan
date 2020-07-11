import { SettingsService } from './settings/settings.service';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';

import { ElectronService } from './core/services/electron.service';
import { SidenavStateService } from './core/services/sidenav-state.service';

import { MatSidenav } from '@angular/material/sidenav';

import { distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  @ViewChild('sidenav', { static: true }) sidenav: MatSidenav;
  title = 'app';

  constructor(
    es: ElectronService,
    private settingsService: SettingsService,
    private sidenavState: SidenavStateService) {


    if (es.isElectron()) {
      console.log('Mode electron');
      console.log('Electron ipcRenderer', es.ipcRenderer);
      console.log('NodeJS childProcess', es.childProcess);
    } else {
      console.log('Mode web');
    }

    this.settingsService.load();
  }

  ngOnInit() {
    this.sidenavState.isOpened
      .pipe(
        distinctUntilChanged()
      )
      .subscribe(val => {
        val
          ? this.sidenav.open()
          : this.sidenav.close();
        console.log('should open sidenav?: ', val);
      });
  }

  onSidenavClosed() {
    this.sidenavState.setState(false);
  }
}
