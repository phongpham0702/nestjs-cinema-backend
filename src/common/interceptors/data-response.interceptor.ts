import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable, tap } from 'rxjs';

@Injectable()
export class DataResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const  response = context.switchToHttp().getResponse();
    return next.handle().pipe(
      map((data) => {
        console.log(data);
        console.log(response);
      })
    );
  }
}
