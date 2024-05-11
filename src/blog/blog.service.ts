import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Blog } from './entities/blog.entity';
import { Repository } from 'typeorm';
import { ListCommon } from 'src/types/common';
import { CommentEntity } from 'src/comment/entities/comment.entity';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(Blog)
    private blogRepo: Repository<Blog>
  ) {}

  async create(createBlogDto: CreateBlogDto) {
    const qb = this.blogRepo.createQueryBuilder();
    qb.where('blog.title = :title', { title: createBlogDto.title });
    const exist = await qb.getExists();
    if (exist) {
      throw new HttpException('文章名称已存在', HttpStatus.BAD_REQUEST);
    }
    return await this.blogRepo.save(createBlogDto);
  }

  async findAll(): Promise<ListCommon<Blog>> {
    const qb = this.blogRepo.createQueryBuilder('blog');
    const list = await qb.getMany();
    const count = await qb.getCount();
    return {
      list,
      count,
    };
  }

  async findOne(id: number): Promise<Blog | null> {
    if (!id) {
      return null;
    }
    const qb = this.blogRepo.createQueryBuilder('blog');

    const blogItem = await qb
      .leftJoinAndSelect('blog.category', 'category')
      .leftJoinAndSelect('blog.comments', 'comment')
      .where('blog.id = :id', { id })
      .getOne();
    function assemblyComment(comments: CommentEntity[]) {
      let result = [],
        reply = [],
        children = [];
      result = comments.filter(item => !item.parentId);
      children = comments.filter(item => item.parentId);
      reply = comments.filter(item => item.replyId);
      // console.log('assemblyComments', children);
      result.map(item => {
        item.children = children.filter(item2 => item2.parentId === item.id) || [];
      });
      return result;
    }
    blogItem.comments = assemblyComment(blogItem.comments);
    return blogItem;
  }

  async update(id: number, updateBlogDto: UpdateBlogDto) {
    const qb = this.blogRepo.createQueryBuilder('blog');
    qb.where('blog.id = :id', { id });
    const exist = await qb.getExists();
    if (!exist) {
      throw new HttpException(`id为${id}的文章不存在`, HttpStatus.BAD_REQUEST);
    }

    const updateRes = await this.blogRepo.update(id, updateBlogDto);
    if (updateRes.affected > 1) {
      const res = qb.getOne();
      return res;
    }
    return updateRes;
  }

  async remove(id: number): Promise<void> {
    await this.blogRepo.delete(id);
  }
}
