import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-notfound",
  templateUrl: "./notfound.component.html",
  styleUrls: ["./notfound.component.scss"],
})
export class NotfoundComponent implements OnInit {
  randNumber = 1;

  constructor() {}

  ngOnInit() {
    this.randNumber = this.randomInteger(1, 8);
  }

  private randomInteger(min: number, max: number) {
    let rand = min + Math.random() * (max + 1 - min);
    rand = Math.floor(rand);
    return rand;
  }
}
