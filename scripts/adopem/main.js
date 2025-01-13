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

let csv = "Date,Payee,Memo,Outflow,Inflow";

for (row of document.getElementsByClassName("balance-item")) {
  const dateSplit = row.children[0].innerText.split(" ");
  const date = `${dateSplit[1]}/${dateMapping[dateSplit[2]]}/${dateSplit[3]}`;
  const memo = row.children[1].innerText.replaceAll("$", "").replaceAll(",", "");
  let outflow = "";
  let inflow = "";

  const amountEl = row.children[2].children[0];
  if (amountEl.className.includes("positive-balance"))
    inflow = amountEl.innerText.replaceAll("RD$", "").replaceAll(",", "").replaceAll(" ", "");
  else outflow = amountEl.innerText.replaceAll("RD$", "").replaceAll(",", "").replaceAll(" ", "");

  csv += `\n${date},,${memo},${outflow},${inflow}`;
}

createExportFile(csv, "Adopem");
