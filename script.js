const form = document.getElementById("transaction-form");
const list = document.getElementById("list");
const balanceEl = document.getElementById("balance");
const incomeEl = document.getElementById("income");
const expenseEl = document.getElementById("expense");

let transactions = [];

form.addEventListener("submit", function(e) {
    e.preventDefault();

    const desc = document.getElementById("desc").value;
    const amount = document.getElementById("amount").value;
    const type = document.getElementById("type").value;
    const category = document.getElementById("category").value;
    const date = document.getElementById("date").value;

    // ✅ Fix: handle empty date safely
    const month = date ? new Date(date).toLocaleString('default', { month: 'long' }) : "";

    const transaction = {
        desc,
        amount: Number(amount),
        type,
        category,
        date,
        month
    };

    transactions.push(transaction);

    updateUI();

    // ✅ Clear form after adding (important UX improvement)
    form.reset();
});

function updateUI() {
    list.innerHTML = "";

    let totalIncome = 0;
    let totalExpense = 0;

    transactions.forEach(t => {
        const li = document.createElement("li");

        // ✅ Improved display (added date)
        li.textContent = `${t.desc} - ₹${t.amount} (${t.type} | ${t.category} | ${t.date})`;

        list.appendChild(li);

        if (t.type === "income") {
            totalIncome += t.amount;
        } else {
            totalExpense += t.amount;
        }
    });

    // ✅ Fix: calculate balance OUTSIDE loop (important)
    const balance = totalIncome - totalExpense;

    balanceEl.textContent = balance;
    incomeEl.textContent = totalIncome;
    expenseEl.textContent = totalExpense;
}
