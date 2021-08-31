
<!-- eslint-disable -->
<template>
<div class="battle-scene">
   <div class="box-top-left">
     <h2 class="pokemon">{{ currentBoss.name }}</h2>
     <div class="hp-bar-top">
       <div v-bind:style="opponentHpBar" class="hp-bar-fill"></div>
     </div>
     <h4 class="level">Hp: {{ currentBoss.health }}</h4>
     <h4 class="hp">Dmg: {{ currentBoss.damage}}</h4>
   </div>
   <div class="box-top-right">
     <img v-bind:src="currentBoss.image"  class="pokemon-top" />
   </div>
    <div class="box-bottom-left">
      <img v-bind:src= "image" class="pokemon-bottom" />
   </div>
   <div class="box-bottom-right">
      <h2 class="pokemon">{{ player.name }}</h2>
     <div class="hp-bar-bottom">
       <div v-bind:style="player" class="hp-bar-fill"></div>
     </div>
     <h4 class="level">damage:{{player.damage}} / defense: {{player.defense}}</h4>
     <h4 class="hp">{{player.health}}/100</h4>
   </div>
   <div class="bottom-menu">
     <div class="battle-text text-box-left">What will {{this.player.name}} do?
     </div>
       <div class="text-box-right">
         <h4 class="battle-text-top-left"></h4>
          <button :disabled="this.player.dead==true||this.currentBoss.health<0 || this.currentBoss.health == 0" v-on:click="attackBoss()">Attack</button>
         <h4 class="battle-text-bottom-left"></h4>
         <h4 class="battle-text-top-right"></h4>
           <b-button variant="primary" href="/" v-on:click="winGame()">Exit fight</b-button>
         <h4 class="battle-text-bottom-right"></h4>   
     </div>
   </div>
   
 
 </div> 
  <!-- end battle scene -->
 
</template>

<script>
/* eslint-disable */
import { Api } from '@/Api'
import PlayerItem from '@/components/PlayerItem' 
import BossItem from '@/components/BossItem'


export default {
  name: 'battlefield',
  data() {
    return {
      player: '',
      bosses: [],
      currentBoss: '',
      bossIndex: 0,
      playerImage: '/img/Janitor.351c7067.png',
      bossHpBar: 0,
      userHpBar: {
      width: "100%"
      },
    opponentHpBar: {
    width: "100%"
  },
      variants: [
        {
          variantImage: require('../assets/Janitor.png')
        },
        {
          variantImage: require('../assets/Janitor2.jpeg')
        }
      ]
      
    }
  },
  computed: {
    image() {
      if (this.player.damage >= 500) {
        return this.variants[1].variantImage
      }
      return this.variants[0].variantImage
    }
  },
  mounted() {
    this.getPlayer()
    this.getBoss()
    this.getBossHpBar()
    this.checkDead()
    this.getUserHpBar()
  },
  methods: {
    getBoss() {
      Api.get('/bosses')
        .then(response => {
          this.bosses = response.data.Boss
          this.currentBoss = this.bosses[this.bossIndex]
        })
        .catch(error => {
          this.bosses = error
        })
    },
    getPlayer() {
      Api.get('/players/1')
        .then(response => {
          this.player = response.data
        })
        .catch(error => {
          this.player = error
        })
    },
    getBossHpBar(){
        
          
          if (this.currentBoss.damage === 200){
             this.bossHpBar = (this.currentBoss.health / 4) 
          }
         else if(this.currentBoss.damage === 50){
            this.bossHpBar = (this.currentBoss.health / 3) 
         }
         else {
           this.bossHpBar = (this.currentBoss.health / 2) 
         }

        if(this.bossHpBar<0){
            this.bossHpBar = 0
        }

          
        
        
    },
    attackBoss(){
      //Alert to show 
    
      alert("You attacked the boss "+ this.player.damage + " damage" + "\n"
      + this.currentBoss.name+ " strikes you back")
        
        //each attack
        this.currentBoss.health = this.currentBoss.health - this.player.damage
        if(this.currentBoss.damage>this.player.defense){
          this.player.health = this.player.health - (this.currentBoss.damage-this.player.defense)
        }
        
        this.getBossHpBar()
        //adjust player hp bar
        this.player.width = this.player.health + "%"
        //adjust opponent hp bar
        this.opponentHpBar.width = this.bossHpBar + "%"
      
        // check for victory
      if (this.currentBoss.health == 0 || this.currentBoss.health < 0){
        alert("You won the battle! Click home to fight another boss" )
          this.currentBoss.health = 0
          
        //Insert a Delete request to delete the boss 

        Api.delete('/bosses/'+ this.currentBoss._id)
          .then(response => {

            this.bosses.splice(this.bossIndex, 1)
            this.bossIndex = (this.bossIndex + 1) 
            
          }
          )
          .catch(error => {
            console.log(error)
          })
      }

      //Check for defeat 

      else if (this.player.health === 0||this.player.health < 0){
          alert(this.player.name + ". You have been defeated, you recieve 0$" + "\n"
          + "Find the spirit healer and resurrect")
          this.player.dead=true
          this.player.health = 1
          this.player.width = "1%"

          //patch player hp to 0

          Api.patch('/players/1', this.player)
              .then(response => {
                
              })
              .catch(error => {
                console.log(error)
              })
      }
     
    },
    winGame(){
      if (this.bosses.length == 0) {
      alert(this.player.name + "! You have defeated all bosses!! You won the game");
      }
    }
    
     
  },
  components: [{
    PlayerItem,BossItem
  }]
  
}

