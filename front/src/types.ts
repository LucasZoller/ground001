export type TestFastify = {
  message: string
}

export type Svg = {
  size?: number
  fill?: string
}

//AuthState
export type AuthState = {
  at: string
}

// GlobalState

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
  userName?: string //Greeting message on the login icon.
  cart?: string[] //store cart items in string
  lang?: string //EN or JP

  needVisibleTask?: boolean // True to move on to the useVisibleTask from useTask.
  navigateToSignIn?: boolean //Navigate to singin if true.
  authTicket?: boolean // True if AT was verified. User can enter protected routes.
}

export type Mobile = {
  showMenu: boolean
}

export type GlobalState = {
  languageState: LanguageState
  modalState: ModalState
  sessionState: SessionState
  mobile: Mobile
}

//Backend returns this payload upon successful login
export type SuccessfulSignInPayload = {
  userName: string
  cartItems: string[]
  lang: string
  at: string
  atExpInSec: string // For cookie MaxAge
  rt: string
  rtExpInSec: string // For cookie MaxAge
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

export type TokenManagement = {
  manage: string
  at: string
}

export type UserRegistrationPayload = {
  email: string
  password: string
  lang: string
}

export type UserSignInPayload = {
  email: string
  password: string
}

export type LoaderReturn = {
  code?: string
  data?: UserState
}
