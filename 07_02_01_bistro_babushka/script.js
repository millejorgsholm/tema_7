 let retter;
 //Det listview sitet starter med at vise er "alle"
 let filter = "alle";
 // const popop = document.querySelector("#popop");
 document.addEventListener("DOMContentLoaded", loadJSON);
 async function loadJSON() {
     const JSONdata = await fetch("https://spreadsheets.google.com/feeds/list/17Dd7DvkPaFamNUdUKlrFgnH6POvBJXac7qyiS6zNRw0/od6/public/values?alt=json");
     retter = await JSONdata.json();
     addEventListenersToButtons();
     visRetter();
 }

 //Opret liste --> (listeview)
 function visRetter() {
     const list = document.querySelector("#liste");
     const menuTemplate = document.querySelector("template");
     list.innerHTML = "";
     retter.feed.entry.forEach(ret => {
         if (filter == "alle" || filter == ret.gsx$kategori.$t.toLowerCase()) {
             let clone = menuTemplate.cloneNode(true).content;
             clone.querySelector("img").src = "imgs/small/" + ret.gsx$billede.$t + "-sm.jpg";
             clone.querySelector(".navn").textContent = ret.gsx$navn.$t;
             clone.querySelector(".kort").textContent = ret.gsx$kort.$t;
             clone.querySelector(".pris").textContent = "Pris:" + ret.gsx$pris.$t + ",-";
             clone.querySelector("article").addEventListener("click", () => visDetaljer(ret));
             list.appendChild(clone);
             console.log(ret);

         }
     })
 }

 //Popop vindue lukker når der klikkes på luk-knap
 document.querySelector("#luk").addEventListener("click", lukpopop);

 function lukpopop() {
     popop.style.display = "none";
 }

 function visDetaljer(ret) {
     console.log(ret);
     popop.querySelector("h2").textContent = ret.gsx$navn.$t;
     popop.querySelector("img").src = "imgs/small/" + ret.gsx$billede.$t + "-sm.jpg";
     popop.querySelector(".lang").textContent = ret.gsx$lang.$t;
     popop.querySelector(".oprindelse").textContent = ret.gsx$oprindelse.$t;
     popop.querySelector(".pris").textContent = ret.gsx$pris.$t + ",-";
     popop.style.display = "block";
 }

 function addEventListenersToButtons() {
     document.querySelectorAll(".filter").forEach((btn) => {
         btn.addEventListener("click", filterBTNs);
     });
 }

 function filterBTNs() {
     filter = this.dataset.kategori;
     //Når der klikkes på knap, sørger funktionen, ffor at h1-overskriftens indhold opdateres
     document.querySelector("h1").textContent = this.textContent;
     console.log(this);
     //Fjern classen "valgt" fra alle knapper
     document.querySelectorAll(".filter").forEach((btn) => {
         btn.classList.remove("valgt");
     })
     //Tilføj classen "valgt" til den knap der er klikket på
     this.classList.add("valgt");
     visRetter();
 }
