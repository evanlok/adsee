class VideoClipPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      scope.where(user: user)
    end
  end

  def create?
    user.id == record.user_id
  end

  alias destroy? create?
end
