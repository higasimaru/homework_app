json.array! @tweets do |tweet|
  json.id tweet.id
  json.content tweet.content
  json.image tweet.image.url
  json.created_at tweet.created_at
  json.nickname tweet.user.nickname
end
