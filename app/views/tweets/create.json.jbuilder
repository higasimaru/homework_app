json.content @tweet.content
json.image @tweet.image.url
json.nickname @tweet.user.nickname
json.created_at @tweet.created_at.strftime("%Y年%m月%d日 %H時%M分")
json.id @tweet.id
json.movie_id @tweet.movie.id

