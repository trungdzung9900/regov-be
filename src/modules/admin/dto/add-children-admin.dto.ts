import { IsArray, IsOptional } from 'class-validator';

export class AddChildrenDto {
  @IsArray()
  @IsOptional()
  children: [];
}
