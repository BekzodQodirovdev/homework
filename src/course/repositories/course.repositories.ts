import { Inject, Injectable } from '@nestjs/common';
import { Course } from '../entities/course.entity';
import { UpdateCourseDto } from '../dto/update-course.dto';

@Injectable()
export class CourseRepository {
  constructor(
    @Inject('COURSE_REPOSITORY') private courseModel: typeof Course,
  ) {}
  async create(createCourseDto) {
    return this.courseModel.create(createCourseDto);
  }

  async findAll(): Promise<Course[]> {
    return this.courseModel.findAll<Course>();
  }

  async findOne(id: number) {
    return this.courseModel.findByPk(id);
  }

  async update(id: number, updateCourseDto: UpdateCourseDto) {
    return this.courseModel.update(updateCourseDto, {
      where: {
        id,
      },
    });
  }

  async remove(id: number) {
    return this.courseModel.destroy({
      where: {
        id,
      },
    });
  }
}
