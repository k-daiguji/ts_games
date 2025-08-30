const stage = document.getElementById("stage");
const templateCat = document.getElementById("cat");
if (stage && templateCat) {
  const cloneCat = templateCat.cloneNode(true);
  document.body.removeChild(templateCat);
  [
    ["0", "40%"],
    ["40%", "80%"],
    ["40%", "0"],
    ["80%", "40%"],
  ].forEach(([top, left]) => {
    const cat = cloneCat.cloneNode(true) as HTMLElement;
    cat.style.top = top;
    cat.style.left = left;
    stage.appendChild(cat);
  });
}
