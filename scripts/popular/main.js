window.addEventListener("click", () => {
  if (document.getElementById("credit-export")) return;
  createAccountExport();
  createCreditExport();
});
