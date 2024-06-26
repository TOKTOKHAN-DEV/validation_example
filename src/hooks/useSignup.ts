import { yupResolver } from '@hookform/resolvers/yup';
import { UseFormProps, useForm } from 'react-hook-form';
import * as yup from 'yup';

// next-init에 추가?
import { helperText, regex } from '@/constants/index';

export type SignupFormDataType = {
  // required
  email: string;
  id: string;
  password: string;
  passwordConfirm: string;
  birthdate: string;
  nickname: string;
  phone: string;

  // not required
  username: string;
};

export type SignupFormKeys = keyof SignupFormDataType;

export function signupFormSchema() {
  return yup.object().shape({
    /** @name 이메일 */
    email: yup
      .string()
      .required(helperText['REQUIRED_INPUT'])
      .matches(regex['EMAIL'], helperText['EMAIL']),

    /** @name 아이디 */
    id: yup
      .string()
      .required(helperText['REQUIRED_INPUT'])
      .test(
        helperText['ID'].SPECIAL_CHARACTER,
        helperText['ID'].SPECIAL_CHARACTER,
        (value) => !regex['SPECIAL_CHARACTER'].test(value || ''),
      )
      .matches(regex['ID'], helperText['ID'].COMMON),

    /** @name 비밀번호 */
    password: yup
      .string()
      .required(helperText['REQUIRED_INPUT'])
      .matches(regex['PASSWORD'], helperText['PASSWORD']),

    /** @name 비밀번호_확인 */
    passwordConfirm: yup
      .string()
      .required(helperText['REQUIRED_INPUT'])
      .oneOf([yup.ref('password')], helperText['PASSWORD_CONFIRM']),

    /** @name 생년월일 */
    birthdate: yup
      .string()
      .required(helperText['REQUIRED_INPUT'])
      .matches(regex['BIRTHDATE'].FORMAT, helperText['BIRTHDATE'].COMMON)
      .matches(
        regex['BIRTHDATE'].DETAIL_FORMAT,
        helperText['BIRTHDATE'].DETAIL_FORMAT,
      ),

    /** @name 휴대폰 */
    phone: yup
      .string()
      .required(helperText['REQUIRED_INPUT'])
      .matches(regex['PHONE'], helperText['PHONE']),

    /** @name 닉네임 */
    nickname: yup
      .string()
      .notRequired()
      .min(2, helperText['NICKNAME'].MIN)
      .nullable()
      .transform((value) => (!!value ? value : null))
      .max(10, helperText['NICKNAME'].MAX)
      .test(
        helperText['NICKNAME'].SPECIAL_CHARACTER,
        helperText['NICKNAME'].SPECIAL_CHARACTER,
        (value) => !regex['SPECIAL_CHARACTER'].test(value || ''),
      )
      .matches(regex['NICKNAME'], helperText['NICKNAME'].COMMON),

    /** @name 이름 (username) */
    username: yup
      .string()
      .required(helperText['REQUIRED_INPUT'])
      .min(2, helperText['USERNAME'].MIN)
      .max(20, helperText['USERNAME'].MAX)
      .test(
        helperText['USERNAME'].SPECIAL_CHARACTER,
        helperText['USERNAME'].SPECIAL_CHARACTER,
        (value) => !regex['SPECIAL_CHARACTER'].test(value || ''),
      )
      .matches(regex['USERNAME'], helperText['USERNAME'].COMMON),
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
