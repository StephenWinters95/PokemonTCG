import { Component } from '@angular/core';
import { MyService } from '../services/card.service'
import { Injectable } from '@angular/core';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  apiKey:string = "3a03ece2-7cfe-4c10-8d83-ef69d98692c4"; // not working
  buttonState:boolean = false;
  num:number = 0;
  Back_But:boolean = false;
  Names:string[] = ["base1","base2","base3","base4","base5","base6","gym1","gym2","neo1","neo2","neo3","neo4"]; // array of all pokemon cards sets 15 in total  // ,"ecard1","ecard2","ecard3"
  SetNames:string[] = ["Base Set", "Jungle Set", "Fossil Set", "Base Set 2", "Rocket Set", "Legendary Set" , "Gym Heros Set" , "Gym Challenge Set", "Neo Genesis Set", "Neo Discovery Set", "Neo Revelations Set", "Neo Destiny Set", "Expedition Set", "Aquapolis Set", "Skyridge Set"]                                                               
  AllSets:any[] = []
  i:number = 0;

  constructor(private myService: MyService) {
    for(this.i = 0;this.i < 15; this.i++)
    {
      this.AllSets[this.i] = new PokeSet(this.Names[this.i], this.SetNames[this.i])
    }
    this.myService.updateArray(this.AllSets);
    console.log(this.AllSets)
  }

log(set_num:number ,index: number){

  this.AllSets[set_num].Cards[index].owned = true;
  console.log(this.AllSets[set_num].Cards[index])
  console.log(set_num, index)
  this.myService.updateArray(this.AllSets)
}

update(){
  if(PokeSet.setBut == false)
  {
    this.Back_But = false;
  }
  else
  {
    this.Back_But = true;
  }
  for(this.i = 0;this.i < 15;this.i++)
  {
    this.AllSets[this.i].html_button = false;
  }
}

back(){
for(this.i = 0;this.i < 15;this.i++)
{
  this.AllSets[this.i].display_set = false;
}
for(this.i = 0;this.i < 15;this.i++)
  {
    this.AllSets[this.i].html_button = true;
  }
  this.Back_But = false;
}
} // end of main class

/////////////////////
// card interfaces //
/////////////////////

export interface Pokemon_Card{
  name:string;
  owned: boolean;
  Attack_Name: string[];
  Attack_Damage: number[];
  Attack_Cost: string[];
  Attack_Text: string[];
  nationalPokedexNum: number;
  RetreatCost: string[];
  HP: number;
  id: string;
  rarity: string;
  imageURL: string;
  imageHighRes: string;
  number: number;
  subType: string;
  supertype: string;
  text: string;
  types: string[];
  weaknesses: any[];
}

export interface Trainer_Card{
  
  name: string;
  artist: string;
  id : string;
imageURL: string;
imageUrlHiRes: string;
number: number;
rarity: string;
series:string;
set: string;
setCode:string;
subtype:string;
supertype:string;
text: any[];
owned: boolean;
}

export interface Energy_Card{
  name:string;
  id: string;
  rarity: string;
  imageURL: string;
  imageHighRes: string;
  number: number;
  subType: string;
  superType: string;
  owned: boolean;
}

type Card = Pokemon_Card | Trainer_Card | Energy_Card;

////////////////////////////
// End of Card interfaces //
////////////////////////////

export class PokeSet{

  constructor(set:string, Name:string){
    this.GetSet(set , this.Cards)
    this.SetName = Name
  }

  static setBut:boolean = true;
  display_set:boolean = false;
  Cards:Card[] = [];
  html_index:number = 0;
  html_button:boolean = true;
  SetName:string = ""


