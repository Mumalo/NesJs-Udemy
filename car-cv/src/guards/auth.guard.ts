import {CanActivate, ExecutionContext} from "@nestjs/common";

export class AuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        // reject the request if the user is not signed in
        const request = context.switchToHttp().getRequest();
        return request.session.userId
    }
}
