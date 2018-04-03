var categories = ["trigun", "bleach", "rurouni kenshin"];

var showCategories = () => {
  for (const key in categories) {
    if (categories.hasOwnProperty(key)) {
      const element = categories[key];
      catButton = $(
        '<button type="button" class="category-button btn btn-primary" data-toggle="button" aria-pressed="false" autocomplete="off"></button>'
      );
      $(catButton).text(element);
      $("#cat-buttons").append(catButton);
    }
  }
};
var giphyAPI = {
  apiKey: "9QlbLuAZPRqqt9iFUGsCDEohAG6hNb6B",
  host: "https://api.giphy.com",
  path: "/v1/gifs/search",
  limit: 10,
  getGifs: function (category) {
    let queryTerm = escape(category);
    let url =
      this.host +
      this.path +
      "?api_key=" +
      this.apiKey +
      "&q=" +
      queryTerm +
      "&limit=" +
      this.limit;
    $.getJSON(url, function (response) {
      giphyAPI.showGifs(response);
    });
  },
  showGifs: function (response) {
    for (const key in response.data) {
      const originalUrl = response.data[key].images.original_still.url;
      const activeUrl = response.data[key].images.original.url;
      const rating = response.data[key].rating;
      gifImage = $(
        `<div class="col gifs">
        <img src="${originalUrl}" class="img" alt="" data-state="still" data-still="${originalUrl}" data-active="${activeUrl}">
        <p class="card-text">Rating: ${rating.toUpperCase()}</p>
        </div>`
      );
      $("#gif-body").prepend(gifImage);
    }
  }
};

var gifToggle = (e) => {
  console.log("Called Gif Toggle");
  console.log(e);
};

var addCategory = input => {
  catButton = $(
    '<button type="button" class="category-button btn btn-primary" data-toggle="button" aria-pressed="false" autocomplete="off"></button>'
  );
  $(catButton).text(input);
  $("#cat-buttons").append(catButton);
};

$(document).ready(function () {
  showCategories();
  $(document).on("click", ".category-button", function (e) {
    e.preventDefault();
    category = $(this).text();
    giphyAPI.getGifs(category);
  });
  $("#submit-button").on("click", function (e) {
    e.preventDefault();
    input = $("#add-category").val();
    addCategory(input);
  });
  $(document).on("click", "img", function (e) {
    e.preventDefault();
    gifToggle(e);
  });
});

// toggle still and animate on click