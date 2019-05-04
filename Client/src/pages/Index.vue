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

    <div class="row gutter-sm q-pl-md q-pr-md q-mb-sm">
      <div class="col-md-12">
        <h1 class="q-display-2">Cursos</h1>
      </div>
      <div class="col-md-12">
        <q-search color="white" inverted-light v-model="searchCourse" placeholder="Buscar cursos" @input="filterCourses"/>
      </div>
      <div class="col-md-12" v-if="coursesNotFound">
        <p class="text-center text-fade">Nenhum curso encontrado!</p>
      </div>
      <div class="col-md-3" v-for="course in coursesToShow" :key="course.id">
        <DivCourse
          :title="course.title"
          :about="course.about"
          :price="course.price"/>
      </div>
    </div>

    <div class="row gutter-sm q-pl-md q-pr-md q-mb-sm">
      <div class="col-md-12"><h1 class="q-display-2">Docentes</h1></div>
      <div class="col-md-12">
        <q-search color="white" inverted-light v-model="searchProfessor" placeholder="Buscar docentes" @input="filterProfessor"/>
      </div>
      <div class="col-md-12" v-if="professorNotFound">
        <p class="text-center text-fade">Nenhum docente encontrado!</p>
      </div>
      <div class="col-md-3" v-for="professor in professorsToShow" :key="professor.id">
        <DivProfessor
          :name="professor.name"
          :educationInstitute="professor.educationInstitute"
          :lattes="professor.lattes"
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
import { CoursesService, ProfessorsService } from '../resource'

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
      searchCourse: '',
      coursesNotFound: false,
      coursesToShow: [],
      courses: [],
      searchProfessor: '',
      professorNotFound: false,
      professorsToShow: [],
      professors: [],
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
  methods: {
    filterCourses () {
      this.coursesToShow = this.courses.filter(course => {
        if (course.title.toLowerCase().includes(this.searchCourse.toLowerCase()) ||
        course.about.toLowerCase().includes(this.searchCourse.toLowerCase()) ||
        course.price.toString().toLowerCase().includes(this.searchCourse.toLowerCase())) return true
      }).slice(0, 4)
      if (this.coursesToShow.length <= 0) this.coursesNotFound = true
      else this.coursesNotFound = false
    },
    filterProfessor () {
      this.professorsToShow = this.professors.filter(professor => {
        if (professor.name.toLowerCase().includes(this.searchProfessor.toLowerCase()) ||
        professor.lattes.toLowerCase().includes(this.searchProfessor.toLowerCase())) return true
      }).slice(0, 4)
      if (this.professorsToShow.length <= 0) this.professorNotFound = true
      else this.professorNotFound = false
    },
    async getCourses () {
      let response = await CoursesService.fetch('')
      this.courses = response.data
      this.coursesToShow = this.courses.slice(0, 4)
    },
    async getProfessors () {
      let response = await ProfessorsService.fetch('')
      this.professors = response.data
      this.professorsToShow = this.professors.slice(0, 4)
    }
  },
  async mounted () {
    await this.getCourses()
    this.traks = [
      { id: '1', title: 'Carreira Front-End', courses: this.courses },
      { id: '2', title: 'Carreira Back-End', courses: this.courses }
    ]
    this.getProfessors()
  }
}
</script>