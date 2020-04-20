$(function() {
  function buildHTML(data) {
    var html = `<div class='movie-form__result__box'>
                  <div class='name'>${data.name}</div>
                  <div class='add-btn' data-user-id='${data.id}' data-user-name='${data.name}'>追加</div>
                </div>`
    $('.movie-form__result').append(html);               
  }
  function messageHTML(str) {
    var html = `<div class='movie-form__result__box'>
                  <div class='name'>${str}</div>
                </div>`
    $('.movie-form__result').append(html); 
  }
  function addMember(id, name) {
    var html = `<div class='movie-form__member__list__lists'>
                  <input name='movie[user_ids][]', value='${id}', type='hidden'
                  <p class='member'>${name}</p>
                  <div class='remove-btn'>削除</div>
                </div>`
    $('.movie-form__member__list').append(html);           
  }
  $('.movie-form__user__input').on('keyup', function() {
    var input = $(this).val();
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { word: input },
      dataType: 'json'
    })
    .done(function(datas) {
      $('.movie-form__result').empty();
      if (datas.length !== 0){
        datas.forEach(function(data) {
          buildHTML(data);        
        })
      } else if (input.length == 0) {
        return false;
      } else {
        messageHTML('検索結果：　0件')
      };
    })
    .fail(function() {
      alert('通信エラーです')
    });
  });
  $(document).on('click', '.add-btn', function() {
    var userId = $(this).attr('data-user-id');
    var userName = $(this).data('user-name');
    $(this).parent().remove();
    addMember(userId, userName);
  });
  $(document).on('click', '.remove-btn', function() {
    $(this).parent().remove();
  });
});