document.addEventListener("DOMContentLoaded", () => {
    const transactions = [
      { date: "Date", type: "Type", asset: "Asset", amount: "Amount" },
      { date: "2025-02-24", type: "Sell", asset: "Toshi", amount: "$5,000" },
      { date: "2025-02-23", type: "Buy", asset: "Vine", amount: "$8,000" },
      { date: "2025-02-23", type: "Send", asset: "Fartboy", amount: "$57800" },
      { date: "2025-02-22", type: "Buy", asset: "IguanaPasta", amount: "$1,543" },
      { date: "2025-02-21", type: "Sell", asset: "Ethereum", amount: "$2,500" },
      { date: "2025-02-20", type: "Buy", asset: "Bitcoin", amount: "$40,000" },
    ];
  
    const transactionList = document.querySelector(".transaction-list");
    if (transactionList) {
      transactions.forEach(tx => {
        const txItem = document.createElement("div");
        txItem.classList.add("transaction-item");
        txItem.innerHTML = `
          <div class="transaction-date">${tx.date}</div>
          <div class="transaction-type">${tx.type}</div>
          <div class="transaction-asset">${tx.asset}</div>
          <div class="transaction-amount">${tx.amount}</div>
        `;
        transactionList.appendChild(txItem);
      });
    }
  });
  