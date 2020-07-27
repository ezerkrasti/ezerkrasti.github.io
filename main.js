function language() {
  const validLanguages = ["lv", "en", "ru"]
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
console.log('Hello World!');
console.log(language());

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
