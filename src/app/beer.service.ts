import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class BeerService {
  private beers: any[] = [];
  uri = 'https://api.punkapi.com/v2/beers';
  private beersUpdated = new Subject<any[]>();
  public page = 0;
  private fetchingBeers = false;

  constructor(private http: HttpClient) { }


getBeers() {
    if (!this.fetchingBeers) {
      this.page++;
      this.fetchingBeers = true;
      // https://api.punkapi.com/v2/beers?page=2&per_page=80
      console.log('page: ' + this.page);
      this.http.get<any[]>(`${this.uri}?page=${this.page}&per_page=12`).subscribe((beers: any[]) => {
        console.log('Fetched Beers');
        this.fetchingBeers = false;
        this.beers = this.beers.concat(beers);
        // pass the data over to the component who is ovserving
        this.beersUpdated.next([...this.beers]);
      }, error => {
        this.fetchingBeers = false;
        console.log('Error while fetching beers');
        console.log(error);
        this.page--;
      });
    }
}

searchBeers(param) {
  if (!this.fetchingBeers && param !== '' && param !== ' ') {
    this.page = 0;
    this.fetchingBeers = true;
    const url = `${this.uri}?beer_name=${param}`;
    this.http.get<any[]>(url).subscribe((beers: any[]) => {
      this.fetchingBeers = false;
      this.beers = beers;
      // pass the data over to the component who is ovserving
      this.beersUpdated.next([...this.beers]);
    }, error => {
      this.fetchingBeers = false;
    });
  } else if (param === '' || param === ' ') {
    this.beers = [];
    this.getBeers();
  }
}

getFavorites() {
  let beers = localStorage.getItem('favs');
  beers = JSON.parse(beers);
  let ids = '';
  for (let i = 0; i < beers.length; i++) {
    ids += beers[i] + '|';
  }
  let url = `${this.uri}?ids=${ids}`;
  url = encodeURI(url);
  return this.http.get<any[]>(url);
}

getSimilar (beer) {
  const hop = beer.ingredients.hops[0].name;
  let url = `${this.uri}?hops=${hop}&page=1&per_page=3`;
  url = encodeURI(url);
  return this.http.get<any[]>(url);
}

resetBeers() {
  this.beers = [];
}

  getBeersUpdateListener() {
    return this.beersUpdated.asObservable();
  }
}
