import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { ListCommon } from 'src/types/common';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepo: Repository<Category>
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const qb = this.categoryRepo.createQueryBuilder();
    qb.where('category.name = :name', { name: createCategoryDto.name });
    const exist = await qb.getExists();
    if (exist) {
      throw new HttpException('分类名称已存在', HttpStatus.BAD_REQUEST);
    }
    this.categoryRepo.save(createCategoryDto);
  }

  async findAll(): Promise<ListCommon<Category>> {
    const qb = this.categoryRepo.createQueryBuilder('category');
    const list = await qb.getMany();
    const count = await qb.getCount();
    return {
      list,
      count,
    };
  }

  async findOne(id: number) {
    if (!id) {
      return null;
    }
    const qb = this.categoryRepo.createQueryBuilder('category');
    const item = await qb.where('category.id = :id', { id }).getOne();
    return item;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const qb = this.categoryRepo.createQueryBuilder('category');
    qb.where('category.id = :id', { id });
    const exist = await qb.getExists();
    if (!exist) {
      throw new HttpException(`id为${id}的分类不存在`, HttpStatus.BAD_REQUEST);
    }
    return this.categoryRepo.update(id, updateCategoryDto);
  }

  async remove(id: number) {
    return this.categoryRepo.delete(id);
  }
}
