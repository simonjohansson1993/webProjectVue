<template>
<div>
<b-row>
<b-col>
   <img v-bind:src = "image">
</b-col>
<b-col>
 <h1>Boss</h1>
 <p>Name:{{boss.name}}</p>
 <p>Difficulty: {{ boss.difficulty }}</p>
 <p>Health: {{boss.health}}</p>
 <p>Damage: {{boss.damage}}</p>
 <p>Description:{{ boss.description }}</p>
</b-col>
</b-row>
</div>
</template>

<script>
export default {
  name: 'boss-item',
  props: ['boss'],
  data() {
    return {
      variants: [
        {
          variantImage: require('../assets/garbage-man.jpg')
        },
        {
          variantImage: require('../assets/bacteria.png')
        },
        {
          variantImage: require('../assets/building.jpg')
        }
      ]
    }
  },
  computed: {
    image() {
      if (this.boss.name === 'Garbage Garbage Man') {
        return this.variants[0].variantImage
      } else if (this.boss.name === 'Bacterius maximus') {
        return this.variants[1].variantImage
      }
      return this.variants[2].variantImage
    }
  }
}
</script>

<style scoped>
img {
  width: 250px;
  height: 250px;
}
.product-image {
    width: 80%;
  }
</style>
