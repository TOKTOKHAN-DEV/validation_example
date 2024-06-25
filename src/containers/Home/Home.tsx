'use client';

import { FormProvider } from 'react-hook-form';

import {
  Box,
  BoxProps,
  ChakraProps,
  Flex,
  FlexProps,
  Input,
  InputProps,
  Text,
  TextProps,
} from '@chakra-ui/react';

import FormHelper from '@/components/FormHelper';
import useSignupForm from '@/hooks/useSignup';

interface FormHelper extends ChakraProps {
  wrapperProps: FlexProps;
  labelProps: BoxProps;
  labelTextProps: TextProps;
}

export const FORM_HELPER_STYLE: FormHelper = {
  w: '100%',
  maxW: '400px',
  wrapperProps: {
    direction: 'column',
    alignItems: 'flex-start',
    rowGap: '8px',
  },
  labelProps: {
    minW: '160px',
    alignItems: 'center',
  },
  labelTextProps: {
    color: 'text.secondary',
    textStyle: 'pre-heading-06',
  },
};

export const FORM_INPUT_STYLE: InputProps = {
  height: '22px',
  px: '16px',
  py: '8px',
  fontSize: '16px',
  border: '1px solid',
  borderColor: 'border.primary',
  borderRadius: '4px',
  _focusVisible: {
    borderColor: 'border.active',
    boxShadow: '0 0 0 1px var(--chakra-colors-border-active)',
  },
  _placeholder: {
    color: 'text.tertiary',
  },
};

function Home() {
  const method = useSignupForm();
  const {
    register,
    formState: { errors },
  } = method;

  return (
    <FormProvider {...method}>
      <Box w="100%" as="form" py="80px">
        <Flex w="100%" justifyContent="center">
          <Flex
            w="100%"
            rowGap="40px"
            maxW="400px"
            direction="column"
            alignItems="center"
            justifyContent="center"
          >
            <Flex direction="column" alignItems="center">
              <Text>회원가입</Text>
              <Text>텍스트 필드 유효성 검사 작동예시</Text>
            </Flex>
            <Flex w="100%" direction="column" rowGap="40px">
              <FormHelper
                isRequired
                label="이름"
                {...FORM_HELPER_STYLE}
                errorText={errors.username?.message}
              >
                <Input
                  {...FORM_INPUT_STYLE}
                  placeholder="이름을 입력해 주세요."
                  {...register('username')}
                />
              </FormHelper>
              <FormHelper
                isRequired
                label="생년월일"
                {...FORM_HELPER_STYLE}
                errorText={errors.birthdate?.message}
              >
                <Input
                  {...FORM_INPUT_STYLE}
                  placeholder="1991-01-01"
                  {...register('birthdate')}
                />
              </FormHelper>
              <FormHelper
                isRequired
                label="이메일"
                {...FORM_HELPER_STYLE}
                errorText={errors.email?.message}
              >
                <Input
                  {...FORM_INPUT_STYLE}
                  placeholder="이메일을 입력해 주세요"
                  {...register('email')}
                />
              </FormHelper>
              <FormHelper
                isRequired
                label="비밀번호"
                {...FORM_HELPER_STYLE}
                errorText={errors.password?.message}
              >
                <Input
                  {...FORM_INPUT_STYLE}
                  placeholder="비밀번호를 입력해 주세요"
                  {...register('password')}
                />
              </FormHelper>
              <FormHelper
                isRequired
                label="비밀번호 재입력"
                {...FORM_HELPER_STYLE}
                errorText={errors.passwordConfirm?.message}
              >
                <Input
                  {...FORM_INPUT_STYLE}
                  placeholder="비밀번호를 한 번 더 입력해 주세요"
                  {...register('passwordConfirm')}
                />
              </FormHelper>
              <FormHelper
                isRequired
                label="닉네임"
                {...FORM_HELPER_STYLE}
                errorText={errors.nickname?.message}
              >
                <Input
                  {...FORM_INPUT_STYLE}
                  placeholder="닉네임을 입력해 주세요"
                  {...register('nickname')}
                />
              </FormHelper>
            </Flex>
          </Flex>
        </Flex>
      </Box>
    </FormProvider>
  );
}
export default Home;