  display(){
    PokeSet.setBut = true;
    this.display_set = true;
  }

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                        // API CALL
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  GetSet = async (set:string, Collection:Card[]): Promise<void> => {
  
    const url = "https://api.pokemontcg.io/v1/cards?setCode=" + set + "&apiKey='3a03ece2-7cfe-4c10-8d83-ef69d98692c4'";
  
    const data: Response = await fetch(url)
    const input: any = await data.json()
    
    
   

  for(var i= 0; i < input.cards.length ;i++)
  {
    
    var attackName: string[] = [];
    var attackDamage: number[] = [];
    var attackCost: any[] = [];
    var attackText: string[] = [];
    var Retreat: string[] = [];
    var weak: any[] =[];
    var setName: string = "";
  
     if(input.cards[i].supertype === "Pokémon") 
    {
      
      if(input.cards[i].attacks != undefined){

      
      for (var j = 0; j < input.cards[i].attacks.length;j++)
      {
          attackName[j] = input.cards[i].attacks[j].name
          attackDamage[j] = input.cards[i].attacks[j].damage
          attackCost[j] = input.cards[i].attacks[j].cost
          attackText[j] = input.cards[i].attacks[j].text
      }
    }
      try{
        Retreat = input.cards[i].retreatCost;
        weak = input.cards[i].weaknesses
      }
      catch(error)
      {
        console.log(error)
      }
  
      const newPokemon = { name: input.cards[i].name , owned: false , Attack_Name: attackName ,
        Attack_Damage: attackDamage, Attack_Cost: attackCost, Attack_Text: attackText , RetreatCost: Retreat,
        HP: input.cards[i].hp, id: input.cards[i].id ,rarity: input.cards[i].rarity,
        imageURL: input.cards[i].imageUrl , imageHighRes: input.cards[i].imageUrlHiRes , number: input.cards[i].number,
        subType: input.cards[i].subtype, supertype: input.cards[i].supertype ,  text: input.cards[i].text ,
        types: input.cards[i].types , weaknesses: weak, nationalPokedexNum: input.cards[i].nationalPokedexNumber
        };
  
        Collection[input.cards[i].number - 1] = newPokemon;
    }
    else if(input.cards[i].supertype === "Trainer")
    {
  
      const Trainer = {
        name: input.cards[i].name,
        artist: input.cards[i].artist,
        id: input.cards[i].id,
        imageURL: input.cards[i].imageUrl,
        imageUrlHiRes: input.cards[i].imageUrlHiRes,
        number: input.cards[i].number,
        rarity: input.cards[i].rarity,
        series: input.cards[i].series,
        set: input.cards[i].set,
        setCode: input.cards[i].setCode,
        subtype: input.cards[i].subtype,
        supertype: input.cards[i].supertype,
        text: input.cards[i].text,
        owned:false
      }
  
      Collection[input.cards[i].number - 1] = Trainer
    }
    else if(input.cards[i].supertype === "Energy")
    {
  
      const newEnergyCard = {
        name: input.cards[i].name,
        id: input.cards[i].id,
        rarity: input.cards[i].rarity,
        imageURL: input.cards[i].imageUrl,
        imageHighRes: input.cards[i].imageHighRes,
        number: input.cards[i].number,
        subType: input.cards[i].subType,
        superType: input.cards[i].superType,
        owned:false
      };
  
      Collection[input.cards[i].number - 1] = newEnergyCard;
  
    }
  }
  
  
  this.GetMissing(set,Collection)

  }
  
  GetMissing = async (set:string, Collection:Card[]): Promise<void> => {
    for (var i = 1; i < Collection.length; i++) {
      
      if  (Collection[i] === undefined) {
        await this.Find(i + 1, set, Collection);
      }
      

      if (set === "gym1" && Collection[131] === undefined)
      {
        console.log("Here")
        await this.Find(132, set, Collection);
      }
    }
    
  }
  
  Find = async (id: number, set:string, Collection: Card[]): Promise<void> => {
    const data: Response = await fetch("https://api.pokemontcg.io/v1/cards?id=" + set + "-" + id)
    const input: any = await data.json()
  
    var attackName: string[] = [];
    var attackDamage: number[] = [];
    var attackCost: any[] = [];
    var attackText: string[] = [];
    var Retreat: string[] = [];
    var weak: any[] =[];

   
    
  
     if(input.cards[0].supertype === "Pokémon") 
    {
  
      for (var j = 0; j < input.cards[0].attacks.length;j++)
      {
          attackName[j] = input.cards[0].attacks[j].name
          attackDamage[j] = input.cards[0].attacks[j].damage
          attackCost[j] = input.cards[0].attacks[j].cost
          attackText[j] = input.cards[0].attacks[j].text
      }
  
      try{
        Retreat = input.cards[0].retreatCost;
        weak = input.cards[0].weaknesses
      }
      catch(error)
      {
        console.log(error)
      }
  
      const newPokemon = { name: input.cards[0].name , owned: false , Attack_Name: attackName ,
        Attack_Damage: attackDamage, Attack_Cost: attackCost, Attack_Text: attackText , RetreatCost: Retreat,
        HP: input.cards[0].hp, id: input.cards[0].id ,rarity: input.cards[0].rarity,
        imageURL: input.cards[0].imageUrl , imageHighRes: input.cards[0].imageUrlHiRes , number: input.cards[0].number,
        subType: input.cards[0].subtype, supertype: input.cards[0].supertype ,  text: input.cards[0].text ,
        types: input.cards[0].types , weaknesses: weak, nationalPokedexNum: input.cards[0].nationalPokedexNumber
        };
  
        Collection[input.cards[0].number - 1] = newPokemon;
        
    }
    else if(input.cards[0].supertype === "Trainer")
    {
  
      const Trainer = {
        name: input.cards[0].name,
        artist: input.cards[0].artist,
        id: input.cards[0].id,
        imageURL: input.cards[0].imageUrl,
        imageUrlHiRes: input.cards[0].imageUrlHiRes,
        number: input.cards[0].number,
        rarity: input.cards[0].rarity,
        series: input.cards[0].series,
        set: input.cards[0].set,
        setCode: input.cards[0].setCode,
        subtype: input.cards[0].subtype,
        supertype: input.cards[0].supertype,
        text: input.cards[0].text,
        owned:false
      }
  
      Collection[input.cards[0].number - 1] = Trainer
    
    }
    else if(input.cards[0].supertype === "Energy")
    {
  
      const newEnergyCard = {
        name: input.cards[0].name,
        id: input.cards[0].id,
        rarity: input.cards[0].rarity,
        imageURL: input.cards[0].imageUrl,
        imageHighRes: input.cards[0].imageHighRes,
        number: input.cards[0].number,
        subType: input.cards[0].subType,
        superType: input.cards[0].superType,
        owned:false
      };
  
      Collection[input.cards[0].number - 1] = newEnergyCard;
    
      
    }
  }

}