/** Main component
 *  5/17/2021
 * 
 *  - follows tutorial from: https://angular.io/tutorial/toh-pt3
 *  - Tour Of Heroes Angular Project displays a list of heroes and sends details
 *    to a different component to display on the same screen of a selected hero
 */

import { Component } from '@angular/core';

@Component({
  selector: 'app-root', //component's css element selector
  templateUrl: './app.component.html', //location of component's template file
  styleUrls: ['./app.component.css'] //location of the component's private css styles
})
export class AppComponent {
  title = 'Tour Of Heroes';
}
