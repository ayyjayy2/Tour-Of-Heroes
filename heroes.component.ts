/* Heroes page
   5/17/2021
   
   - displays a list of selectable heros
   - sends data to details component
   
   - components shouldn't fetch/save data directly. They present/delegate data access to a service*/

import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
//import { HEROES } from '../mock-heroes'; //not needed after incorporating the service layer
import { HeroService } from '../hero.service';

/* @Component is a decorator function that specifies the angular metadata
for the component */
@Component({
  selector: 'app-heroes', //identification of this component within a parent component's template
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
/* OnInit is a lifecycle hook. ALWAYS export the component class so it can
be imported elsewhere */
export class HeroesComponent implements OnInit {
  //heroes = HEROES; //HEROES comes from the mock-heroes interface before service layer is added
  heroes: Hero[] = [];

  //object of type Hero. ? represents an object without a value but lets it exist
  selectedHero?: Hero;

  // first stage before using an interface
  // hero: Hero = {
  //   id: 1,
  //   name: 'Windstorm',
  //   role: 'God of the wind'
  // };

  //dependency injection. defines heroService as a HeroService injection site
  constructor(private heroService: HeroService) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

  //retrieve heroes from service
  getHeroes(): void {
    //retrieves heroes synchronously. this method only works with mock data rn -> we will make it asynchronous to work with others
    //this.heroes = this.heroService.getHeroes();

    //use the below after including rxjs in service to make asynchronous. this.heroService.getHeroes() is the Observable in this case
    this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes);
  }

}
