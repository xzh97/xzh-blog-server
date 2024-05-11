import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CommentEntity } from './entities/comment.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Blog } from 'src/blog/entities/blog.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private commentRepo: Repository<CommentEntity>
  ) {}
  create(createCommentDto: CreateCommentDto) {
    this.commentRepo.save(createCommentDto);
  }

  findAll() {
    return this.commentRepo.findAndCount();
  }

  findOne(id: number) {
    return this.commentRepo.findOne({ where: { id } });
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    const isExist = this.commentRepo.exists({ where: { id } });
    if (isExist) {
      return this.commentRepo.update(id, updateCommentDto);
    }
  }

  remove(id: number) {
    return this.commentRepo.delete(id);
  }
}
