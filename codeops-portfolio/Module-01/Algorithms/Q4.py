def check(arr):
    for num in arr:
        if num * 2 in arr:
            print("i am not a meera array")
            return 
    print("i am a merra array")     
check([10,4,0,5])
check([7,4,9])
check([1, -6,4,-3])       
