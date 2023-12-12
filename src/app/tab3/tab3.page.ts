import { Component } from '@angular/core';
import { Server } from 'http';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})

export class Tab3Page {

  /////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////
  /////////////////////         Variables                  ////////////////////////                    
  /////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////
  
  //boolean values for display buttons
 
  public Hand:boolean = true;
 public OpponentMain:boolean = false;
 public UserMain:boolean = false;
 public DuelMain:boolean = true;
 public Attack1:boolean = false;

 public BackButton:boolean = false;
 public Rules:boolean = true;

 public Bench1:boolean = false;
 public Bench2:boolean = false;
 public Back:boolean = false;
 public RulesHTML:boolean = false;
 public DeckConfig:boolean = true;
 public DeckConfig2:boolean = false;

 User_Deck:(number[]) =  [0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2]
 // [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59]
 User_Hand:(number[]) = []
 Bench:(number[]) = []
 discard_pile:(number[]) = []
 User_Prize:(number[]) = []

 allPokemon: Pokemon[] = []

 
 // cards and buttons fro dispaly hand 
 HandButtons:boolean[] = []
 HandCards:boolean[] = []
 HandButValues:string[] =[]
 User_Bench:boolean[] =[]
 Msg:string[] = []

 Opp_Deck:(number[]) = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60]
 Opp_User_Hand:(number[]) = []
 Opp_Bench:(number[]) = []
 Opp_discard_pile:(number[]) = []
 Opp_Prize:(number[]) = []

 //used for displayRules, displayDeckConfig Methods
count:number = 0;
count2:number = 0;
count3:number = 0;

 // variables to declare main user pokemon
 public MainPoId:number = -1;
 public MainPoName: string = "";
 public MainPoHP: number = 0;
 public MainPoAttack: number = 0;
 public MainPoDefence: number = 0;
 public MainPoMove1: string = "";
 public MainPoMove2: string = "";
 public MainPoPic: string = "";
 public MainPoType: string = "";

 public MainPoHP2: number = -1;

// variables to declare opponent user pokemon
 public OppPoId:number = -1;
 public OppPoName: string = "";
 public OppPoHP: number = 0;
 public OppPoAttack: number = 0;
 public OppPoDefence: number = 0;
 public OppPoMove1: string = "";
 public OppPoMove2: string = "";
 public OppPoPic: string = "";
 public OppPoType: string = "";

 public OppPoHP2: number = 0;

   /////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////
  /////////////////////        End Of  Variables                  ////////////////////////                    
  /////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////


 ////////////////// Constructor //////////////////////////////////
  constructor() {
    
    this.fetchData();
    // AI addition
    this.allPokemon.sort((a , b) => a.id - b.id);
    this.TestSet()
    
    
  }

  gameBegins(){
    //initiates all display hand button booleans to false;
    this.HandButtonsSet(true);
    this.HandCardsSet(true)
    this.HandButValuesSet()
    //this.allPokemon.sortBy({id: "desc"})
    console.log(this.allPokemon)
    this.allPokemon.sort((a , b) => a.id - b.id);
    console.log(this.allPokemon)
   
    if(this.DuelMain === true)
    {
      this.DuelMain = false;
      this.UserMain = true;
      this.DeckConfig = false;
    }
    
    this.shuffleArray(this.User_Deck)
    this.shuffleArray(this.Opp_Deck)
    for(var i = 0;i < 7;i++)
    {
      this.drawCard()
      this.OppdrawCard()
    }
    this.UpdateMsg("Both Players have drawn 7 cards")
    for(i = 0;i<6;i++)
    {
      this.UsersetPrize()
      this.OppsetPrize()
    }
    this.UpdateMsg("Both Players have placed 6 prizes down")
  
    this.displayHandStart()
    this.OppSetUp()
    this.ChangeOppMainPo(this.Opp_Bench.pop()!)
    this.UpdateMsg("Opponents main Pokemon is " + this.OppPoName)
    
    
  }



  
  displayHandStart()
  {
    this.UserMain = false;
    this.UpdateButtons()
    this.UpdateCards()
    

    this.BackButton = true;
    // this.Bench1 = true;
    this.Bench2 = true;
  }


  
  // allows a user to place a pokemon on the bench at the start to make it the main, allows a user to place apokemon on the bench anytime during game and allows a user to evolve a
  // pokemon
  PlaceOnBench(id:number)
  {
    if(this.MainPoHP2 === 0)
    {
        this.ChangeMainPo(this.Bench[id])
    }
    else{

    

    if(this.count3 === 0)
    {
      this.ChangeMainPo(this.User_Hand[id])
      this.count3++;
    }
    else if(this.allPokemon[this.User_Hand[id]].evolvesFrom !== "blank" && this.Bench.includes(this.allPokemon[this.User_Hand[id]].id - 2))
    {
      console.log("Here")
      for(let i = 0; i < this.Bench.length; i++)
      {
        // needs to be -2 as the id number in array is 1 lower than id, e.g pokemon[23].id == 24, need to find the id of the pokemon behind it
          if(this.Bench[i] === this.allPokemon[this.User_Hand[id]].id - 2)
          {
            this.UpdateMsg("User evolves " + this.allPokemon[this.Bench[i]].name + " into " + this.allPokemon[this.User_Hand[id]].name)
            this.Bench[i]++
            i = this.Bench.length
            // var temp = this.allPokemon[this.User_Hand[id]].id - 2
            
      }
      }
    }
    else
    {
      this.Bench.push(this.User_Hand[id]);
      this.UpdateMsg("User places " + this.allPokemon[this.User_Hand[id]].name)
    }
  }
  if(this.HandButValues[id] === "Play Next")
  {
    this.Bench.splice(id, 1);
    this.displayScreen()
  }
  else{
    this.User_Hand.splice(id, 1);
    this.UpdateButtons()
    this.UpdateCards()
  }
 

    
    
    
  }

  
