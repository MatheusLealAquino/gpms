import CourseProvider from './CourseProvider'
import ProfessorsProvider from './ProfessorsProvider'

// Give arg to provider to start endpoint with specific path for example = xxx.com/api/person
export const CoursesService = new CourseProvider('courses')
export const ProfessorsService = new ProfessorsProvider('professors')
