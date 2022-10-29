import { IsNotEmpty } from 'class-validator';

export class UserLoginDto {
  @IsNotEmpty()
  public user: string;

  @IsNotEmpty()
  public password: string;
}
