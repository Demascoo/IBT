def getOnlyEvens(arr):
    result = []
    for i in range(len(arr)):
        if i % 2 == 0 and arr[i] % 2 == 0:
            result.append(arr[i])
    print(result)

getOnlyEvens([1, 2, 3, 6, 4, 8])
getOnlyEvens([0, 1, 2, 3, 4])