import CourseProvider from './CourseProvider'

// Give arg to provider to start endpoint with specific path for example = xxx.com/api/person
export const CoursesService = new CourseProvider('courses')
