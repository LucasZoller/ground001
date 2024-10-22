export type TestFastify = {
  message: string
}

export type Svg = {
  size?: number
  fill?: string
}

//AithState
export type AuthState = {
  at: string
}

// GlobalState
export type SignInIconState = {
  greeting: string
}

export type LanguageState = {
  selectedLanguage: string
  showLanguageWindow: boolean
}

export type ModalState = {
  showModal: boolean
  modalCode: ModalCode
}
export type ModalCode =
  | "MODAL_USER_SIGNIN"
  | "MODAL_USER_REGISTRATION"
  | "MODAL_FORGOT_PASSWORD"
  | "MODAL_EMAIL_ALREADY_EXISTS"
  | "MODAL_ACCOUNT_CREATION_SUCCESSFUL"
  | "MODAL_CLOSE"

export type SessionState = {
  atExp: string
  needVisibleTaskToGetRt: boolean // Set in the useAuthUser. True if AT was invalid or absent.
  isValidRtFound: boolean // Set in the header. True if site-session(RTExp) was found in the cookie.
}

export type Mobile = {
  showMenu: boolean
}

export type GlobalState = {
  signInIconState: SignInIconState
  languageState: LanguageState
  modalState: ModalState
  sessionState: SessionState
  mobile: Mobile
}

//UserState
export type UserState = {
  status?: string
  message?: string
  user_code?: string
  lang?: string
  user_name?: string
  email?: string
  created_at?: string
  last_modified_at?: string
  hashed_rt?: string
  at?: string
  atExp?: string
}

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

export type DatabaseResponse = {
  dbSays: string
  at?: string
  atExp?: string
  rt?: string
}

export type TokenManagement = {
  manage: string
  at: string
}

export type UserRegistrationPayload = {
  email: string
  password: string
  language: string
}

export type UserSignInPayload = {
  email: string
  password: string
}

export type LoaderReturn = {
  code?: string
  data?: UserState
}