</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Roboto+Condensed');

@import url('https://fonts.googleapis.com/css?family=PT+Sans+Narrow');

html,body{
  height: 100%;
  background: #3C7ACD;
}
body {
	display: flex;
	justify-content: center;
	align-items: center;
}

.title{
  position: relative;
  margin-top: 10px;
  color: white;
  text-align: center;
  font-size: 28px;
  text-transform: uppercase;
  font-family: "Roboto Condensed";
}

.battle-scene{
  position: relative;
  margin: auto;
  display: block;
  margin-top: 3%;
  width: 1280px;
  height: 800px;
  background: #F8F8F8;
  z-index: 1;
}

.box-top-left{
  position: absolute;
  width: 40%;
  height: 15%;
  border-radius: 10px;
  top: 8%;
  left: 8%;
  background: #F8F8D8;
  border: 6px solid #506860;
}

.hp-bar-top{
  position: absolute;
  bottom: 16%;
  height: 20%;
  width: 70%;
  left: 10%;
  border-radius: 20px;
  background: grey;
  opacity: 0.5;
}

.hp-bar-bottom{
  position: absolute;
  bottom: 32%;
  height: 20%;
  width: 70%;
  left: 10%;
  border-radius: 20px;
  background: grey;
  opacity: 0.5;
}

.hp-bar-fill{
  position: absolute;
  height: 100%;
  width: 100%;
  border-radius: 20px;
  background: #FF8800;
}

.box-top-right{
  position: absolute;
  width: 40%;
  height: 25%;
  border-radius: 50%;
  top: 25%;
  right: 8%;
  background: #E0E0E0;
}

.pokemon-top{
  height: 150%;
  width: 50%;
  position: absolute;
  top: -80%;
  left: 25%;
}

.pokemon-bottom{
  height: 150%;
  width: 50%;
  position: absolute;
  top: -75%;
  left: 25%;
}


.box-bottom-left{
 position: absolute;
  width: 40%;
  height: 25%;
  border-radius: 50%;
  bottom: 15%;
  left: 8%;
  background: #E0E0E0;
}

.box-bottom-right{
  position: absolute;
  width: 38%;
  height: 20%;
  border-radius: 10px;
  bottom:20%;
  right: 8%;
  background: #F8F8D8;
  border: 6px solid #506860;
  z-index: 2;
}

.pokemon{
  text-align: left;
  margin-left: 10%;
  margin-top: 5%;
  opacity: 0.7;
  font-size: 18px;
  font-family: "Roboto Condensed";
}

.level{
  position: absolute;
  right: 8%;
  top: -2%;
  opacity: 0.7;
  font-size: 16px;
  font-family: "Roboto Condensed";
}

