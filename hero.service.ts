/** service layer
 *   5/17/2021
 * 
 *   - createdUsing: ng g s hero
 *   - services could retrieve data from a web service, local storage, or mock data
 */

import { Injectable } from '@angular/core'; /** Injectable marks the class as one 
that's included in the dependency injection system. aka it provides an injectable
service. */
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable, of } from 'rxjs'; //simulate getting data from server with rxjs of() function

//@Injectable decorator accepts a metadata object for service
@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor() { }

  //method to return all mock heroes
  getHeroes(): Observable<Hero[]> {
    const heroes = of(HEROES);
    return heroes;
  }
}
