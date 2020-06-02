![Homework_app](https://i.gyazo.com/d96f745dc1dd6fbf4bbe093ad3b2e3bc.jpg)

# アプリ名
  Homework_app(チャットアプリ)

# 概要
  ユーザー間のグループ作成機能、画像、メッセージ投稿機能、ユーザー、メッセージ検索機能を実装したアプリです。

# 本番環境

  ### URL
    http://18.178.141.223/
    
  ### Basic認証
  - user name: admin
  - password : 2222
  
  ### ログイン情報（テスト用）
  - email    : test@me.com
  - password : foobar
  
# 制作意図
  LINE,Twitter,などSNSでは簡単に検索機能を使うことができます。
  ユーザー、メッセージ両者のajaxによる検索機能を充実させたチャットアプリを開発することで、
  その仕組みを１から実装してみたかったので作成しました。
  
# DEMO
![Top](https://i.gyazo.com/8e729468ac5d11f4ef4eee7a1baf21d5.jpg)

  - ログインして頂き、Topページ左上の『movie』作成をクリックしてトークルームを作成して下さい。(1人でも作成可能です。）
  - 遷移先の画面でフォームに文字を入力して頂くとユーザーを検索できます。あらかじめ任意の英文字列のユーザーを作成してあります。
  - Topページに戻り、『トークルームへ』をクリックして遷移して下さい。
  
![Talk](https://i.gyazo.com/f0e4306ce3a6bb3c6f5e3d95f69b13c2.jpg)

  - 画面下のフォームからメッセージ、画像を投稿できます。上部のフォームはメッセージの検索ボックスです。
  
# 課題

  - 動画投稿を実装する。(トークルームのモデル名がmovieになっているのはそのためです)
  - 任意の動画に紐付くトークルームにする。
  - 友達申請機能を実装する。（現状、ユーザー名を検索されてしまうと、強制的にトークルームに参加させられてしまうため。
  
# 開発環境

  ### 使用言語
    Ruby, Ruby on Rails, RSpec, Haml, Sass, jQuery
    
  ### インフラ
    AWS(EC2), Capistrano
    
  ### Webサーバ(本番環境)
    nginx
    
  ### アプリケーションサーバ(本番環境)
    unicorn
   
  ### ソース管理
    GitHub
    
  ### エディタ
    VScode
    
  ### データベース
    mysql

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
