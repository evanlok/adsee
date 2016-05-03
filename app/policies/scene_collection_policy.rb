class SceneCollectionPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      scope.where(user: user)
    end
  end

  def create?
    user.id == record.user_id
  end

  alias update? create?
  alias destroy? create?
  alias show? create?
  alias summary_info? create?
end
