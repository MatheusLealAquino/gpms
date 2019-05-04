<template>
  <q-page>
    <div class="row gutter-sm header">
      <div class="col-sm-12 col-md-6 q-pt-md">
        <img src="~assets/prog1.jpg" height="100%" class="round">
      </div>
      <div class="col-sm-12 col-md-6 q-pb-md space-inside">
        <h2>{{course.title}}</h2>
        <div class="q-subheading q-mb-sm">{{course.about}}</div>
        <q-rating slot="subtitle" v-model="course.rate" :max="5" :title="stars" readonly/> {{course.rate}} ({{course.numberOfRates}} {{course.numberOfRates > 1 || course.numberOfRates === 0 ? 'classficações' : 'classificação'}})
        <br/> <small>{{course.visualization}} {{course.visualization > 1 || course.visualization === 0 ? 'Visualizações' : 'Visualização'}}</small>
        <p class="q-mt-sm q-mb-md" style="font-size: 20px">R$ {{`${course.price}`.replace('.', ',')}}</p>
        <q-btn label="Adicionar ao Carrinho" color="negative" text-color="white" class="full-width q-mb-md" />
        <q-btn label="Comprar" color="white" text-color="black" class="full-width q-mb-md" />
      </div>
    </div>
    <div class="row gutter-sm space-inside">
      <div class="col-sm-12 col-md-6 col-12">
        <h4>Ementa</h4>
        <p v-html="course.menu"/>
      </div>
      <div class="col-sm-12 col-md-6 col-12">
        <div class="row justify-center">
          <div class="col-md-6 col-12">
            <h4>Professor</h4>
            <q-card>
              <q-card-media>
                <img src="~assets/teacher.png" height="180px" width="180px">
              </q-card-media>
              <q-card-title>
                <div :title="professor.name">{{professor.name}}</div>
                <q-rating slot="subtitle" v-model="starsProfessor" :max="5" :title="stars" readonly/>
              </q-card-title>
              <q-card-main>
                <p class="text-faded">{{professor.about}}</p>
              </q-card-main>
            </q-card>
          </div>
        </div>
      </div>
    </div>
    <div class="row space-inside q-mb-md">
      <div class="col-sm-12 col-md-12">
        <h2>Depoimentos</h2>
        <q-input v-model="comment" class="q-mb-md" type="textarea" float-label="Depoimento" placeholder="Digite seu depoimento" />

        <q-scroll-area style="width: 100%; height: 100%;">
          <q-list inset-separator>
            <q-item multiline v-for="testimonial in testimonials" v-bind:key="testimonial.id">
              <p class="q-mr-md"> {{testimonial.name}} </p>
              <q-item-main
                :label="testimonial.text"
              />
              <q-item-side right :stamp="testimonial.date" />
            </q-item>
          </q-list>
        </q-scroll-area>
      </div>
    </div>
  </q-page>
</template>

<style>
.header {
  background-color: #505763;
  color: #ffffff;
  height: 100% !important;
}
.header h2{
  font-size: 36px;
}
.round {
  width: 100%;
  border-radius: 3px;
}
.space-inside {
  padding-left: 25px !important;
  padding-right: 25px !important;
}
</style>

<script>
import { CoursesService, ProfessorsService } from '../resource'

export default {
  name: 'Course',
  data () {
    return {
      course: {},
      professor: {},
      title: 'Programação de Computadores 1',
      comment: '',
      stars: 0,
      views: 1,
      about: 'Aprenda lógica de Programação do ZERO e aplique os conhecimentos em um projeto real.',
      totalAvaliations: 0,
      value: '00,00',
      ementa: `<b>O que é Java?</b><br/>
              <ul>
                <li>Introdução</li>
                <li>A plataforma Java</li>
                <li>Benefício da JVM</li>
                <li>Quais características?</li>
                <li>Quais sistemas?</li>
                <li>Bytecode vs EXE?</li>
                <li>Sobre o Bytecode</li>
                <li>Para saber mais: o nome Bytecode</li>
                <li>O que aprendemos?</li>
              </ul>`,

      // Professor
      nameProfessor: 'Professor 1',
      starsProfessor: 5,
      testimonials: [
        {
          id: 1,
          date: '01/05/2019',
          text: 'How are you?',
          name: 'Usuario 1'
        },
        {
          id: 2,
          date: '02/05/2019',
          name: 'Usuario 2',
          text: 'I\'m good, thank you!'
        }
      ]
    }
  },
  methods: {
    async getCourse (id) {
      try {
        let response = await CoursesService.fetch(id)
        this.course = response.data
      } catch (err) {
        this.$router.push('/notFound')
      }
    },
    async getProfessor (id) {
      let response = await ProfessorsService.fetch(id)
      this.professor = response.data
    },
    updateCourse (id, course) {
      CoursesService.update(id, course)
    },
    getTestimonials (idCourse) {
    }
  },
  async mounted () {
    await this.getCourse(this.$route.params.id)
    await this.getProfessor(this.course.professorId)
    this.course.visualization++
    this.updateCourse(this.course.id, this.course)
  }
}
</script>
