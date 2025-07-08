// 방법 1: interface 사용 (추천)
export interface sign_up_input_type {
  name: string;
  email: string;
  password: string;
  nickname: string;
  img?: File;
}

export interface sign_up_form_type extends sign_up_input_type {
  service_terms: boolean;
  privacy_terms: boolean;
  marketing_terms?: boolean;
  password_check: string;
}
