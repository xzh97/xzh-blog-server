import { Category } from 'src/category/entities/category.entity';
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from 'typeorm';
@Entity()
export class Blog {
  @PrimaryGeneratedColumn()
  id: number;

  // 博客类型：1原创, 2转载, 3翻译
  @Column({
    default: 1,
  })
  type: number;

  // 博客标题
  @Column({
    length: 20,
  })
  title: string;

  // 博客封面
  @Column()
  poster?: string;

  // 博客内容描述
  @Column()
  description: string;

  // 博客内容
  @Column({
    type: 'text',
  })
  content: string;

  // 创建时间
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createTime: Date;

  // 更新时间
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateTime: Date;

  // 作者
  @Column({
    length: 20,
  })
  author: string;

  @ManyToOne(() => Category, category => category.blogs)
  @JoinColumn()
  category: Category;

  @Column({
    default: 0,
    comment: '博客状态 0为正常情况，1私密状态，2为逻辑删除',
  })
  status: number;
}
