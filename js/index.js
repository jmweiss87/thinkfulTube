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
    <div class="js-result-actual" id="${video.id.videoId} >
      <h2 class="js-result-actual-items">
        <a href="https://www.youtube.com/watch?v=${video.id.videoId}">
          <img class="thumbnail-size" src="${video.snippet.thumbnails.medium.url}" alt="thumbnail" height="${video.snippet.thumbnails.high.height}" width="${video.snippet.thumbnails.high.width}">
        </a>  
        <a class="js-result-name" href="${video.snippet.channelTitle}" target="_blank">${video.snippet.channelTitle}</a>
        <a class="js-result-name" href="${video.snippet.description}" target="_blank">${video.snippet.description}</a>
      </h2>  
    </div>
  `;
}


//removed:
//<p class="fresh-kicks">${video.snippet.channelTitle}</p>


// id="${video.id.videoId}"

// need to style the results using CSS. Make sure using good spacing, reasonable color pallette, etc.
// 

// how you'd like to see the search result, 3 or 4 videos per row or column.....
// 

// make the thumbnail showup using the img HTML tag above in renderVideo function.
// reminder: <img src="thumbnail.gif" alt="Thumbnail" height="42" width="42">

// by <a class="js-user-name" href="${video.owner.html_url}" target="_blank">${video.owner.login}</a></h2>
// <p>Number of watchers: <span class="js-watchers-count">${video.watchers_count}</span></p>
// <p>Number of open issues: <span class="js-issues-count">${video.open_issues}</span></p>
{/* <a class="js-result-name" href="${video.snippet.thumbnails.default}" target="_blank">${video.snippet.thumbnails.default} </a> */}


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
