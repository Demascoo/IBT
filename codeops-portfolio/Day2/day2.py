def split_bill():
    bill = 100
    tip = 10
    people = 5
    total = bill + tip
    share = total / people
    print(f"each person should pay {share}")
split_bill()