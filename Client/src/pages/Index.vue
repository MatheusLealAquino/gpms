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
  </q-page>
</template>

<style>
</style>

<script>
import DivProfessorVue from '../components/DivProfessor.vue'
import DivCourseVue from '../components/DivCourse.vue'

export default {
  name: 'PageIndex',
  components: {
    DivProfessor: DivProfessorVue,
    DivCourse: DivCourseVue
  },
  data () {
    return {
      stars: 4,
      courses: [
        { id: '1', name: 'Programação de Computadores 1', about: 'Curso com foco para pessoas que nunca tiveram contato com programação.', value: '30,99' },
        { id: '2', name: 'Programação de Computadores 2', about: 'Para quem terminou programação de computadores 1.', value: '30,99' },
        { id: '3', name: 'Estrutura de Dados 1', about: 'Para quem terminou programação de computadores 2.', value: '30,99' },
        { id: '4', name: 'Estrutura de Dados 2', about: 'Para quem terminou estrutura de dados 2.', value: '30,99' }
      ],
      professors: [
        { id: '1', name: 'Professor 1', work: 'UFF', about: 'Professor formado em Ciência da Computação.' },
        { id: '2', name: 'Professora 2', work: 'PUC', about: 'Professora formada em Ciência da Computação.' },
        { id: '3', name: 'Professor 3', work: 'UERJ', about: 'Professor formado em Ciência da Computação.' },
        { id: '4', name: 'Professora 4', work: 'UFRJ', about: 'Professora formada em Ciência da Computação.' }
      ]
    }
  }
}
</script>
