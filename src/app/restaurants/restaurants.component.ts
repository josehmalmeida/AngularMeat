import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations'
import { FormBuilder, FormControl, FormGroup } from '@angular/forms'
import { Observable } from 'rxjs/Observable'

import { Restaurant } from './restaurant/restaurant.model'
import { RestaurantsService } from './restaurants.service'

import 'rxjs/add/operator/do'
import 'rxjs/add/operator/switchMap'
import 'rxjs/add/operator/debounceTime'
import 'rxjs/add/operator/distinctUntilChanged'
import 'rxjs/add/operator/catch'
import 'rxjs/add/observable/from'

@Component({
  selector: 'mt-restaurants',
  templateUrl: './restaurants.component.html',
  animations: [
    trigger('toggleSearch', [
      state('hidden', style({
        "opacity": "0",
        "max-height": "0px"
      })),
      state('visible', style({
        "opacity": "1",
        "margin-top": "20px",
        "max-height": "70px"
      })),
      transition('* => *', animate('250ms 0s ease-in-out'))
    ])
  ]
})

export class RestaurantsComponent implements OnInit {

  searchBarState: string
  restaurants: Restaurant[]
  searchForm: FormGroup
  searchControl: FormControl
  @ViewChild('iptSearch') searchBar: ElementRef

  constructor(private restaurantService: RestaurantsService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.searchControl = this.formBuilder.control('')
    this.searchForm = this.formBuilder.group({ searchControl: this.searchControl })
    this.searchControl.valueChanges
      .debounceTime(500)
      .distinctUntilChanged()
      .switchMap(searchTerm => this.restaurantService
        .restaurants(searchTerm)
        .catch(error => Observable.from([])))
      .subscribe(restaurants => this.restaurants = restaurants)
    this.restaurantService.restaurants()
      .subscribe(restaurants => this.restaurants = restaurants)
  }
  toggleSearch() {
    if (this.searchBarState === 'visible') {
      this.searchBarState = 'hidden'
    } else {
      this.searchBarState = 'visible'
      this.searchBar.nativeElement.focus()
    }
  }
}
