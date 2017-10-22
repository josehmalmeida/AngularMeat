import { Injectable, Injector } from '@angular/core'
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs/Observable'
import { LoginService } from './login/login.service'

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private injector: Injector) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const loginService = this.injector.get(LoginService)
    let headers: HttpHeaders = new HttpHeaders()
    if (loginService.isLoggedIn())
      return next.handle(request.clone({ setHeaders: { 'Authorization': `Bearer ${loginService.user.accessToken}` } }))
    else
      return next.handle(request)
  }
}
