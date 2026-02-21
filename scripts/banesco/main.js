const dateMapping = {
  ENERO: "01",
  FEBRERO: "02",
  MARZO: "03",
  ABRIL: "04",
  MAYO: "05",
  JUNIO: "06",
  JULIO: "07",
  AGOSTO: "08",
  SEPTIEMBRE: "09",
  OCTUBRE: "10",
  NOVIEMBRE: "11",
  DICIEMBRE: "12",
};

let csv = "Date,Payee,Memo,Amount";

for (listGroup of document.getElementsByTagName("bb-transactions-list-item-group")) {
  let date = listGroup.querySelector("[role=heading]").innerText.replaceAll("DE ", "");
  if (date === "HOY") {
    const today = new Date();
    const day = today.getDate().toString().length == 1 ? `0${today.getDate()}` : today.getDate().toString();
    let month = today.getMonth() + 1;
    month = month.toString().length == 1 ? `0${month}` : month.toString();
    date = `${day}/${month}/${today.getFullYear()}`;
  } else if (date === "AYER") {
    const today = new Date();
    today.setDate(today.getDate() - 1);
    const day = today.getDate().toString().length == 1 ? `0${today.getDate()}` : today.getDate().toString();
    let month = today.getMonth() + 1;
    month = month.toString().length == 1 ? `0${month}` : month.toString();
    date = `${day}/${month}/${today.getFullYear()}`;
  } else {
    const dateSplit = date.split(" ");
    const day = dateSplit[0].length == 1 ? `0${dateSplit[0]}` : dateSplit[0];
    date = `${day}/${dateMapping[dateSplit[1]]}/${dateSplit[2]}`;
  }

  for (row of listGroup.getElementsByTagName("bn-transaction-list-item")) {
    const memo = row.getElementsByClassName("info-title")[0].innerText;
    const amount = row
      .getElementsByClassName("transaction-balance-amount")[0]
      .innerText.replaceAll("$", "")
      .replaceAll("DOP", "")
      .replaceAll(",", "")
      .replaceAll("+", "");

    csv += `\n${date},,${memo},${amount}`;
  }
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

createExportFile(csv, "BanescoCredit");
