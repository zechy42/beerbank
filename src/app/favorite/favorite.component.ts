import { BeerService } from './../beer.service';
import { Component, OnInit } from '@angular/core';
import $ from 'jquery';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent implements OnInit {
  beers: any[]  = [];
  public beerForDetail;
  similar: any[] = [];

  constructor(protected beerService: BeerService) { }

  ngOnInit() {
    this.getFavorites();
  }

  getFavorites() {
    this.beerService.getFavorites().subscribe((beers: any[]) => {
      this.beers = beers;
    }, error => {
      console.log(error);
    });
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
    let beers = localStorage.getItem('favs');
    const beersJSON = JSON.parse(beers);
    for (let i = 0; i < beersJSON.length; i++) {
      if (beersJSON[i] === beer.id) {
        beersJSON.splice(i, 1);
        this.beers.splice(i, 1);
        beers = JSON.stringify(beersJSON);
        localStorage.setItem('favs', beers);
      }
    }
    // localStorage.setItem('favs')
    event.stopImmediatePropagation();
  }

}
