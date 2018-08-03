import { SettingsService, ISettings } from './settings.service';
import { ElectronService } from './../core/services/electron.service';
import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';

import { SidenavStateService } from '../core/services/sidenav-state.service';

import { JSONSchema } from '@ngx-pwa/local-storage';
import { LocalStorage } from '@ngx-pwa/local-storage';

import { faBars, faFolderOpen } from '@fortawesome/free-solid-svg-icons';
import { filter, takeUntil, map, auditTime, tap, distinctUntilChanged, take } from 'rxjs/operators';
import { Subject, bindCallback, of } from 'rxjs';

// const schema: JSONSchema = {
//   properties: {
//     path: { type: 'string' },
//     lastName: { type: 'string' }
//   },
//   required: ['firstName', 'lastName']
// };

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit, OnChanges, OnDestroy {

  isNative = false;

  // fontawesome
  faBars = faBars;
  faFolderOpen = faFolderOpen;

  settings: ISettings;
  settingsForm: FormGroup;

  pathOptions = pathOptions;

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private fb: FormBuilder,
    private electronService: ElectronService,
    private settingsService: SettingsService,
    private sidenavState: SidenavStateService
  ) { }

  ngOnInit() {
    this.isNative = this.electronService.isElectron();
    this.buildForm();

    // settings init
    this.settingsService.settings
      .pipe(
        takeUntil(this.destroy$),
        distinctUntilChanged((x, y) => JSON.stringify(x) === JSON.stringify(y)),
    )
      .subscribe(set => {
        this.settings = set;
        this.ngOnChanges();
      });

    this.settingsForm.get('path').valueChanges
      .pipe(
        filter(val => !!val && this.isNative),
        tap(v => console.log('tapped: ', v)),
    ).subscribe(val => {

      this.settingsForm.patchValue({
        savePath: val === 'custom' ? null : this.electronService.remote.app.getPath(val)
      }, { emitEvent: false });

    });

    this.settingsForm.statusChanges
      .pipe(
        takeUntil(this.destroy$),
        auditTime(300),
        tap(v => console.log('state', v)),
        filter(v => v === 'VALID')
      ).subscribe(status => {
        this.settingsService.save(this.settingsForm.value);
      });
  }

  ngOnChanges() {
    this.settingsForm.setValue(this.settings);
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  onSidenavClick() {
    this.sidenavState.toggle();
  }

  private buildForm() {
    this.settingsForm = this.fb.group({
      path: new FormControl('desktop'),
      savePath: new FormControl(
        null
      ),
      nswf: new FormControl(null, [Validators.required])
    });

    if (this.isNative) {
      this.settingsForm.get('savePath').setAsyncValidators(this.isPathExists.bind(this));
    }

  }

  isPathExists(control: AbstractControl) {
    console.log('isPathExists', control.value);

    if (control.value) {
      return bindCallback(this.electronService.fs.exists)(control.value)
        .pipe(
          map(isExist => {
            return isExist ? null : { pathNotExist: true };
          })
        );
    } else {
      return of({ pathNotExist: true });
    }
  }

  ShowSavePathDialog() {
    if (this.isNative) {

      const path = this.electronService.remote.dialog.showOpenDialog({
        properties: ['openDirectory']
      });

      this.settingsForm.patchValue({
        savePath: path && path[0] || null
      });

    }
  }

}

export const pathOptions = [
  {
    name: 'Рабочий стол',
    value: 'desktop'
  },
  {
    name: 'Загрузки',
    value: 'downloads',
  },
  {
    name: 'Видео',
    value: 'videos'
  },
  {
    name: 'НЕОБЫЧНЫЙ',
    value: 'custom'
  }
];
