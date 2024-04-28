import { IsNotEmpty } from 'class-validator';
export class CreateBlogDto {
  @IsNotEmpty({ message: '文章标题不能为空' })
  title: string;
  @IsNotEmpty({ message: '文章内容不能为空' })
  content: string;
  @IsNotEmpty({ message: '文章描述不能为空' })
  description: string;
  @IsNotEmpty({ message: '文章作者不能为空' })
  author: string;
}
