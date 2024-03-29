import { PlayerControlModule } from "./player-control/player-control.module";
import { PlayerControlComponent } from "./player-control/player-control.component";
import { TestBed, waitForAsync } from "@angular/core/testing";
import { AppComponent } from "./app.component";
import { VideoComponent } from "./zero/thread/video/video.component";
import { RouterTestingModule } from "@angular/router/testing";
import { PlayerService } from "./core/services/player.service";

describe("AppComponent", () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [PlayerControlModule, RouterTestingModule],
      declarations: [AppComponent],
      providers: [PlayerService],
    }).compileComponents();
  }));
  it("should create the app", waitForAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'app'`, waitForAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual("app");
  }));
  // it('should render title in a h1 tag', async(() => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.debugElement.nativeElement;
  //   expect(compiled.querySelector('h1').textContent).toContain(
  //     'Welcome to app!'
  //   );
  // }));
});
