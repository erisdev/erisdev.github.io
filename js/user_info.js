// function show_user_callback(json) {
//  console.log(json);
// }

function remove_after_animation() { $(this).remove(); }

function list_repos_callback(json) {
  var repos = json.repositories;
  
  var ul_mine    = $('ul#repos_mine');
  var ul_contrib = $('ul#repos_contrib');
  
  for (var i = 0, L = repos.length; i < L; ++i) {
    var repo = repos[i];
    
    var li = $('<li>', document).addClass('repo').append(
      $('<a>', document).attr('href', repo.url).text(repo.name)
    ).append(
      '&mdash;' + repo.description
    );
    
    if (repo.homepage) {
      li.append(
        ' ('
      ).append(
        $('<a>', document).attr('href', repo.homepage).text('homepage')
      ).append(
        ')'
      );
    }
    
    if (repo.private || repo.name.match(/\.github\.com$/)) break;
    else if (repo.fork)
      ul_contrib.append(li.fadeIn(500));
    else
      ul_mine.append(li.fadeIn(500));
  }
  
  ul_mine.children(   '.loading').hide(500, remove_after_animation);
  ul_contrib.children('.loading').hide(500, remove_after_animation);
} // list_repos_callback
