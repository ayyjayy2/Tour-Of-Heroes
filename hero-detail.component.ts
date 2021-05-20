/* details page
  5/17/2021
  
   - displays details of the selected hero from the heroes component
   - gets details through @Input selector 
   
  5/18/2021
    - added param'd routes */

import { Component, OnInit, Input } from '@angular/core'; /*the hero property must be an Input
property, annotated with the @Input() decorator bc the external HeroesComponent wi */
import { Hero } from '../hero';
import { ActivatedRoute } from '@angular/router'; //holds info about route to this instance. deals w/ route's params extracted from URL where 'id' param is the id of the hero
import { Location } from '@angular/common'; //an angular service for interacting w browser
import { HeroService } from '../hero.service'; //gets hero data from remote server and this comp uses it to get hero to display

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  hero: Hero | undefined;
  //@Input() hero?: Hero; //changed after added param'd routes -> @Input decorator is needed to get data from first page

  constructor(private route: ActivatedRoute, private heroService: HeroService, private location: Location) { }

  ngOnInit(): void {
    this.getHero();
  }

  //extract id route param
  getHero(): void {
    /** route.snapshot: a static image of the route info shortly after the comp was created
     *  paramMap: a dictionary of route param values extracted from the URL. the 'id' key returns the id of the hero to fetch
     *  Number: js function that converts the string to number (route params are always strings), which is waht a hero id should be     */
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.heroService.getHero(id).subscribe(hero => this.hero = hero);
  }

  goBack(): void {
    this.location.back();
  }

  //part 6: persists hero name changes using hero service updateHero() then nav's back to previous view
  save(): void{
    if(this.hero){
      this.heroService.updateHero(this.hero).subscribe(() => this.goBack());
    }
  }

}
