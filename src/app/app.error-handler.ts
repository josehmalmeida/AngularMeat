import { HttpErrorResponse } from '@angular/common/http'
import { ErrorHandler, Injectable, Injector, NgZone } from '@angular/core'
import { Router } from '@angular/router'
import { Observable } from 'rxjs/Observable'
import { NotificationService } from './shared/notification.service'
import { LoginService } from './security/login/login.service'

@Injectable()
export class ApplicationErrorHandler extends ErrorHandler {

  constructor(
    private notificationService: NotificationService,
    private injector: Injector,
    private zone: NgZone) {
    super()
  }

  handleError(error: HttpErrorResponse | any) {
    if (error instanceof HttpErrorResponse) {
      this.zone.run(() => {
        switch (error.status) {
          case 401:
            this.injector.get(LoginService).handleLogin()
            break
          case 403:
            this.notificationService.notify(error.error.message || "Acesso Negado")
            break
          case 404:
            this.injector.get(Router).navigate(['/404'])
            break
        }
      })
    }
    super.handleError(error)
  }
}
