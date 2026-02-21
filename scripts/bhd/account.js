function createAccountExport() {
  if (
    !(
      window.location.hash.includes("#/bhd/product-detail") &&
      document.getElementsByTagName("ibp-savings-account-detail").length
    )
  )
    return;

  const transTable = document.getElementsByTagName("ibp-table-movements");

  if (!transTable.length) return;

  let exportButton = document.getElementById("account-export");

  if (!exportButton) {
    exportButton = document.createElement("button");
    exportButton.innerText = "Exportar";

    exportButton.id = "account-export";
    exportButton.className = "p-ripple p-element bhd-btn-primary p-button p-component";

    const div = document.createElement("div");
    div.style.padding = "0 16px";
    div.style.paddingBottom = "16px";
    div.style.display = "flex";
    div.style.justifyContent = "flex-end";
    div.style.alignItems = "center";
    div.style.width = "100%";

    const span = document.createElement("span");
    span.style.marginRight = "10px";
    span.innerText = "Exportar YNAB csv: ";

    div.appendChild(span);
    div.appendChild(exportButton);

    const table = transTable[0];
    const parentTable = table.parentElement;

    parentTable.insertBefore(div, table);

    exportButton.addEventListener("click", () => {
      let csv = "Date,Payee,Memo,Outflow,Inflow";

      const tables = document.querySelectorAll("ibp-table-movements table");

      for (const el of tables[1].querySelectorAll("tbody tr.ng-star-inserted")) {
        if (el.children.length < 2) continue;
        const date = el.children[0].innerText.replaceAll(" ", "");

        const memo = el.children[2].innerText.replaceAll(",", "");

        const outflow =
          Number(
            el.children[4].innerText.replaceAll(",", "").replaceAll("RD$", "").replaceAll(" ", "").replaceAll("-", "")
          ) || "";

        const inflow =
          Number(
            el.children[5].innerText.replaceAll(",", "").replaceAll("RD$", "").replaceAll(" ", "").replaceAll("-", "")
          ) || "";

        csv += `\n${date},,${memo},${outflow},${inflow}`;
      }

      createExportFile(csv);
    });
  }
}
