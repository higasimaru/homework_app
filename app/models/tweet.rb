class Tweet < ApplicationRecord
  belongs_to :user
  belongs_to :movie

  validates :content, presence: true, unless: :image?
end
