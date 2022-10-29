import { Entity, PrimaryGeneratedColumn,Column, CreateDateColumn, UpdateDateColumn, ManyToOne} from 'typeorm'
import { v4 as uuid } from 'uuid'
import { Exclude } from 'class-transformer'
import Users from './users.entity'

@Entity('posts')
class Posts {
    @PrimaryGeneratedColumn('uuid')
    readonly id: string

    @Column()
    post: string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @ManyToOne((type) => Users,{
        eager: true, nullable: false
    })
    user: Users

    constructor() {
        if (!this.id) {
              this.id = uuid();
         }
     }
}

export default Posts
