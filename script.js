// loader implementation is here
window.addEventListener("load", () => {
  const loader = document.querySelector(".loader");
  loader.classList.add("loader-hidden");

  loader.addEventListener("transitionend", () => {
    document.body.removeChild("loader");
  });
});

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

// step 4 we need to search countries using start with letters
let starting_button = document.getElementById("starting_button");

starting_button.addEventListener("click", (e) => {
  let input_string = document.getElementById("input-value").value;
  let pattern = new RegExp("^" + input_string, "i");

  let filtered_data = data.filter((country) => {
    if (country.name.common.search(pattern) === -1) {
      return false;
    } else {
      return true;
    }
  });

  let sortedCountriesInfo = document.getElementById("sortedCountriesInfo");
  sortedCountriesInfo.textContent = `Countries start with ${input_string.toUpperCase()} are ${
    filtered_data.length
  }`;
  getCountries(filtered_data);
  console.log(filtered_data);
});

// step 5 - Search with any word functionality
let searchAny_button = document.getElementById("searchAny_button");

searchAny_button.addEventListener("click", (e) => {
  let input_string = document.getElementById("input-value").value;
  let pattern = new RegExp(input_string, "i");

  let filtered_data = data.filter((country) => {
    if (country.name.common.search(pattern) === -1) {
      return false;
    } else {
      return true;
    }
  });

  let sortedCountriesInfo = document.getElementById("sortedCountriesInfo");
  sortedCountriesInfo.textContent = `Countries Containing ${input_string.toUpperCase()} are ${
    filtered_data.length
  }`;
  getCountries(filtered_data);
});

// step 6 On click sorting data A to Z
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
