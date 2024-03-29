import { Injectable } from "@angular/core";

// If you import a module but never use any of the imported values other than as TypeScript types,
// the resulting javascript file will look as if you never imported the module at all.
import { ipcRenderer, webFrame, app, dialog, clipboard } from "electron";
import * as childProcess from "child_process";
import * as fs from "fs";

@Injectable({
  providedIn: "root",
})
export class ElectronService {
  ipcRenderer: typeof ipcRenderer;
  clipboard: typeof clipboard;
  webFrame: typeof webFrame;
  app: typeof app;
  dialog: typeof dialog;
  childProcess: typeof childProcess;
  fs: typeof fs;

  constructor() {
    if (this.isElectron()) {
      this.ipcRenderer = window.require("electron").ipcRenderer;
      this.webFrame = window.require("electron").webFrame;
      this.clipboard = window.require("electron").clipboard;

      this.childProcess = window.require("child_process");
      this.fs = window.require("fs");
    }
  }

  isElectron = () => {
    return !!window?.process?.type;
  };

  saveFile(file: Blob) {}
}
