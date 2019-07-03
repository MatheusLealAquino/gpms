<template>
  <q-page>
    <div class="row">
      <div class="col-12 text-center">
        <h4>Cursos Comprados</h4>
      </div>
      <div class="col-12 q-m-md">
        <q-list
          v-for="course in courses"
          :key="course.id"
        >
          <q-item>
            <q-item-side :avatar="course.photoUrl" />
            <q-item-main :label="course.title" />
            <q-item-side right>
              <q-btn label="Ir para o curso" color="primary" outline class="q-mb-md" :to="'/course/' + course.id"/>
            </q-item-side>
          </q-item>
        </q-list>
      </div>
    </div>
  </q-page>
</template>

<script>
import { UsersService } from '../resource'

export default {
  name: 'CoursesUser',
  data () {
    return {
      courses: []
    }
  },
  computed: {
    user: {
      get () {
        return this.$store.state.user
      }
    }
  },
  methods: {
    async getCourses () {
      let response = await UsersService.fetch(`${this.user.id}/purchasedCourses`)
      this.courses = response.data
    }
  },
  mounted () {
    this.getCourses()
  }
}
</script>
