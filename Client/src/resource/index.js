import CoursesProvider from './CoursesProvider'
import ProfessorsProvider from './ProfessorsProvider'
import TestimoniesProvider from './TestimoniesProvider'
import UsersProvider from './UsersProvider'
import TracksProvider from './TracksProvider'

// Give arg to provider to start endpoint with specific path for example = xxx.com/api/person
export const CoursesService = new CoursesProvider('courses')
export const ProfessorsService = new ProfessorsProvider('professors')
export const TestimoniesService = new TestimoniesProvider('testimonies')
export const UsersService = new UsersProvider('users')
export const TracksService = new TracksProvider('categories')
