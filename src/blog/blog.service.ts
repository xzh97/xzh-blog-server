import { Injectable } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Blog } from './entities/blog.entity';
import { Repository } from 'typeorm';
import { ListCommon } from 'src/types/common';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(Blog)
    private blogRepo: Repository<Blog>
  ) {}

  create(createBlogDto: CreateBlogDto): void {
    this.blogRepo.create(createBlogDto);
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
    const blogItem = await this.blogRepo
      .createQueryBuilder('blog')
      .where('blog.id = :id', { id })
      .getOne();
    return blogItem;
  }

  update(id: number, updateBlogDto: UpdateBlogDto) {
    this.blogRepo.update(id, updateBlogDto);
  }

  async remove(id: number): Promise<void> {
    await this.blogRepo.delete(id);
  }
}
