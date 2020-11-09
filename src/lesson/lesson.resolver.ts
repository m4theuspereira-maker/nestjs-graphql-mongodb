import { Injectable } from "@nestjs/common";
import { ExceptionsHandler } from "@nestjs/core/exceptions/exceptions-handler";
import { Args, Mutation, ObjectType, Parent, Query, ResolveField } from "@nestjs/graphql";
import { Resolver } from "@nestjs/graphql";
import { StudentService } from "src/student/student.service";
import { AssignStudentsToLesson } from "./assign-students-to-lesson.input";
import { LessonEntity } from "./lesson.entity";
import { CreateLessonInput } from "./lesson.input";
import { LessonService } from "./lesson.service";
import { LessonType } from "./lesson.type";


@Resolver(of => LessonResolver)
@ObjectType()
export class LessonResolver{

    constructor(
       private lessonService: LessonService,
       private studentService: StudentService
    ){}

    @Query(returns =>[LessonType])
    getAllLessons(){
        return this.lessonService.getAllLessons()
    }

    @Query(returns => LessonType)
    getLessonById(
        @Args('id') id: string
    ){
      return this.lessonService.getLessonById({id})      
    }

    @Mutation(returns => LessonType)
    createLesson(
        @Args('createLessonInput') createLessonInput: CreateLessonInput 
    ){
        return this.lessonService.createLesson(createLessonInput)
    }

    @Mutation(returns => LessonType)
    assignStudentsToLesson(
        @Args('AssignStudentToLesson') assignStudentsToLesson: AssignStudentsToLesson
    ){
        const {lessonId, studentIds} = assignStudentsToLesson
        return this.lessonService.assignStudentToLesson(lessonId, studentIds)
    }

    // @ResolveField(returns =>[LessonEntity])
    //  async students(@Parent() lesson: LessonEntity){         
        
    //     const students = this.studentService.getManyStudents(lesson.students)
        
        
    // }
     
}