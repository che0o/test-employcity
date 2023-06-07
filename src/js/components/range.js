let i1 = document.getElementById("i1");
document.getElementById("r1").addEventListener("input", function () {
  i1.textContent = `${this.value}%`;
});
