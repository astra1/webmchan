import { SidenavStateService } from './../core/services/sidenav-state.service';
import { faBars, faCog, faHome } from '@fortawesome/free-solid-svg-icons';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  // fontawesome
  faBars = faBars;
  faCog = faCog;
  faHome = faHome;

  constructor(private sidenavState: SidenavStateService) { }

  ngOnInit() {
  }

  closeSidenav() {
    this.sidenavState.setState(false);
  }

}
