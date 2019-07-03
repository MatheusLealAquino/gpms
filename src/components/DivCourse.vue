<template>
  <div class="no_style">
    <q-card inline>
      <q-card-media>
        <a :href="`#/course/${course.id}`">
          <img :src="course.photoUrl" class="course-image">
        </a>
      </q-card-media>
      <q-card-title>
        <div :title="course.title">{{course.title.length > 24 && $q.platform.is.desktop ? `${course.title.substring(0,22)}...` : course.title}}</div>
        <q-rating slot="subtitle" v-model="course.stars" :max="5" :title="course.stars" readonly/>
      </q-card-title>
      <q-card-main>
        <p class="text-faded" :title="course.about">{{course.about.length > 34 && $q.platform.is.desktop ? `${course.about.substring(0,35)}...` : course.about}}</p>
        <p style="font-size: 20px"><b>Valor:</b> R$ {{`${course.price.toFixed(2)}`.replace('.', ',')}}</p>
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
    course: Object
  },
  data () {
    return {
    }
  },
  methods: {
    async addToCart () {
      const added = await this.$store.dispatch('cart/addItem', this.course)
      if (added) {
        this.$q.notify({ message: 'Adicionado', color: 'positive' })
      } else {
        this.$q.notify('Esse curso já está no carrinho')
      }
    }
  }
}
</script>
