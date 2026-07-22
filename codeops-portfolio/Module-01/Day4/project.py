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

    @property
    def statement(self):
        return self.__bal


eyuel = Account("Eyuel", "CBE-100101", 500)
abel = Account("Abel", "CBE-100102", 1500)

print(eyuel.deposit(2000))
print(eyuel.statement)

print(eyuel.withdraw(300))
print(eyuel.statement)

print(eyuel.deposit(500))
print(eyuel.statement)