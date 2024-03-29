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

ActiveRecord::Schema.define(version: 20160829194456) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "ad_types", force: :cascade do |t|
    t.string   "name"
    t.text     "image"
    t.integer  "industry_id"
    t.string   "category"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.text     "description"
  end

  add_index "ad_types", ["industry_id"], name: "index_ad_types_on_industry_id", using: :btree

  create_table "facebook_ads", force: :cascade do |t|
    t.integer  "scene_collection_id"
    t.string   "ad_account_id"
    t.string   "page_id"
    t.string   "facebook_ad_id"
    t.string   "campaign_name"
    t.string   "ad_set_name"
    t.string   "optimization_goal"
    t.string   "billing_event"
    t.string   "budget_type"
    t.decimal  "budget"
    t.decimal  "bid_amount"
    t.datetime "start_time"
    t.datetime "end_time"
    t.string   "pacing_type"
    t.jsonb    "adset_schedule"
    t.jsonb    "targeting"
    t.datetime "created_at",                                  null: false
    t.datetime "updated_at",                                  null: false
    t.integer  "status",                      default: 0
    t.string   "title"
    t.text     "description"
    t.text     "image_url"
    t.string   "call_to_action_type"
    t.string   "call_to_action_link"
    t.string   "call_to_action_link_caption"
    t.boolean  "advanced",                    default: false
  end

  create_table "facebook_targeting_specs", force: :cascade do |t|
    t.string   "name"
    t.jsonb    "data"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.string   "thumbnail"
    t.text     "description"
  end

  create_table "filters", force: :cascade do |t|
    t.string   "name"
    t.string   "value"
    t.text     "image"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "fonts", force: :cascade do |t|
    t.string   "name"
    t.text     "url"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.text     "image"
  end

  create_table "icons", force: :cascade do |t|
    t.string   "name"
    t.string   "unicode"
    t.string   "category"
    t.string   "vendor"
    t.integer  "position"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "icons", ["name"], name: "index_icons_on_name", using: :btree

  create_table "images", force: :cascade do |t|
    t.string   "filename"
    t.text     "original_path"
    t.text     "path"
    t.text     "thumbnail_path"
    t.integer  "file_size"
    t.text     "filestack_url"
    t.integer  "user_id"
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
    t.string   "title"
  end

  add_index "images", ["user_id"], name: "index_images_on_user_id", using: :btree

  create_table "industries", force: :cascade do |t|
    t.string   "name"
    t.text     "image"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.text     "description"
  end

  create_table "profile_reports", force: :cascade do |t|
    t.integer  "name",               default: 0
    t.text     "description"
    t.integer  "user_id"
    t.integer  "status",             default: 0
    t.integer  "total",              default: 0
    t.integer  "matched",            default: 0
    t.integer  "male",               default: 0
    t.integer  "female",             default: 0
    t.integer  "age",                default: 0
    t.integer  "gender",             default: 0
    t.integer  "photo",              default: 0
    t.integer  "linkedin",           default: 0
    t.integer  "facebook",           default: 0
    t.integer  "twitter",            default: 0
    t.integer  "pinterest",          default: 0
    t.integer  "location",           default: 0
    t.integer  "company",            default: 0
    t.integer  "interests",          default: 0
    t.jsonb    "ages",               default: {}
    t.jsonb    "age_ranges",         default: {}
    t.jsonb    "states",             default: {}
    t.jsonb    "countries",          default: {}
    t.datetime "created_at",                      null: false
    t.datetime "updated_at",                      null: false
    t.text     "file_path"
    t.string   "custom_audience_id"
  end

  create_table "profiles", force: :cascade do |t|
    t.string   "email"
    t.jsonb    "data"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "profiles", ["email"], name: "index_profiles_on_email", unique: true, using: :btree

  create_table "scene_attributes", force: :cascade do |t|
    t.integer  "scene_content_id"
    t.string   "type"
    t.string   "name"
    t.text     "value"
    t.datetime "created_at",       null: false
    t.datetime "updated_at",       null: false
    t.string   "attachment_type"
    t.integer  "attachment_id"
    t.jsonb    "config"
  end

  add_index "scene_attributes", ["scene_content_id"], name: "index_scene_attributes_on_scene_content_id", using: :btree

  create_table "scene_categories", force: :cascade do |t|
    t.string   "name"
    t.text     "description"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  create_table "scene_collection_facebook_targeting_specs", force: :cascade do |t|
    t.integer  "scene_collection_id"
    t.integer  "facebook_targeting_spec_id"
    t.datetime "created_at",                 null: false
    t.datetime "updated_at",                 null: false
  end

  add_index "scene_collection_facebook_targeting_specs", ["scene_collection_id", "facebook_targeting_spec_id"], name: "index_scene_collection_targeting", unique: true, using: :btree

  create_table "scene_collections", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "ad_type_id"
    t.string   "color"
    t.integer  "font_id"
    t.integer  "song_id"
    t.datetime "created_at",                   null: false
    t.datetime "updated_at",                   null: false
    t.string   "hal_id"
    t.text     "zip_codes",                                 array: true
    t.integer  "status",           default: 0
    t.string   "aspect_ratio"
    t.text     "audio"
    t.string   "integration"
    t.jsonb    "integration_data"
    t.string   "name"
    t.integer  "theme_variant_id"
  end

  add_index "scene_collections", ["ad_type_id"], name: "index_scene_collections_on_ad_type_id", using: :btree
  add_index "scene_collections", ["hal_id"], name: "index_scene_collections_on_hal_id", using: :btree
  add_index "scene_collections", ["theme_variant_id"], name: "index_scene_collections_on_theme_variant_id", using: :btree
  add_index "scene_collections", ["user_id"], name: "index_scene_collections_on_user_id", using: :btree

  create_table "scene_contents", force: :cascade do |t|
    t.integer  "scene_id",                          null: false
    t.integer  "scene_collection_id",               null: false
    t.integer  "position"
    t.float    "transition_duration", default: 0.0
    t.datetime "created_at",                        null: false
    t.datetime "updated_at",                        null: false
    t.integer  "transition_id"
  end

  add_index "scene_contents", ["scene_collection_id", "scene_id"], name: "index_scene_contents_on_scene_collection_id_and_scene_id", using: :btree

  create_table "scenes", force: :cascade do |t|
    t.string   "name"
    t.json     "data_attributes"
    t.string   "hal_id"
    t.datetime "created_at",        null: false
    t.datetime "updated_at",        null: false
    t.text     "thumbnail"
    t.text     "preview_video"
    t.integer  "scene_category_id"
    t.text     "guide_video"
    t.integer  "width"
    t.integer  "height"
    t.integer  "duration"
  end

  add_index "scenes", ["hal_id"], name: "index_scenes_on_hal_id", using: :btree
  add_index "scenes", ["height"], name: "index_scenes_on_height", using: :btree

  create_table "song_categories", force: :cascade do |t|
    t.string   "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "songs", force: :cascade do |t|
    t.string   "name"
    t.text     "url"
    t.datetime "created_at",       null: false
    t.datetime "updated_at",       null: false
    t.integer  "song_category_id"
  end

  add_index "songs", ["song_category_id"], name: "index_songs_on_song_category_id", using: :btree

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

  create_table "theme_recommendation_groups", force: :cascade do |t|
    t.integer  "ad_type_id"
    t.integer  "facebook_targeting_spec_id"
    t.string   "title"
    t.text     "description"
    t.datetime "created_at",                 null: false
    t.datetime "updated_at",                 null: false
  end

  add_index "theme_recommendation_groups", ["ad_type_id", "facebook_targeting_spec_id"], name: "index_ad_type_and_targeting_spec", unique: true, using: :btree

  create_table "theme_recommendations", force: :cascade do |t|
    t.integer  "theme_id"
    t.datetime "created_at",                    null: false
    t.datetime "updated_at",                    null: false
    t.integer  "theme_recommendation_group_id"
  end

  add_index "theme_recommendations", ["theme_recommendation_group_id", "theme_id"], name: "index_group_and_theme", unique: true, using: :btree

  create_table "theme_variant_scenes", force: :cascade do |t|
    t.integer  "theme_variant_id", null: false
    t.integer  "scene_id",         null: false
    t.integer  "position"
    t.datetime "created_at",       null: false
    t.datetime "updated_at",       null: false
    t.integer  "transition_id"
  end

  add_index "theme_variant_scenes", ["theme_variant_id", "scene_id"], name: "index_theme_variant_scenes_on_theme_variant_id_and_scene_id", using: :btree

  create_table "theme_variants", force: :cascade do |t|
    t.integer  "theme_id"
    t.integer  "video_type_id"
    t.integer  "duration",      default: 0
    t.datetime "created_at",                null: false
    t.datetime "updated_at",                null: false
    t.string   "name"
    t.integer  "photo_count",   default: 0
    t.integer  "video_count",   default: 0
    t.text     "thumbnail"
    t.text     "sample_video"
    t.text     "poster_image"
    t.string   "aspect_ratio"
    t.integer  "position"
  end

  add_index "theme_variants", ["theme_id", "video_type_id"], name: "index_theme_variants_on_theme_id_and_video_type_id", unique: true, using: :btree

  create_table "themes", force: :cascade do |t|
    t.string   "name"
    t.text     "description"
    t.integer  "song_id"
    t.text     "sample_video"
    t.text     "poster_image"
    t.text     "thumbnail"
    t.datetime "created_at",                   null: false
    t.datetime "updated_at",                   null: false
    t.integer  "ad_type_id"
    t.integer  "font_id"
    t.string   "color"
    t.boolean  "featured",     default: false
  end

  add_index "themes", ["ad_type_id"], name: "index_themes_on_ad_type_id", using: :btree
  add_index "themes", ["featured"], name: "index_themes_on_featured", using: :btree
  add_index "themes", ["font_id"], name: "index_themes_on_font_id", using: :btree
  add_index "themes", ["song_id"], name: "index_themes_on_song_id", using: :btree

  create_table "transitions", force: :cascade do |t|
    t.string   "name"
    t.string   "value"
    t.text     "description"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.text     "image"
  end

  create_table "users", force: :cascade do |t|
    t.string   "email",                     default: "",    null: false
    t.string   "encrypted_password",        default: "",    null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",             default: 0,     null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet     "current_sign_in_ip"
    t.inet     "last_sign_in_ip"
    t.string   "first_name"
    t.string   "last_name"
    t.boolean  "admin",                     default: false
    t.datetime "created_at",                                null: false
    t.datetime "updated_at",                                null: false
    t.string   "facebook_oauth_token"
    t.datetime "facebook_oauth_expires_at"
    t.string   "provider"
    t.string   "uid"
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree
  add_index "users", ["uid", "provider"], name: "index_users_on_uid_and_provider", using: :btree

  create_table "video_clips", force: :cascade do |t|
    t.string   "filename"
    t.text     "original_path"
    t.text     "filestack_url"
    t.text     "thumbnail_url"
    t.integer  "file_size"
    t.integer  "user_id"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
    t.text     "path"
    t.integer  "duration"
    t.string   "title"
  end

  add_index "video_clips", ["user_id"], name: "index_video_clips_on_user_id", using: :btree

  create_table "video_jobs", force: :cascade do |t|
    t.integer  "scene_collection_id"
    t.datetime "created_at",                          null: false
    t.datetime "updated_at",                          null: false
    t.text     "stream_url"
    t.boolean  "preview",             default: false
  end

  add_index "video_jobs", ["scene_collection_id"], name: "index_video_jobs_on_scene_collection_id", using: :btree

  create_table "video_types", force: :cascade do |t|
    t.string   "name"
    t.text     "description"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  create_table "videos", force: :cascade do |t|
    t.integer  "scene_collection_id"
    t.text     "url"
    t.integer  "duration"
    t.text     "thumbnail_url"
    t.datetime "created_at",          null: false
    t.datetime "updated_at",          null: false
    t.integer  "width"
    t.integer  "height"
  end

  add_index "videos", ["scene_collection_id"], name: "index_videos_on_scene_collection_id", using: :btree

end
