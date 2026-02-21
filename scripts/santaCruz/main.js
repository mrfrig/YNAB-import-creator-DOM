function createExportFile(csv, filename = "Export") {
  let type = "text/csv";
  let file = new Blob([csv], { type: type });

  let a = document.createElement("a"),
    url = URL.createObjectURL(file);
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  setTimeout(function () {
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }, 0);
}

function createCreditExport() {
  const rows = document.querySelectorAll(".core-transaction-row");
  if (!rows.length) return;
  if (document.getElementById("santacruz-credit-export")) return;

  const container = document.querySelector(".profile-detail__transactions-container");
  if (!container) return;

  const btn = document.createElement("button");
  btn.id = "santacruz-credit-export";
  btn.innerText = "Exportar YNAB";
  btn.style.padding = "6px 12px";
  btn.style.margin = "8px 0";
  btn.style.cursor = "pointer";

  container.parentElement.insertBefore(btn, container);

  btn.addEventListener("click", () => {
    let csv = "Date,Payee,Memo,Outflow,Inflow";

    rows.forEach((row) => {
      const labelEl = row.querySelector(".core-transaction__info-label");
      const dateEl = row.querySelector(".core-transaction__info-date");
      const balanceEl = row.querySelector(".core-transaction__info-balance");

      const memo = labelEl ? labelEl.innerText.trim().replaceAll(",", "") : "";
      const date = dateEl ? dateEl.innerText.trim() : "";
      let amount = "";
      if (balanceEl) {
        amount = balanceEl.innerText
          .replaceAll("RD$", "")
          .replaceAll(",", "")
          .replaceAll(" ", "")
          .replace("-", "")
          .trim();
      }

      if (balanceEl && balanceEl.className.includes("DEBIT")) {
        csv += `\n${date},,${memo},${amount},`;
      } else {
        csv += `\n${date},,${memo},,${amount}`;
      }
    });

    createExportFile(csv, "SantaCruzExport");
  });
}

createCreditExport();
document.addEventListener("click", createCreditExport);
