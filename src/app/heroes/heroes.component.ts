import { Component, OnInit } from '@angular/core';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';
 
@Component({ // a decorator function
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})

export class HeroesComponent implements OnInit {
  //selectedHero: Hero;
  heroes: Hero[];
  
  constructor(private heroService: HeroService) { }

  ngOnInit(): void { 
    this.getHeroes();
     // ngOnInit() is a lifecycle hook
    // put initialization logic here
  }
  /*onSelect(hero: Hero): void { // to get one hero, the selected one
    this.selectedHero = hero;
    this.messageService.add(`HeroesComponent: Selected hero id=${hero.id}`); // backticks zijn suuuper belangrijk, anders werkt het niet!
  }*/

  getHeroes():void{ // to get all heroes
    this.heroService.getHeroes() 
      .subscribe(heroes => this.heroes = heroes);// dit gaat normaal gezien via de HttpClient en RxJS Observables voor assynchroon data ophalen van een externe bron
  }
  add(name: string):void{
    name = name.trim(); // trim removes whitspaces from both sides
    if(!name){ return; }
    this.heroService.addHero({name} as Hero) // when addHero() saves successfully, the subscribe() callback receives the new hero and pushes it into to the heroes list for display
      .subscribe(hero => {
        this.heroes.push(hero);
    })
  }
  delete(hero: Hero): void{
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero).subscribe();
  }

}
