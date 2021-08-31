 /* eslint-disable */ 
<template>
 /* eslint-disable */ 
<div>
    <h1>Welcome to the shop</h1>
    <b-button href = "/" v-on:click="checkSuperSaiyan()">Back to Home Page</b-button>
    <div class="items">
    <h1>List of {{ items.length }} items</h1>
    <h2>You have {{player.currency}} kronordollars</h2>
    <b-list-group>
      <item-item v-for="item in items" :key="item._id" :item="item" @delete-item="deleteItem"></item-item>
    </b-list-group>
  </div>

</div>

</template>

<script>
 /* eslint-disable */ 
import { Api } from '@/Api'
import ItemItem from '@/components/ItemItem'

export default {
  data() {
    return {
      items: [],
      player: '',
      shopLength: 1
    }
  },

  mounted() {
    this.getItems()
    this.getPlayer()
  },

  methods: {
    getItems() {
      Api.get('/shops/10')
        .then(reponse => {
          this.items = reponse.data.items
        })
        .catch(error => {
          this.items = []
          this.shopLength = this.items.length
          console.log(error)
        })
        .then(() => {
          // This code is always executed (after success or error).
        })
    },
    deleteItem(id) {
      var index = this.items.findIndex(item => item._id === id)
      if (this.player.currency >= this.items[index].price) {
        Api.delete(`/shops/10/items/${id}`)
          .then(response => {
            console.log(response.data.message)
            this.player.defense += this.items[index].defenseValue
            this.player.damage += this.items[index].attackValue
            this.player.currency = this.player.currency - this.items[index].price

            Api.patch('/players/1', this.player)
              .then(response => {
                this.player.push(response.data)
              })
              .catch(error => {
                console.log(error)
              })
            if (this.items[index].name == 'Golden Mop') {
              this.items.splice(index, 1)
              this.shopLength = 1
              console.log(this.shopLength)
            } else if (this.items[index].name !== 'Golden Mop') {
              this.items.splice(index, 1)
              this.shopLength = this.items.length
              console.log(this.shopLength)
            }
          }
          )
          .catch(error => {
            console.log(error)
          })
      } else {
        alert('Not enough money')
      }
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
    checkSuperSaiyan() {
      if (this.shopLength === 0) {
        alert('You have reached EVEN FURTHER BEYOND, Check the shop for a new legendary item')

        var legendaryItem = {
          name: 'Golden Mop',
          description: "The golden mop originally belonged to Ner'smutz, the janitor-God " +
          'Whomsoever takes up this mop wield power eternal' + '. ' +
          'Just as the mop rends flesh so must power scar the spirit',
          type: 'attack',
          attackValue: 400,
          defenseValue: 100,
          price: 500
        }
        Api.post('/shops/10/items', legendaryItem)

          .then(response => {

          })
          .catch(error => {
            console.log(error)
          })
      }
    }
  },
  components: {
    ItemItem
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
</style>
