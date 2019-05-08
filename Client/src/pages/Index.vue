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
          :stars="course.rate"
          :id="course.id"
          :title="course.title"
          :about="course.about"
          :price="course.price"
          :image="course.photoUrl"/>
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
          :stars="professor.rate"
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
      height="30vh"
    >
      <q-carousel-slide
        v-for="(testimony, index) in testimonies" :key="testimony.id"
        class="flex flex-center justify-center"
        :class="`bg-${colors[index % 5]}`"
      >
        <div class="col-md-3 q-mb-sm">
          <img src="~assets/profile-avatar.png" height="125" width="125" class="rounded-img">
        </div>
        <div class="col-md-7 q-pl-xl">
          {{testimony.text}}
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
import { CoursesService, ProfessorsService, TestimoniesService } from '../resource'

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

      // Course
      searchCourse: '',
      coursesNotFound: false,
      coursesToShow: [],
      courses: [],

      // Professor
      searchProfessor: '',
      professorNotFound: false,
      professorsToShow: [],
      professors: [],

      // Testominy
      testimonies: [],

      // Trak
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
    },
    async getTestimonies () {
      let response = await TestimoniesService.fetch('', { filter: { limit: 4 } })
      this.testimonies = response.data
    }
  },
  async mounted () {
    await this.getCourses()
    this.traks = [
      { id: '1', title: 'Carreira Front-End', courses: this.courses },
      { id: '2', title: 'Carreira Back-End', courses: this.courses }
    ]
    this.getProfessors()
    this.getTestimonies()
  }
}
</script>
