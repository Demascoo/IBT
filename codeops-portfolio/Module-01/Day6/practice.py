class Report:
    def build(self):
        print('Building report')


class ReportSave:
    def save(self):
        print("saving report")

class EmailReport:
    def email(self):
        print("emailing report")


report = Report()
saver = ReportSave()
email = EmailReport()

report.build()
saver.save()
email.email()

class AppSetting:
    _instance = None
    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance.ETB = "1200"
        return cls._instance
    
a = AppSetting()
x = AppSetting()

print(a == x)


class Square:
    def __init__(self, Height, width):
        self.height = Height
        self.width = width

    def __str__(self):
        return f"Square({self.height} x {self.width})"

class Triangle:
    def __init__(self, Height, width):
        self.height = Height
        self.width = width

    def __str__(self):
        return f"Triangle({self.height} x {self.width})"


class ShapeFactory():
    @staticmethod
    def create(kind, Hight, width):
        if kind == "square":
            return Square(Hight, width)
        elif kind == "triangle":
            return Triangle(Hight, width)
        else: 
            raise ValueError("Unknown shape type.")
        

shape1 = ShapeFactory.create("square", 4, 4)
shape2 = ShapeFactory.create("triangle", 4, 7)
print("------------------------------")
print(shape1)
print(shape2)

class NewsAgency:
    def __init__(self):
        self.subscribers = []

    def subscribe(self, subscriber):
        self.subscribers.append(subscriber)

    def notify(self, news):
        for subscriber in self.subscribers:
            subscriber.update(news)


class EmailSubscriber:
    def update(self, news):
        print(f"Email: {news}")


class SMSSubscriber:
    def update(self, news):
        print(f"SMS: {news}")


agency = NewsAgency()

email = EmailSubscriber()
sms = SMSSubscriber()

agency.subscribe(email)
agency.subscribe(sms)

agency.notify("you are loggoed in to pumble")