json.array! @tweets do |tweet|
  json.id tweet.id
  json.image tweet.image.url
  json.content tweet.content
  json.created_at tweet.created_at.strftime('%Y年%m月 %H時%M分')
  json.nickname tweet.user.nickname
end
