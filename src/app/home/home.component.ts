import { BeerService } from './../beer.service';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  navigationSubscription;
  constructor(private beerService: BeerService, private router: Router) {
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (e instanceof NavigationEnd) {
        window.scrollTo(0, 0);
        this.initialiseBeers();
      }
    });
  }

  initialiseBeers() {
    this.beerService.resetBeers();
    this.beerService.page = 0;
    this.beerService.getBeers();
  }


  ngOnInit() {
  }

}
