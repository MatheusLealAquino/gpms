<template>
  <q-page>
    <div class="row">
      <div class="col-12 text-center">
        <h4>Timeline</h4>
      </div>
      <q-timeline
        responsive
        color="secondary"
        style="padding: 0 24px;">
          <q-timeline-entry
            v-for="course in courses"
            :key="course.id"
            :title="course.title"
            :subtitle="course.professor.name"
            side="left"
          >
            <div>
              <q-btn label="Ver curso" outline color="primary" class="q-mb-md" :to="'/course/' + course.id"/>
            </div>
          </q-timeline-entry>
      </q-timeline>
    </div>
  </q-page>
</template>

<script>
import { UsersService } from '../resource'

export default {
  name: 'Timeline',
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
      let response = await UsersService.fetch(`${this.user.id}/follows`, { filter: { include: { relation: 'following', scope: { include: 'courses' } } } })
      response.data.forEach(data => {
        let professor = data.following
        professor.courses.forEach(course => {
          course.professor = { name: '' }
          course.professor.name = professor.name
          this.courses.push(course)
        })
      })
    }
  },
  mounted () {
    this.getCourses()
  }
}
</script>
