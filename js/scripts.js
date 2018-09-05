

// Send request
function getNews(){

  var text = document.getElementById("news_text");
  var request = new XMLHttpRequest();

  request.open('GET', 'https://newsapi.org/v2/top-headlines?country=us&apiKey=f28fbaa1aa8f4ba0aa6b33d29ec48d94&pagesize=1', true);
  request.onload = function () {

    // Begin accessing JSON data here
    var data = JSON.parse(this.response);

    if (request.status >= 200 && request.status < 400) {
      var articleText = data.articles[0].title + ": " + data.articles[0].description;
      text.innerHTML = articleText
      responsiveVoice.speak(articleText)
    } else {
    }
  }

  request.send();
}
