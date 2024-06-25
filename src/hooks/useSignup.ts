import { yupResolver } from '@hookform/resolvers/yup';
import { UseFormProps, useForm } from 'react-hook-form';
import * as yup from 'yup';

// next-init에 추가?
import { helperText, regex } from '@/constants/index';

export type SignupFormDataType = {
  // required
  email: string;
  password: string;
  passwordConfirm: string;
  birthdate: string;
  nickname: string;
  username: string;

  // not required
};

export type SignupFormKeys = keyof SignupFormDataType;

export function signupFormSchema() {
  return yup.object().shape({
    /** @name 이메일 */
    email: yup.string().required().matches(regex['EMAIL'], helperText['EMAIL']),

    /** @name 비밀번호 */
    password: yup
      .string()
      .required()
      .matches(regex['PASSWORD'], helperText['PASSWORD']),

    /** @name 비밀번호_확인 */
    passwordConfirm: yup
      .string()
      .required()
      .oneOf([yup.ref('password'), helperText['PASSWORD_CONFIRM']]),

    /** @name 생년월일 */
    birthdate: yup
      .string()
      .required()
      .matches(regex['BIRTHDATE'], helperText['BIRTHDATE']),

    /** @name 닉네임 */
    nickname: yup
      .string()
      .required()
      .matches(regex['NICKNAME'], helperText['NICKNAME']),

    /** @name 이름 (username) */
    username: yup
      .string()
      .required()
      .matches(regex['USERNAME'], helperText['USERNAME']),
  });
}

export default function useSignupForm(
  options?: UseFormProps<SignupFormDataType>,
) {
  return useForm<SignupFormDataType>({
    resolver: yupResolver(signupFormSchema()),
    mode: 'onChange',
    ...options,
  });
}
