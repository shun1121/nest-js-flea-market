import { SetMetadata } from '@nestjs/common';

//引数にはdecoratorで渡した値が入る。許可したいステータス
export const Role = (...statuses: string[]) =>
  SetMetadata('statuses', statuses); //decoratorに渡された値をkey,value形式でメタデータとして登録
// 認可が必要なroleを受け取り、メタデータに登録する関数
