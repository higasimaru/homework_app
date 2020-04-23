class Tweets::SearchesController < ApplicationController
  def index
    movie = Movie.find(params[:movie_id])
    @tweets = movie.tweets.includes(:user)
  end

  def new
    movie = Movie.find(params[:movie_id])
    @tweets = movie.tweets.includes(:user).search(params[:input])
  end

end