.hp{
  position: absolute;
  right: 8%;
  bottom: 20%;
  opacity: 0.7;
  font-size: 16px;
  font-family: "Roboto Condensed";
}

.bottom-menu{
  position: absolute;
  width: 98%;
  bottom: 0%;
  height: 19%;
  background: #285068;
  z-index: 1;
  border: solid 6px #CEB46D;
}

.text-box-left{
  position: absolute;
  width: 50%;
  left: 0%;
  height: 95%;
  
}

.text-box-right{
  position: absolute;
  width: 40%;
  top: -6%;
  right: -1%;
  height: 98%;
  background: #F8F8F8;
  border: solid 6px #6F677F;
  
}

.battle-text{
  margin-top: 3%;
  margin-left: 5%;
  opacity: 0.95;
  font-size: 18px;
  color: white;
  text-align: left;
  font-family: "PT Sans Narrow";
}

.battle-text-top-left{
  opacity: 0.95;
  position: absolute;
  font-size: 22px;
  color: #333333;
  top: -30%;
  left: 10%;
  text-align: left;
  font-family: "PT Sans Narrow";
  cursor: pointer;
}

.battle-text-bottom-left{
  opacity: 0.95;
  position: absolute;
  font-size: 22px;
  color: #333333;
  bottom: -30%;
  left: 10%;
  text-align: left;
  font-family: "PT Sans Narrow";
  cursor: pointer;
}

.battle-text-top-right{
  opacity: 0.95;
  position: absolute;
  font-size: 22px;
  color: #333333;
  top: -30%;
  right: 21%;
  text-align: left;
  font-family: "PT Sans Narrow";
  cursor: pointer;
}

.battle-text-bottom-right{
  opacity: 0.95;
  position: absolute;
  font-size: 22px;
  color: #333333;
  bottom: -30%;
  right: 20%;
  text-align: left;
  font-family: "PT Sans Narrow";
  cursor: pointer;
} 

@media all and (max-width: 600px) {
 .battle-scene{
  position: relative;
  margin: auto;
  display: block;
  margin-top: 3%;
  width: 400px;
  height: 280px;
  background: #F8F8F8;
  z-index: 1;
}
  
  .title{
  position: absolute;
  top: -33%;
  left: 7.5%;
  color: white;
  text-align: center;
  font-size: 22px;
  text-transform: uppercase;
  font-family: "Roboto Condensed";
}
  
  .pokemon{
  text-align: left;
  margin-left: 11%;
  margin-top: 5%;
  opacity: 0.7;
  font-size: 14px;
  font-family: "Roboto Condensed";
}
  
  
.level{
  position: absolute;
  right: 5%;
  top: -13%;
  opacity: 0.7;
  font-size: 10px;
  font-family: "Roboto Condensed";
}
  
  .hp{
  position: absolute;
  right: 8%;
  bottom: -20%;
  opacity: 0.7;
  font-size: 11px;
  font-family: "Roboto Condensed";
}
  
  
.battle-text-top-left{
  opacity: 0.95;
  position: absolute;
  font-size: 14px;
  color: #333333;
  top: -30%;
  left: 10%;
  text-align: left;
  font-family: "PT Sans Narrow";
  cursor: pointer;
}

.battle-text-bottom-left{
  opacity: 0.95;
  position: absolute;
  font-size: 14px;
  color: #333333;
  bottom: -30%;
  left: 10%;
  text-align: left;
  font-family: "PT Sans Narrow";
  cursor: pointer;
}

.battle-text-top-right{
  opacity: 0.95;
  position: absolute;
  font-size: 14px;
  color: #333333;
  top: -30%;
  right: 21%;
  text-align: left;
  font-family: "PT Sans Narrow";
  cursor: pointer;
}

.battle-text-bottom-right{
  opacity: 0.95;
  position: absolute;
  font-size: 14px;
  color: #333333;
  bottom: -30%;
  right: 20%;
  text-align: left;
  font-family: "PT Sans Narrow";
  cursor: pointer;
} 
  
  .battle-text{
  margin-top: 1%;
  margin-left: 5%;
  opacity: 0.95;
  font-size: 10px;
  color: white;
  text-align: left;
  font-family: "PT Sans Narrow";
}



}

</style>