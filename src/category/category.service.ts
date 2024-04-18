import { Injectable } from '@nestjs/common';
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
    this.categoryRepo.save(createCategoryDto);
  }

  async findAll(): Promise<ListCommon<Category>> {
    const qb = this.categoryRepo.createQueryBuilder('category');
    const list = await qb.getMany();
    const count = await qb.getCount();
    console.log(list);
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

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return this.categoryRepo.update(id, updateCategoryDto);
  }

  async remove(id: number) {
    return this.categoryRepo.delete(id);
  }
}
