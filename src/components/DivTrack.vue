<template>
  <q-list inset-separator>
    <q-collapsible :label="title">
      <div class="row gutter-sm q-pl-md q-pr-md q-mb-md">
        <div class="col-md-4" v-for="course in courses" :key="course.id">
        <DivCourse
          :title="course.title"
          :about="course.about"
          :price="course.price"
          :image="course.photoUrl"
          :stars="course.rate"
          :id="course.id"/>
        </div>
      </div>
    </q-collapsible>
  </q-list>
</template>

<script>
import DivCourseVue from './DivCourse.vue'
export default {
  name: 'DivTack',
  components: {
    DivCourse: DivCourseVue
  },
  props: {
    title: String,
    courses: Array
  }
}
</script>
