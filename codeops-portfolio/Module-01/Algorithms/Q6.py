def digitalClock(seconds):
    hours = seconds // 3600
    seconds = seconds % 3600

    minutes = seconds // 60
    seconds = seconds % 60

    print(f"{hours:02}:{minutes:02}:{seconds:02}")

digitalClock(5025)
digitalClock(61201)
digitalClock(87000)