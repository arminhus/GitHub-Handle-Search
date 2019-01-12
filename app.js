// Your team is working on an app that will help recruiters review all of
// a candidates information. You've been assigned to work on one feature for the app -
// to display a list of repos belonging to a particular GitHub handle.

//     Review GitHub's API documentation for the list user repositories endpoint
//  to understand how this endpoint works.

//     Requirements:
//         The user must be able to search for a GitHub user handle.
//         The search must trigger a call to GitHub's API.
//         The repos associated with that handle must be displayed on the page.
//         You must display the repo name and link to the repo URL.
//         The user must be able to make multiple searches and see only the
// results for the current search.

let watchForm = () => {
  $("#form").submit(event => {
    event.preventDefault();
    let username = $(".js-query").val();
    console.log(username);
    fetch(`https://api.github.com/users/${username}/repos`)
      .then(res => res.json())
      .then(repos => displayResult(repos));
  });
};

let displayResult = repos => {
  let resultHTML = "";
  repos.map(item => {
    let created_ = new Date(item.created_at);
    let updated_ = new Date(item.updated_at);
    resultHTML += `<div class="repo-box">
        <h2 class="repo-name">${item.full_name}</h2>
        <a class="repo-link" href="${item.html_url}">${item.html_url}</a>
        <p class="repo-info">created_at: ${created_.toDateString()}</p>
        <p class="repo-info">updated_at: ${updated_.toDateString()}</p>
      </div>`;
  });
  $(".results").html(resultHTML);
};

let init = () => {
  watchForm();
};

$(init);
