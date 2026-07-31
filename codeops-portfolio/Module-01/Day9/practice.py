list2 = [1, 6, 2, 7, 9, 0, 7]
list2.sort() 
list3 = sorted(list2)
print(list2) 

nums = [5, 2, 8, 1]
new = sorted(nums)  
def bubble_sort(arr):
    n = len(arr)

    for i in range(n):
        swapped = False

        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
        if not swapped:
            break
    return arr


nums = [5, 2, 8, 1]
sorted_no = bubble_sort(nums)
print(sorted_no)  


def selection_sort(arr):
    n = len(arr)

    for i in range(n):
        min_index = i
        for j in range(i + 1, n):
            if arr[j] < arr[min_index]:  
                min_index = j        
        arr[i], arr[min_index] = arr[min_index], arr[i]
    return arr


nums = [5, 2, 8, 1]
sorted_no2 = selection_sort(nums)
print(sorted_no2) 