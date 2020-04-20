class UsersController < ApplicationController

  def index
    @users = User.search(params[:word], current_user.nickname)
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
