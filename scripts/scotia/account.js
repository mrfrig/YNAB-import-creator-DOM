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
