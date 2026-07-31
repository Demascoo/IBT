from abc import ABC, abstractmethod

class Vehicle(ABC):
    def __init__(self, make, model):
        self.make = make
        self.model = model
    
    def describe(self):
        return f"make: {self.make}, model: {self.model}"
    
    @abstractmethod
    def wheels(self):
        pass

class Car(Vehicle):
    def wheels(self):
        return 4

class Truck(Vehicle):
    def __init__(self, make, model, capacity):
        super().__init__(make, model)
        self.capacity = capacity
    
    def describe(self):
        return f"make: {self.make}, model: {self.model}, capacity: {self.capacity}"
    
    def wheels(self):
        return 6

car = Car("BYD", "Id4") 
truck = Truck("Toyota", "qqa", 200)
truck1 = Truck("Volvo", "FH16", 18)

print(car.describe())
print(truck.describe())

vehicles = [car, truck, truck1]

for vehicle in vehicles:
    print(vehicle.describe())

print(car.wheels())
print(truck.wheels())