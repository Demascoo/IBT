class Book:
    def __init__(self, title, author, pages):
        self.title = title
        self.author = author
        self.pages = pages
    
    def describe(self):  
        print(f"{self.title} by {self.author} has {self.pages} pages.")


book = Book("Atomic Habits", "James Clear", 320)

book.describe()


class Product:
    def __init__(self, name, price, quantity):
        self.name = name
        self.price = price
        self.quantity = quantity

    def restock(self, n):
        self.quantity += n

    def sell(self, n):
        self.quantity -= n


product = Product("Shoes", 2500, 10)

print(product.quantity)

product.sell(3)
print(product.quantity)

product.restock(5)
print(product.quantity)