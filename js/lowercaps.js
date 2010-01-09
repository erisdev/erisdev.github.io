function lowercaps() {
  $('.lowercaps').each(function() {
    $(this).html(
      $(this).html().replace(/[A-Z]+/, '<span class="cap">$&</span>')
    );
  });
}
