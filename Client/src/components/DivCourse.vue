<template>
  <div class="no_style">
    <a :href="`#/course/${id}`">
      <q-card to="course/1" inline style="height:100%">
        <q-card-media>
          <img :src="image" width="295.83" height="166">
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
          <q-btn flat color="primary" label="Adicionar ao carrinho" />
        </q-card-actions>
      </q-card>
    </a>
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
  }
}
</script>
