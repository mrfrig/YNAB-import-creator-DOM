function createExportButton() {
  const exportButton = document.createElement("button");
  exportButton.innerText = "Export";

  exportButton.style.position = "fixed";
  exportButton.style.bottom = "2.5rem";
  exportButton.style.right = "2.5rem";
  exportButton.style.zIndex = "9999";
  document.body.appendChild(exportButton);

  return exportButton;
}

(() => {
  let csv = "Date,Payee,Memo,Amount";
  const dateMapping = {
    enero: "01",
    febrero: "02",
    marzo: "03",
    abril: "04",
    mayo: "05",
    junio: "06",
    julio: "07",
    agosto: "08",
    septiembre: "09",
    octubre: "10",
    noviembre: "11",
    diciembre: "12",
  };

  for (const balanceItem of document.querySelectorAll(".balance-item")) {
    let transDate = balanceItem.querySelector(".balance-date").innerText.trim().toLowerCase();
    const day = transDate.split(" ")[1];
    const month = dateMapping[transDate.split(" ")[2]];
    const year = transDate.split(" ")[3];

    transDate = `${day}/${month}/${year}`;

    const transDesc = balanceItem.querySelector(".balance-desc p").innerText.trim();

    let label = balanceItem.querySelector(".balance-ammount.positive-balance");
    let positive = true;

    if (!label) {
      label = balanceItem.querySelector(".balance-ammount.negative-balance");
      positive = false;
    }

    const transAmount = (positive ? "" : "-") + label.innerText.trim().replace(",", "");

    csv += `\n${transDate},,${transDesc},${transAmount}`;
  }

  let filename = "Adopem";
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
})();
