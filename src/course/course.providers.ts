import { Course } from './entities/course.entity';

export const courseProviders = [
  {
    provide: 'COURSE_REPOSITORY',
    useValue: Course,
  },
];
