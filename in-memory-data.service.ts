/** Step 6: Simulate a data server
 *   5/18/2021
 * 
 *    - mimics communication with a remote data server using the 'In-memory Web API' module
 *    - npm i angular-in-memory-web-api --save
 */

import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Hero } from './hero';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDataService {

  constructor() { }

  createDb(){
    const heroes =[
      { id: 11, name: 'Dr Nice', role: 'Brings kindness to the people' },
      { id: 12, name: 'Spin-ache', role: 'Brings Spinache to the lands' },
      { id: 13, name: 'Bombasto', role: 'Stops bombs from detinating' },
      { id: 14, name: 'Celeritas', role: 'Brings celery to the lands' },
      { id: 15, name: 'Magneta', role: 'Goddess of magnets' },
      { id: 16, name: 'Rubberoe', role: 'Ability to stretch body in all directions'},
      { id: 17, name: 'Dynama', role: 'Goddess of controlling dynamics'},
      { id: 18, name: 'Dr IQ', role: 'Smartest being alive' },
      { id: 19, name: 'Magma', role: 'Goddess of volcanoes' },
      { id: 20, name: 'Tornado', role: 'Controller of all winds' }
    ];
    return {heroes};
  }

  /** Overrides the genId method to ensure that a hero always has an id.
   * if the heroes array is empty, the method below returns the initial number(11). 
   * if the heroes array is not empty, the method below returns the highest hero id+1 */
  genId(heroes: Hero[]): number {
    return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.id)) + 1 : 11;
  }
  
}
