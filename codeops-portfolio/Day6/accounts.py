class Account:
    def __init__(self, owner, account_no, bal):
        self.owner = owner
        self.account_no = account_no
        self.__bal = bal
        self.observers = []

    def deposit(self, amount):
        if amount <= 0:
            raise ValueError("Amount must be positive")
        self.__bal += amount
        self._notify(f"{self.owner} deposited {amount}. New balance: {self.__bal}")
        return f"{self.owner} deposited {amount}."

    def withdraw(self, amount):
        if amount > self.__bal:
            raise ValueError("Insufficient balance.")
        self.__bal -= amount
        self._notify(f"{self.owner} withdrew {amount}. New balance: {self.__bal}")
        return f"{self.owner} withdrew {amount}."

    def get_balance(self):
        return self.__bal

    def set_balance(self, amount):
        self.__bal = amount

    def subscribe(self, observer):
        self.observers.append(observer)

    def _notify(self, message):
        for observer in self.observers:
            observer.update(message)

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
        self._notify(f"{self.owner} withdrew {amount}. New balance: {self.get_balance()}")
        return f"{self.owner} withdrew {amount}."

    @property
    def statement(self):
        return f"CurrentAccount - Balance: {self.get_balance()}"


class AlertService:
    @staticmethod
    def send_alert(message):
        print(f"ALERT: {message}")


class SMSAlert:
    def update(self, message):
        print(f"SMS: {message}")


class AccountFactory:
    @staticmethod
    def create(kind, owner, account_no, bal, **kwargs):
        if kind == "savings":
            return SavingsAccount(owner, account_no, bal, kwargs.get("rate", 0))
        elif kind == "current":
            return CurrentAccount(owner, account_no, bal, kwargs.get("overdraft", 0))
        else:
            return Account(owner, account_no, bal)


eyuel = AccountFactory.create("basic", "Eyuel", "CBE-100101", 500)
abel = AccountFactory.create("savings", "Abel", "CBE-100102", 1500, rate=5)
sara = AccountFactory.create("current", "Sara", "CBE-100103", 2000, overdraft=1000)

sms_alert = SMSAlert()
eyuel.subscribe(sms_alert)
abel.subscribe(sms_alert)
sara.subscribe(sms_alert)

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