import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guards';
import { RolesGuard } from './guards/roles.guard';
import { JwtStrategy } from './jwt.strategy';
import { UserRepository } from './user.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository]), //repositoryをモジュールに登録
    PassportModule.register({ defaultStratety: 'jwt' }), //デフォルトの認証方法をjwtに設定
    //↓jwtの設定 secretが秘密鍵。
    JwtModule.register({
      secret: 'secretKey123',
      signOptions: {
        expiresIn: 3600,
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, JwtAuthGuard, RolesGuard],
  // ↓Itemsモジュール側でも使いたい
  exports: [JwtStrategy, JwtAuthGuard, RolesGuard],
})
export class AuthModule {}
