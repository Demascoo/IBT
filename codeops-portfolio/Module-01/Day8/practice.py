def binary_search(items, target): 
    left = 0
    right = len(items) - 1
    
    while left <= right:
        mid = (left + right) // 2
        
        if items[mid] == target:
            return mid
        elif target > items[mid]: 
            left = mid + 1 
        elif target < items[mid]: 
            right = mid - 1 
    
    return 'not found'  
items = [1, 2, 3, 5, 12]  
print(binary_search(items, 1)) 


accounts = [
    ("alador", 500),
    ("abel", 1200),
    ("abe", 800)
]

sorted_accounts = sorted(
    accounts,
    key=lambda account: account[1],
    reverse=True
)

print(sorted_accounts)


def has_pair(nums, target):
    left = 0
    right = len(nums) - 1

    while left < right:
        total = nums[left] + nums[right]

        if total == target:
            return True
        elif total < target:
            left += 1
        else:
            right -= 1

    return False


nums = [1, 2, 3, 4, 6, 8, 10]

print(has_pair(nums, 10))  
print(has_pair(nums, 20))  


def total(nums):
    if len(nums) == 0:
        return 0
    return nums[0] + total(nums[1:])


def count_down(n):
    if n == 0:
        return
    print(n)
    count_down(n - 1)


print(total([1, 2, 3, 4, 5]))  
count_down(5)  


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


balances = [100, 250, 500, 700, 1000, 1500]
print(binary_search(balances, 700)) 
print(binary_search(balances, 900))   