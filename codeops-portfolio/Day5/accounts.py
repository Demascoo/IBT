class Account:
    def __init__(self, owner, account_number, balance=0):
        self.owner = owner
        self.account_number = account_number
        self._balance = balance
    
    def deposit(self, amount):
        if amount <= 0:
            raise ValueError("Amount must be positive")
        self._balance += amount
        print(f"Deposited {amount} ETB. New balance: {self._balance} ETB")
    
    def withdraw(self, amount):
        if amount <= 0:
            raise ValueError("Amount must be positive")
        if amount > self._balance:
            raise ValueError(f"Insufficient funds. You have {self._balance} ETB")
        self._balance -= amount
        print(f"Withdrew {amount} ETB. New balance: {self._balance} ETB")
    
    def statement(self):
        return (f"Account Type: Standard Account\n"
                f"Owner: {self.owner}\n"
                f"Account No: {self.account_number}\n"
                f"Balance: {self._balance} ETB")


class SavingsAccount(Account):
    def __init__(self, owner, account_number, balance=0, rate=0.05):
        super().__init__(owner, account_number, balance)
        self.rate = rate
    
    def add_interest(self):
        interest = self._balance * self.rate
        self._balance += interest
        print(f"Added interest: {interest:.2f} ETB at rate {self.rate*100}%")
    
    def statement(self):
        return (f"Account Type: Savings Account\n"
                f"Owner: {self.owner}\n"
                f"Account No: {self.account_number}\n"
                f"Balance: {self._balance} ETB\n"
                f"Interest Rate: {self.rate*100}%")


class CurrentAccount(Account):
    def __init__(self, owner, account_number, balance=0, overdraft_limit=500):
        super().__init__(owner, account_number, balance)
        self.overdraft_limit = overdraft_limit
    
    def withdraw(self, amount):
        if amount <= 0:
            raise ValueError("Amount must be positive")
        if amount > self._balance + self.overdraft_limit:
            raise ValueError(f"Overdraft limit exceeded. Limit: {self.overdraft_limit} ETB")
        self._balance -= amount
        print(f"Withdrew {amount} ETB. New balance: {self._balance} ETB")
    
    def statement(self):
        return (f"Account Type: Current Account\n"
                f"Owner: {self.owner}\n"
                f"Account No: {self.account_number}\n"
                f"Balance: {self._balance} ETB\n"
                f"Overdraft Limit: {self.overdraft_limit} ETB")


if __name__ == "__main__":
    regular = Account("Eyuel", "CBE-10001", 2000)
    savings = SavingsAccount("Eyuel", "CBE-10002", 1000, 0.05)
    current = CurrentAccount("Eyuel", "CBE-10003", 500, 500)
    
    regular.deposit(500)
    savings.deposit(300)
    savings.add_interest()
    current.withdraw(800)
    regular.withdraw(500)
    
    accounts = [regular, savings, current]
    
    for account in accounts:
        print(account.statement())
        print("-" * 40)