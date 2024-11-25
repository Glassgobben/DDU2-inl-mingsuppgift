// Recommended: All functions declared here

function findCity(a) {
    for (let i = 0; i < cities.length; i++) {
        if (a === cities[i].name.toLowerCase()) {
            return cities[i].id;
        }
    }
    return null;
}

function cityDistances(a) {
    const results = [];
    for (let i = 0; i < distances.length; i++) {
        if (a === distances[i].city1) {
            results.push(distances[i].distance);
        }
        if (a === distances[i].city2) {
            results.push(distances[i].distance)
        }
    }
    return results;
}

function distanceMatch(a) {
    const results = [];
    for (let i = 0; i < distances.length; i++) {
        if (a === distances[i].distance && distances[i].city1 === cityId) {
            results.push(distances[i].city2);
        }
        if (a === distances[i].distance && distances[i].city2 === cityId) {
            results.push(distances[i].city1);
        }
    }
    return results;
}

function kmToMil(km) {
    return km / 10;
}

// Recommended: constants with references to existing HTML-elements

const h2 = document.querySelector("h2");
const h3 = document.querySelector("h3");
const title = document.querySelector("title");
const idCities = document.getElementById("cities");

// Recommended: Ask for the city name and then the rest of the code
let chooseCity = prompt("Vilken stad?").toLowerCase();

for (const city of cities) {
    const elementP = document.createElement("p");
    elementP.setAttribute("class", "cityBox");
    elementP.textContent = city.name;
    idCities.append(elementP);
}

findCity(chooseCity); //Hittar din valda stads id.
const cityId = findCity(chooseCity);

const space = " ";

if (cities[cityId]) {
    h2.textContent = `${cities[cityId].name}` + space + `(${cities[cityId].country})`;
    title.textContent = `${cities[cityId].name}`;
    const cityBox = document.querySelectorAll(`.cityBox`);
    const target = cityBox[cityId];
    target.className = "cityBox target";

    cityDistances(cityId); //hittar alla distanser i jämförelse med din stad

    const yourCityDistances = cityDistances(cityId);

    const closestDistance = Math.min(...yourCityDistances); //filtrerar ut distanser som ligger närmast din stad
    const furthestDistance = Math.max(...yourCityDistances); //filtrerar ut distanser längst bort från din stad

    distanceMatch(closestDistance); //matchar din stads id med staden närmasts id
    distanceMatch(furthestDistance); //matchar din stads id med staden längst borts id

    const dmClosest = distanceMatch(closestDistance);

    const closestCity = `${cities[dmClosest].name}`;
    cityBox[dmClosest].textContent = `${closestCity} ligger ${kmToMil(closestDistance)} mil bort`;

    const classClosest = cityBox[dmClosest];
    classClosest.className = "cityBox closest";

    const spanClosest = document.getElementById("closest");
    spanClosest.textContent = closestCity;

    const dmFurthest = distanceMatch(furthestDistance);

    const furthestCity = `${cities[dmFurthest].name}`;
    cityBox[dmFurthest].textContent = `${furthestCity} ligger ${kmToMil(furthestDistance)} mil bort`;

    const classFurthest = cityBox[dmFurthest];
    classFurthest.className = "cityBox furthest";

    const spanFurthest = document.getElementById("furthest");
    spanFurthest.textContent = furthestCity;
} else {
    h2.textContent = `${chooseCity} finns inte i databasen`;
    h3.textContent = "";
    title.textContent = "Not Found";
}

const table = document.getElementById("table");
const citiesPlusDistances = cities.length + 1;
const cellAmount = citiesPlusDistances * citiesPlusDistances;
const tableContent = cities.length * cities.length;

const headColArray = [];
const distanceArray = [];
const tableArray = [];

const columns = 40;
const rows = columns;
const l = columns + 1;


for (let y = -1; y < columns - 1; y++) {
    for (let x = -1; x < rows - 1; x++) {
        const div = document.createElement("div");
        div.classList.add('cell');
        div.textContent = `${y}`;
        if (y === -1 && x === -1) {
            div.textContent = "";
        }
        if (y === -1 && x > -1) {
            div.classList.add('head_column');
            div.textContent = x;
        }
        if (y > -1 && x === -1) {
            div.classList.add('head_row');
            div.textContent = `${y}-${cities[y].name}`
        }
        if (y > -1 && y % 2 === 0) {
            div.classList.add('even_row');
        }
        if (y > -1 && x > -1) {
            if (x % 2 === 0) {
                div.classList.add('even_col');
            }
            if (x === y) {
                div.textContent = "";
            } else {
                div.textContent = kmToMil(cityDistances(y)[x])
                console.log(kmToMil(cityDistances(y)[x]))
            }
        }

        table.append(div);
    }
}


const div = document.querySelectorAll("#table div");

for (let i = 40; i < cellAmount; i += 40) {
    div[i].classList.add('head_row');
}

const headRow = document.querySelectorAll("#table .cell.head_row");
/*
for (let i = 0; i < cities.length; i++) {
    headRow[i].textContent = `${i}-${cities[i].name}`;
} */

const cell = document.querySelectorAll("div.cell:not(.head_row):not(.head_column)")