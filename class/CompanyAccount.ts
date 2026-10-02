import { DioAccount } from "./DioAccount" 

export class CompanyAccount extends DioAccount {

  constructor(name: string, accountNumber: number){
    super(name, accountNumber)
  }

  getLoan(amount: number): void {
    this.addToBalance(amount)
  }
}
