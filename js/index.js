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
    <div>
      <h2>
      <a class="js-result-name" href="${video.snippet.channelTitle}" target="_blank">${video.snippet.channelTitle}</a>
      <a class="js-result-name" href="${video.snippet.description}" target="_blank">${video.snippet.description}</a>
      <a class="js-result-name" href="${video.snippet.thumbnails.default}" target="_blank">${video.snippet.thumbnails.default} </a>
    </div>
  `;
}

// make the thumbnail showup using the img HTML tag above in renderVideo function.

// by <a class="js-user-name" href="${video.owner.html_url}" target="_blank">${video.owner.login}</a></h2>
// <p>Number of watchers: <span class="js-watchers-count">${video.watchers_count}</span></p>
// <p>Number of open issues: <span class="js-issues-count">${video.open_issues}</span></p>

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
