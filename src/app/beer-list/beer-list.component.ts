import { BeerService } from './../beer.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import $ from 'jquery';

@Component({
  selector: 'app-beer-list',
  templateUrl: './beer-list.component.html',
  styleUrls: ['./beer-list.component.css']
})
export class BeerListComponent implements OnInit {
  beers: any[]  = [];
  private beerSub: Subscription;
  similar: any[] = [];
  public beerForDetail;

  constructor(protected beerService: BeerService) {}

  ngOnInit() {
    $('#loading').hide();

    const self = this;

    $(window).scroll(function() {
      if ($(window).scrollTop() === $(document).height() - $(window).height()) {
        $('#loading').show();
        setTimeout(function () {self.beerService.getBeers(); } , 300);
      } else {
        $('#loading').hide();
      }
    });

    this.beerSub = this.beerService.getBeersUpdateListener().subscribe((beers: any[]) => {
      this.beers = beers;
    });
    this.beerService.getBeers();
  }

  divClick(beer) {
    this.beerForDetail = beer;
    $('#detailTrigger').click();
    this.beerService.getSimilar(beer).subscribe((beers: any[]) => {
      this.similar = beers;
    }, error => {
      console.log(error);
    });
  }

  favClick(event, beer) {
    // alert('clicked fav');
    $('#fav' + beer.id).removeClass('fa-star-o');
    $('#fav' + beer.id).addClass('fa-star');
    let beers = localStorage.getItem('favs');
    if (beers) {
      this.pushBeers(beers, beer.id);
    } else {
      const newBeers = [];
      newBeers.push(beer.id);
      beers = JSON.stringify(newBeers);
      localStorage.setItem('favs', beers);
    }
    // localStorage.setItem('favs')
    event.stopImmediatePropagation();
  }

  isFav(beer) {
    const favorites = localStorage.getItem('favs');
    const favs = JSON.parse(favorites);
    if ( favs ) {
      for (let i = 0; i < favs.length; i++) {
        if (beer.id === favs[i]) {
          return true;
        }
      }
    }
    return false;
  }

  pushBeers(oldBeers, newBeer) {
    const jsonBeers = JSON.parse(oldBeers);
    for (let i = 0; i < jsonBeers.length; i++) {
      if (jsonBeers[i] === newBeer) {
        return;
      }
    }
    jsonBeers.push(newBeer);
    const beers = JSON.stringify(jsonBeers);
    localStorage.setItem('favs', beers);
  }

}
