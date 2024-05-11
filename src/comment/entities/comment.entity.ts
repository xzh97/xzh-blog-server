import { Blog } from 'src/blog/entities/blog.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
@Entity('comment')
export class CommentEntity {
  /* 评论id */
  @PrimaryGeneratedColumn()
  id: number;

  /* 名称 */
  @Column()
  name: string;

  /* 联系方式 电话或者邮箱 */
  @Column({
    select: false,
  })
  contact: string;

  /* 评论内容 */
  @Column()
  content: string;

  /* 归属评论id */
  @Column({
    default: 0,
  })
  parentId: number;

  /* 回复评论id */
  @Column({
    default: 0,
  })
  replyId: number;

  /* 回复内容 */
  @Column({
    default: () => 'CURRENT_TIMESTAMP',
  })
  createTime: Date;

  /* 对应的文章 */
  @ManyToOne(() => Blog, blog => blog.comments)
  @JoinColumn()
  blog: Blog;
}
