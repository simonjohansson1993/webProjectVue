<template>

  <div>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <b-jumbotron header="Call of Dirty: Black Mops" lead="Welcome to your new adventure">
      <b-col>
        <select  @change="getPlayer($event)">
          <option value="1">Simon</option>
          <option value="2">Tobias</option>
          <option value="3">Nick</option>
        </select>
      </b-col>
    </b-jumbotron>
    <b-container class ="containerSmall">
      <!-- Mobile (< 768px): stack columns by making one half-width and one full-width
           Desktop (>= 768px): keep both columns in same row in 4:8 ratio -->

    <b-row>
    <b-col class = example-col>
      <player-item :player = "player"></player-item>
    </b-col>
    <b-col class = example-col>
      <boss-item :boss = "currentBoss"></boss-item>
    </b-col>
    </b-row>
    <h2>Select option</h2>
    <b-row>
      <b-col>
        <b-button  variant = "primary" href = "/shop">Go to Shop</b-button>
      </b-col>
       <b-col>
        <b-button variant = "primary" :disabled="this.player.dead=='false'" v-on:click="resurrect()">Resurrect</b-button>
      </b-col>
      <b-col>
        <b-button variant = "primary" v-if: href = "/battlefield">Fight Boss</b-button>
      </b-col>
      <b-col>
        <b-button  variant = "primary" href = "/task">Perform Task</b-button>
      </b-col>
      <b-col>
        <b-button  variant = "primary" v-on:click="reset()">Reset</b-button>
      </b-col>
      <b-col>
        <b-button  variant = "primary" v-on:click="newGame()">New Game</b-button>
      </b-col>

    </b-row>
    </b-container>
  </div>

</template>

<script>
import { Api } from '@/Api'
import PlayerItem from '@/components/PlayerItem'
import BossItem from '@/components/BossItem'

export default {
  data() {
    return {
      message: '',
      players: [],
      player: '',
      bosses: [],
      bossIndex: 0,
      currentBoss: '',
      shop: '',
      chosenPlayer: 1
    }
  },
  mounted() {
    this.getMessage()
    this.getPlayers()
    this.getBoss()
    this.getShop()
    this.getPlayer()
  },
  methods: {
    getShop() {
      Api.get('/shops/10')
        .then(response => {
          this.shop = response.data
        })
        .catch(error => {
          this.shop = error
        })
    },
    getMessage() {
      Api.get('/')
        .then(response => {
          this.message = response.data.message
        })
        .catch(error => {
          this.message = error
        })
    },
    getPlayers() {
      Api.get('/players')
        .then(response => {
          this.players = response.data.players
        })
        .catch(error => {
          this.players = error
        })
      Api.get('/players/1')
        .then(response => {
          this.player = response.data
        })
        .catch(error => {
          this.player = error
        })
    },
    getPlayer(event) {
      Api.get('/players/' + event.target.value)
        .then(response => {
          this.player = response.data
        })
        .catch(error => {
          this.player = error
        })
    },
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
    resurrect() {
      if (this.player.health > 90) {
        alert('You are already on full health')
        this.player.dead = 'false'
      } else {
        alert('You have been brought back to life, be careful next time')
        this.player.health = 100
        this.player.width = 100
        this.player.dead = 'false'
        Api.patch('/players/1', this.player)
          .then(response => {

          })
          .catch(error => {
            console.log(error)
          })
      }
    },
    reset() {
      this.bossIndex = 0
      Api.delete('/bosses')
        .then(response => {
          this.bosses = response.data.Boss
        })
        .catch(error => {
          this.bosses = error
        })

      this.player.currency = 0
      this.player.health = 100
      this.player.damage = 10
      this.player.defense = 10

      Api.put('/players/1', this.player)
        .then(response => {
          this.player.push(response.data)
          this.player = response.data
        })
        .catch(error => {
          console.log(error)
        })
      Api.delete('/items')

      this.shop.name = 'The Shop'
      this.shop.items = []
      Api.put('/shops/10', this.shop)
        .then(response => {
          this.shop.push(response.data)
          this.shop = response.data
        })
        .catch(error => {
          console.log(error)
        })
    },
    newGame() {
      var boss1 = {
        description: 'This garbage man leaves garbage everywhere ' +
     '. He is not very good at his job',
        difficulty: 'Easy',
        health: 200,
        name: 'Garbage Garbage Man',
        damage: 30,
        image: '/img/garbage-man.f816efb2.jpg'
      }
      var boss2 = {
        description: 'Giant mutant bacteria, This bacteria wants to infect veryone it comes in contact with  ',
        difficulty: 'medium',
        health: 300,
        name: 'Bacterius maximus',
        damage: 50,
        image: '/img/bacteria.31f9d87c.png'
      }
      var boss3 = {
        description: 'This building is so dirty it spreads diseases to the people in the city, making them sick ',
        difficulty: 'hard',
        health: 400,
        name: 'dirty building',
        damage: 200,
        image: '/img/building.bb8eb36a.jpg'
      }
      Api.post('/bosses', boss1)
        .then(response => {
          this.bosses = response.data.Boss
        })
      Api.post('/bosses', boss2)
        .then(response => {
          this.bosses = response.data.Boss
        })
      Api.post('/bosses', boss3)
        .then(response => {
          this.bosses = response.data.Boss
        })
      this.currentBoss = this.bosses[this.bossIndex]
      var item1 = {
        name: 'Standard Mop',
        description: "This mop ain't much, but it gets the job done",
        type: 'attack',
        attackValue: 5,
        defenseValue: 5,
        price: 20
      }

      var item2 = {
        name: 'Hand sanitizer',
        description: 'liquid generally used to decrease infectious agents on the hands',
        type: 'defence',
        attackValue: 10,
        defenseValue: 10,
        price: 40
      }

      var item3 = {
        name: 'Crocs',
        description: 'This inexpensive shoes rely on a proprietary closed-cell resin' +
    'material called Croslite to produce a lightweight, slip-resistant,' +
    'odor-resistant, non-marking sole.',
        type: 'defence',
        attackValue: 0,
        defenseValue: 25,
        price: 60
      }

      var item4 = {
        name: 'vacuum Cleaner',
        description: 'helpful for cleaning in confined areas and for ' +
    'the removal of hazardous dust and fumes.',
        type: 'attack',
        attackValue: 0,
        defenseValue: 15,
        price: 80
      }

      var item5 = {
        name: 'hazmat suit',
        description: 'A hazmat suit, also known as decontamination suit, ' +
    'is a piece of personal protective equipment that consists of an impermeable ' +
     'whole-body garment worn as protection against hazardous materials.',
        type: 'defence',
        attackValue: 50,
        defenseValue: 0,
        price: 100
      }

      Api.post('shops/10/items', item1)
      Api.post('shops/10/items', item2)
      Api.post('shops/10/items', item3)
      Api.post('shops/10/items', item4)
      Api.post('shops/10/items', item5)
    }
  },
  components: {
    PlayerItem,
    BossItem
  }
}
</script>

<style>
.example-col {
  padding-top: .75rem;
  padding-bottom: .75rem;
  background-color: whitesmoke;
  border: 2px solid lightgray;
}
img {
  width: 250px;
  height: 250px;
}
@media only screen and (max-width: 768px) {
  .containerSmall {
    background-color: lightblue;
  }
}
@media only screen and (min-width: 768px) {
  .containerSmall {
    background-color:white;
  }
}

</style>
