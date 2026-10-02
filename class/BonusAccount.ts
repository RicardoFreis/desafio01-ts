import { DioAccount } from "./DioAccount"

export class BonusAccount extends DioAccount {
  deposit(amount: number): void {
    super.deposit(amount)
    super.deposit(10)
  }
}
