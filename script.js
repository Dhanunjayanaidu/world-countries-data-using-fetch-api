// step 1 we need to fecth the data from api
let response = await fetch("https://restcountries.com/v3.1/all");
let data = await response.json();
console.log(data);

// step 2 we need to show all countries count number from api
let countries_count = document.getElementById("countries_count");
countries_count.innerHTML = data.length;

// step 3 we need to show all countries using .map function
function getCountries(countriesData) {
  let display = document.getElementById("display");
  display.innerHTML = "";
  countriesData.map((country) => {
    display.innerHTML += `
        <div class="col-2">
            <div class="countrySet">
                <div class="bgSet"></div>
                <span style="z-index: 99;">${country.name.common}</span>
            </div>
        </div>
    `;
  });
}
getCountries(data);

// step 4 On click sorting data A to Z
let sort_button = document.getElementById("sort_button");
sort_button.addEventListener("click", (event) => {
  function compare(a, b) {
    if (a.name.common < b.name.common) {
      return -1;
    } else if (a.name.common > b.name.common) {
      return 1;
    }
    return 0;
  }

  data.sort(compare);
  getCountries(data);
});
