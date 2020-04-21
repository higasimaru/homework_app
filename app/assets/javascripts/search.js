$(function() {
  function searchHTML(data) {
    if (data.image) {
      var html = `<div class="container__main-tweet__contents">
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
      $('.container__main-tweet').append(html);
    } else {
      var html = `<div class="container__main-tweet__contents">
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
      $('.container__main-tweet').append(html);
    };
  };
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
      $('.container__main-tweet').append(html);
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
      $('.container__main-tweet').append(html);
    };
  };
  $('input').on('keyup',function() {
    var words = $('input').val();
    $.ajax({
      type: 'GET',
      url: 'tweets/search',
      data: { input: words },
      dataType: 'json'
    })
    .done(function(datas) {
      $('.container__main-tweet').empty();
      $('.container__main-tweet').prepend('<p>検索結果　' + datas.length +'件</p>')
      if (datas.length !== 0) {    
        datas.forEach(function(data) {
          searchHTML(data);
          $('.container__main-tweet').scrollTop(0)
        })
      } else if (words.length == 0){
        return false;
      };   
    })
    .fail(function() {
      alert('通信エラーです');
    });
  });
  $(document).on('click', '.header__search-box__btn', function() {
    $.ajax({
      type: 'GET',
      url: 'tweets',
      dataType: 'json'
    })
    .done(function(datas) {
      $('input').val('')
      $('.container__main-tweet').empty();
      if (datas.length !== 0) {
        $.each(datas, function(i, data) {
          buildHTML(data)
        })
      } else {
        $('.container__main-tweet').append('<p>まだ投稿がありません</p>')
      }     
    })
    .fail(function() {
      alert('通信エラーです')
    })
  })
});