import { IsNotEmpty } from 'class-validator';
export class CreateBlogDto {
  @IsNotEmpty({ message: '标题不能为空' })
  title: string;
  @IsNotEmpty({ message: '内容不能为空' })
  content: string;
  @IsNotEmpty({ message: '描述不能为空' })
  description: string;
  @IsNotEmpty({ message: '作者不能为空' })
  author: string;
}
