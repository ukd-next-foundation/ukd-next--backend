import { IsEmail, IsEnum, IsOptional, IsPhoneNumber, IsString, IsUrl } from 'class-validator';
import { AuthProvider } from '../enums/auth-provider.enum';
import { UserRole } from '../enums/user-role.enum';

export class CreateUserDto {
  @IsEnum(AuthProvider)
  authProvider!: AuthProvider;

  @IsOptional()
  @IsString()
  googleUserId?: string;

  @IsOptional()
  @IsString()
  languageCode?: string;

  @IsOptional()
  @IsEnum(UserRole, { each: true })
  rules?: UserRole[];

  @IsEmail()
  email!: string;

  @IsString()
  fullname!: string;

  @IsOptional()
  @IsPhoneNumber()
  phone?: string;

  @IsOptional()
  @IsUrl()
  pictureURL?: string;
}
