let csv = "Date,Payee,Memo,Outflow,Inflow";

for (row of document.getElementsByTagName("icb-generic-detail-row")) {
  const date = row.getElementsByClassName("rivera_row_info_legend")[0].innerText;
  const memo = row.getElementsByClassName("rivera_row_info_title")[0].innerText;
  const outflow = row.getElementsByClassName("rivera_row_simple")[0].innerText.replaceAll("-", "").replaceAll(",", "");
  const inflow = row.getElementsByClassName("rivera_row_simple")[1].innerText.replaceAll("-", "").replaceAll(",", "");

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

createExportFile(csv, "Banreservas");
