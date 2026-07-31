price = {
    'banana': 200,
    "apple": 330,
    "mango": 20,
    "coffee": 1000
}


prices = [100, 250, 400, 80]
taxed_prices = []
for i in prices:
    i = i + (i/15)
    taxed_prices.append(i)


for i in prices:
    if i <= 200:
        print(i)

with open('names.txt','r') as file:
    for name in file:
        print(name.strip()) 

try:
    number = float(input("Enter a number: "))
    result = 1000 / number
    print(result)

except ValueError:
    print("Please enter a valid number.")

except ZeroDivisionError:
    print("You cannot divide by zero.")