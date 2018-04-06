const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';

function getDataFromApi(searchTerm, callback) {
  const query = {
    q: `${searchTerm} in:name`,
    per_page: 5,
    key: "AIzaSyBJK7UgC7c31fLCgIMZb50TtQ4GOmOI-7g",
    part: "snippet"
  }
  $.getJSON(YOUTUBE_SEARCH_URL, query, callback);
}

function renderVideo(video) {
  return `
    <div class="js-result-actual" id=${video.id.videoId}>
        <a href="https://www.youtube.com/watch?v=${video.id.videoId}">
        <img class="thumbnail-size" src="${video.snippet.thumbnails.medium.url}" alt="thumbnail" 
        height="${video.snippet.thumbnails.medium.height}" width="${video.snippet.thumbnails.medium.width}"> 
        </a> 
        <a class="js-result-items" href="https://www.youtube.com/watch?v=${video.id.videoId}" 
        target="_blank">${video.snippet.channelTitle}</a>
        <a class="js-result-items" target="_blank">${video.snippet.description}</a>
    </div>
  `;
}


function displayYouTubeSearchData(data) { 
  const results = data.items.map((video, index) => renderVideo(video));
  $('.js-search-results').html(results);
}

function watchSubmit() {
  $('.js-search-form').submit(event => {
    event.preventDefault();
    const queryTarget = $(event.currentTarget).find('.js-query');
    const query = queryTarget.val();
    // clear out the input
    queryTarget.val("");
    getDataFromApi(query, displayYouTubeSearchData);
  });
}

$(watchSubmit);
