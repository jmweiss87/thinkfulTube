const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';

state = {};

$('.next').on('click','a', function(event){
  event.preventDefault();
  nextPageCall( state.searchTerm , displayYouTubeSearchData);
});

$('.previous').on('click','a', function(event){
  event.preventDefault();
  previousPageCall( state.searchTerm , displayYouTubeSearchData);
});

function getDataFromApi(searchTerm, callback) {
  const query = {
    q: `${searchTerm} in:name`,
    key: "AIzaSyBJK7UgC7c31fLCgIMZb50TtQ4GOmOI-7g",
    part: "snippet",
    maxResults: 25
  }
  $.getJSON(YOUTUBE_SEARCH_URL, query, callback);
}


function renderVideo(video, index) {
  return `
    <div class="js-result-actual" id=${video.id.videoId}>
        <a class="js-result-items" href="https://www.youtube.com/watch?v=${video.id.videoId}">
        <img src="${video.snippet.thumbnails.high.url}" alt="thumbnail"> 
         
        </a> 
        <a class="js-result-items" id="js-result-title-${index}" href="https://www.youtube.com/watch?v=${video.id.videoId}" 
        target="_blank">${video.snippet.channelTitle}</a>
        <a class="js-result-items" target="_blank">${video.snippet.description}</a>
    </div>
  `;
}

function nextPageCall(searchTerm, callback) {
  const token = state.nextPageToken;
  const query = {
    q: `${searchTerm} in:name`,
    key: "AIzaSyBJK7UgC7c31fLCgIMZb50TtQ4GOmOI-7g",
    part: "snippet",
    maxResults: 25,
    pageToken: token
  }
  $.getJSON(YOUTUBE_SEARCH_URL, query, callback);
}

function previousPageCall(searchTerm, callback) {
  const token = state.previousPageToken;
  const query = {
    q: `${searchTerm} in:name`,
    key: "AIzaSyBJK7UgC7c31fLCgIMZb50TtQ4GOmOI-7g",
    part: "snippet",
    maxResults: 25,
    pageToken: token
  }
  $.getJSON(YOUTUBE_SEARCH_URL, query, callback);
}

function displayYouTubeSearchData(data) { 
  const results = data.items.map((video, index) => renderVideo(video, index));
  state.nextPageToken = data.nextPageToken;
  state.previousPageToken = data.previousPageToken;
  $('.js-search-results').html(results);
}

function watchSubmit() {
  $('.js-search-form').submit(event => {
    event.preventDefault();
    $('.js-search-results').show();
    $('.h3-remake').show(1200); // add fade in
    $('.next-previous').show(1200);
    const queryTarget = $(event.currentTarget).find('.js-query');
    state.searchTerm = queryTarget.val();
    queryTarget.val("");
    getDataFromApi(state.searchTerm, displayYouTubeSearchData);
  });
}

$('.h3-remake').hide();
$('.js-search-results').hide();
$('.next-previous').hide();
$(watchSubmit);