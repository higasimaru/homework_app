![](https://gyazo.com/72e58fef56998ed235c15271a7d52818)

# HomeWork_app DB設計
## usersテーブル
|Column|Type|Options|
|------|----|-------|
|nickname|string|null: false|
|email|string|null: false|
|password|string|null: false|
### Association
- has_many :movie_users 
- has_many :movies through: :movie_users
- has_many :tweets

## moviesテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
### Association
- has_many :movie_users
- has_many :users through: :movie_users
- has_many :tweets

## tweetsテーブル
|Column|Type|Options|
|------|----|-------|
|content|string||
|image|string||
|user_id|integer|null: false, foreign_key: true|
|movie_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :user
- belongs_to :movie

## movie_usersテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|movie_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :user
- belongs_to :movie