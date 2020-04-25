$(function() {
  
  function buildHTML(data) {
    var html = `<div class='movie-form__result__box'>
                  <div class="name">${data.name}</div>
                  <div class='add-btn' data-user-id='${data.id}' data-user-name='${data.name}'>追加</div>
                </div>`
    $('.movie-form__result').append(html);
  };
  function messageHTML(str) {
    var html = `<div class="name">
                  ${str}
                </div>`
    $('.movie-form__result').append(html);
  };
  function addMember(id, name) {
    var html = `<div class='movie-form__member__list__lists' id='${id}' data-user-id='${id}'>
                  <p class='member'>${name}</p>
                  <div class='remove-btn' data-user-id='${id}' data-user-name='${name}' id='${id}'>削除</div>
                </div>`
    $('.movie-form__member__list').append(html);
  }
  function dicideMember(id){
    var html = `<input value='${id}' name='movie[user_ids][]' type='hidden'>`
    $(`#${id}`).append(html)
  };
  function memberModal(id, name) {
    var html = `<div class='.movie-form__modal__member__name' data-user-id='${id}'>
                  <p>${name}</p>
                </div>`
    $('.movie-form__modal__member').append(html)  
  }
  $('.movie-form__user__input').on('keyup',function() {
    var input = $(this).val()
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { key: input },
      dataType: 'json'
    })
    .done(function(datas) {
      $('.movie-form__result').empty();
      if (datas.length !== 0) {
        datas.forEach(function(data) {
        buildHTML(data);
        var idArray = $('.remove-btn').toArray().map(function(i, element) {
          return Number(i.id);
        })
        var user = $('.add-btn').data('user-id');
        if ($.inArray(user, idArray) !== -1) {         
        $('.movie-form__result__box').remove();
      }
        });
      } else if(input.length == 0) {
        return false;
      } else {
        messageHTML('見つかりません')
      };
    })
    .fail(function() {
      alert('error');
    });    
  });
  $(document).on('click', '.add-btn', function() {
    var userId = $(this).data('user-id')
    var userName = $(this).data('user-name')
    $(this).parent().remove();
    addMember(userId, userName);
    dicideMember(userId);
    memberModal(userId, userName);      
  });   
  $(document).on('click', '.remove-btn', function() {
    var userId = $(this).data('user-id')
    $('[data-user-id="' + userId + '"]').remove()
    });
});