def isDual(arr):
    for num in arr:
        if arr.count(num) != 2:
            return 0
    return 1
print(isDual([1,2,1,3,3,2]))
print(isDual([2,5,2,5,5]))
print(isDual([3,1,1,2,2]))

 