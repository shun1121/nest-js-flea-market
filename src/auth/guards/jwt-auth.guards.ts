import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// guradが適用されたリクエストハンドラは、jwt認証に通過してない場合は実行されなくなる。
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
