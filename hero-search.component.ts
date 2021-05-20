/** Search hero
 *   5/20/2019
 * 
 *    part 6 of Angular.io/tutorial
 */

import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})
export class HeroSearchComponent implements OnInit {
  heroes$!: Observable<Hero[]>; //declare type Observable
  private searchTerms = new Subject<string>(); /**an RxJS Subject. a subject is both a souce of observable 
  values and an Observable itself. you can subscribt to a subject like for observables */

  constructor(private heroService: HeroService) { }

  //push a search term into the observable stream
  search(term: string): void{
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    /**passign new search term directly to searchHeroes() after every keystroke would hail
     * excessive HTTP requests, taxing server resources and burning through data plans. instead, we pipe
     * searchTerms observable through a sequence of RxJS operators that reduce the number of calls to searchHeroes(),
     * returning an observable of timely hero search results( each a Hero[])
     */
    this.heroes$ = this.searchTerms.pipe(
      //wait 300ms after each keystroke before considering the term. typically the min time for requests
      debounceTime(300),
      
      //ignore new term if saame as previous term. ensures a request is sent only if filter text changed
      distinctUntilChanged(),

      //switch to new search observable each time the term changes
      /** switchMap() calles the search service for each search term that makes it through debounce() and distinctUntilChanged()
       it calncels and discards previous search observables, returning tonly the latest search service observable*/
      switchMap((term: string) => this.heroService.searchHeroes(term)),
    );
  }

}
