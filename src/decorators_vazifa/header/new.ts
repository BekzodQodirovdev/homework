import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CheckHeader = createParamDecorator(
  (headerName: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const header = request.headers[headerName.toLowerCase()];
    if (!header) throw new Error(`Header ${headerName} kerak!`);
    return header;
  },
);
