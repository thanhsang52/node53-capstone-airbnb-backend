import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class SignupDto {
  @ApiProperty({
    example: 'Tony Nguyen',
    description: 'User full name',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'tony@gmail.com',
    description: 'User email',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '123456',
    description: 'User password',
  })
  @IsString()
  password: string;

  @ApiProperty({
    example: '0909090909',
    description: 'Phone number',
  })
  @IsString()
  phone: string;

  @ApiProperty({
    example: '1998-01-01',
    description: 'Birth day',
  })
  @IsString()
  birthDay: string;

  @ApiProperty({
    example: 'male',
    description: 'Gender',
  })
  @IsString()
  gender: string;
}
