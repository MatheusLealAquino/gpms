<template>
  <q-card inline style="height:100%">
    <q-card-media>
      <img src="~assets/teacher.png">
    </q-card-media>
    <q-card-title>
      <div :title="name">{{name.length > 26 && $q.platform.is.desktop ? `${name.substring(0,26)}...` : name}}</div>
      <q-rating slot="subtitle" v-model="stars" :max="5" :title="stars" readonly/>
      <div slot="right" class="row items-center">
        <q-icon name="place" /> {{work}}
      </div>
    </q-card-title>
    <q-card-main>
      <br>
      <p class="text-faded">{{about}}</p>
      <br>
    </q-card-main>
    <q-card-separator />
    <q-card-actions class="justify-center">
      <q-btn flat color="primary" label="Ver Perfil" />
    </q-card-actions>
  </q-card>
</template>

<style>
</style>

<script>
export default {
  name: 'DivProfessor',
  props: {
    name: String,
    work: String,
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
