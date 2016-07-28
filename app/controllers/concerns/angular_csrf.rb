module AngularCSRF
  extend ActiveSupport::Concern

  included do
    after_action :set_csrf_cookie_for_ng
  end

  def verified_request?
    super || valid_authenticity_token?(session, request.headers['X-XSRF-TOKEN'])
  end

  def set_csrf_cookie_for_ng
    cookies['XSRF-TOKEN'] = form_authenticity_token if protect_against_forgery?
  end
end
