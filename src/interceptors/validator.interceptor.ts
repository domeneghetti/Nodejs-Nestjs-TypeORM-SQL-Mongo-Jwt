import { Result } from '../modules/backoffice/models/result.model';
import { Body, CallHandler, HttpException, HttpStatus } from '@nestjs/common';
import { Contract } from '../modules/backoffice/contracts/contract';
import { ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class ValidatorInterceptor implements NestInterceptor {
    constructor(public contract: Contract) {
        
    }

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

        const body = context.switchToHttp().getRequest().Body;

        console.log("----------------------------------------------------");
        console.log("[body request]: " + body);
        console.log("----------------------------------------------------");

        const valid = this.contract.validate(body);

        if(!valid) {
            throw new HttpException(new Result('Ops, algo saiu errado', false, null, this.contract.errors), HttpStatus.BAD_REQUEST);
        }

        return next
            .handle()
            .pipe(
                tap(() => console.log('Retorno intercept')),
            );
    }
}