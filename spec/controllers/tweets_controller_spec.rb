require 'rails_helper'

describe TweetsController do
  let(:movie) { create(:movie) }
  let(:user) { create(:user)}

  describe 'GET #index' do

    context 'ログインしている場合' do
      before do
        login user
        get :index, params: { movie_id: movie.id }
      end
      
      it '@tweetに期待した値が入っていること' do        
        expect(assigns(:tweet)).to be_a_new(Tweet)
      end
      it '@movieに期待した値が入っていること' do
        expect(assigns(:movie)).to eq movie
      end
      it 'index.html.erbに遷移されること' do
        expect(response).to render_template :index
      end
    end
    context 'ログインしていない場合' do
      before do
        get :index, params: { movie_id: movie.id }
      end
      it 'ログイン画面に遷移されること' do
        expect(response).to redirect_to(new_user_session_path)
      end  
    end    
  end

  describe 'GET #create' do
    let(:params) { {movie_id: movie.id, user_id: user.id, tweet: attributes_for(:tweet)} }
    context 'ログインしている場合' do

      before do
        login user
      end

      context '保存に成功した場合' do
        subject{
          post :create,
          params: params
        }
        it 'tweetを保存すること' do
          expect{ subject }.to change(Tweet, :count).by(1)
        end
        it 'movie_tweets_pathにリダイレクトすること' do
          subject
          expect(response).to redirect_to(movie_tweets_path(movie))
        end
      end

      context '保存に失敗した場合' do
        let(:invalid_params) { {movie_id: movie.id, user_id: user.id, tweet: attributes_for(:tweet, content: nil, image: nil)} }
        subject {
          post :create,
          params: invalid_params
        }
        it 'tweetを保存しないこと' do
          expect{ subject }.not_to change(Tweet, :count)
        end
        it 'index.html.hamlに遷移すること' do
          subject
          expect(response).to render_template :index
        end
      end
    end

    context 'ログインしていない場合' do
      before do
        post :create, params: { movie_id: movie.id }
      end
      it 'ログイン画面に遷移されること' do
        expect(response).to redirect_to(new_user_session_path)
      end
    end
  end
end