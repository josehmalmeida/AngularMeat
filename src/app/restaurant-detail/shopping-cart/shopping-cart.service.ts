import { Injectable } from '@angular/core'
import { CartItem } from '../../restaurant-detail/shopping-cart/cart-item.model'
import { MenuItem } from '../../restaurant-detail/menu-item/menu-item.model'
import { NotificationService } from '../../shared/notification.service'

@Injectable()
export class ShoppingCartService {
  items: CartItem[] = [];

  constructor(private notificationService: NotificationService) { }

  increaseQty(item: CartItem) { item.quantity++ }
  removeItem(item: CartItem) {
    this.items.splice(this.items.indexOf(item), 1)
    this.notificationService.notify(`Você removeu o item ${item.menuItem.name}`)
  }

  clear() { this.items = [] }

  decreaseQty(item: CartItem) {
    if (--item.quantity === 0) {
      this.removeItem(item)
    }
  }

  addItem(item: MenuItem) {
    let foundItem = this.items.find((mItem) => mItem.menuItem.id === item.id)
    if (foundItem) {
      this.increaseQty(foundItem)
    } else {
      this.items.push(new CartItem(item))
      this.notificationService.notify(`Você adicionou o item ${item.name}`)
    }
  }

  total(): number {
    return this.items
      .map(item => item.value())
      .reduce((prev, value) => prev + value, 0)
  }

}
