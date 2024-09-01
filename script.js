// theme switcher
const theme_btn = document.querySelectorAll(".theme-switcher");
const navbar = document.querySelector(".navbar");
const dark = document.querySelector(".dark");
const light = document.querySelector(".light");
const body = document.querySelector("body");
const card = document.getElementsByClassName("country");
const input = document.querySelector(".search-input");
const dropDown = document.querySelector(".filter-head");
const dropDownOptions = document.querySelector(".filter-options");

function themetoggler(theme) {
  dark.classList.toggle("hidden");
  light.classList.toggle("hidden");
  navbar.style.backgroundColor = `var(--${theme}-mode-elements)`;
  navbar.style.color = `var(--${theme}-mode-text)`;
  body.style.backgroundColor = `var(--${theme}-mode-backgrond)`;
  body.style.color = `var(--${theme}-mode-text)`;
  input.style.backgroundColor = `var(--${theme}-mode-elements)`;
  input.style.color = `var(--${theme}-mode-text)`;
  dropDown.style.backgroundColor = `var(--${theme}-mode-elements)`;
  filterOption.style.backgroundColor = `var(--${theme}-mode-elements)`;
  Array.from(card).forEach((element) => {
    element.style.backgroundColor = `var(--${theme}-mode-elements)`;
  });
}

theme_btn.forEach((btn) =>
  btn.addEventListener("click", function () {
    if (btn.classList.contains("dark")) {
      themetoggler("dark");
    }
    if (btn.classList.contains("light")) {
      themetoggler("light");
    }
  })
);

// drop down filter by region
const filterHead = document.querySelector(".filter-head");
const filterOption = document.querySelector(".filter-options");
const regionOption = document.querySelectorAll(".option");
const countryRegion = document.getElementsByClassName("country-region");

function showDropdown(e) {
  filterOption.classList.toggle("show");
}

// showing options
filterHead.addEventListener("click", showDropdown);

// closing options
document.addEventListener("click", function (e) {
  if (!e.target.classList.contains("filter-head")) {
    filterOption.classList.remove("show");
  }
});

// filtering country by region
regionOption.forEach((region) => {
  region.addEventListener("click", function () {
    Array.from(countryRegion).forEach((reg) => {
      if (
        reg.textContent.includes(region.textContent) ||
        region.textContent == "All"
      ) {
        reg.closest(".country").style.display = "grid";
      } else {
        reg.closest(".country").style.display = "none";
      }
    });
  });
});

// searching on country name
const countryName = document.getElementsByClassName("country-name");
const inputSearch = document.querySelector(".search-input");

inputSearch.addEventListener("input", function () {
  Array.from(countryName).forEach((cName) => {
    if (
      cName.textContent.toLowerCase().includes(inputSearch.value.toLowerCase())
    ) {
      cName.closest(".country").style.display = "grid";
    } else {
      cName.closest(".country").style.display = "none";
    }
  });
});

// render country data
const countriesContainer = document.querySelector(".countries-container");

function renderCountry(data) {
  const country = document.createElement("article");
  country.classList.add("country");
  const html = `
      <img src="${data.flags.png}" alt="no img found" class="country-flag">
      <div class="country-data">
        <p class="country-name">${data.name}</p>
        <p class="country-population">population : <span class="population">${data.population}</span></p>
        <p class="country-region">Region : <span class="region">${data.region}</span></p>
        <p class="country-capital">Capital : <span class="capital">${data.capital}</span></p>
      </div>
    `;
  country.innerHTML = `${html}`;
  countriesContainer.appendChild(country);

  country.addEventListener("click", function () {
    showConutryDetail(data);
  });
}

// render modal window
const modal = document.querySelector(".detail-country");

function getCountryData() {
  fetch("https://restcountries.com/v2/all")
    .then((res) => {
      return res.json();
    })
    .then((countryData) => {
      countryData.forEach((data) => {
        renderCountry(data);
      });
    });
}

getCountryData();

// show modal about the country
const inputArea = document.querySelector(".input-area");

function showConutryDetail(data) {
  console.log(data);
  countriesContainer.addEventListener("click", function (e) {
    if (e.target.closest(".country")) {
      modal.classList.toggle("hidden");
      inputArea.classList.toggle("hidden");
      countriesContainer.classList.toggle("hidden");
    }
    const html = `
          <div class="back-btn">
             <img
                src="https://img.icons8.com/external-prettycons-solid-prettycons/30/000000/external-left-arrow-orientation-prettycons-solid-prettycons.png" />
             <span>Back</span>
             </div>
        <article class="country-data-con">
          <div class="img-part">
              <img src="${data.flags.png}" alt="country-flag-img">
          </div>
          <div class="country-info">
              <div class="left">
                  <p class="option country-name-2">${data.name}</p>
                  <p class="option native-name"><strong>Native name : </strong>${
                    data.nativeName
                  }</p>
                  <p class="option region"><strong>Region : </strong>${
                    data.region
                  }</p>
                  <p class="option subregion"><strong>sub region : </strong> ${
                    data.subregion
                  }</p>
                  <p class="option capital"><strong>Capital : </strong> ${
                    data.capital
                  }</p>
              </div>
              <div class="right">
                  <p class="option top-level-domain"><strong>Top level domain : </strong>${data.topLevelDomain.map(
                    (element) => element
                  )}</p>
                  <p class="option currency"><strong>currency : </strong>${data.currencies.map(
                    (element) => element.name
                  )}</p>
                  <p class="option languages"><Strong>Languages : </Strong>${data.languages.map(
                    (element) => element.name
                  )}</p>
                </p>

                  <p class="option borders"><Strong>borders : </Strong>${data.borders.map(
                    (border) => border
                  )}</p>
                </p>

              </div>
          </div>
        </article>
      `;
    modal.innerHTML = `${html}`;
    // close the modal
    const back = modal.querySelector(".back-btn");
    back.addEventListener("click", function () {
      modal.classList.toggle("hidden");
      inputArea.classList.toggle("hidden");
      countriesContainer.classList.toggle("hidden");
    });
  });
}
