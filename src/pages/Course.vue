<template>
  <q-page>
    <div class="row gutter-sm header">
      <div class="col-sm-12 col-md-6 q-pt-md relative-position">
        <div id="course-image-icon" class="row justify-center">
          <q-icon size="100px" name="favorite" flat
          :color="this.favorites.map(el => el.id).includes(this.course.id) ? 'red' : 'white'" class="q-mb-md"/>
        </div>
        <img id="course-image" :src="course.photoUrl" height="100%" @click="fav()">
      </div>
      <div class="col-sm-12 col-md-6 q-pb-md space-inside">
        <h2>{{course.title}}</h2>
        <div class="q-subheading q-mb-sm">{{course.about}}</div>
        <q-rating @input="makeAvaliation" slot="subtitle" v-model="courseRate" :max="5" :readonly="!$login.userId"/> {{course.rate ? course.rate.toFixed(2) : ''}} ({{course.numberOfRates}} {{course.numberOfRates > 1 || course.numberOfRates === 0 ? 'classificações' : 'classificação'}})
        <br/> <small>{{course.visualization}} {{course.visualization > 1 || course.visualization === 0 ? 'Visualizações' : 'Visualização'}}</small>
        <p class="q-mt-sm q-mb-md" style="font-size: 20px">R$ {{`${course.price ? course.price.toFixed(2) : ''}`.replace('.', ',')}}</p>
        <q-btn label="Adicionar ao Carrinho" color="negative" text-color="white" class="full-width q-mb-md" @click="addToCart"/>
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
          <div class="col-md-6 col-12 no_style">
            <h4>Professor</h4>
            <a :href="`#/teacher/${professor.id}`">
              <q-card>
                <q-card-media>
                  <img :src="professor.photoUrl" height="180px" width="180px">
                </q-card-media>
                <q-card-title>
                  <div :title="professor.name">{{professor.name}}</div>
                  <q-rating slot="subtitle" v-model="professor.rate" :max="5" :title="professor.rate" readonly/>
                </q-card-title>
                <q-card-main>
                  <p class="text-faded">{{professor.about}}</p>
                </q-card-main>
              </q-card>
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="row space-inside q-mb-md">
      <div class="col-sm-12 col-md-12">
        <h2>Depoimentos</h2>
        <div class="row" v-if="$login.userId">
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
        <div v-else class="text-center">
          <h5>Nenhum depoimento encontrado!</h5>
        </div>
      </div>
    </div>
  </q-page>
</template>

<style>
#course-image {
  opacity: 1;
  position: relative;
  height: 100%;
  width: 100%;
}
#course-image:hover {
  opacity: 0.4;
  cursor: pointer;
}
#course-image-icon {
  opacity: 1;
  position: absolute;
  height: 100%;
  width: 100%;
}
.header {
  background-color: #505763;
  color: #ffffff;
  height: 100% !important;
}
.header h2{
  font-size: 36px;
}
.space-inside {
  padding-left: 25px !important;
  padding-right: 25px !important;
}
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
import { CoursesService, ProfessorsService } from '../resource'

export default {
  name: 'Course',
  data () {
    return {
      course: {},
      professor: {},
      courseRate: 0,
      testimony: '',
      ementa: ``,

      // Professor
      starsProfessor: 5,
      testimonies: []
    }
  },
  computed: {
    user: {
      get () {
        return this.$store.state.user
      }
    },
    favorites: {
      get () {
        return this.$store.state.user.favorites
      }
    }
  },
  methods: {
    async fav () {
      const message = await this.$store.dispatch('user/fav', this.course)
      if (message) {
        this.$q.notify(message)
      }
    },
    async addToCart () {
      const added = await this.$store.dispatch('cart/addItem', {
        id: this.course.id,
        image: this.course.photoUrl,
        title: this.course.title
      })
      if (added) {
        this.$q.notify({ message: 'Adicionado', color: 'positive' })
      } else {
        this.$q.notify('Esse curso já está no carrinho')
      }
    },
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
          userId: this.user.id
        }
        this.testimonies.push(testimony)
        CoursesService.create(`${this.course.id}/testimonies`, testimony)
        this.testimony = ''
      }
    },
    async makeAvaliation (courseRate) {
      let response = await CoursesService.create(`${this.course.id}/rate/`, { userId: this.user.id, rate: courseRate })
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
    await this.getRateByUser(this.course.id, this.user.id)
    this.getTestimonies(this.course.id)
    this.course.visualization++
    this.updateCourse(this.course.id, this.course)
  }
}
</script>
