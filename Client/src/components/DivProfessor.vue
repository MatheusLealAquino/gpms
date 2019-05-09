<template>
  <div class="no_style">
    <a :href="`#/teacher/${id}`">
      <q-card inline style="height:100%">
        <q-card-media>
          <img src="~assets/teacher.png" height="200">
        </q-card-media>
        <q-card-title>
          <div :title="name">{{name.length > 26 && $q.platform.is.desktop ? `${name.substring(0,26)}...` : name}}</div>
          <q-rating slot="subtitle" v-model="stars" :max="5" :title="stars" readonly/>
          <div slot="right" class="row items-center">
            <q-icon name="place" /> {{educationInstitute}}
          </div>
        </q-card-title>
        <q-card-main>
          <br>
          <p class="text-faded">{{about}}</p>
          <br>
          <p class="text-faded no_style text-center">
            <a :href="lattes" target="_blank">Acessar Lattes</a>
          </p>
        </q-card-main>
        <q-card-separator />
        <q-card-actions class="justify-center">
          <q-btn flat color="primary" label="Ver Perfil" />
        </q-card-actions>
      </q-card>
    </a>
  </div>
</template>

<style>
.no_style a {
  color:#000000;
}
.no_style a:visited {
  color:#000000;
}
.no_style a:hover {
  color:#000000;
  text-decoration: none;
}
.no_style a:active {
  color:#000000;
}
</style>

<script>
export default {
  name: 'DivProfessor',
  props: {
    name: String,
    educationInstitute: String,
    about: String,
    lattes: String,
    id: Number,
    stars: Number
  },
  data () {
    return {
    }
  }
}
</script>
