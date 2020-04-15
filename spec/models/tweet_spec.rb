require 'rails_helper'

RSpec.describe Tweet, type: :model do
  describe '#create' do
    context 'tweetを保存できる場合' do
      it 'contentsがあれば保存できること' do          
        expect(build(:tweet, image: nil)).to be_valid
      end
      it 'imageがあれば保存できること' do        
        expect(build(:tweet, content: nil)).to be_valid
      end
      it 'contentsとimageがあれば保存できること' do
        tweet = build(:tweet)
        expect(tweet).to be_valid
      end
    context 'tweetを保存できない場合' do
        it 'contentsもimageもないと保存できないこと' do
          tweet = build(:tweet, content: '', image: '')
          tweet.valid?
          expect(tweet.errors[:content]).to include("を入力してください")
        end
        it 'movie_idが無いと保存できないこと' do
          tweet = build(:tweet, movie_id: nil)
          tweet.valid?
          expect(tweet.errors[:movie]).to include('を入力してください')
        end
        it 'user_idが無いと保存できないこと' do
          tweet = build(:tweet, user_id: '')
          tweet.valid?
          expect(tweet.errors[:user]).to include('を入力してください')
        end
      end
    end
  end
end