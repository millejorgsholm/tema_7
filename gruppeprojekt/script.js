//OPDATERET JS SÅ DET PASSER TIL BOOMBOX

let sange;
//Det listview sitet starter med at vise er "alle"
let filter = "alle";
// const popop = document.querySelector("#popop");

//Sørge for at DOM er loaded
document.addEventListener("DOMContentLoaded", loadJSON);

//Hente JSON data fra vores Google sheets
async function loadJSON() {
    const JSONdata = await fetch("https://spreadsheets.google.com/feeds/list/1GgfFYSDM2Q6Uve-3IvcVehyTjWiBKDXpISb8CWVXBSw/od6/public/values?alt=json"); //Nyt link er sat ind!
    sange = await JSONdata.json();
    addEventListenersToButtons();
    visSange();
}

//Opret liste --> (listeview)
function visSange() {
    const list = document.querySelector("#liste");
    const musikTemplate = document.querySelector("template");
    list.innerHTML = "";
    sange.feed.entry.forEach(sang => {
        if (filter == "alle" || filter == sang.gsx$genre.$t.toLowerCase()) {
            let clone = musikTemplate.cloneNode(true).content;
            clone.querySelector("img").src = "imgs/" + sang.gsx$billede.$t + ".png";
            clone.querySelector(".titel").textContent = sang.gsx$titel.$t;
            clone.querySelector(".kunstner").textContent = sang.gsx$kunstner.$t;
            clone.querySelector(".album").textContent = sang.gsx$album.$t;
            clone.querySelector("article").addEventListener("click", () => visDetaljer(sang));
            list.appendChild(clone);
            console.log(sang);

        }
    })
}

//Popop vindue lukker når der klikkes på luk-knap
document.querySelector("#luk").addEventListener("click", lukpopop);

function lukpopop() {
    popop.style.display = "none";
}

//Indholdet i popup-vinduet
function visDetaljer(sang) {
    console.log(sang);
    popop.querySelector("h2").textContent = sang.gsx$titel.$t;
    popop.querySelector("img").src = "imgs/" + sang.gsx$billede.$t + ".png";
    popop.querySelector(".genre").textContent = sang.gsx$genre.$t;
    popop.querySelector(".kunstner").textContent = sang.gsx$kunstner.$t;
    popop.querySelector(".album").textContent = sang.gsx$album.$t;
    popop.querySelector(".dato").textContent = sang.gsx$dato.$t
    popop.querySelector(".varighed").textContent = sang.gsx$varighed.$t
    popop.style.display = "block";
}

//Gør filtreringsknapper klikbare

function addEventListenersToButtons() {
    document.querySelectorAll(".filter").forEach((btn) => {
        btn.addEventListener("click", filterBTNs);
    });
}

//Sørge for at filtreringen virker når der klikkes på knapperne

function filterBTNs() {
    filter = this.dataset.genre;
    //Når der klikkes på knap, sørger funktionen, ffor at h1-overskriftens indhold opdateres
    document.querySelector("h1").textContent = this.textContent;
    console.log(this);
    //Fjern classen "valgt" fra alle knapper
    document.querySelectorAll(".filter").forEach((btn) => {
        btn.classList.remove("valgt");
    })
    //Tilføj classen "valgt" til den knap der er klikket på
    this.classList.add("valgt");
    visSange();
}
