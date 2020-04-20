class Api::TweetsController < ApplicationController
  def index
    movie = Movie.find(params[:movie_id])
    recent_tweet = params[:id].to_i
    @tweets = movie.tweets.includes(:user).where('id > ?', recent_tweet) 
  end
end

