const config = { childList: true, subtree: true };

const targetNode = document.getElementById("main-content-div");

const observer = new MutationObserver((mutationList, observer) => {
  for (const mutation of mutationList) {
    if (mutation.type === "childList") {
      createAccountExport();
      createCreditExport();
    }
  }
});

observer.observe(targetNode, config);