attack1(){
    var damage:number = (30 * this.MainPoAttack/100 ) * this.OppPoDefence/70 ;
    const temp:number = damage % 1;
    damage = damage - temp;
    console.log(damage)
    this.OppPoHP2 = this.OppPoHP2 - damage;
    if(this.OppPoHP2 <= 0)
    {
      this.OppPoHP2 = 0;
    }
    this.UpdateMsg("User attacks with " + this.MainPoMove1 + " causing " +  damage + " Damage")
    this.check()
    this.OppTurn()
    }

attack2(){
  var damage:number = (50 * this.MainPoAttack/100 ) * this.OppPoDefence/70 ;
  const temp:number = damage % 1;
  damage = damage - temp;
  console.log(damage)
  this.OppPoHP2 = this.OppPoHP2 - damage;
  if(this.OppPoHP2 <= 0)
    {
      this.OppPoHP2 = 0;
    }
  this.UpdateMsg("User attacks with " + this.MainPoMove2 + " causing " +  damage + " Damage")
  this.check()
  this.OppTurn()
}

OppAttack(){ 
  var count = 0;
  var Dam = 0;
  var move = ""
  if(count % 2 === 1)
  {
    Dam = 30;
    move = this.OppPoMove1;
  }
  else{
    Dam = 50;
    move = this.OppPoMove2;
  }
  count++;
  var damage:number = (Dam * this.OppPoAttack/100 ) * this.MainPoDefence/70 ;
  const temp:number = damage % 1;
  damage = damage - temp;
  this.MainPoHP2 = this.MainPoHP2 - damage;
  this.UpdateMsg("Opponent attacks using " + move + " Causing " + damage + " Damage")
  if(this.MainPoHP2 <= 0)
    {
      this.MainPoHP2 = 0;
    }
    this.check();
}
// to be run one at the start of the game so the opponent places basic pokemon from hand to bench ot start game
OppSetUp(){
  var temp:number[] = []
  for(var i = 0;i < this.Opp_User_Hand.length;i++)
{
  if(this.allPokemon[this.Opp_User_Hand[i]].evolvesFrom === "blank")
  {
      this.Opp_Bench.push(this.Opp_User_Hand[i])
      this.UpdateMsg( "Opponent places " + this.allPokemon[this.Opp_User_Hand[i]].name)
      temp.push(this.allPokemon[this.Opp_User_Hand[i]].id -1)
  }
}

//causing problems will try again later please hopefully it will work I really needa break from this, so help me sir

for(var i = 0;i < temp.length;i++)
{
   // AI addition
  this.Opp_User_Hand = this.Opp_User_Hand.filter((number) => number !== temp[i]);
  // this.Opp_User_Hand.splice(temp[i], 1);
  
}
}

