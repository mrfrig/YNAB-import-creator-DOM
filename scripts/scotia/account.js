function createAccountExport() {
  if (!window.location.pathname.includes("banking")) return;

  const tabsContainer = document.getElementById("tabsContainer");
  if (!tabsContainer) return;

  const exportButtonId = "account-export";
  let exportButton = document.getElementById(exportButtonId);
  if (!exportButton) {
    exportButton = document.createElement("button");
    exportButton.innerText = "Exportar";

    exportButton.id = exportButtonId;
    exportButton.style.width = "fit-content";
    exportButton.style.color = "rgb(236, 17, 26)";
    exportButton.style.backgroundColor = "rgb(255, 255, 255)";
    exportButton.style.borderColor = "rgb(236, 17, 26)";
    exportButton.style.minHeight = "5.4rem";
    exportButton.style.minWidth = " 11.8rem";
    exportButton.style.fontFamily = `"Scotia Bold", Arial, Helvetica, "sans-serif"`;
    exportButton.style.fontSize = "1.6rem";
    exportButton.style.lineHeight = "2rem";
    exportButton.style.fontWeight = "initial";
    exportButton.style.letterSpacing = "0rem";
    exportButton.style.border = "0.1rem solid";
    exportButton.style.borderRadius = "0.8rem";
    exportButton.style.padding = "0px 30px";
    exportButton.style.textDecoration = "none";
    exportButton.style.cursor = "pointer";

    const buttonContainer =
      tabsContainer.lastChild.firstChild.lastChild.firstChild.lastChild.children[1].firstChild.firstChild;
    buttonContainer.style.display = "flex";
    buttonContainer.style.flexDirection = "row";
    buttonContainer.style.justifyContent = "space-between";
    buttonContainer.style.alignItems = "center";
    buttonContainer.style.width = "100%";

    buttonContainer.appendChild(exportButton);

    exportButton.addEventListener("click", () => {
      let csv = "Date,Payee,Memo,Outflow,Inflow";
      const id = window.location.pathname.split("/").at(-1);
      var today = new Date();
      var priorDate = new Date(new Date().setDate(today.getDate() - 30));
      const fromDate = priorDate.toISOString().split("T")[0];
      const toDate = today.toISOString().split("T")[0];

      fetch(
        `https://banking.online.scotiabank.com/account/api/deposits/${id}/transactions?fromDate=${fromDate}&toDate=${toDate}`,
        { method: "GET", mode: "cors", credentials: "include" }
      ).then((response) => {
        response.json().then(({ data }) => {
          let currency = "";
          let rate = 1;
          for (const record of data.records) {
            if (!currency) {
              currency = record.amount.currencyCode;
              if (currency === "USD") rate = Number(prompt("Dollar rate"));
            }
            const amount = -record.amount.amount;
            let memo = record.description.replaceAll("  ", "").replaceAll(",", "");

            if (currency === "USD") memo = `${amount > 0 ? "" : "-"}$${Math.abs(amount)} ${currency} ${memo}`;
            csv += `\n${record.transactionDate},,${memo},${amount * rate}`;
          }
          const fileName =
            document
              .getElementById("container")
              ?.lastChild?.firstChild?.firstChild?.firstChild?.lastChild?.firstChild?.firstChild?.firstChild?.firstChild?.innerText.replaceAll(
                " ",
                ""
              ) || "scotiaBankAccountExport";

          createExportFile(csv, fileName);
        });
      });
    });
  }
}
