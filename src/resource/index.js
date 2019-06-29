import GenericProvider from './HttpRequest'

// Give arg to provider to start endpoint with specific path for example = xxx.com/api/person
export const CoursesService = new GenericProvider('courses')
export const ProfessorsService = new GenericProvider('professors')
export const TestimoniesService = new GenericProvider('testimonies')
export const UsersService = new GenericProvider('customusers')
export const TracksService = new GenericProvider('categories')
