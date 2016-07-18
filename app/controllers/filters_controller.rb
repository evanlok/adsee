class FiltersController < ApplicationController
  def index
    @filters = Filter.all
  end
end
