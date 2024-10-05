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

createExportFile(csv, "CoopSanJoseExport");
