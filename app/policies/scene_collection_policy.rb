class SceneCollectionPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      scope
    end
  end

  def create?
    user == record.user
  end

  alias update? create?
end
