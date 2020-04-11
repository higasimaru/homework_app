class Movie < ApplicationRecord
  has_many :movie_users
  has_many :users, through: :movie_users
  has_many :tweets

  validates :name, presence: true, uniqueness: true

  def  show_last_tweet
    if (last_tweet = tweets.last).present?
      if last_tweet.image?
        last_tweet.image
      else
        last_tweet.content
      end
    else
      'まだコメントがありません' 
    end
  end
end
