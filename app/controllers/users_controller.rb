class UsersController < ApplicationController

  def index
   return nil if params[:key] == ''
   @users = User.where('nickname LIKE(?)', "%#{params[:key]}%").where.not(id: current_user.id)
    respond_to do |format|
      format.html
      format.json
    end
  end

  def edit
  end

  def update
    if current_user.update(user_params)
      redirect_to root_path
    else
      redirect_to action: :edit
    end
  end

  private

  def user_params
    params.require(:user).permit(:nickname, :email, :password)
  end

end
