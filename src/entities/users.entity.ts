import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn} from 'typeorm'
import { v4 as uuid } from 'uuid'
import { Exclude } from 'class-transformer'
import Posts from './posts.entity'

@Entity('users')
class Users {
    @PrimaryGeneratedColumn('uuid')
    readonly id: string

    @Column()
    name: string

    @Column({unique:true})
    email: string 

    @Column()
    avatar: string
    
    @Column()
    @Exclude()
    password: string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
    
    @OneToMany((type) => Posts, posts => posts.user)
    posts: Posts[]

    constructor() {
        if (!this.id) {
              this.id = uuid();
         }
     }
}

export default Users