$(function() {
  function buildHTML(data) {
    var html = `<div class='movie-form__result__box'>
                  <div class="name">
                  ${data.name}
                  </div>
                  <div class='add-btn', data-user-id='${data.id}', data-user-name='${data.nickname}'>
                    追加
                  </div>
                </div>`
    $('.movie-form__result').append(html);
  }
  function messageHTML(str) {
    var html = `<div class="name">
                  ${str}
                </div>`
    $('.movie-form__result').append(html);
  };
  $('.movie-form__user__input').on('keyup',function() {
    var input = $(this).val()
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { key: input },
      dataType: 'json'
    })
    .done(function(datas) {
      $('.movie-form__result').empty()
      if (datas.length !== 0) {
        datas.forEach(function(data) {
          buildHTML(data);
        })
      } else if(input.length == 0) {
        return false;
      } else {
        messageHTML('見つかりません')
      }

    })
    .fail(function() {
      alert('error')
    })
    $(document).on('click','.add-btn', function() {
      console.log('ok')
    })
  })
})