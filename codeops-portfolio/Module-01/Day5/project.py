class Account:
    def __init__(self, owner, account_no, bal):
        self.owner = owner
        self.account_no = account_no
        self.__bal = bal

    def deposit(self, amount):
        if amount <= 0:
            raise ValueError("Amount must be positive")
        self.__bal += amount
        return f"{self.owner} deposited {amount}."

    def withdraw(self, amount):
        if amount > self.__bal:
            raise ValueError("Insufficient balance.")
        self.__bal -= amount
        return f"{self.owner} withdrew {amount}."

    def get_balance(self):
        return self.__bal

    def set_balance(self, amount):
        self.__bal = amount

    @property
    def statement(self):
        return f"Balance: {self.__bal}"


class SavingsAccount(Account):
    def __init__(self, owner, account_no, bal, rate):
        super().__init__(owner, account_no, bal)
        self.rate = rate

    def add_interest(self):
        interest = self.get_balance() * self.rate / 100
        self.deposit(interest)
        return f"{self.owner} earned {interest} interest."

    @property
    def statement(self):
        return f"SavingsAccount - Balance: {self.get_balance()}"


class CurrentAccount(Account):
    def __init__(self, owner, account_no, bal, overdraft):
        super().__init__(owner, account_no, bal)
        self.overdraft = overdraft

    def withdraw(self, amount):
        if amount > self.get_balance() + self.overdraft:
            raise ValueError("Overdraft limit exceeded.")
        self.set_balance(self.get_balance() - amount)
        return f"{self.owner} withdrew {amount}."

    @property
    def statement(self):
        return f"CurrentAccount - Balance: {self.get_balance()}"


eyuel = Account("Eyuel", "CBE-100101", 500)
abel = SavingsAccount("Abel", "CBE-100102", 1500, 5)
sara = CurrentAccount("Sara", "CBE-100103", 2000, 1000)

print(eyuel.deposit(2000))
print(eyuel.statement)
print(eyuel.withdraw(300))
print(eyuel.statement)

print(abel.add_interest())
print(abel.statement)

print(sara.withdraw(2500))
print(sara.statement)

accounts = [eyuel, abel, sara]
for account in accounts:
    print(account.statement)