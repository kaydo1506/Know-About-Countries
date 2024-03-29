'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');
const renderCountry = function (data, className = '') {
  const html = `
<article class="country ${className}">
  
  <img class="country__img" src="${data.flag}" />
<div class="country__data">
  <h3 class="country__name">${data.name}</h3>
  <h3 class="country__capital"><span>🏰</span>${data.capital}</h3>
  <h4 class="country__region">${data.region}</h4>
  <p class="country__demonym"><span>🧑‍🦰</span>${data.demonym}</p>
  <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(
    1
  )} ${'M'}</p>
  <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
  <p class="country__row"><span>💰</span>${data.currencies[0].name}, ${
    data.currencies[0].symbol
  }</p>
</div>
</article>`;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  // countriesContainer.style.opacity = 1;
};

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  // countriesContainer.style.opacity = 1;
};

///////////////////////////////////////

function getInputValue() {
  var inputVal = document.getElementById('myInput').value;

  fetch(`https://restcountries.eu/rest/v2/name/${inputVal}`)
  // first response
    .then(response => {
      if (!response.ok) {
        throw new Error(`Country not found`);
      }
      return response.json();
    })
    .then(data => {
      renderCountry(data[0]);

      const neighbour = data[0].borders[0];
      if (!neighbour) throw new Error('Country has no neighbour');

      return fetch(`https://restcountries.eu/rest/v2/alpha/${neighbour}`);
    })

    // Second response
    .then(response2 => {
      return response2.json();
    })
    .then(data2 => {
      renderCountry(data2, 'neighbour');
    })

    // Catching thrown errors
    .catch(err =>
      renderError(`Something went wrong 🚨 ${err.message}. Try again`)
    )

    // Forcing something to happen regardless of the response received
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });

  document.querySelector('.get').style.display = 'none';
  document.querySelector('.reset').style.display = 'inline';
  document.getElementById('myInput').disabled = true;
  document.getElementById('myInput').value = '';
  document.getElementById('myInput').placeholder = 'Reset ☞';
}

function resetValue() {
  window.location.reload();
}

// Ajax call country (1)
// const request = new XMLHttpRequest();
// request.open('GET', `https://restcountries.eu/rest/v2/name/${inputVal}`);
// request.send();

// request.addEventListener('load', function () {
//   const [data] = JSON.parse(this.responseText);
//   console.log(data);

//   renderCountry(data);

//   const [neighbour] = data.borders;

//   if (!neighbour) return;

//   const request2 = new XMLHttpRequest();
//   request2.open('GET', `https://restcountries.eu/rest/v2/alpha/${neighbour}`);
//   request2.send();

//   request2.addEventListener('load', function () {
//     const data2 = JSON.parse(this.responseText);
//     console.log(data2);

//     renderCountry(data2, 'neighbour');
//   });
// });
