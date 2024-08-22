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
    exportButton.className =
      "ButtonCorestyle__StyledButton-canvas-core__sc-v39ho0-0 isoEur ButtonCore__button SecondaryButtonstyle__StyleSecondaryButtonCore-canvas-core__sc-1fquqhk-0 gGCHlM Button__button--secondary v1YOR28wgSR74iLV2PNvM";
    exportButton.style.width = "fit-content";

    const buttonContainer = tabsContainer.lastChild.firstChild.firstChild.children[1].firstChild.firstChild;
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

      for (const el of tabsContainer.querySelectorAll("table tbody tr")) {
        const memo = el.querySelector('[data-testid="linkLabel"]').firstChild.firstChild.innerText.replaceAll(",", "");

        const date = el.firstChild.firstChild.innerText;
        const year = date.split(",")[2].replaceAll(" ", "");
        const month = dateMapping[date.split(",")[1].split(" ")[1].toLowerCase().replaceAll(" ", "")];
        const day = date.split(",")[1].split(" ")[2].replaceAll(" ", "");
        const transDate = `${month}/${day}/${year}`;

        const amount = el.children[2].firstChild.innerText;
        const transAmount = amount.replaceAll("DOP", "").replaceAll("$", "").replaceAll(",", "").replaceAll(" ", "");

        if (transAmount.includes("-")) csv += `\n${transDate},,${memo},${transAmount.replaceAll("-", "")},`;
        else csv += `\n${transDate},,${memo},,${transAmount.replaceAll("-", "")}`;
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
  }
}
