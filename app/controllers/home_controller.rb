class HomeController < ApplicationController
  include Concerns::ForceNonSSL

  force_non_ssl if: :disable_ssl?

  def index
  end

  def scene_editor
    # This action is a catch all for angular routing and injects server side values onto the page
    @songs = Song.order(:name)
    @fonts = Font.order(:name)
    @transitions = Transition.order(:name)
  end

  private

  def disable_ssl?
    request.path =~ /\/previews/
  end

  def ssl_configured?
    super && request.path !~ /\/previews/
  end
end
