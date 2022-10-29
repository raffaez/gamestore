import { IsNotEmpty } from 'class-validator';

export class UpdateUserDto {
  @IsNotEmpty()
  public firstName: string;

  @IsNotEmpty()
  public lastName: string;
}
