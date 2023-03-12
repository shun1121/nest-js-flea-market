import { Body, Controller, Post } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { CredentialsDto } from './dto/credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  //@BodyでリクエストパラメータからcreateUserDtoを受け取る
  async signup(@Body() CreateUserDto: CreateUserDto): Promise<User> {
    return await this.authService.signUp(CreateUserDto);
  }

  @Post('signin')
  async signIn(
    @Body() CredentialsDto: CredentialsDto,
  ): Promise<{ accessToken: string }> {
    return await this.authService.signIn(CredentialsDto);
  }
}
