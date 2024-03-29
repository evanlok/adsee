class ApplicationController < ActionController::Base
  include Pundit
  include AngularCSRF

  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  layout 'application'

  rescue_from Pundit::NotAuthorizedError, with: :user_not_authorized

  private

  def user_not_authorized
    error = 'You are not authorized to perform this action.'

    respond_to do |format|
      format.html do
        flash[:alert] = error
        redirect_to(request.referer || root_path)
      end

      format.json do
        render json: { errorss: [error] }, status: :forbidden
      end
    end
  end

  def render_errors(errors)
    render json: { errors: errors }, status: :unprocessable_entity
  end

  def render_json_model_errors(record)
    render_errors(record.errors.full_messages)
  end

  def render_json_record_not_found(exception)
    render json: { errors: [exception.message] }, status: :not_found
  end

  def append_info_to_payload(payload)
    super
    payload[:user_id] = current_user&.id
  end
end
