my_list = [1, 2, 4, 5, 6]   
for number in my_list:  
    print(number)


for i in my_list:  
    for j in my_list:  
        print(i, j)


students = {
    "alador": 18,
    "bereket": 20
}

print(students["alador"])


def binary_search(items, target):
    left = 0
    right = len(items) - 1

    while left <= right:
        mid = (left + right) // 2

        if items[mid] == target:
            return mid
        elif items[mid] < target:
            left = mid + 1
        else:
            right = mid - 1

    return -1

numbers = [10, 20, 30, 40, 50, 60]

print(binary_search(numbers, 40))
