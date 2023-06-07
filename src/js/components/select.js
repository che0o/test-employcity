const selects = document.querySelectorAll(".select");

for (let i = 0; i < selects.length; i++) {
  const select = selects[i];
  const options = select.querySelectorAll("option");

  //создаем кастомный "select"
  const cSelect = document.createElement("div");
  const cSelectList = document.createElement("div");
  const cSelectCurrent = document.createElement("div");
  const cSelectIcon = `<div class="custom-select__icon"><svg width="9" height="6" viewBox="0 0 9 6" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M8.93375 1.51079C8.93375 1.43936 8.89803 1.359 8.84446 1.30543L8.39803 0.859C8.34446 0.805429 8.2641 0.769714 8.19268 0.769714C8.12125 0.769714 8.04089 0.805429 7.98732 0.859L4.47839 4.36793L0.969462 0.859C0.91589 0.805429 0.835533 0.769714 0.764105 0.769714C0.683748 0.769714 0.612319 0.805429 0.558748 0.859L0.112319 1.30543C0.0587475 1.359 0.0230331 1.43936 0.0230331 1.51079C0.0230331 1.58221 0.0587475 1.66257 0.112319 1.71614L4.27303 5.87686C4.3266 5.93043 4.40696 5.96614 4.47839 5.96614C4.54982 5.96614 4.63018 5.93043 4.68375 5.87686L8.84446 1.71614C8.89803 1.66257 8.93375 1.58221 8.93375 1.51079Z"/>
  </svg></div>`;

  // select.setAttribute('tabindex', '1')

  cSelect.className = "custom-select";
  cSelectList.className = "custom-select__list custom-scrollbar";
  cSelectCurrent.className = "custom-select__current";

  //создаем вложенность созданных элементов
  cSelect.append(cSelectCurrent, cSelectList);

  //добавляем кастоный "select" сразу после оргинального "select"
  select.after(cSelect);

  //получаем список и значения "option" из "select", затем создаём кастомный "option" для кастомного "select"
  const createCustomDom = (x, y) => {
    let selectItems = "";
    for (var i = 0; i < options.length; i++) {
      selectItems +=
        '<div class="custom-select__item" data-value="' +
        options[i].value +
        '">' +
        options[i].text +
        "</div>";
    }
    cSelectList.innerHTML = selectItems;
    x(), y();
  };

  const toggleClass = () => {
    cSelect.classList.toggle("custom-select--show");
  };

  //присваиваем первое текстовое первое значение
  const currentTextValue = () => {
    cSelectCurrent.textContent = "Выберите тип системы";
    cSelectCurrent.innerHTML += cSelectIcon;
  };

  //получаем и задаем значения text/value
  const currentValue = () => {
    const items = cSelectList.children;
    for (var el = 0; el < items.length; el++) {
      let selectValue = items[el].getAttribute("data-value");
      let selectText = items[el].textContent;
      items[el].addEventListener("click", () => {
        cSelect.classList.remove("custom-select--show");
        cSelectCurrent.textContent = selectText;
        cSelectCurrent.innerHTML += cSelectIcon;
        select.value = selectValue;
      });
    }
  };

  const desctopFn = () => {
    cSelectCurrent.addEventListener("click", toggleClass);
  };

  const mobileFn = () => {
    for (let j = 0; j < selects.length; j++) {
      let mobileSelect = selects[j];
      mobileSelect.addEventListener("change", () => {
        mobileSelect.nextElementSibling.querySelector(
          ".custom-select__current"
        ).textContent = mobileSelect.value;
      });
    }
  };

  createCustomDom(currentTextValue, currentValue);

  document.addEventListener("mouseup", (e) => {
    if (!cSelect.contains(e.target))
      cSelect.classList.remove("custom-select--show");
  });

  detectmob(mobileFn, desctopFn);

  function detectmob(x, y) {
    if (
      navigator.userAgent.match(/Android/i) ||
      navigator.userAgent.match(/webOS/i) ||
      navigator.userAgent.match(/iPhone/i) ||
      navigator.userAgent.match(/iPad/i) ||
      navigator.userAgent.match(/iPod/i) ||
      navigator.userAgent.match(/BlackBerry/i) ||
      navigator.userAgent.match(/Windows Phone/i)
    ) {
      x();
      console.log("mobile");
    } else {
      y();
      console.log("desktop");
    }
  }
}
