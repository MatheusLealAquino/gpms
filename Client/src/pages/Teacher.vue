<template>
  <q-page>
    <div class="row gutter-sm header">
      <div class="col-sm-12 col-md-6 q-pt-md q-mt-md text-center">
        <img :src="professor.photoUrl" height="200px" width="200px" class="round">
      </div>
      <div class="col-sm-12 col-md-6 q-pb-md space-inside">
        <h2>{{professor.name}}</h2>
        <div class="q-subheading q-mb-sm">{{professor.about}}</div>
        <q-rating @input="makeAvaliation" slot="subtitle" v-model="professorRate" :max="5" :readonly="!$login.userId"/>
        {{professor.rate}} ({{professor.numberOfRates}} {{professor.numberOfRates > 1 || professor.numberOfRates === 0 ? 'classificações' : 'classificação'}})

      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <q-carousel arrows class="text-white">
          <q-carousel-slide class="bg-primary" v-for="curso in professor.courses" :key="curso.id">
            <div class="row gutter-sm">
              <div class="col-sm-12 col-md-6 q-pb-md space-inside">
                <h5>{{curso.title}}</h5>
                <div class="q-subheading q-mb-sm">{{curso.about}}</div>
                <q-rating readonly slot="subtitle" v-model="curso.rate" :max="5"/>
                {{curso.rate}} ({{curso.numberOfRates}} {{curso.numberOfRates > 1 || curso.numberOfRates === 0 ? 'classificações' : 'classificação'}})
                <p
                  class="q-mt-sm q-mb-md"
                  style="font-size: 20px"
                >R$ {{`${curso.price}`.replace('.', ',')}}</p>
              </div>
              <div class="col-sm-12 col-md-6 q-pt-md">
                <img :src="curso.photoUrl" height="100%" width="100%" class="round">
              </div>
            </div>
          </q-carousel-slide>
        </q-carousel>
      </div>
    </div>
    <div class="row space-inside q-mb-md">
      <div class="col-sm-12 col-md-12">
        <h2>Depoimentos</h2>
        <div class="row">
          <div class="col-md-11">
            <q-input
              v-model="testimony"
              class="q-mb-md"
              type="textarea"
              float-label="Depoimento"
              placeholder="Digite seu depoimento"
            />
          </div>
          <div class="col-md-1">
            <q-btn icon="send" class="float-right vertical-middle" flat @click="createTestimonies"/>
          </div>
        </div>
        <q-scroll-area
          style="width: 100%; height: 70%; margin-bottom:2%"
          v-if="testimonies.length > 0"
        >
          <q-list inset-separator>
            <q-item multiline v-for="testimonial in testimonies" v-bind:key="testimonial.id">
              <p class="q-mr-md">Usuario {{testimonial.userId}}</p>
              <q-item-main :label="testimonial.text"/>
              <q-item-side
                right
                :stamp="new Date(testimonial.createdAt).toLocaleDateString('pt-br')"
              />
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
<script>
import { ProfessorsService } from '../resource'

export default {
  name: 'Teacher',
  data () {
    return {
      // While don't have login
      userId: 12,

      professor: {},
      professorRate: 0,
      testimony: '',
      testimonies: []
    }
  },
  methods: {
    async getProfessor (id) {
      try {
        let response = await ProfessorsService.fetch(id, {
          filter: {
            include: 'courses'
          }
        })
        this.professor = response.data
      } catch (err) {
        this.$router.push('/notFound')
      }
    },
    async getTestimonies (idProfessor) {
      let response = await ProfessorsService.fetch(`${idProfessor}/testimonies`)
      this.testimonies = response.data
    },
    createTestimonies () {
      if (this.testimony.length > 0) {
        let testimony = {
          text: this.testimony,
          createdAt: new Date(),
          testimoniableId: this.professor.id,
          testimoniableType: 'Professor',
          userId: 2
        }
        this.testimonies.push(testimony)
        ProfessorsService.create(`${this.professor.id}/testimonies`, testimony)
        this.testimony = ''
      }
    },
    async makeAvaliation (professorRate) {
      let response = await ProfessorsService.create(`${this.professor.id}/rate/`, { userId: this.userId, rate: professorRate })
      this.professor.rate = response.data.rate
      this.professor.numberOfRates = response.data.numberOfRates
    },
    async getRateByUser (idProfessor, idUser) {
      let response = await ProfessorsService.fetch(`${idProfessor}/rates`, { filter: { where: { userId: idUser } } })
      this.professorRate = response.data.length === 1 ? response.data[0].value : 0
    }
  },
  async mounted () {
    await this.getProfessor(this.$route.params.id)
    await this.getRateByUser(this.professor.id, this.userId)
    this.getTestimonies(this.professor.id)
    this.professor.visualization++
  }
}
</script>

<style>
.header {
  background-color: #505763;
  color: #ffffff;
  height: 100% !important;
}
.header h2 {
  font-size: 36px;
}
.round {
  border-radius: 3px;
}
.space-inside {
  padding-left: 25px !important;
  padding-right: 25px !important;
}
</style>
