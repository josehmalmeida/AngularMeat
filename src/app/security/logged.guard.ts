import { CanLoad, Route, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'
import { Injectable } from '@angular/core'
import { LoginService } from './login/login.service'

@Injectable()
export class LoggedGuard implements CanLoad, CanActivate {
  constructor(private loginService: LoginService) { }
  checkAuthentication(path: string): boolean {
    const logged: boolean = this.loginService.isLoggedIn()
    if (!logged) this.loginService.handleLogin("/" + path)
    return logged
  }
  canLoad(route: Route): boolean {
    return this.checkAuthentication(route.path)
  }
  canActivate(activatedRoute: ActivatedRouteSnapshot, routerState: RouterStateSnapshot): boolean {
    return this.checkAuthentication(activatedRoute.routeConfig.path)
  }
}
