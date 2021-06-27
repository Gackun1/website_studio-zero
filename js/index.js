document.addEventListener("DOMContentLoaded", () => {
  //smooth
  window.addEventListener("scroll", () => {
    const fadeList = document.getElementsByClassName("effect-fade");
    for (const item of fadeList) {
      const rect = item.getBoundingClientRect();
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const elmPos = rect.top + window.pageYOffset;
      const windowHeight = window.innerHeight;
      if (scrollTop > elmPos - windowHeight) {
        item.classList.add("effect-scroll");
      }
    }
  });
});
