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

const space = " ";

for (const city of cities) {
    const elementP = document.createElement("p");
    elementP.setAttribute("class", "cityBox");
    elementP.textContent = city.name;
    idCities.append(elementP);
}

let chooseCity = prompt("Vilken stad?").toLowerCase();

findCity(chooseCity); //Hittar din valda stads id.
const cityId = findCity(chooseCity);

if (cities[cityId]) {
    h2.textContent = `${cities[cityId].name}` + space + `(${cities[cityId].country})`;
    title.textContent = `${cities[cityId].name}`;
} else {
    h2.textContent = `${chooseCity} finns inte i databasen`;
    h3.textContent = "";
    title.textContent = "Not Found";
}

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
const dmFurthest = distanceMatch(furthestDistance);

const classClosest = cityBox[dmClosest];
classClosest.className = "cityBox closest";

const closestCity = `${cities[dmClosest].name}`;
cityBox[dmClosest].textContent = `${closestCity} ligger ${kmToMil(closestDistance)} mil bort`;

const spanClosest = document.getElementById("closest");
spanClosest.textContent = closestCity;

const classFurthest = cityBox[dmFurthest];
classFurthest.className = "cityBox furthest";

const furthestCity = `${cities[dmFurthest].name}`;
cityBox[dmFurthest].textContent = `${furthestCity} ligger ${kmToMil(furthestDistance)} mil bort`;

const spanFurthest = document.getElementById("furthest");
spanFurthest.textContent = furthestCity;