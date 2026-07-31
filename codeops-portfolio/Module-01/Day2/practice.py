bill = 100
tip = 5
people = 3
total = bill + tip
share = total / people

names = ['eyuel', 'samuel', 'beyene']  # Changed names

for name in names:
    print(f'{name} pays {share}')

temperature = float(input('Enter the temperature in °C: '))

if temperature < 15:
    print('cold')
elif temperature <= 28:
    print('warm')
else:
    print('hot')

for i in range(1, 11):
    print(f'receipt {i}')

for i in range(1, 21):
    if i % 2 == 0:
        print(i)

def discount(price, percent=10):
    return price - (price * percent / 100)

print(discount(10000000))

count = 5

while count >= 1:
    print(count)
    count -= 1