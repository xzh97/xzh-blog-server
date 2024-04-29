import { Blog } from 'src/blog/entities/blog.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 10,
    comment: '分类名称',
  })
  name: string;

  @Column({
    type: 'timestamp',
    comment: '创建时间',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createTime: Date;

  @Column({
    default: 0,
    comment: '分类状态 0为正常情况 1删除',
  })
  status: number;

  @OneToMany(() => Blog, blogs => blogs.category)
  blogs: Blog[];
}
