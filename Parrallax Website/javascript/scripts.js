"use strict";

(function () {

  let menuButton = document.getElementById("menu");
  let navMenu = document.getElementById("nav-menu");

  menuButton.addEventListener("click", toggleMenu);

  let toggle = false; // hidden at first
  function toggleMenu() {
    if (toggle) { // true: it's visible
      navMenu.classList.remove("show-menu"), // hide it
        toggle = false
    } else { // false: it's hidden
      navMenu.classList.add("show-menu"), // show it
        toggle = true
    }
  }
})();

function googleTranslateElementInit() {
  new google.translate.TranslateElement({
      pageLanguage: 'en'
    },
    'google_translate_element'
  );
}

(function () {

  document.getElementById('slideshow').getElementsByTagName('img')[0].className = "fx";
  window.setInterval(kenBurns, 6000);
  let images = document.getElementById('slideshow').getElementsByTagName('img'),
    numberOfImages = images.length,
    i = 1;

  function kenBurns() {
    if (i == numberOfImages) {
      i = 0;
    }
    images[i].className = "fx";
    if (i === 0) {
      images[numberOfImages - 2].className = "";
    }
    if (i === 1) {
      images[numberOfImages - 1].className = "";
    }
    if (i > 1) {
      images[i - 2].className = "";
    }
    i++;

  }
})();

function initMap() {
  let leicester = {
    lat: 52.6333,
    lng: -1.1333
  };
  let alfeena = {
    lat: 52.633438,
    lng: -1.125839
  };
  let aljumeirah = {
    lat: 52.641804,
    lng: -1.128711
  };
  let bukhoor = {
    lat: 52.640051,
    lng: -1.114021
  };
  let embassy = {
    lat: 52.644417,
    lng: -1.145233
  };

  let mapDemo = document.getElementById("map");

  // this sets the default location for when the map is first loaded
  let map = new google.maps.Map(mapDemo, {
    zoom: 13,
    center: leicester
  });

  // these set different markers you want to show on your map
  let markerAlfeena = new google.maps.Marker({
    position: alfeena,
    map: map,
    title: 'Al Feena'
  });
  let markerAlJumeirah = new google.maps.Marker({
    position: aljumeirah,
    map: map,
    title: 'Al Jumeirah'
  });
  let markerBukhoor = new google.maps.Marker({
    position: bukhoor,
    map: map,
    title: 'Bukhoor'
  });
  let markerEmbassy = new google.maps.Marker({
    position: embassy,
    map: map,
    title: 'Embassy'
  });

}

(function () {
  // creates a new object called xhr
  // which will handle the API call
  let xhr = new XMLHttpRequest();
  // console.log(`Current readyState: ${xhr.readyState}`);

  let queryBox = document.getElementById("wikiQuery");
  let searchForm = document.getElementById("searchForm");
  let demoJSON = document.getElementById("demo");

  // constructs the base for the request url
  let baseURL = "https://en.wikipedia.org/w/api.php? \
                format=json& \
                action=query& \
                generator=search& \
                gsrnamespace=0& \
                gsrlimit=5& \
                prop=info|extracts|langlinks|pageimages& \
                inprop=url& \
                exintro& \
                explaintext& \
                exsentences=1& \
                exlimit=max& \
                llprop=url& \
                lllimit=max& \
                piprop=thumbnail|name& \
                origin=*& \
                gsrsearch=";

  /*
  API Sandbox url
  https://en.wikipedia.org/wiki/Special:ApiSandbox#action=query&format=json&generator=search&prop=extracts%7Clanglinks%7Cpageimages&gsrlimit=10&gsrnamespace=0&exintro&explaintext&exsentences=1&exlimit=max&llprop=url&lllimit=max&piprop=thumbnail|name&origin=*&gsrsearch=kittens

  Request url
  https://en.wikipedia.org/w/api.php?action=query&format=json&generator=search&prop=extracts%7Clanglinks%7Cpageimages&gsrlimit=10&gsrnamespace=0&exintro&explaintext&exsentences=1&exlimit=max&llprop=url&lllimit=max&piprop=thumbnail|name&origin=*&gsrsearch=kittens
  */

  function gatherData(data) {
    // console.log(data);
    // initialise some variables
    let theData = "";
    let langLinks = "";
    let img = "<img>";
    const languages = ["en", "de", "zh", "fr", "es", "ja", "ar", "ko", "el"];
    let k;
    let key;
    // loop through the result pages by pageid
    for (key in data.query.pages) {
      let tmp = data.query.pages[key];
      if (tmp.thumbnail) {
        img = `<img src="${tmp.thumbnail.source}" alt="${tmp.title}"> `;
      }
      let title = `<strong><a href="${tmp.fullurl}">${tmp.title}</a></strong>`;
      let extract = `<span class="txt">${tmp.extract}</span>`;
      let langLinks = "";
      for (k in tmp.langlinks) {
        if (languages.includes(tmp.langlinks[k].lang)) {
          langLinks += `<a href=${tmp.langlinks[k].url}>${tmp.langlinks[k].lang}</a> `;
        }
      }
      theData += `<li>${img} ${title} ${extract} <span class="langs">${langLinks}</span></li>`;
    }
    demoJSON.innerHTML = theData;
  }

  // the API call is triggered once the user submits a query
  searchForm.addEventListener("submit", function (ev) {
    // complete the request url
    let wiki = baseURL + queryBox.value;
    // open a connection to the requested API url
    xhr.open("GET", wiki, true);
    // be polite to Wikipedia
    xhr.setRequestHeader('Api-User-Agent', 'Example/1.0');
    // send off that request
    xhr.send();
    // if the response was ok, handle the response data using the gatherData function
    xhr.onreadystatechange = function () {
      // console.log(`Current readyState: ${xhr.readyState}`);
      if (xhr.readyState === 4 && xhr.status === 200) {
        // parse the response JSON
        let response = JSON.parse(xhr.responseText);
        // deal with the parsed JSON data
        gatherData(response);
      }
    };
    // clear the search box
    queryBox.value = "";
    ev.preventDefault();
  }, false);

}());
