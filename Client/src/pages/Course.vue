<template>
  <q-page>
    <div class="row gutter-sm header">
      <div class="col-sm-12 col-md-6 q-pt-md">
        <img src="~assets/prog1.jpg" height="100%" class="round">
      </div>
      <div class="col-sm-12 col-md-6 q-pb-md space-inside">
        <h2>{{course.title}}</h2>
        <div class="q-subheading q-mb-sm">{{course.about}}</div>
        <q-rating @input="makeAvaliation" slot="subtitle" v-model="courseRate" :max="5"/> {{course.rate ? course.rate.toFixed(2) : ''}} ({{course.numberOfRates}} {{course.numberOfRates > 1 || course.numberOfRates === 0 ? 'classificações' : 'classificação'}})
        <br/> <small>{{course.visualization}} {{course.visualization > 1 || course.visualization === 0 ? 'Visualizações' : 'Visualização'}}</small>
        <p class="q-mt-sm q-mb-md" style="font-size: 20px">R$ {{`${course.price ? course.price.toFixed(2) : ''}`.replace('.', ',')}}</p>
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
                <q-rating slot="subtitle" v-model="starsProfessor" :max="5" :title="starsProfessor" readonly/>
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
        <div class="row" v-if="this.$login.userId">
        <div class="col-md-11">
          <q-input v-model="testimony" class="q-mb-md" type="textarea" float-label="Depoimento" placeholder="Digite seu depoimento" />
        </div>
        <div class="col-md-1">
          <q-btn icon="send" class="float-right vertical-middle" flat @click="createTestimonies"/>
        </div>
        </div>
        <q-scroll-area style="width: 100%; height: 70%; margin-bottom:2%" v-if="testimonies.length > 0">
          <q-list inset-separator>
            <q-item multiline v-for="testimonial in testimonies" v-bind:key="testimonial.id">
              <p class="q-mr-md"> Usuario {{testimonial.userId}} </p>
              <q-item-main
                :label="testimonial.text"
              />
              <q-item-side right :stamp="new Date(testimonial.createdAt).toLocaleDateString('pt-br')" />
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
      userId: this.$login.userId,
      course: {},
      professor: {},
      courseRate: 0,
      testimony: '',
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
      starsProfessor: 5,
      testimonies: []
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
    async getTestimonies (idCourse) {
      let response = await CoursesService.fetch(`${idCourse}/testimonies`)
      this.testimonies = response.data
    },
    async getProfessor (id) {
      try {
        let response = await ProfessorsService.fetch(id)
        this.professor = response.data
      } catch (err) {
        console.log('Professor não encontrado!')
      }
    },
    updateCourse (id, course) {
      CoursesService.update(id, course)
    },
    createTestimonies () {
      if (this.testimony.length > 0) {
        let testimony = {
          text: this.testimony,
          createdAt: new Date(),
          testimoniableId: this.course.id,
          testimoniableType: 'Course',
          userId: this.$login.userId
        }
        this.testimonies.push(testimony)
        CoursesService.create(`${this.course.id}/testimonies`, testimony)
        this.testimony = ''
      }
    },
    async makeAvaliation (courseRate) {
      let response = await CoursesService.create(`${this.course.id}/rate/`, { userId: this.userId, rate: courseRate })
      this.course.rate = response.data.rate
      this.course.numberOfRates = response.data.numberOfRates
    },
    async getRateByUser (idCourse, idUser) {
      let response = await CoursesService.fetch(`${idCourse}/rates`, { filter: { where: { userId: idUser } } })
      this.courseRate = response.data.length === 1 ? response.data[0].value : 0
    }
  },
  async mounted () {
    await this.getCourse(this.$route.params.id)
    await this.getProfessor(this.course.professorId)
    await this.getRateByUser(this.course.id, this.userId)
    this.getTestimonies(this.course.id)
    this.course.visualization++
    this.updateCourse(this.course.id, this.course)
  }
}
</script>
