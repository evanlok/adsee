class SceneCollectionPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      scope.where(user: user)
    end
  end

  def create?
    user == record.user
  end

  alias update? create?
  alias destroy? create?
  alias show? create?
end
