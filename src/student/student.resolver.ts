import { Args, Mutation, Query } from "@nestjs/graphql";
import { Resolver } from "@nestjs/graphql";
import { StudentEntity } from "./student.entity";
import { StudentService } from "./student.service";
import { StudentType } from "./student.type";
import {StudentCreateInput} from './student.input'


@Resolver(of => StudentType)
export class StudentResolver{

    constructor(
        private studentService: StudentService
    ){}


    @Query(returns => [StudentType])
    getAllStudents(){
        return this.studentService.getAllStudents()
    }

    @Query(returns => StudentType)
    getStudentById(
        @Args('id') id: string
    ){
        return this.studentService.getStudentById(id)
    }

    @Mutation(returns=> StudentType)
    createStudent(
        @Args('createStudentInpput')
        studentCreateInput: StudentCreateInput
        ){
            return this.studentService.createStudent(studentCreateInput)
        }



}