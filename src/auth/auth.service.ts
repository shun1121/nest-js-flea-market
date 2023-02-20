import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt';
import { CredentialsDto } from './dto/credentials.dto';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(CreateUserDto: CreateUserDto): Promise<User> {
    return await this.userRepository.createUser(CreateUserDto);
  }

  async signIn(
    credentialsDto: CredentialsDto,
  ): Promise<{ accessToken: string }> {
    const { username, password } = credentialsDto;
    const user = await this.userRepository.findOne({ username });

    //データベースのpasswordはハッシュ化されていて、認証情報のpasswordと比較できない→bcryptを利用
    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = { id: user.id, username: user.username };
      const accessToken = await this.jwtService.sign(payload); //signの引数にpayloadを渡し、トークンを作成
      return { accessToken };
    }
    throw new UnauthorizedException(
      'ユーザ名またはパスワードを確認してください。',
    );
  }
}
