def read_transactions(filename="transactions.txt"):
    totals = {}
    try:
        with open(filename, "r") as file:
            for line in file:
                line = line.strip()
                if not line:
                    continue

                parts = line.split(",")
                name = parts[0]
                amount = float(parts[1])

                if name in totals:
                    totals[name] = totals[name] + amount
                else:
                    totals[name] = amount

    except FileNotFoundError:
        print(f"Error: File '{filename}' not found!")
        return {}

    return totals


def generate_report(totals):
    if not totals:
        print("No transactions to report.")
        return

    sorted_customers = sorted(totals.items(), key=lambda x: x[1], reverse=True)

    print("Spending Summary")
    for name, total in sorted_customers:
        print(f"{name}: {total} ETB")

    with open("report.txt", "w") as file:
        file.write("Spending Summary\n")
        file.write("=" * 20 + "\n\n")

        for name, total in sorted_customers:
            file.write(f"{name}: {total} ETB\n")

    print("Report saved ")


print("Reading")
totals = read_transactions()
generate_report(totals)