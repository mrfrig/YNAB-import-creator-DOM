function createCreditExport() {
  if (
    !(
      window.location.hash.includes("#/bhd/product-detail") &&
      document.getElementsByTagName("ibp-credit-cards-detail").length
    )
  )
    return;

  const transTable = document.getElementsByTagName("ibp-table-movements");

  if (!transTable.length) return;

  let exportRDButton = document.getElementById("credit-rd-export");

  if (!exportRDButton) {
    const span = document.createElement("span");
    span.style.marginRight = "10px";
    span.innerText = "Exportar YNAB csv: ";

    exportRDButton = document.createElement("button");
    exportRDButton.innerText = "RD$";
    exportRDButton.id = "credit-rd-export";
    exportRDButton.className = "p-ripple p-element bhd-btn-primary p-button p-component";
    exportRDButton.style.marginRight = "10px";

    const exportUSButton = document.getElementById("credit-us-export") || document.createElement("button");
    exportUSButton.innerText = "US$";
    exportUSButton.id = "credit-us-export";
    exportUSButton.className = "p-ripple p-element bhd-btn-primary p-button p-component";

    const div = document.createElement("div");
    div.style.padding = "0 16px";
    div.style.paddingBottom = "16px";
    div.style.display = "flex";
    div.style.justifyContent = "flex-end";
    div.style.alignItems = "center";
    div.style.width = "100%";

    div.appendChild(span);
    div.appendChild(exportRDButton);
    div.appendChild(exportUSButton);

    const table = transTable[0];
    const parentTable = table.parentElement;
    parentTable.insertBefore(div, table);

    exportRDButton.addEventListener("click", () => {
      let csv = "Date,Payee,Memo,Outflow,Inflow";

      for (const el of document.querySelectorAll("tbody tr.ng-star-inserted")) {
        if (el.children.length < 2) continue;
        const date = el.children[1].children[0].innerText.replaceAll(" ", "");
        const amount = el.children[4].children[0]?.innerText || el.children[5].children[0]?.innerText || undefined;

        const isUsd = amount.includes("US$");
        if (isUsd) continue;

        const currency = "RD$";
        const memo = el.children[3].children[0].innerText.replaceAll(",", "");

        let outflow =
          Number(
            el.children[4].children[0]?.innerText
              .replaceAll(",", "")
              .replaceAll(currency, "")
              .replaceAll(" ", "")
              .replaceAll("-", "")
          ) || "";

        let inflow =
          Number(
            el.children[5].children[0]?.innerText
              .replaceAll(",", "")
              .replaceAll(currency, "")
              .replaceAll(" ", "")
              .replaceAll("-", "")
          ) || "";

        csv += `\n${date},,${memo},${outflow},${inflow}`;
      }

      createExportFile(csv, "BHDCreditoPesos");
    });

    exportUSButton.addEventListener("click", () => {
      // https://backend.bhd.com.do/api/modal-cambio-rate?populate=deep
      // ?.data.attributes.exchangeRates[0].sellingRate

      let csv = "Date,Payee,Memo,Outflow,Inflow";
      const rate = Number(prompt("Dollar rate")) || 1;

      for (const el of document.querySelectorAll("tbody tr.ng-star-inserted")) {
        if (el.children.length < 2) continue;
        const date = el.children[1].children[0].innerText.replaceAll(" ", "");
        const amount = el.children[4].children[0]?.innerText || el.children[5].children[0]?.innerText || undefined;

        const isRD = amount.includes("RD$");
        if (isRD) continue;

        const currency = "US$";
        const preMemo = amount ? amount + " " : "";
        const memo = preMemo + el.children[3].children[0].innerText.replaceAll(",", "");

        let outflow =
          Number(
            el.children[4].children[0]?.innerText
              .replaceAll(",", "")
              .replaceAll(currency, "")
              .replaceAll(" ", "")
              .replaceAll("-", "")
          ) || "";

        let inflow =
          Number(
            el.children[5].children[0]?.innerText
              .replaceAll(",", "")
              .replaceAll(currency, "")
              .replaceAll(" ", "")
              .replaceAll("-", "")
          ) || "";

        outflow = outflow * rate || "";
        inflow = inflow * rate || "";
        csv += `\n${date},,${memo},${outflow},${inflow}`;
      }

      createExportFile(csv, "BHDCreditoDolares");
    });
  }
}
