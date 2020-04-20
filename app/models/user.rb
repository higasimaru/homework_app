class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
        
  validates :nickname, presence: true, uniqueness: true
  validate :password_complexity
  
  def password_complexity
    # Regexp extracted from https://stackoverflow.com/questions/19605150/regex-for-password-must-contain-at-least-eight-characters-at-least-one-number-a
    return if password.blank? || password =~ /\A[a-zA-Z0-9]+\z/

    errors.add :password, 'Complexity requirement not met. Length should be 8-70 characters and include: 1 uppercase, 1 lowercase, 1 digit and 1 special character'
  end

  has_many :movie_users
  has_many :movies, through: :movie_users
  has_many :tweets

  def self.search(input, name)
    return nil if input == ''
    User.where('nickname LIKE(?)', "%#{input}%").where.not(nickname: name).limit(100)
  end
end
