export type Cat = {
  sort_num: string
  cat_name_ja: string
  cat_name_en: string
  text_ja: string
  text_en: string
}

export type Tag = {
  tag_name_ja: string
  tag_name_ja_hira: string
  tag_name_en: string
}

export type Model = {
  model_name_ja: string
  model_name_ja_hira: string
  model_name_en: string
}

export type User = {
  id: string
  user_code: string
  lang: string
  user_name: string
  email: string
  password: string
  created_at: string
  last_modified_at: string
  suspended: boolean
}

export type Review = {
  ref_user_id: string
  product_id: string
  review_text: string
  rating: string
}

export type Video = {
  id: string
  product_number: string
  published: boolean
  created_at: string
  last_modified_at: string
  title_ja: string
  title_en: string
  cover_url: string
  img_url: string[]
  txt_ja: string
  txt_en: string
  duration: Duration
  price: string
  vid_url_240p: string
  vid_url_480p: string
  vid_url_720p: string
  sample_url_240p: string
  sample_url_480p: string
  sample_url_720p: string
}

export type Duration = {
  minutes: string
  seconds: string
}

export type dbSays = {
  dbSays: string
}
