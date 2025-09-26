function createAccountExport() {
  if (!window.location.pathname.includes("/transactions")) return;
  const exportButtonsDiv =
    document.querySelector("main div")?.children[1].firstChild.children[2]?.children[1]?.children[2];

  if (!exportButtonsDiv) return;

  const exportButtonId = "credit-export";
  let exportButton = document.getElementById(exportButtonId);
  if (!exportButton) {
    const div = document.createElement("div");
    div.className = "flex flex-row mt-2 content-center";
    const ButtonImgDiv = document.createElement("div");
    ButtonImgDiv.className = "mr-2 cursor-pointer";
    const ButtonTextdiv = document.createElement("div");
    ButtonTextdiv.className = "text-ultramar font-inter-regular text-base font-[600] leading-normal";
    const button = createExportButton();
    button.className = "flex flex-row cursor-pointer";
    ButtonTextdiv.appendChild(button);
    div.appendChild(ButtonImgDiv);
    div.appendChild(ButtonTextdiv);
    exportButtonsDiv.appendChild(div);
  }

  function createExportButton() {
    const exportButton = document.createElement("button");
    exportButton.innerText = "YNAB: Archivo CSV";
    exportButton.id = exportButtonId;

    exportButton.addEventListener("click", () => {
      const transTable = document.querySelectorAll("#main-content-div table")[0];
      let csv = "Date,Payee,Memo,Outflow,Inflow";

      for (const el of transTable.querySelectorAll("tbody tr")) {
        const date = el.children[1].innerText.replaceAll(" ", "");

        const memo = el.children[4].innerText.replaceAll(",", "");

        const amount = el.children[5].innerText.replaceAll(",", "").replaceAll("$", "");

        if (amount.includes("-")) csv += `\n${date},,${memo},${amount.replaceAll("-", "")},`;
        else csv += `\n${date},,${memo},,${amount.replaceAll("-", "")}`;
      }

      createExportFile(csv);
    });

    return exportButton;
  }
}
