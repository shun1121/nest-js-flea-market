import { createParamDecorator, ExecutionContext } from '@nestjs/common';

//ExecutionContextはハンドラに渡されたリクエストを取得
export const GetUser = createParamDecorator((_, ctx: ExecutionContext) => {
  // nest.jsはhttpsによるrestapiだけでなくさまざまなコンテキストで使われる。なので、どのctxが必要なのか明記。このapiではhttpを使用している。
  const request = ctx.switchToHttp().getRequest();
  return request.user;
});
