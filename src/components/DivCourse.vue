<template>
  <div class="no_style">
    <q-card inline>
      <q-card-media>
        <a :href="`#/course/${id}`">
          <img :src="image" class="course-image">
        </a>
      </q-card-media>
      <q-card-title>
        <div :title="title">{{title.length > 24 && $q.platform.is.desktop ? `${title.substring(0,22)}...` : title}}</div>
        <q-rating slot="subtitle" v-model="stars" :max="5" :title="stars" readonly/>
      </q-card-title>
      <q-card-main>
        <p class="text-faded" :title="about">{{about.length > 34 && $q.platform.is.desktop ? `${about.substring(0,35)}...` : about}}</p>
        <p style="font-size: 20px"><b>Valor:</b> R$ {{`${price.toFixed(2)}`.replace('.', ',')}}</p>
      </q-card-main>
      <q-card-separator />
      <q-card-actions class="justify-center">
        <q-btn flat color="primary" label="Adicionar ao carrinho" @click="addToCart()"/>
      </q-card-actions>
    </q-card>
  </div>
</template>

<style>
.no_style a {
  color:#000000;
  text-decoration: none;
}
.no_style a:visited {
  color:#000000;
}
.no_style a:hover {
  color:#000000;
}
.no_style a:active {
  color:#000000;
}
.course-image {
  object-fit: cover;
  height: 200px;
  width: 100%;
}
</style>

<script>
export default {
  title: 'DivCourse',
  props: {
    stars: Number,
    title: String,
    price: Number,
    about: String,
    id: Number,
    image: String
  },
  data () {
    return {
    }
  },
  methods: {
    async addToCart () {
      const added = await this.$store.dispatch('cart/addItem', {
        id: this.id,
        image: this.image,
        title: this.title
      })
      if (added) {
        this.$q.notify({ message: 'Adicionado', color: 'positive' })
      } else {
        this.$q.notify('Esse curso já está no carrinho')
      }
    }
  }
}
</script>
