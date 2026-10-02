export abstract class DioAccount {
  private readonly name: string
  private readonly accountNumber: number
  private balance: number = 0
  private status: boolean = true

  constructor(name: string, accountNumber: number){
    this.name = name
    this.accountNumber = accountNumber
  }

  getName = (): string => {
    return this.name
  }

  deposit(amount: number): void {
    this.addToBalance(amount)
  }

  withdraw(amount: number): void {
    this.ensureActive()
    this.validateAmount(amount)

    if (this.balance <= amount) {
      throw new Error('Saldo insuficiente para saque')
    }

    this.balance -= amount
  }

  getBalance(): number {
    return this.balance
  }

  protected addToBalance(amount: number): void {
    this.ensureActive()
    this.validateAmount(amount)
    this.balance += amount
  }

  protected ensureActive(): void {
    if (!this.status) {
      throw new Error('Conta inválida')
    }
  }

  private validateAmount(amount: number): void {
    if (!Number.isFinite(amount) || amount <= 0) {
      throw new Error('O valor deve ser um número positivo')
    }
  }
}
