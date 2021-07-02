'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

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
  countriesContainer.style.opacity = 1;
};

function getInputValue() {
  var inputVal = document.getElementById('myInput').value;

  // Ajax call country (1)
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.eu/rest/v2/name/${inputVal}`);
  request.send();

  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);
    // Render countr
    renderCountry(data);

    // Get Neighbour Country (2)
    const [neighbour] = data.borders;

    if (!neighbour) return;

    // Ajax call country (2)
    const request2 = new XMLHttpRequest();
    request2.open('GET', `https://restcountries.eu/rest/v2/alpha/${neighbour}`);
    request2.send();

    request2.addEventListener('load', function () {
      const data2 = JSON.parse(this.responseText);
      console.log(data2);

      // Render Country2
      renderCountry(data2, 'neighbour');
    });
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
