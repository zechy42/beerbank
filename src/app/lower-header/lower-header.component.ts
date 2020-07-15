import { BeerService } from './../beer.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { fromEvent } from 'rxjs';
import { throttleTime } from 'rxjs/operators';

@Component({
  selector: 'app-lower-header',
  templateUrl: './lower-header.component.html',
  styleUrls: ['./lower-header.component.css']
})
export class LowerHeaderComponent implements OnInit {

  param: String;

  textBox;

  constructor(protected beerService: BeerService) { }

  ngOnInit() {
    this.textBox = document.getElementById('mainSearch');
    const typed = fromEvent(this.textBox, 'keyup');
    const subscription = typed.pipe(throttleTime(100))
    .subscribe((event) => {
      this.onSearch();
    });
  }

  onSearch() {
    this.beerService.searchBeers(this.param);
  }

}
