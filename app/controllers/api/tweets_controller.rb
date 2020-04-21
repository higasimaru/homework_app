class Api::TweetsController < ApplicationController
  def index
    movie = Movie.find(params[:movie_id])
    recent_tweet = params[:id]
    @tweets = movie.tweets.includes(:user).where('id > ?', recent_tweet)
  end
end
