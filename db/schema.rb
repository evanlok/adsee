# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160316042115) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "ad_types", force: :cascade do |t|
    t.string   "name"
    t.text     "image"
    t.integer  "industry_id"
    t.string   "category"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  add_index "ad_types", ["industry_id"], name: "index_ad_types_on_industry_id", using: :btree

  create_table "industries", force: :cascade do |t|
    t.string   "name"
    t.text     "image"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "scene_attributes", force: :cascade do |t|
    t.integer  "scene_content_id"
    t.string   "type"
    t.string   "name"
    t.text     "value"
    t.datetime "created_at",       null: false
    t.datetime "updated_at",       null: false
  end

  add_index "scene_attributes", ["scene_content_id"], name: "index_scene_attributes_on_scene_content_id", using: :btree

  create_table "scene_collections", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "ad_type_id"
    t.integer  "theme_id"
    t.string   "color"
    t.integer  "font_id"
    t.integer  "song_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "scene_collections", ["ad_type_id"], name: "index_scene_collections_on_ad_type_id", using: :btree
  add_index "scene_collections", ["theme_id"], name: "index_scene_collections_on_theme_id", using: :btree
  add_index "scene_collections", ["user_id"], name: "index_scene_collections_on_user_id", using: :btree

  create_table "scene_contents", force: :cascade do |t|
    t.integer  "scene_id",                          null: false
    t.integer  "scene_collection_id",               null: false
    t.integer  "position"
    t.string   "transition"
    t.float    "transition_duration", default: 0.0
    t.datetime "created_at",                        null: false
    t.datetime "updated_at",                        null: false
  end

  add_index "scene_contents", ["scene_collection_id", "scene_id"], name: "index_scene_contents_on_scene_collection_id_and_scene_id", using: :btree

  create_table "scenes", force: :cascade do |t|
    t.string   "name"
    t.json     "data_attributes"
    t.string   "hal_id"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
    t.text     "thumbnail"
    t.text     "preview_video"
  end

  add_index "scenes", ["hal_id"], name: "index_scenes_on_hal_id", using: :btree

  create_table "songs", force: :cascade do |t|
    t.string   "name"
    t.text     "url"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "taggings", force: :cascade do |t|
    t.integer  "tag_id"
    t.integer  "taggable_id"
    t.string   "taggable_type"
    t.integer  "tagger_id"
    t.string   "tagger_type"
    t.string   "context",       limit: 128
    t.datetime "created_at"
  end

  add_index "taggings", ["tag_id", "taggable_id", "taggable_type", "context", "tagger_id", "tagger_type"], name: "taggings_idx", unique: true, using: :btree
  add_index "taggings", ["taggable_id", "taggable_type", "context"], name: "index_taggings_on_taggable_id_and_taggable_type_and_context", using: :btree

  create_table "tags", force: :cascade do |t|
    t.string  "name"
    t.integer "taggings_count", default: 0
  end

  add_index "tags", ["name"], name: "index_tags_on_name", unique: true, using: :btree

  create_table "theme_variant_scenes", force: :cascade do |t|
    t.integer  "theme_variant_id", null: false
    t.integer  "scene_id",         null: false
    t.integer  "position"
    t.datetime "created_at",       null: false
    t.datetime "updated_at",       null: false
  end

  add_index "theme_variant_scenes", ["theme_variant_id", "scene_id"], name: "index_theme_variant_scenes_on_theme_variant_id_and_scene_id", using: :btree

  create_table "theme_variants", force: :cascade do |t|
    t.integer  "theme_id"
    t.integer  "video_type_id"
    t.integer  "duration",      default: 0
    t.datetime "created_at",                null: false
    t.datetime "updated_at",                null: false
  end

  add_index "theme_variants", ["theme_id", "video_type_id"], name: "index_theme_variants_on_theme_id_and_video_type_id", unique: true, using: :btree

  create_table "themes", force: :cascade do |t|
    t.string   "name"
    t.text     "description"
    t.integer  "photo_count"
    t.integer  "song_id"
    t.text     "sample_video"
    t.text     "poster_image"
    t.text     "thumbnail"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
    t.integer  "ad_type_id"
  end

  add_index "themes", ["ad_type_id"], name: "index_themes_on_ad_type_id", using: :btree
  add_index "themes", ["song_id"], name: "index_themes_on_song_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "email",                  default: "",    null: false
    t.string   "encrypted_password",     default: "",    null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,     null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet     "current_sign_in_ip"
    t.inet     "last_sign_in_ip"
    t.string   "first_name"
    t.string   "last_name"
    t.boolean  "admin",                  default: false
    t.datetime "created_at",                             null: false
    t.datetime "updated_at",                             null: false
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree

  create_table "video_types", force: :cascade do |t|
    t.string   "name"
    t.text     "description"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  create_table "videos", force: :cascade do |t|
    t.integer  "scene_collection_id"
    t.text     "url"
    t.string   "resolution"
    t.integer  "duration"
    t.text     "thumbnail_url"
    t.datetime "created_at",          null: false
    t.datetime "updated_at",          null: false
  end

  add_index "videos", ["scene_collection_id"], name: "index_videos_on_scene_collection_id", using: :btree

end
