import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryDto } from './create-category.dto';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
  // @IsNotEmpty({ message: '该文章不存在' })
  // @IsNumber({ allowNaN: false, allowInfinity: false }, { message: '传入id错误' })
  // id: number;
}
