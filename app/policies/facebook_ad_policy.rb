class FacebookAdPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      scope.joins(:scene_collection).where(scene_collections: { user_id: user })
    end
  end

  def create?
    user.id == record.scene_collection.user_id
  end

  alias show? create?
  alias update? create?
end
