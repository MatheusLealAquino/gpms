<template>
  <q-card inline style="height:100%">
    <q-card-media>
      <img src="~assets/prog1.jpg">
    </q-card-media>
    <q-card-title>
      <div :title="name">{{name.length > 26 && $q.platform.is.desktop ? `${name.substring(0,26)}...` : name}}</div>
      <q-rating slot="subtitle" v-model="stars" :max="5" :title="stars" readonly/>
    </q-card-title>
    <q-card-main>
      <p class="text-faded">{{about}}</p>
      <p style="font-size: 20px"><b>Valor:</b> R$ {{value}}</p>
    </q-card-main>
    <q-card-separator />
    <q-card-actions class="justify-center">
      <q-btn flat color="primary" label="Adicionar ao carrinho" />
    </q-card-actions>
  </q-card>
</template>

<style>
</style>

<script>
export default {
  name: 'DivCourse',
  props: {
    name: String,
    value: String,
    about: String,
    id: String
  },
  data () {
    return {
      stars: 4
    }
  }
}
</script>
