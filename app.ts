// import { CompanyAccount } from './class/CompanyAccount'
// import { PeopleAccount } from './class/PeopleAccount'
// import { BonusAccount } from './class/BonusAccount'

// const peopleAccount: PeopleAccount = new PeopleAccount(1, 'Nath', 10)
// console.log(`Nome da conta pessoal: ${peopleAccount.getName()}`)
// peopleAccount.deposit(100)
// peopleAccount.withdraw(50)
// console.log(`Saldo da conta pessoal: ${peopleAccount.getBalance()}`)

// const companyAccount: CompanyAccount = new CompanyAccount('DIO', 20)
// companyAccount.deposit(500)
// companyAccount.getLoan(1000)
// console.log(`Saldo da conta empresarial: ${companyAccount.getBalance()}`)

// const bonusAccount: BonusAccount = new BonusAccount('DIO Bonus', 30)
// bonusAccount.deposit(100)
// console.log(`Saldo da conta bônus: ${bonusAccount.getBalance()}`)


import { CompanyAccount } from './class/CompanyAccount'
import { PeopleAccount } from './class/PeopleAccount'
import { BonusAccount } from './class/BonusAccount'

// Precisei colocar para ignorar um erro no typescript.
declare const require: any;
declare const process: any;

//Recebe as perguntas e devolve as respostas.
function perguntar(pergunta: string): Promise<string> {
    const rl = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise((resolve) => {
        rl.question(pergunta, (resposta: string) => {
            rl.close();
            // Remove espaços e converte tudo para minúsculo para facilitar a validação
            resolve(resposta.trim().toLowerCase());
        });
    });
}

// Função auxiliar para validar e converter números
async function perguntarNumero(pergunta: string): Promise<number> {
    const resposta = await perguntar(pergunta);
    const numero = parseFloat(resposta);

    if (isNaN(numero) || numero <= 0) {
        console.log("Valor inválido! Digite um número maior que zero.");
        return perguntarNumero(pergunta);
    }
    return numero;
}
//Força a entrada entre sim ou não para saber se a empresa está ativa ou não. 
async function perguntarSimNao(pergunta: string): Promise<boolean> {
    const resposta = await perguntar(pergunta);

    if (resposta === 'sim' || resposta === 's') {
        return true;
    } else if (resposta === 'não' || resposta === 'nao' || resposta === 'n') {
        return false;
    } else {
        console.log("Entrada inválida! Digite 'sim' ou 'não'.");
        return perguntarSimNao(pergunta); // Pergunta novamente pois está inválido.
    }
}

async function main() {
    try {
        // Conta pessoal
        console.log("--- Conta Pessoal ---");
        const idStr = await perguntar('Id: ');
        const id = parseInt(idStr, 10);

        const name = await perguntar('Titular: ');

        const accountStatusStr = await perguntar('Status da conta: ');
        const accountStatus = parseInt(accountStatusStr, 10);

        const peopleAccount: PeopleAccount = new PeopleAccount(id, name, accountStatus)
        console.log(`Conta pessoal: ${peopleAccount.getName()}`)

        const personDeposit = await perguntarNumero('Depósito pessoal: ');
        peopleAccount.deposit(personDeposit);

        try {
            const personWithdraw = await perguntarNumero('Saque pessoal: ');
            peopleAccount.withdraw(personWithdraw);
        } catch (error: any) {
            console.log(`Falha ao sacar: ${error.message || error}`);
        }

        console.log(`Saldo: ${peopleAccount.getBalance()}`)


        // --- Conta Empresarial ---
        console.log("\n--- Conta Empresarial ---");
        const companyName = await perguntar('Empresa: ');

        // Entrada com sim e não, referente se é ativa ou inativa.
        const companyStatus = await perguntarSimNao('Empresa ativa? (sim/não): ');

        // Cria a conta passando o booleano (true para sim, false para não)
        const companyAccount: CompanyAccount = new CompanyAccount(companyName, companyStatus as any)

        const companyDeposit = await perguntarNumero('Depósito: ');
        companyAccount.deposit(companyDeposit);

        try {
            const companyLoan = await perguntarNumero('Empréstimo: ');
            companyAccount.getLoan(companyLoan);
        } catch (error: any) {
            console.log(`Falha no empréstimo: ${error.message || error}`);
        }

        console.log(`Saldo: ${companyAccount.getBalance()}`)


        // --- CONTA BÔNUS ---
        console.log("\n--- Conta Bônus ---");
        const bonusName = await perguntar('Nome da conta bônus: ');

        const bonusStatusStr = await perguntar('Status do bônus: ');
        const bonusStatus = parseInt(bonusStatusStr, 10);

        const bonusAccount: BonusAccount = new BonusAccount(bonusName, bonusStatus)

        const bonusDeposit = await perguntarNumero('Depósito bônus: ');
        bonusAccount.deposit(bonusDeposit);

        console.log(`Saldo bônus: ${bonusAccount.getBalance()}`)

    } catch (globalError: any) {
        console.log(`Ocorreu um erro inesperado: ${globalError.message || globalError}`);
    }
}

main();