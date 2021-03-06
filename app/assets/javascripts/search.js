$(function() {
  function listHTML(data) {
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
  function  noneTweet(str) {
    var html = `<p>${str}</p>`
    $('.container__main-tweet').append(html)
  }
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
    }
    $('.container__main-tweet').append(html);
  }
  $('.header__search-box__input-text').on('keyup', function() {
    var words = $(this).val();
    $.ajax({
      type: 'GET',
      url: 'tweets/searches/new',
      data: { input: words },
      datatype: 'json'
    })
    .done(function(datas) {
      $('.container__main-tweet').empty();
      $('.container__main-tweet').prepend('<p>検索結果:　' + datas.length + '件</p>');
      if (datas.length !== 0) {
        datas.forEach(function(data) {
          searchHTML(data);
        });
        $('.container__main-tweet').scrollTop(0)
      }
      else if (words.length == 0) {
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
      url: 'tweets/searches',
      dataType: 'json'
    })
    .done(function(datas) {
      $('.container__main-tweet').empty();
      if (datas.length !== 0) {
        $('.header__search-box__input-text').val('')
        $.each(datas,function(i, data) {
          listHTML(data);
          $('.container__main-tweet').animate({
            scrollTop: $('.container__main-tweet')[0].scrollHeight
          }, 0.01)
        })
      } else {
        noneTweet('まだコメントがありません');
      };
    })
    .fail(function() {
      alert('通信エラーです');
    });
  });
});

dae81ee10f7c882bd0c22c0d869faeee