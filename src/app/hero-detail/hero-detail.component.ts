import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common'

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})

export class HeroDetailComponent implements OnInit {
hero: Hero; // this component receives a hero object through it's hero property and displays it

  constructor(
    private route: ActivatedRoute, // ActivatedRoute en Location zijn ook services dus moeten geïnjecteerd worden
    private heroService: HeroService,
    private location: Location
  ) {}
  // The ActivatedRoute holds information about the route to this instance of the HeroDetailComponent.
  // This component is interested in the route's parameters extracted from the URL. The "id" parameter is the id of the hero to display.
  // The location is an Angular service for interacting with the browser. to navigate back to a view
  ngOnInit(): void {
    this.getHero();
  }
  getHero(): void{
    const id = +this.route.snapshot.paramMap.get('id');
    // the route.snapshot is a static image of the route information shortly after the component was created
    // the paramMap is a dictionary of route parameter values extracted from the URL, the id key returns the id of the hero to fetch
    //route parameters are always strings, the javaScript (+) operator converts teh string to a number which is what a hero id should be

    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }
  goBack():void{
    this.location.back();
  }
  save():void{ // to go to the heroservice to update the name with the recently made changes
    this.heroService.updateHero(this.hero).subscribe(() => this.goBack()); // goBack is to navigate back to the previous view
  }

}
