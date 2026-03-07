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

function createCoopExport() {
  // outer table containing the movements grid
  const container = document.querySelector("#MainContent_AccountMovementsGrid_ContentGridTable");
  if (!container) return;

  // avoid adding the button more than once
  if (document.getElementById("coopsanjose-export")) return;

  const btn = document.createElement("button");
  btn.id = "coopsanjose-export";
  btn.innerText = "Exportar YNAB";
  btn.style.padding = "6px 12px";
  btn.style.margin = "8px 0";
  btn.style.cursor = "pointer";

  container.parentElement.insertBefore(btn, container);

  btn.addEventListener("click", () => {
    let csv = "Date,Payee,Memo,Outflow,Inflow";

    // select all data rows (regular and alternate)
    const rows = document.querySelectorAll(
      "#ctl00_MainContent_AccountMovementsGrid_MainGrid_DXMainTable tr.dxgvDataRow, #ctl00_MainContent_AccountMovementsGrid_MainGrid_DXMainTable tr.dxgvDataRowAlt",
    );

    rows.forEach((row) => {
      const cells = row.querySelectorAll("td");
      const date = cells[1] ? cells[1].innerText.trim() : "";
      const desc = cells[2] ? cells[2].innerText.trim().replaceAll(",", "") : "";

      let debit = cells[3] ? cells[3].innerText.trim() : "";
      let credit = cells[4] ? cells[4].innerText.trim() : "";

      // clean up amount strings
      const cleanAmount = (text) =>
        text
          .replace(/RD\$|\$/g, "")
          .replaceAll(",", "")
          .replaceAll(" ", "")
          .replace("-", "")
          .trim();

      let outflow = "";
      let inflow = "";

      if (debit) {
        outflow = cleanAmount(debit);
      }
      if (credit) {
        inflow = cleanAmount(credit);
      }

      csv += `\n${date},${desc},,${outflow},${inflow}`;
    });

    createExportFile(csv, "CoopSanJoseExport");
  });
}

// initialize and also retry on clicks in case table is dynamically loaded
createCoopExport();
document.addEventListener("click", createCoopExport);
