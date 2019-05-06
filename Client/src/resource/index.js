import CourseProvider from './CourseProvider'
import ProfessorsProvider from './ProfessorsProvider'
import TestimoniesProvider from './TestimoniesProvider'

// Give arg to provider to start endpoint with specific path for example = xxx.com/api/person
export const CoursesService = new CourseProvider('courses')
export const ProfessorsService = new ProfessorsProvider('professors')
export const TestimoniesService = new TestimoniesProvider('testimonies')
