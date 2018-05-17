const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';


state = {};

$('#next').on('click','a', function(event){
  event.preventDefault();
  nextPageCall( state.searchTerm , displayYouTubeSearchData);
});

// ok I put searchTerm in quotes, and it is already defined, out of quotes it is not defined.
// as pointed out by error in console.

// test is static....
// same place you get nextPageToken
// i should save the current searchTermn so I can use it again and again.

function getDataFromApi(searchTerm, callback) {
  const query = {
    q: `${searchTerm} in:name`,
    key: "AIzaSyBJK7UgC7c31fLCgIMZb50TtQ4GOmOI-7g",
    part: "snippet",
    maxResults: 25
  }
  $.getJSON(YOUTUBE_SEARCH_URL, query, callback);
}


function renderVideo(video) {
  return `
    <div class="js-result-actual" id=${video.id.videoId}>
        <a class="js-result-items" href="https://www.youtube.com/watch?v=${video.id.videoId}">
        <img src="${video.snippet.thumbnails.medium.url}" alt="thumbnail" 
        height="${video.snippet.thumbnails.medium.height}" width="${video.snippet.thumbnails.medium.width}"> 
        </a> 
        <a class="js-result-items" href="https://www.youtube.com/watch?v=${video.id.videoId}" 
        target="_blank">${video.snippet.channelTitle}</a>
        <a class="js-result-items" target="_blank">${video.snippet.description}</a>
    </div>
  `;
}


// added nextPageToken to state, so I Can Take nextPageToken from state..... 
// the searchTerm, have this available in state....
// I thought that is what is on LINE 46...
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

// in watchSubmit, take this searchTerm get s
// ** nextpagetoken and searchterm IN THE STATE....


// problem...again...connecting these functions, and their parameters, and their variables for
// the asynchronous calls.
// 
// all the arguments u need should be within the state...
// what are you passing from one function to another, and what are you going to pass to state
// talking about event delegation and event propagation

// map nextPageCall to click event, and only apply to link on next page of text
// have the class that executes when you click on next
// delegated form of jQuery event handling.....
// two selectors, one up to that point, then one down low level.

function displayYouTubeSearchData(data) { 
  const results = data.items.map((video, index) => renderVideo(video));
  state.nextPageToken = data.nextPageToken;

  // IN THIS FUNCTION, put both the nextPagetoken and the searchterm in here so they can be used later
  // inspect results, state.next
  // have access to data here...if click on next class, then fire nextPageCall function.
  // need to pass the token's value in order to get the next page, and not the same...

  // so we'll have a second variable named nextResults, that will work for the second ajax call.
  // create variable or function stating the event or thing that needs to happen to trigger this new call
  $('.js-search-results').html(results);
}

// have a unified place to look, for things,such as STATE obj...

function watchSubmit() {
  $('.js-search-form').submit(event => {
    event.preventDefault();
    const queryTarget = $(event.currentTarget).find('.js-query');
    state.searchTerm = queryTarget.val();
    queryTarget.val("");
    getDataFromApi(state.searchTerm, displayYouTubeSearchData);
  });
}

$(watchSubmit);
// line 95....

// if you're passing a variable along from functions, reuse the same 
// going to need to make some changes to getDataFromApi...think of ways
// think of scenarios where you do have those tokens and scednarios where you don't have those tokens...
// Use that nextPageToken object, and it has to be part of the API call, otherwise it won't connect to the object.

// if not null, show previous page arrow
// differrence betweeen **response parameter** and **request parameters**
// adding another parameter to the request, nextPageToken,.....
// next page and previous page links shousl invoke the same function with slightly different arguments...
// a keep track of what your favorite ways to solve probs are.....

// height="${video.snippet.thumbnails.medium.height}" width="${video.snippet.thumbnails.medium.width}"> 
// class="js-result-items" un-needed? testing...was on img 
