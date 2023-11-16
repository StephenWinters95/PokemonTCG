
import { Component } from '@angular/core';
import { MyService } from '../services/card.service'
import { Server } from 'http';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})

export class Tab2Page {

  AllSets:any[] = []
  Theme_Decks:any[] = [];
  Theme_Deck_Images:any[]=[]; //
  OwnedCards:any[] = [];
  Display_Deck:any[] = [];
  Custom_Decks:any[] = this.Theme_Decks; // array with all players self - made decks
  Custom_Deck_Images:any[] = [];

  i:number = 0; // for the double loop in the display_deck() method
  j:number = 0;

  See_Theme_Decks:boolean = false;
  See_Custom_Decks:boolean = false;
  Build_New_Deck:boolean = false;
  See_Owned_Cards:boolean = false;
  Back_But:boolean = false;
  Buttons:boolean = true;
  See_Display_Deck:boolean = false;

  //Build Deck Section
  Text_Input_Button:boolean = false;
  Deck_Name:string = "";
  Choose_Cards:boolean = false;


  constructor(private myService: MyService) {
    this.ThemeDecks()
    this.check()
    console.log(this.Theme_Decks)
    console.log(this.AllSets)
    
  }

  check(){
    this.AllSets = this.myService.getMyArray()
    this.OwnedCards = [];
    for(this.i = 0;this.i < 12;this.i++)    // needs to be 15 having problems with throttling stopping this feature working.
    {
      for(this.j = 0;this.j < this.AllSets[this.i].Cards.length ;this.j++)   
      {
        if(this.AllSets[this.i].Cards[this.j].owned === true)
        {
          this.OwnedCards.push(this.AllSets[this.i].Cards[this.j])
        }
      }
    }
  }

  handleInputChange(event: any) {  // code from Ai
    this.Deck_Name = event.target.value;
    this.Text_Input_Button = false;
    this.Choose_Cards = true;
    console.log(this.Deck_Name)
  }

  show(choice:number){
    if(choice <= 4)
    {
      switch(choice){
      case 1:
        this.See_Theme_Decks = true;
      break;
      case 2:
        this.See_Custom_Decks = true;
      break;
      case 3:
        this.Text_Input_Button = true;
      break;
      case 4:
        this.check()
        this.See_Owned_Cards = true;
      break;
      }

    this.Back_But = true;
    this.Buttons = false; //all buttons on the deck builder main page.
    }
  }

  back(choice:number){
    if(choice === 1)
    {
    this.See_Theme_Decks = false;
    this.See_Custom_Decks = false;
    this.See_Owned_Cards = false;
    this.Back_But = false;
    this.Buttons = true;
    this.See_Display_Deck = false;
    this.Text_Input_Button = false;
    this.Choose_Cards = false;

    }
    if(choice === 2)
    {
       this.See_Display_Deck = false;

    }
  }

  display_deck(number:number, Deck:any[]){ // a complicated piece of code, if the .cards.length only contains one array it will give the length of that array if more, then the number of arrays in .cards
                                // also if the number is not initialied as 1 in the forst loo it breaks and gives an error with check() method ?? weird..
    this.See_Theme_Decks = false;
    this.Display_Deck = []
    this.See_Display_Deck = true;

    if(Deck[number].Cards.length > 3){
    for(this.i = 0; this.i < 60; this.i++)
    {
      this.Display_Deck.push(this.AllSets[Deck[number].Cards[0]].Cards[Deck[number].Cards[this.i + 1]])
    }
    }

   else{
    // working perfectly - only meant for deck that are comprised of more than 1 set.
    for(this.i = 0; this.i < Deck[number].Cards.length; this.i++)
    {
      console.log(Deck[number].Cards.length)
      for(this.j = 0;this.j < Deck[number].Cards[this.i].length - 1;this.j++)
      {
        this.Display_Deck.push(this.AllSets[Deck[number].Cards[this.i][0]].Cards[Deck[number].Cards[this.i][this.j + 1]]                  )
      }
    }
   }
  }

