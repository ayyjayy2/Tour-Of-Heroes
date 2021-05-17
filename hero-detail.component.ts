/* details page
  5/17/2021
  
   - displays details of the selected hero from the heroes component
   - gets details through @Input selector */

import { Component, OnInit, Input } from '@angular/core'; /*the hero property must be an Input
property, annotated with the @Input() decorator bc the external HeroesComponent wi */
import { Hero } from '../hero';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  @Input() hero?: Hero; //@Input decorator is needed to get data from first page

  constructor() { }

  ngOnInit(): void {
  }

}
