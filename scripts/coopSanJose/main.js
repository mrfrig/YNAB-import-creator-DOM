let csv = "Date,Payee,Memo,Outflow,Inflow";

$(".FondoPagina").each(function () {
  let rows = $(this).children("td");

  if (rows[0] && rows[0].innerText.trim()) {
    csv += `\n${rows[0].innerText},,${rows[2].innerText},${rows[3].innerText.replace(
      ",",
      ""
    )},${rows[4].innerText.replace(",", "")}`;
  }
});

let filename = "SanJose";
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
