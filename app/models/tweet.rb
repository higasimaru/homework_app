class Tweet < ApplicationRecord
  belongs_to :user
  belongs_to :movie

  validates :content, presence: true, unless: :image?

  mount_uploader :image, ImageUploader

  def self.search(input)
    return nil if input == ''
    Tweet.where('content LIKE(?)', "%#{input}%")
  end
end
