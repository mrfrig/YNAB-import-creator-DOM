function createCreditExport() {
  if (!window.location.pathname.includes("/cardtransactions")) return;
  const exportButtonsDiv = document.querySelector("main div")?.children[1]?.children[2]?.children[1]?.children[2];

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
      const transTable = document.querySelectorAll("#main-content-div table")[1];
      let csv = "Date,Payee,Memo,Outflow,Inflow";
      const today = new Date();
      const currentMonth = today.getMonth();
      const currentYear = today.getFullYear();

      for (const el of transTable.querySelectorAll("tbody tr")) {
        let date = el.children[0].innerText.replaceAll("&nbsp;", "").replaceAll(" ", "");
        let [day, month] = date.split("/");
        month = Number(month);
        day = Number(day);

        if (month - 1 === 11 && currentMonth === 0) date = `${month}/${day}/${currentYear - 1}`;
        else date = `${month}/${day}/${currentYear}`;

        const memo = el.children[3].innerText.replaceAll(",", "");

        let amount = el.children[4].innerText.replaceAll(",", "").replaceAll("RD$", "");

        if (amount.includes("-")) csv += `\n${date},,${memo},,${amount.replaceAll("-", "")}`;
        else csv += `\n${date},,${memo},${amount.replaceAll("-", "")},`;
      }

      createExportFile(csv);
    });

    return exportButton;
  }
}
