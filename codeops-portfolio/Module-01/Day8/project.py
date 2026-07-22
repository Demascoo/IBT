class Account:
    def __init__(self, owner, account_no, bal):
        self.owner = owner
        self.account_no = account_no
        self.__bal = bal
        self.observers = []
        self.history = []

    def deposit(self, amount):
        if amount <= 0:
            raise ValueError("Amount must be positive")
        self.__bal += amount
        self.history.append(f"Deposited {amount}")
        self._notify(f"{self.owner} deposited {amount}. New balance: {self.__bal}")
        return f"{self.owner} deposited {amount}."

    def withdraw(self, amount):
        if amount > self.__bal:
            raise ValueError("Insufficient balance.")
        self.__bal -= amount
        self.history.append(f"Withdrew {amount}")
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

    def undo_last(self):
        if not self.history:
            return "No transactions to undo."
        last_transaction = self.history.pop()
        return f"Undid: {last_transaction}"

    def total_transactions(self):
        if not self.history:
            return 0
        return 1 + self._total_transactions_recursive(0)

    def _total_transactions_recursive(self, index):
        if index >= len(self.history):
            return 0
        return 1 + self._total_transactions_recursive(index + 1)

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
        self.history.append(f"Withdrew {amount} (overdraft)")
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


class AccountRegistry:
    def __init__(self):
        self.accounts = {}

    def add(self, account):
        self.accounts[account.account_no] = account

    def find(self, account_no):
        return self.accounts.get(account_no, None)

    def list_all(self):
        return list(self.accounts.values())

    def top_by_balance(self, n):
        sorted_accounts = sorted(self.accounts.values(), key=lambda x: x.get_balance(), reverse=True)
        return sorted_accounts[:n]

    def binary_search(self, account_no):
        sorted_numbers = sorted(self.accounts.keys())
        return self._binary_search_recursive(sorted_numbers, account_no, 0, len(sorted_numbers) - 1)

    def _binary_search_recursive(self, sorted_numbers, target, left, right):
        if left > right:
            return None
        mid = (left + right) // 2
        if sorted_numbers[mid] == target:
            return self.accounts[target]
        elif sorted_numbers[mid] < target:
            return self._binary_search_recursive(sorted_numbers, target, mid + 1, right)
        else:
            return self._binary_search_recursive(sorted_numbers, target, left, mid - 1)


registry = AccountRegistry()

eyuel = AccountFactory.create("basic", "Eyuel", "CBE-100101", 500)
abel = AccountFactory.create("savings", "Abel", "CBE-100102", 1500, rate=5)
sara = AccountFactory.create("current", "Sara", "CBE-100103", 2000, overdraft=1000)

registry.add(eyuel)
registry.add(abel)
registry.add(sara)

sms_alert = SMSAlert()
eyuel.subscribe(sms_alert)
abel.subscribe(sms_alert)
sara.subscribe(sms_alert)

print(eyuel.deposit(2000))
print(eyuel.withdraw(300))
print(abel.add_interest())
print(sara.withdraw(2500))

print("Top 2 by balance")
top_accounts = registry.top_by_balance(2)
for account in top_accounts:
    print(f"{account.owner}: {account.get_balance()}")

print("Binary search for CBE-100102")
found = registry.binary_search("CBE-100102")
if found:
    print(f"Found: {found.owner} - {found.statement}")

print("Binary search for non-existent CBE-100999")
not_found = registry.binary_search("CBE-100999")
if not_found:
    print(f"Found: {not_found.owner}")
else:
    print("Account not found")

print("Total transactions")
print(f"Eyuel total transactions: {eyuel.total_transactions()}")
print(f"Abel total transactions: {abel.total_transactions()}")
print(f"Sara total transactions: {sara.total_transactions()}")

print("All accounts")
for account in registry.list_all():
    print(f"{account.owner}: {account.statement}")