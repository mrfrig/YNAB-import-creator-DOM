function createCreditExport() {
  if (!window.location.pathname.includes("credit")) return;

  const detailsTabs = document.getElementById("detailsTabs");
  if (!detailsTabs) return;

  const exportButtonId = "credit-export";
  let exportButton = document.getElementById(exportButtonId);
  if (!exportButton) {
    exportButton = document.createElement("button");
    exportButton.innerText = "Exportar";

    exportButton.id = exportButtonId;
    exportButton.className =
      "ButtonCorestyle__StyledButton-canvas-core__sc-v39ho0-0 isoEur ButtonCore__button SecondaryButtonstyle__StyleSecondaryButtonCore-canvas-core__sc-1fquqhk-0 gGCHlM Button__button--secondary v1YOR28wgSR74iLV2PNvM";
    exportButton.style.width = "fit-content";

    const transContainer = detailsTabs.getElementsByTagName("h1")[1].parentElement.parentElement;

    const buttonContainer = transContainer.children[1].firstChild.firstChild;
    buttonContainer.style.display = "flex";
    buttonContainer.style.flexDirection = "row";
    buttonContainer.style.justifyContent = "space-between";
    buttonContainer.style.alignItems = "center";
    buttonContainer.style.width = "100%";

    buttonContainer.appendChild(exportButton);

    exportButton.addEventListener("click", () => {
      let csv = "Date,Payee,Memo,Outflow,Inflow";
      const dateMapping = {
        ene: "01",
        feb: "02",
        mar: "03",
        abr: "04",
        may: "05",
        jun: "06",
        jul: "07",
        ago: "08",
        sep: "09",
        oct: "10",
        nov: "11",
        dic: "12",
      };

      let currency = "";
      let rate = 1;

      for (const el of transContainer.querySelectorAll("table tbody tr")) {
        let memo = el.querySelector('[data-testid="linkLabel"]').firstChild.firstChild.innerText.replaceAll(",", "");

        const date = el.firstChild.firstChild.innerText;
        const year = date.split(",")[2].replaceAll(" ", "");
        const month = dateMapping[date.split(",")[1].split(" ")[1].toLowerCase().replaceAll(" ", "")];
        const day = date.split(",")[1].split(" ")[2].replaceAll(" ", "");
        const transDate = `${month}/${day}/${year}`;

        const amount = el.children[2].firstChild.innerText;

        if (!currency) {
          if (amount.includes("DOP")) currency = "DOP";
          else {
            currency = "USD";
            rate = Number(prompt("Dollar rate"));
          }
        }

        let transAmount = amount.replaceAll(currency, "").replaceAll("$", "").replaceAll(",", "").replaceAll(" ", "");
        transAmount = Number(transAmount) * Number(rate);
        transAmount = transAmount.toString();

        if (currency === "USD") memo = `${amount.replaceAll(",", "")} ${memo}`;

        if (transAmount.includes("-")) csv += `\n${transDate},,${memo},,${transAmount.replaceAll("-", "")}`;
        else csv += `\n${transDate},,${memo},${transAmount},`;
      }

      createExportFile(csv);
    });
  }
}
