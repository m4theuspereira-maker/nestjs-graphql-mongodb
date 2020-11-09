import { ObjectType } from "@nestjs/graphql";
import { ObjectID } from "mongodb";
import { Column, Entity, ObjectIdColumn, PrimaryColumn } from "typeorm";


@Entity('Lesson')
export class LessonEntity{

    @ObjectIdColumn()
    _id: string

    @PrimaryColumn()
    id: string

    @Column()
    name: string

    @Column()
    startDate: string

    @Column()
    endDate: string

    @Column()
    students: string[]
}