OppTurn(){
  this.UpdateMsg("Opponents Turn")
  this.UpdateMsg("Opponent draws a card")
  this.OppdrawCard()
  var temp:number[] = []
for(var i = 0;i < this.Opp_User_Hand.length;i++)
{
  if(this.allPokemon[this.Opp_User_Hand[i]].evolvesFrom === "blank")
  {
      this.UpdateMsg("Opponent places " + this.allPokemon[this.Opp_User_Hand[i]].name)
      this.Opp_Bench.push(this.Opp_User_Hand[i])
      temp.push(this.Opp_User_Hand[i])
  }
}
for(var i = 0;i < temp.length;i++)
{
  this.Opp_User_Hand = this.Opp_User_Hand.filter((number) => number !== temp[i]);
  // this.Opp_User_Hand.splice(temp[i], 1);
  
}

this.OppAttack()
this.UserTurn()

}

UpdateMsg(sent:string){
  for(var i = 8; i >= 0;i--)
  {
    this.Msg[i] = this.Msg[i - 1]
  }
  this.Msg[0] = sent;
}

UserTurn(){
  this.UpdateMsg(" Users Turn")
  this.UpdateMsg(" User Draws a card")
  this.drawCard()
}

check(){
  if(this.OppPoHP2 <= 0)
  {
    if(this.Opp_Bench.length === 0)
  {
    this.UpdateMsg("You Win")
    window.alert("YOU WIN")
  }
  else{
  this.UpdateMsg( this.OppPoName + " HAS BEEN DEFEATED")
  this.UpdateMsg("User Draws a prize")
    this.UserdrawPrize()
    this.ChangeOppMainPo(this.Opp_Bench.pop()!)
  }
  }
  if(this.MainPoHP2 <= 0)
  {
    if(this.Bench.length === 0)
  {
    this.UpdateMsg("You Loose")
    window.alert("YOU LOOSE")
  }
  else{
  this.UpdateMsg( this.MainPoName + " HAS BEEN DEFEATED")
  this.UpdateMsg("Opponent draws a prize")
    this.OppdrawPrize()
    this.displayBench()
    // this.ChangeMainPo(this.Bench.pop()!)
  }
  }
  
  if(this.Opp_Prize.length === 0)
  {
    this.UpdateMsg("YOU LOOSE")
    window.alert("YOU LOOSE")
  }
  if(this.User_Prize.length === 0)
  {
    this.UpdateMsg("YOU WIN")
    window.alert("YOU WIN")
  }
  
}
displayBench()
{
  this.UserMain = false;
  this.Bench1 =true;
  this.Bench2 = false;
  this.BackButton = true;
  if(this.MainPoHP2 === 0)
  {
  this.UpdateBenchButtons()
  }
  for(var i = 0;i < this.Bench.length;i++)
  {
    this.User_Bench[i] = true;
  }
  for(var j = 6; j >= this.Bench.length;j--)
  {
        this.User_Bench[j] = false;
  }
}

  drawCard(){
    this.User_Hand.push(this.User_Deck.pop()!);
  }
  OppdrawCard(){
    this.Opp_User_Hand.push(this.Opp_Deck.pop()!);
  }
  UsersetPrize(){
    this.User_Prize.push(this.User_Deck.pop()!);
  }
  OppsetPrize(){
    this.Opp_Prize.push(this.Opp_Deck.pop()!);
  }
  UserdrawPrize(){
    this.User_Hand.push(this.User_Prize.pop()!)
  }
  OppdrawPrize(){
    this.Opp_User_Hand.push(this.Opp_Prize.pop()!)
  }

  HandButtonsSet(bool:boolean){
    for(var i = 0; i < 10;i++)
    {
      this.HandButtons[i] = bool;
    }
  }

  HandCardsSet(bool:boolean){
    for(var i = 0; i < 10;i++)
    {
      this.HandCards[i] = bool;
    }
  }

  HandButValuesSet(){
    for(var i = 0;i < 9;i++)
    {
      this.HandButValues[i] = "Place on Bench"
    }
  }

  TestSet(){
    for(var i = 0;i < 9;i++)
    {
      this.Msg[i] = "    "
    }
  }

  UserBenchSet(){
    for(var i = 0;i < 9;i++)
    {
      this.User_Bench[i] = false;
    }
  }

  shuffleArray(array:number[]|undefined[]) {
    for (var i = array.length - 1; i > 0; i--) {
       // AI addition
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
  }

  
  ChangeMainPo(id:number){
    this.MainPoId = this.allPokemon[id].id;
    this.MainPoName = this.allPokemon[id].name;
    this.MainPoHP  = this.allPokemon[id].HP;
    this.MainPoAttack  = this.allPokemon[id].Attack;
    this.MainPoDefence  = this.allPokemon[id].Defense;
    this.MainPoMove1  = this.allPokemon[id].Move1;
    this.MainPoMove2  = this.allPokemon[id].Move3;
    this.MainPoPic  = this.allPokemon[id].picURL;
    this.MainPoType = this.allPokemon[id].type;
    //this variable hold there changing HP
    this.MainPoHP2 = this.allPokemon[id].HP;
  }
  ChangeOppMainPo(id:number){
    this.OppPoId = this.allPokemon[id].id;
    this.OppPoName = this.allPokemon[id].name;
    this.OppPoHP  = this.allPokemon[id].HP;
    this.OppPoAttack  = this.allPokemon[id].Attack;
    this.OppPoDefence  = this.allPokemon[id].Defense;
    this.OppPoMove1  = this.allPokemon[id].Move1;
    this.OppPoMove2  = this.allPokemon[id].Move3;
    this.OppPoPic  = this.allPokemon[id].picURL;
    this.OppPoType = this.allPokemon[id].type;
     //this variable hold there changing HP
    this.OppPoHP2 = this.allPokemon[id].HP;
  }

  UpdateButtons(){
    for(var i = 0;i < this.User_Hand.length;i++)
    {
      if(this.allPokemon[this.User_Hand[i]].evolvesFrom === "blank")
      {
          this.HandButtons[i] = true;
          this.HandButValues[i] = "Place On Bench"
      }
      else{
        this.HandButtons[i] = false;
      }
    }
    for(var j = 10; j >= this.User_Hand.length;j--)
    {
          this.HandButtons[j] = false;
    }
  }

  UpdateButtons2(){
    for(var i = 0;i < this.User_Hand.length;i++)
    {
      if(this.allPokemon[this.User_Hand[i]].evolvesFrom === "blank")
      {
          this.HandButtons[i] = true;
      }
      else if(this.allPokemon[this.User_Hand[i]].evolvesFrom !== "blank" && this.Bench.includes(this.User_Hand[i] - 1) ){
          this.HandButtons[i] = true;
          this.HandButValues[i] = "Evolve"
      }
      else{
        this.HandButtons[i] = false;
      }
    }
    for(var j = 10; j >= this.User_Hand.length;j--)
    {
          this.HandButtons[j] = false;
    }
  }
//used to display buttons 
  UpdateCards(){
    for(var i = 0;i < this.User_Hand.length;i++)
    {
      
          this.HandCards[i] = true;
      
    }
    for(var j = 10; j >= this.User_Hand.length;j--)
    {
          this.HandCards[j] = false;
    }
  }
  //used to display bench cards
  UpdateCards2(){
    for(var i = 0;i < this.Bench.length;i++)
    {
      
          this.HandCards[i] = true;
      
    }
    for(var j = 10; j >= this.Bench.length;j--)
    {
          this.HandCards[j] = false;
    }
  }

  //causing issue in mobile version.
  UpdateBenchButtons(){
    for(var i = 0;i < this.Bench.length;i++)
    {
      this.HandButtons[i]= true;
      this.HandButValues[i] = "Play Next"
    }
    for(var j = 10; j >= this.Bench.length;j--)
    {
          this.HandButtons[j] = false;
    }
  }

  displayHand(){
    this.UserMain = false;
    this.UpdateCards()
    this.UpdateButtons2()
    //this.HandButtonsSet(true)
    this.BackButton = true;
    // this.Bench1 = true;
    this.Bench2 = true;
  }
  displayScreen(){
    
    this.UserMain = true;
    for(var i = 0;i < 10;i++)
    {
      this.HandButtons[i] = false;
      this.User_Bench[i] = false;
    }
    this.HandCardsSet(false)
    this.BackButton = false;
    this.Bench1 = false;
    this.Bench2 = false;
  }




  /////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////
  /////////////////////     Start of Deck Config     //////////////////////
  /////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////

  displayRules(){
    
    if(this.count % 2 === 0)
    {
    this.Back = true;
    this.RulesHTML = true;
    this.DuelMain = false;
    this.DeckConfig = false;

    }
    else{
    this.Back = false;
    this.RulesHTML = false;
    this.DuelMain = true;
    this.DeckConfig = true;
    }

    this.count++;
  }

  

  displayDeckConfig(){
    this.amountInDeck()
    this.allPokemon.sort((a , b) => a.id - b.id);
    if(this.count2 % 2 === 0)
    {
    this.Back = false;
    this.DuelMain = false;
    this.DeckConfig = true;
    this.DeckConfig2 = true;
    this.count2++;
    }
    else{
    if(this.User_Deck.length == 60)
    {
    this.Back = false;
    this.DuelMain = true;
    this.DeckConfig = true;
    this.DeckConfig2 = false;
    this.count2++;
    }
    else{
      window.alert("must have 60 cards in your deck")
    }
    }

    
  }
 // AI addition
  elementCount(arr: Array<number>, element: number): number{
    return arr.filter((currentElement) => currentElement == element).length;
   }

  amountInDeck(){

    if(this.count2 === 0)
    {
    var i =0;
    for(i = 0; i < 60; i++)
    {
      this.allPokemon[i].amount = 1;
    }
  }
}

Up(id:number){
  if(this.allPokemon[id].amount < 4)
  {
    this.User_Deck.push(id)
    this.allPokemon[id].amount++;
    console.log(this.User_Deck.length)
  }
}

Down(id:number){
    if(this.allPokemon[id].amount > 0)
    {
      const index = this.User_Deck.indexOf(id);
      if (index !== -1) {
      this.User_Deck.splice(index, 1);
      this.allPokemon[id].amount--;
    }
    }
  }

  /////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////
  /////////////////////       End of Deck Config     //////////////////////
  /////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////
                              //API CALL
  /////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////
  fetchData = (): void => {
    for (let i = 1; i <= 153; i++) {
      if(i == 132)
      {
      i++
      }
      this.getPokemon(i)
      // this.getPokemon2(i + 1)
    }
    console.log(this.allPokemon)
    this.allPokemon.sort((a, b) => a.id - b.id);

    
    
    
  }

  // taken from chatGPT 
  getPokemon = async (id: number): Promise<void> => {
    const data: Response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    const input: any = await data.json()

    var evolves = "blank"
    try{
    const response2 = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
    const data2 = await response2.json();
    evolves = data2.evolves_from_species.name
    }catch(error){

    console.log(error)
    }


    const pokemonType: string = input.types[0].type.name;
    const pokemonName: string = input.name
    const pokemonID: number = input.id
    const pokemonHP: number = input.stats[0].base_stat
    const pokemonHP2: number = input.stats[0].base_stat
    const pokemonAttack = input.stats[1].base_stat;
    const pokemonDefence = input.stats[2].base_stat;
    const pokemonMove1 = input.moves[0].move.name;
    const pokemonMove3 = input.moves[1].move.name;
    const pokemonpicURL = input.sprites.other["official-artwork"].front_default;
    const amount = 0;

    
    
    let temp: Pokemon = {
      id: pokemonID,
      name: pokemonName,
      HP: pokemonHP,
      HP2: pokemonHP2,
      Attack: pokemonAttack,
      Defense: pokemonDefence,
      Move1: pokemonMove1,
      Move3: pokemonMove3,
      picURL: pokemonpicURL,
      type: pokemonType,
      amount: amount,
      evolvesFrom: evolves,
  }
  // this.getColour(pokemonType)
  this.allPokemon.push(temp)
  }
    /////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////
                              //end API CALL
  /////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////

 // AI addition
delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}
//initializes all hand card visibility to false;

}

/////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////
                              //  OBJECTS OR CLASSES
  /////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////
export type Pokemon = {
  id: number
  name: string
  HP: number
  HP2: number
  Attack: number
  Defense: number
  Move1: string
  Move3: string
  picURL: string
  type: string
  amount:number
  evolvesFrom:string;
}

export{}

export type Player = {
  Deck: number[]
  Prizes: number[]
  Bench:number[]
  Hand:number[]
  discardPile:number[]


  MainPoId:number
  MainPoHP:number
}