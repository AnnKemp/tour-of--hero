import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { MessageService } from './message.service';


@Injectable({
  providedIn: 'root' // here comes the provider from the data
})
export class HeroService {
  private heroesUrl = 'api/heroes'; // URL to web api

  constructor(private http: HttpClient, private messageService: MessageService) { }

  private log(message: string){
    this.messageService.add(`HeroService: ${message}`);
  }
  private handleError<T>(operation = 'operation', result?: T){
    return(error: any): Observable<T> =>{
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
// GET heroes from the server
  getHeroes(): Observable<Hero[]> {  // dit werkt!
    // to send message after fetching the heroes, dan moet hier de log(message); worden aangeroepen
    return this.http.get<Hero[]>(this.heroesUrl)
    .pipe(
      tap(_=> this.log('fetched heroes')), // nog eens opzoeken wat die underscore exact betekent
      catchError(this.handleError<Hero[]>('getHeroes', []))
    );
     // de array met de objecten die je hebt gemaakt in een .ts file,  
  }

  getHero(id: number): Observable<Hero> {
    const url= `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_=> this.log(`fetched hero id=${id}`))
      );
    
    // to send message after fetching the heroes
    //this.messageService.add(`HeroService: fetched hero id=${id}`);
    //return of(HEROES.find(hero => hero.id === id)); // de array met de objecten die je hebt gemaakt in een .ts file, daarin moet je één specifieke hero vinden
  }
  // PUT/ update the hero on the server
  httpOptions = {
    headers: new HttpHeaders({'Content-type': 'application/json'})
  }
  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
      tap(_=> this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }
  // POST: add a new hero to the server
  addHero(hero: Hero): Observable<Hero>{
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
      tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }
  // DELETE: delete the hero from the server
  deleteHero(hero: Hero | number): Observable<Hero>{
    const id= typeof hero === 'number' ? hero : hero.id;
    const url= `${this.heroesUrl}/${id}`;

    return this.http.delete<Hero>(url, this.httpOptions).pipe(
      tap(_=> this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }
  // GET heroes whose name contains search term
  searchHeroes(term: string): Observable<Hero[]>{
    if(!term.trim()){
      // if not search term, return empty hero array
      return of([]);
    }
    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
        this.log(`found heroes matching "${term}"`):
        this.log(`no heroes matching "${term}"`)),
        catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
  }
}
