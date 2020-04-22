class MoviesController < ApplicationController
  def index
    @movies = Movie.all.includes(:users, :tweets)
  end
  def new
    @movie = Movie.new
    # @movie.users << current_user 
  end

  def create
    @movie = Movie.new(movie_params)
    if @movie.save
      redirect_to root_path, notice: '動画を決定しました'
    else
      render :new 
    end
  end

  def edit  
    @movie = Movie.find(params[:id])
  end

  def update  
    @movie = Movie.find(params[:id])
    if @movie.update(movie_params)
      redirect_to movie_tweets_path(@movie), notice: '動画を更新しました'
    else
      render :edit
    end
  end

  private

  def movie_params
    params.require(:movie).permit(:name, user_ids: [])
  end

end
