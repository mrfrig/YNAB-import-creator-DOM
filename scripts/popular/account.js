function createAccountExport() {
  const exportTable = document.querySelector(".titulo2 table tbody");

  if (!exportTable) return;

  const titles = document.querySelectorAll(".pestania2");

  if (titles.length) return;

  const tr = document.createElement("tr");
  const td1 = document.createElement("td");
  td1.align = "right";
  td1.vAlign = "top";
  const button = createExportButton();
  const td2 = document.createElement("td");
  td2.className = "texto1";
  td2.align = "top";
  const span1 = document.createElement("span");
  span1.className = "texto3";
  span1.innerText = "YNAB:";
  const span2 = document.createElement("span");
  span2.innerText = " Archivo CSV.";

  tr.appendChild(td1);
  tr.appendChild(td2);
  td1.appendChild(button);
  td2.appendChild(span1);
  td2.appendChild(span2);
  exportTable.appendChild(tr);

  function createExportButton() {
    const exportButton = document.createElement("button");
    exportButton.innerText = "YNAB";

    exportButton.addEventListener("click", () => {
      let csv = "Date,Payee,Memo,Outflow,Inflow";

      for (const el of document.querySelectorAll(".md-maketable-reg-tr")) {
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
