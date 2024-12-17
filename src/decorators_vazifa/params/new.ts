import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CheckParam = createParamDecorator(
  (paramName: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const param = request.params[paramName];
    if (!param) throw new Error(`Parametr ${paramName} kerak!`);
    return param;
  },
);
