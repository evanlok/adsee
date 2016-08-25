class ProfileReportPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      scope.where(user: user)
    end
  end

  def show?
    user.id == record.user_id
  end

  alias create? show?
  alias update? show?
  alias destroy? show?
end
