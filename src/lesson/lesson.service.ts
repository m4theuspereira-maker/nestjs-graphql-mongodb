import {  Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {v4 as uuid} from 'uuid'
import { LessonEntity } from './lesson.entity';
import { CreateLessonInput } from './lesson.input';

@Injectable()
export class LessonService {
    
    constructor(
        @InjectRepository(LessonEntity) private lessonRepository: Repository<LessonEntity>,
      
    ){}

   async createLesson(createLessonInput: CreateLessonInput): Promise<LessonEntity>{
       
        const {name, startDate, endDate, students} = createLessonInput

        const lesson  = this.lessonRepository.create({
            id: uuid(),
            name, 
            startDate, 
            endDate,
            students
         })
        return   this.lessonRepository.save(lesson)
    }

    async getLessonById(id): Promise<LessonEntity>{
        return await this.lessonRepository.findOne(id)
     }

     async getAllLessons(): Promise<LessonEntity[]>{         
        return this.lessonRepository.find()
     }

     async assignStudentToLesson(lessonId: string, studentIds:string[]): Promise<LessonEntity>{
         const lesson = await this.lessonRepository.findOne({id: lessonId})
         lesson.students = [...lesson.students, ...studentIds]
         console.log("cestaCheia " +  studentIds)
         console.log("+====++++++=====")
         console.log("cesta = " + lesson.students)
         return await this.lessonRepository.save(lesson)
     }
}
