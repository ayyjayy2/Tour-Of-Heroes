/** service layer
 *   5/17/2021
 * 
 *   - createdUsing: ng g s hero
 *   - services could retrieve data from a web service, local storage, or mock data
 * 
 *   5/18/2021
 *   - step 6: incorporating HttpClient to get data from a server
 */

import { Injectable } from '@angular/core'; /** Injectable marks the class as one 
that's included in the dependency injection system. aka it provides an injectable
service. */
import { HttpClient, HttpHeaders } from '@angular/common/http'; //step 6
import { Hero } from './hero';
//import { HEROES } from './mock-heroes';

/** Observable operators help minimize  # of similar HTTP requests & consume network bandwidth economically */
import { Observable, of } from 'rxjs'; //simulate getting data from server with rxjs of() function
import { MessageService } from './message.service';
import { catchError, map, tap } from 'rxjs/operators'; //part 6

//@Injectable decorator accepts a metadata object for service
@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private heroesUrl = 'api/heroes'; //URL to web api in form :base/:collectionName where base is resource to which requests are made and collName is the heroes data object in 'in-memory-data-service.ts'
  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }; //part 6

  // 'service-in-service' MessageService->HeroService->HeroesComponent
  constructor(private http: HttpClient, private messageService: MessageService) { }

  //method to return all mock heroes
  getHeroes(): Observable<Hero[]> {
    /**const heroes = of(HEROES); 
    this.messageService.add('HeroService: fetched heroes'); //sends message when heroes are fetched
    return heroes; */
    
    /**part 6: convert to use HttpClient instead of RxJs's of() but both return as an Observable<Hero[]>
    Hero Service will 'tap' into the flow of observable values. RxJS tap() looks at observable values, does something
    with them and passes them along (but doesn't touch values themselves) */
    return this.http.get<Hero[]>(this.heroesUrl) //httpClient.get() returns body of the response as untyped JSON object & adding optional type specifier, <Hero[]> adds ts capabilities, reducing errors during compile time  
    .pipe(
        tap(_ => this.log('fetched heroes')),
        catchError(this.handleError<Hero[]>('getHeroes', []))); //handleError() reports error then returns innocuous result so app keeps working
  }


  /** added after param'd routes: returns an Observable of Hero Objects rather than an observable of hero arrays like the above method
  part 6: GET hero by id. Gets 404 if id not found */
  getHero(id: number): Observable<Hero>{
    /** const hero = HEROES.find(h => h.id === id)!;
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    return of(hero); 
    part 6: */
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  //part 6: Log a HeroService message with the MessageService
  private log(message: string){
    this.messageService.add('heroService: ${message}');
  }


  /** part 6: Handle http operation that failed and let the app continue
   * @param operation - name of the operation that failed
   * @param result = optional value to return as the observable result  
   * T is 'type' param to return safe value as teh type that app expects */
  private handleError<T>(operation = 'operation', result?: T){
    return (error: any): Observable<T> => {
      //TODO: send error to remote logging infrastructure
      console.error(error); 

      //TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      //let the app keep running by returning empty result
      return of(result as T);
    };
  }

  //part 6: PUT: UPDATE HERO ON SERVER 
  updateHero(hero: Hero): Observable<any>{
    return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe( //HttpClient.put() takes params (url, data to update (modified hero in this case), options)
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }


  //part 6: POST : ADD NEW HERO TO SERVER. expects server to generate an id for new hero, which it reutrns in the Observable<Hero> to caller. idk what happens with the role
  addHero(hero: Hero): Observable<Hero>{
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
      tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id} and role=${newHero.role}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }


  //part 6: DELETE: DELETE HERO FROM SERVER
  deleteHero(id: number): Observable<Hero>{
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<Hero>(url, this.httpOptions).pipe( //calls HttpClient.delete()
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }


  //part 6: GET HEROES WHOS NAME CONTAINS SEARCH ITEM
  searchHeroes(term: string): Observable<Hero[]> {
    if(!term.trim()){
      //if not search term, return empty hero array
      return of([]);
    }
    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
        this.log(`found heroes matching "${term}"`) :
        this.log(`no heroes matching "${term}"`)),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
  }
}
