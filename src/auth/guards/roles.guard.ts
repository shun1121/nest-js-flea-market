import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {} //reflectorはdecoratorでセットしたメタデータを取得するもの

  canActivate(ctx: ExecutionContext): boolean {
    const requireStatuses = this.reflector.get<string[]>(
      'statuses', //取得したいメタデータのkey
      ctx.getHandler(), //ハンドラのメタデータを取得 ハンドラのメタデータとは？
    );

    // デコレーターに何も指定していない場合は実行を許可。
    if (!requireStatuses) {
      return true;
    }

    const { user } = ctx.switchToHttp().getRequest();
    return requireStatuses.some((status) => user.status.includes(status));
  }
}
