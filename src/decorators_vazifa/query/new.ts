import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CheckQuery = createParamDecorator(
  (queryName: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const query = request.query[queryName];
    if (!query) throw new Error(`Query ${queryName} kerak!`);
    return query;
  },
);