  //test
  log(num:number){
      console.log(num)
  }

  CustomDecks(){ // need to build. need to make build a deck first to
    for(this.i = 0;this.i < 18;this.i++)
    {
      this.Custom_Deck_Images[this.i] = this.Custom_Decks[this.i].ImageUrl
    }
  }


  //there are 39 decks in the first 18 pokemon sets
  ThemeDecks(){
    
    this.Theme_Decks[0] = new Deck("2-Player Starter Set", "Base Set", "https://cdn.cardcollector.co.uk/wp-content/uploads/2023/03/2-Player-Starter-Deck-from-1999-Base-Set.png" ,["Fire", "Fighting"] 
    ,[0, 46,46,46,51,51,51,51,33,33,7,59,59,59,59,45,45,45,45,23,23,27,60,60,25,90,91,80,92,86,93,93,94,94,96,96,96,96,96,96,96,96,96,96,96,96,96,96,97,97,97,97,97,97,97,97,97,97,97,97,97,97])
    this.Theme_Decks[1] = new Deck( "Overgrowth" , "Base Set" , "https://dyn1.heritagestatic.com/lf?set=path%5B2%2F4%2F1%2F0%2F5%2F24105123%5D%2Csizedata%5B850x600%5D&call=url%5Bfile%3Aproduct.chain%5D " , ["Water" , "Grass"],
    [0, 5,34,34,63,63,63,64,64,64,64,16,32,32,29,29,68,68,68,68,43,43,43,43,93,90,90,89,89,94,94,92,92,101,101,101,101,101,101,101,101,101,101,101,101,101,98,98,98,98,98,98,98,98,98,98,98,98,98,98,98,98])
    this.Theme_Decks[2] = new Deck("Zap!" , "Base Set", "https://cdn6.mavin.io/production/soldItems/252297726/images/image-0.jpg" , ["Electric" , "Psychic "] , 
    [0,9,31,30,30,28,28,49,49,49,48,48,42,42,42,57,57,57,57,52,52,52,70,79,89,87,94,94,93,92,92,90,90,99,99,99,99,99,99,99,99,99,99,99,99,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100])
    this.Theme_Decks[3] = new Deck("Brushfire" , "Base Set", "https://m.media-amazon.com/images/I/91f5miacAzL._SL1500_.jpg" , ["Fire", "Grass"] , 
    [0, 11,68,68,68,68,65,65,54,54,54,54,22,27,27,23,23,67,67,45,45,45,45,74,83,80,80,94,93,93,93,92,91,98,98,98,98,98,98,98,98,98,98,97,97,97,97,97,97,97,97,97,97,97,97,97,97,97,97,97,97])
    this.Theme_Decks[4] = new Deck("Blackout" , "Base Set", "https://mlpnk72yciwc.i.optimole.com/cqhiHLc.IIZS~2ef73/w:auto/h:auto/q:75/https://bleedingcool.com/wp-content/uploads/2021/10/box-front-1.jpg" , ["Water", "Fighting"],
    [0,6,26,26,41,41,62,62,62,62,64,64,64,55,55,55,61,61,61,33,33,51,51,51,51,78,83,87,92,91,91,91,91,96,96,96,96,96,96,96,96,96,96,96,96,96,96,96,96,101,101,101,101,101,101,101,101,101,101,101,101])
    this.Theme_Decks[5] = new Deck("Water Blast" , "Jungle" , "https://mlpnk72yciwc.i.optimole.com/cqhiHLc.IIZS~2ef73/w:376/h:530/q:75/https://bleedingcool.com/wp-content/uploads/2022/01/box-front-1.jpg " , ["Water" , "Fighting"],
    [[1, 11,60,60,60,55,55,55,55,50,50,50,50,44,41,41], [0 ,58,58,58,58,51,51,40,37,37,94,93,93,92,92,89,89,87,101,101,101,101,101,101,101,101,101,101,101,101,101,101,96,96,96,96,96,96,96,96,96,96,96,96,96,96]])
    this.Theme_Decks[6] = new Deck("Power Reserve", "Jungle" , "https://mlpnk72yciwc.i.optimole.com/cqhiHLc.IIZS~2ef73/w:auto/h:auto/q:75/https://bleedingcool.com/wp-content/uploads/2022/01/box-front-2.jpg", ["Psychic" , "Grass"],
    [[1, 4,57,57,56,56,56,56,48,48,48,48,47,47,39,39,36], [0, 42,42,42,42,31,31,30,94,93,93,93,92,92,91,91,86,100,100,100,100,100,100,100,100,100,100,100,98,98,98,98,98,98,98,98,98,98,98,98,98,98,98,98,98]])
    this.Theme_Decks[7] = new Deck("LockDown", "Fossil" , "https://primecitycomics.com/cdn/shop/products/7_1f7667f7-9920-42c9-90b7-88704b75cbc8_1024x.jpg?v=1609561215" , ["Fire", "Water"] ,
    [[2, 9, 38,38,48,48,48,48,41,41,50,50,50,50,37,37,59,58], [0, 67,67,67,59,59,59,90,90,94,94,93,93,89,89,81,97,97,97,97,97,97,97,97,97,97,97,97,97,97, 101,101,101,101,101,101,101,101,101,101,101,101,101,101]])
    this.Theme_Decks[8] = new Deck("BodyGuard", "Fossil", "https://dyn1.heritagestatic.com/lf?set=path%5B2%2F3%2F2%2F4%2F8%2F23248979%5D&call=url%5Bfile%3Aproduct.chain%5D" , ["Grass","Fighting"],
    [[2, 12,46,46,46,36,36,47,47,47,47,56,56,56,56,33,33,55], [0, 43,43,50,50,50,50,93,93,93,93,87,87,84,89,89,98,98,98,98,98,98,98,98,98,98,98,98,98,98,98,98,96,96,96,96,96,96,96,96,96,96,96,96]])
    this.Theme_Decks[9] = new Deck("2-Player CD-ROM Starter Set", "Base Set 2", "https://www.pokebeach.com/content/tcg/theme-decks/2-player-cd-rom-starter-set.jpg", ["normal"] ,
    [3, 70,70,70,77,77,77,48,48,7,60,60,75,75,75,75,59,59,94,94,94,79,79,71,71,37,117,118,118,119,120,120,114,122,124,124,124,124,124,124,124,124,124,124,124,124,124,124,129,129,129,129,129,129,129,129,129,129,129,129,129,129])
    this.Theme_Decks[10] = new Deck("Grass Chopper", " Base Set 2", "https://dyn1.heritagestatic.com/lf?set=path%5B2%2F4%2F5%2F6%2F0%2F24560948%5D&call=url%5Bfile%3Aproduct.chain%5D" , ["Fighting", "Grass"],
    [3, 5,82,82,52,81,81,81,63,63,65,65,65,65,90,90,90,90,48,48,77,77,77,77,118,107,116,112,112,119,121,121,121,124,124,124,124,124,124,124,124,124,124,124,124,124,124,126,126,126,126,126,126,126,126,126,126,126,126,126,126])
    this.Theme_Decks[11] = new Deck("Hot Water", "Base Set 2", "https://dyn1.heritagestatic.com/lf?set=path%5B2%2F4%2F2%2F2%2F7%2F24227894%5D%2Csizedata%5B850x600%5D&call=url%5Bfile%3Aproduct.chain%5D" , ["Fire", "Water"],
    [3, 14, 36,71,71,71,50,50,34,68,68,68,75,75,75,56,56,87,87,87,87,105,109,109,121,121,121,120,120,118,118,118,119,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,125,125,125,125,125,125,125,125,125,125,125,125,125])
    this.Theme_Decks[12] = new Deck("Lightning Bug", "Base Set 2", "https://images.pristineauction.com/228/2282024/main_1649279088-2000-Pokemon-TCG-Lightning-Bug-Theme-Deck-with-60-Cards-PristineAuction.com.jpg" , ["Lightning","Grass"] ,
    [3,2,78,78,78,86,86,86,86,20,46,46,99,99,99,99,80,67,67,67,67,114,112,108,108,109,109,122,119,119,117,117,117,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,127,127,127,127,127,127,127,127,127,127,127,127])
    this.Theme_Decks[13] = new Deck("Psych Out", "Base Set 2" , "https://metatcg.com/cdn/shop/products/a2acf332-144f-5d82-b526-cd921832ae32_1024x1024@2x.jpg?v=1693966526" , ["Psychic", "Water"],
    [3,18,76,76,76,44,44,72,72,45,64,64,64,62,92,92,92,92,60,93,94,94,94,100,116,121,122,122,108,108,119,119,119,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,128,128,128,128,128,128,128,128,128,128,128,128,128])
    this.Theme_Decks[14] = new Deck("Devastation" , "Team Rocket" , "https://metatcg.com/cdn/shop/products/12ebe60c-1824-5a3d-a5f6-9bd8fc859b0c_800x.jpg?v=1693963725" , ["Grass","Water"],
    [[4,13,54,54,54,45,44,44,62,62,62,57,57,57,57,35,75], [3,62,92,92,92,49,99,99,99,95,95,95,116,121,121,119,110,129,129,129,129,129,129,129,129,129,129,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126]])
    this.Theme_Decks[15] = new Deck("Trouble" , "Team Rocket" , "https://crystal-cdn1.crystalcommerce.com/photos/352359/trouble.jpg" , ["Psychic","Grass"] , 
    [[4, 1, 61,61,55,55,55,55,53,53,53,48,48,38,38,72,80],[3,61,61,39,39,99,99,45,44,42,74,74,64,64,122,121,121,119,117,126,126,126,126,126,126,126,126,126,126,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128]])
    this.Theme_Decks[16] = new Deck("Brock" , "Gym Heros" , "https://primecitycomics.com/cdn/shop/products/8_3088e56e-b70e-424f-b7f9-d8e11038256a_480x480.jpg?v=1609561234" , ["Fighting"],
    [[6,1,70,70,69,69,69,68,68,68,68,66,66,66,71,65,65,65,40,39,97,105,105,114,127,127,127,127,127,127,127,127,127,127,127,127,127,127,127,127,127,127,127,127,127,127,127,127,127,127,127,127],[3, 121,121,121,109,109,110,122,122,117]])
    this.Theme_Decks[17] = new Deck("Misty" , "Gym Heros" , "https://dacardworld1.imgix.net/misty.jpg?auto=format%2Ccompress&fm=jpg&h=1800&ixlib=php-3.3.1&w=1800&s=3da2a0ebae5aa9bbdfd2210c2f88e969" , ["Water"] ,
    [[6,9,53,53,89,89,89,89,86,86,86,85,85,85,85,56,56,84,84,84,55,55,52,101,107,131,131,131,131,131,131,131,131,131,131,131,131,131,131,131,131,131,131,131,131,131,131,131,131,131,131,131,131], [3, 121,121,120,120,120,118,118,122]])
    //this.Theme_Decks[18] = new Deck("")
    for(this.i = 0;this.i < 18;this.i++)
    {
      this.Theme_Deck_Images[this.i] = this.Theme_Decks[this.i].ImageUrl
    }
  
  }
}

export class Deck{

  constructor(Name:string, Set:string, Url:string, Types:string[], Cards:any[]){
    this.Name = Name;
    this.Set =Set;
    this.ImageUrl = Url;
    this.Types = Types;
    this.Cards = Cards
  }

  Name:string = " ";
  Set:string = " "
  ImageUrl:string = " "
  Types:string[] = []
  Cards:any[] = []
}