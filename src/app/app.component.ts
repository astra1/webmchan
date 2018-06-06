import { ElectronService } from './core/services/electron.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(es: ElectronService) {

    if (es.isElectron()) {
      console.log('Mode electron');
      console.log('Electron ipcRenderer', es.ipcRenderer);
      console.log('NodeJS childProcess', es.childProcess);
    } else {
      console.log('Mode web');
    }
  }
}
