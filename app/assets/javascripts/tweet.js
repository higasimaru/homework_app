$(function() { 
  function buildHTML(data) {
    if (data.image) {
      var html = `<div class="container__main-tweet__contents" data-tweet-id=${data.id}>
                    <div class="container__main-tweet__contents__content">
                      <div class="container__main-tweet__contents__content__image">
                        <img src="${data.image}">
                      </div>
                      <div class="container__main-tweet__contents__content__text">
                        <span></span>
                          <p>${data.content}</p>
                      </div>
                      <div class="container__main-tweet__contents__content__right-box">
                        <div class="container__main-tweet__contents__content__right-box__name">
                          <span></span>
                          ${data.nickname}
                        </div>
                        <div class="container__main-tweet__contents__content__right-box__date">
                          <span></span>
                          ${data.created_at}
                        </div>
                      </div>
                    </div>
                  </div>`
    } else {
      var html = `<div class="container__main-tweet__contents" data-tweet-id=${data.id}>
                    <div class="container__main-tweet__contents__content">
                      <div class="container__main-tweet__contents__content__text">
                        <span></span>
                          <p>${data.content}</p>
                      </div>
                      <div class="container__main-tweet__contents__content__right-box">
                        <div class="container__main-tweet__contents__content__right-box__name">
                          <span></span>
                          ${data.nickname}
                        </div>
                        <div class="container__main-tweet__contents__content__right-box__date">
                          <span></span>
                          ${data.created_at}
                        </div>
                      </div>
                    </div>
                  </div>`
    }
    $('.container__main-tweet').append(html)
  }
  $('#new_tweet').on('submit',function(e) {
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      type: 'POST',
      url: url,
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data) {
      console.log(data)
        buildHTML(data);
       $('form')[0].reset();
       $('.container__main-tweet').animate({
         scrollTop: $('.container__main-tweet')[0].scrollHeight
       },500)
    })
    .fail(function() {
      alert('コメントを入力して下さい');
    })
  })
  var reloadTweets = function() {
    var recentTweet = $('.container__main-tweet__contents:last').data('tweet-id');
    $.ajax({
      type: 'GET',
      url: 'api/tweets',
      data: { id: recentTweet },
      dataType: 'json' 
    })
    .done(function(datas) {
      if (datas.length !== 0) {       
        $.each(datas, function(i, data) {
          buildHTML(data)         
        });      
        $('.container__main-tweet').animate({
          scrollTop: $('.container__main-tweet')[0].scrollHeight
        });
      }
    })
    .fail(function() {
      alert('通信エラーです');
    })
  }
  if (document.location.href.match(/\/movies\/\d+\/tweets/)) {
    setInterval(reloadTweets, 7000);
  };
});

