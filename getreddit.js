$(document).ready(function () {
  var showData = $('#content');
  
  $('#btn-2').click(function () {
    getTop();
    $('#btn-2').addClass("active"  );
    $('#btn-1').removeClass( "active" );
  });

  $('#btn-1').click(function () {
    getNew();
    $('#btn-1').addClass("active"  );
    $('#btn-2').removeClass( "active" );
  });

  getNew();

  function getNew() {
    $.getJSON('https://www.reddit.com/new.json', function (data) {
      createContent(data);
    });
  }
  
  function getTop() {
    $.getJSON('https://www.reddit.com/top.json', function (data) {
      createContent(data);
    });
  }
  
  function createContent(data) {
    var items = data.data.children.map(function (item) {
      return {
        title: item.data.title,
        permalink: 'https://www.reddit.com'+ item.data.permalink,
        thumbnail: item.data.thumbnail
      };
    });
    showData.empty();
    var content = '';
    for (var i=0; i<items.length; i++) {
      var thumbnail;
      if (items[i].thumbnail == '' || items[i].thumbnail == 'self' || items[i].thumbnail == 'default'|| items[i].thumbnail == 'image'|| items[i].thumbnail == 'nsfw' ) {
        thumbnail = "";
      }else {
        var strThumbnail = '"'+items[i].thumbnail+'"';
        thumbnail = "<div class='thumbnail' style='background-image: url(" +strThumbnail+ ");'></div>";
      }
      // var tmp = '<div class="item"><div class="item-content-type video"></div><div class="item-title"><a href="' + items[i].permalink + '">' + items[i].title + '</a></div><p class="clear"></p></div>';
      var tmp = '<div class="item">'+ thumbnail + '<div class="item-title"><a href="' + items[i].permalink + '">' + items[i].title + '</a></div><p class="clear"></p></div>';
      content = content.concat(tmp);
    }
    showData.append(content);
  }
});

