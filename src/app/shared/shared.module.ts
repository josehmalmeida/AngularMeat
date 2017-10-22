import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HTTP_INTERCEPTORS } from '@angular/common/http'

import { SpacedCurrencyPipe } from './pipe/spaced-currency.pipe'

import { RestaurantsService } from '../restaurants/restaurants.service'
import { ShoppingCartService } from '../restaurant-detail/shopping-cart/shopping-cart.service'
import { OrderService } from '../order/order.service';
import { NotificationService } from './notification.service'
import { LoginService } from '../security/login/login.service'

import { InputComponent } from './component/input/input.component'
import { RadioComponent } from './component/radio/radio.component'
import { RatingComponent } from './component/rating/rating.component'
import { SnackbarComponent } from './component/snackbar/snackbar.component'

import { LoggedGuard } from '../security/logged.guard'
import { LeaveOrderGuard } from '../order/leave-order.guard'
import { AuthInterceptor } from '../security/auth.interceptor'

@NgModule({
  declarations: [InputComponent, RadioComponent, RatingComponent, SnackbarComponent,
    SpacedCurrencyPipe],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [CommonModule, FormsModule, ReactiveFormsModule, InputComponent,
    RadioComponent, RatingComponent, SnackbarComponent, SpacedCurrencyPipe]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [RestaurantsService, ShoppingCartService, OrderService,
        NotificationService, LoginService, LoggedGuard, LeaveOrderGuard,
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }]
    }
  }
}
