import { Injectable } from '@angular/core';
import { PokemonTCG } from 'pokemon-tcg-sdk-typescript';
import { Card } from 'pokemon-tcg-sdk-typescript/dist/sdk';


@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor() { }

}

@Injectable()
export class MyService {
  private myArray: any[] = [];

  constructor() { }

  addToMyArray(item: any) {
    this.myArray.push(item);
  }

  updateArray(Array: any[]){
    this.myArray = Array;
  }

  getMyArray() {
    return this.myArray;
  }
}