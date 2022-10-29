import { IsEmail, IsNotEmpty, Matches } from 'class-validator';
import { MessagesHelper } from 'src/helpers/messages.helper';
import { RegExHelper } from 'src/helpers/regex.helper';

export class CreateUserDto {
  @IsNotEmpty()
  public firstName: string;

  @IsNotEmpty()
  public lastName: string;

  @IsNotEmpty()
  @IsEmail()
  public email: string;

  @IsNotEmpty()
  @Matches(RegExHelper.password, { message: MessagesHelper.PASSWORD_VALID })
  public password: string;
}
