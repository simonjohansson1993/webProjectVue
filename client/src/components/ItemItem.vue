<template>
<div>
  <b-row class = "example-col">
    <b-col >
      <img v-bind:src = "image">
    </b-col>
    <b-col>
        <p>Item Name: {{item.name}}</p>
        <p>Type: </p>
        <p>Attack Value: {{item.attackValue}}</p>
        <p>Defense Value: {{item.defenseValue}}</p>
        <p>Description: {{item.description}}</p>
        <p>Price: {{item.price}}</p>
        <b-button variant="primary"  @click="$emit('delete-item', item._id)">Buy Item &times;</b-button>
    </b-col>
  </b-row>
</div>
</template>

<script>
export default {
  name: 'item-item',
  props: ['item'],
  data() {
    return {
      variants: [
        {
          variantImage: require('../assets/mop.jpg')
        },
        {
          variantImage: require('../assets/gold-mop.jpg')
        },
        {
          variantImage: require('../assets/crocs.jpg')
        },
        {
          variantImage: require('../assets/hand-san.jpg')
        },
        {
          variantImage: require('../assets/hazmat.jpg')
        },
        {
          variantImage: require('../assets/vaccum.jpg')
        }
      ]
    }
  },
  computed: {
    image() {
      if (this.item.name === 'Standard Mop') {
        return this.variants[0].variantImage
      } else if (this.item.name === 'Golden Mop') {
        return this.variants[1].variantImage
      } else if (this.item.name === 'Crocs') {
        return this.variants[2].variantImage
      } else if (this.item.name === 'Hand sanitizer') {
        return this.variants[3].variantImage
      } else if (this.item.name === 'hazmat suit') {
        return this.variants[4].variantImage
      }
      return this.variants[5].variantImage
    }
  }
}
</script>

<style scoped>
.example-col {
  padding-top: .75rem;
  padding-bottom: .75rem;
  background-color: whitesmoke;
  border: 2px solid lightgray;
}
</style>
