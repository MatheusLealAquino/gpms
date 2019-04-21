<template>
  <q-page>

    <q-carousel
      color="white"
      arrows
      quick-nav
      height="50vh"
      width="100%"
    >
      <q-carousel-slide img-src="statics/curso1.jpg" />
    </q-carousel>

    <div class="row gutter-sm q-pl-md q-pr-md q-mb-md">
      <div class="col-md-12"><h1 class="q-display-2">Cursos</h1></div>
      <div class="col-md-3" v-for="course in courses" :key="course.id">
        <DivCourse
          :name="course.name"
          :about="course.about"
          :value="course.value"/>
      </div>
    </div>

    <div class="row gutter-sm q-pl-md q-pr-md q-mb-md">
      <div class="col-md-12"><h1 class="q-display-2">Professores</h1></div>
      <div class="col-md-3" v-for="professor in professors" :key="professor.id">
        <DivProfessor
          :name="professor.name"
          :work="professor.work"
          :about="professor.about" />
      </div>
    </div>

    <div class="gutter-sm q-ml-md q-mr-md q-mt-md q-mb-md">
      <h1 class="q-display-2">Tracks</h1>
      <DivTrack v-for="track in traks" :key="track.id" :title="track.title" :courses="track.courses"/>
    </div>

    <q-carousel
      class="text-white"
      :easing="overshoot"
      infinite
      autoplay
      arrows
      color="white"
      height="45vh"
    >
      <q-carousel-slide
        v-for="n in 7" :key="`anim-${n}`"
        class="flex flex-center"
        :class="`bg-${colors[n % 5]}`"
      >
        <div class="row justify-center">
          <div class="col-md-3">
            <img src="~assets/prog1.jpg" height="125" width="125" class="rounded-img">
          </div>
          <div class="col-md-7 q-pt-xl">
            Acredito no aprendizado de longo prazo, e a Acedemy UFF é uma ótima plataforma para aprender com especialistas.
            Aprendi muito e recomendo a todos os meus amigos.
          </div>
        </div>
      </q-carousel-slide>
    </q-carousel>
  </q-page>
</template>

<style>
.rounded-img {
  border-radius: 50%;
}
</style>

<script>
import DivProfessorVue from '../components/DivProfessor.vue'
import DivCourseVue from '../components/DivCourse.vue'
import DivTrackVue from '../components/DivTrack.vue'
import { easing } from 'quasar'

export default {
  name: 'PageIndex',
  components: {
    DivProfessor: DivProfessorVue,
    DivCourse: DivCourseVue,
    DivTrack: DivTrackVue
  },
  data () {
    return {
      stars: 4,
      courses: [
        { id: '1', name: 'Programação de Computadores 1', about: 'Curso com foco para pessoas que nunca tiveram contato com programação.', value: '30,99' },
        { id: '2', name: 'Programação de Computadores 2', about: 'Para quem terminou programação de computadores 1.', value: '30,99' },
        { id: '3', name: 'Estrutura de Dados 1', about: 'Para quem terminou programação de computadores 2.', value: '30,99' },
        { id: '4', name: 'Estrutura de Dados 2', about: 'Para quem terminou estrutura de dados 2 e os cursos de programação de computadores.', value: '30,99' }
      ],
      professors: [
        { id: '1', name: 'Professor 1', work: 'UFF', about: 'Professor formado em Ciência da Computação.' },
        { id: '2', name: 'Professora 2', work: 'PUC', about: 'Professora formada em Ciência da Computação.' },
        { id: '3', name: 'Professor 3', work: 'UERJ', about: 'Professor formado em Ciência da Computação.' },
        { id: '4', name: 'Professora 4', work: 'UFRJ', about: 'Professora formada em Ciência da Computação.' }
      ],
      traks: [],
      overshoot: easing.overshoot,
      colors: [
        'primary',
        'secondary',
        'yellow',
        'red',
        'orange',
        'grey-2'
      ]
    }
  },
  mounted () {
    this.traks = [
      { id: '1', title: 'Carreira Front-End', courses: this.courses },
      { id: '2', title: 'Carreira Back-End', courses: this.courses }
    ]
  }
}
</script>
