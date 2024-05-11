import { DataSourceOptions } from 'typeorm';
import { Blog } from './blog/entities/blog.entity';
import { Category } from './category/entities/category.entity';
import { CommentEntity } from './comment/entities/comment.entity';

export const MysqlDataSource: DataSourceOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  database: 'xizh_test',
  username: 'root',
  password: 'z995194437',
  entities: [CommentEntity, Blog, Category],
  logging: false,
  synchronize: true,
};
