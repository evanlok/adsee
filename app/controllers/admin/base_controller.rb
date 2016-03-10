class Admin::BaseController < ApplicationController
  before_action :authenticate_user!
  before_action :authorize_admin
  layout 'admin'

  private

  def authorize_admin
    return if current_user.admin?
    flash[:error] = 'You are not authorized to access this page'
    redirect_to root_url
  end
end
