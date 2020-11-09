import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StudentEntity } from './student.entity';
import { StudentCreateInput } from './student.input';
import {v4 as uuid} from 'uuid';

@Injectable()
export class StudentService {

    constructor(
        @InjectRepository(StudentEntity) private studentRepository: Repository<StudentEntity>
    )
    {}


    async createStudent(studentCreateInput: StudentCreateInput): Promise<StudentEntity>{
        const {firstName, lastName} = studentCreateInput; 

        const student = this.studentRepository.create({
            id: uuid(), 
            firstName,
            lastName
        })
        return this.studentRepository.save(student)
    }

    async getStudentById(id): Promise<StudentEntity>{
        return this.studentRepository.findOne({id})
    }

    async getAllStudents(): Promise<StudentEntity[]>{
        return this.studentRepository.find()
    }

    async getManyStudents(studentsIds: string[]): Promise<StudentEntity[]>{
        return this.studentRepository.find({
            where:{
                id:{
                    $in: studentsIds
                }
            }
        })
    }
}
