<template>
<div>
<b-row>
<b-col>
    <img v-bind:src= "image">
</b-col>
 <b-col>
 <h1>Player</h1>
 <p>Name: {{player.name}}</p>
 <p>Health:{{player.health}}</p>
 <p>Attack level:{{player.damage}}</p>
 <p>Defense level:{{player.defense}}</p>
 <p>Currency:{{player.currency}}</p>
 </b-col>
 </b-row>

</div>
</template>

<script>
export default {
  name: 'player-item',
  props: ['player'],
  data() {
    return {
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
  }
}
</script>

<style scoped>
img {
  width: 250px;
  height: 250px;
}

</style>
