const validLanguages = ["lv", "ru", "en"];

function language() {
  var lang = ((new URL(location)).searchParams.get('language') || navigator.language).toLowerCase();
  if ( lang.length > 2 ) {
    lang = lang.split("-")[0];
  }
  if (validLanguages.includes(lang)) {
    return lang;
  } else {
    return "en";
  }
}

function nextLanguage() {
  var currentId = validLanguages.indexOf(language());
  var next = validLanguages[(currentId + 1)] || validLanguages[0];
  window.location.href = ("/?language=" + next);
}

// Translate all i18n class elements
$.getJSON("i18n/" + language() + ".json", function(json) {
  var list = document.getElementsByClassName("i18n");
  for (let item of list) {
    for (var n = 0; n < item.className.split(" ").length; n++) {
      if(item.className.split(" ")[n].startsWith("i18n_")) {
        var key = item.className.split(" ")[n].split("_")[1];
        item.innerHTML = json[key];
      } else {
        var key = item.id;
        item.innerHTML = json[key];
      }
    }
  }
});

// Bind nextLanguage function to menue bar link
var langButton = document.getElementById('language');
langButton.onclick = nextLanguage;
