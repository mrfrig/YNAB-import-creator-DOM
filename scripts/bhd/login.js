function bhdLogin() {
  if (window.location.hash.includes("#/login")) {
    try {
      const passInput = document.getElementsByClassName("password-mask")[0];
      passInput.type = "password";
      clearInterval(intervalID);
    } catch (error) {
      null;
    }
  }
}
