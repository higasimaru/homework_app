class TweetsController < ApplicationController
  before_action :set_movie
  def index
    @tweet = Tweet.new
    @tweets = @movie.tweets.includes(:user)
  end

  def create
    @tweet = @movie.tweets.new(tweet_params)
    if @tweet.save
      redirect_to movie_tweets_path(@movie), notice: 'コメントしました！'
    else
      @tweets = @movie.tweets.includes(:user)
      flash.now[:alert] = '送信できませんでした'
      render :index
    end
  end

  private

  def tweet_params
    params.require(:tweet).permit(:content, :image).merge(user_id: current_user.id)
  end

  def set_movie
    @movie = Movie.find(params[:movie_id]) 
  end
  
end
