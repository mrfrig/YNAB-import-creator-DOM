const transactionsTable = document.getElementById("_ctl0_ContentPlaceHolder1_DataGridtransacciones");

let csv = "Date,Payee,Memo,Outflow,Inflow";

for (row of transactionsTable.getElementsByClassName("FondoPagina")) {
  const cells = row.getElementsByTagName("td");
  if (cells[2].innerText.includes("Balance Anterior")) continue;
  const date = cells[0].innerText.replaceAll("$", "").replaceAll(",", "").replaceAll(" ", "");
  const memo = cells[2].innerText.replaceAll("$", "").replaceAll(",", "");
  const outflow = cells[3].innerText.replaceAll("$", "").replaceAll(",", "").replaceAll(" ", "");
  const inflow = cells[4].innerText.replaceAll("$", "").replaceAll(",", "").replaceAll(" ", "");

  csv += `\n${date},,${memo},${outflow},${inflow}`;
}

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

createExportFile(csv, "CoopSanJoseExport");
