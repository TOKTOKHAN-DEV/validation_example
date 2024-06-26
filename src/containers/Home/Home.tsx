'use client';

import { useState } from 'react';

import { Controller, FormProvider, useWatch } from 'react-hook-form';

import {
  Box,
  BoxProps,
  Button,
  ChakraProps,
  Flex,
  FlexProps,
  Input,
  InputGroup,
  InputProps,
  InputRightElement,
  Text,
  TextProps,
} from '@chakra-ui/react';

import FormHelper from '@/components/FormHelper';
import useSignupForm, { SignupFormDataType } from '@/hooks/useSignup';

import { regex } from '@/constants/regex';
import { VisibleIcon } from '@/icons';
import { formatBirthdate } from '@/utils/format/format-birthdate';
import { formatPhoneNumberKR } from '@/utils/format/format-phone-number-kr';

interface FormHelper extends ChakraProps {
  wrapperProps: FlexProps;
  labelProps: BoxProps;
  labelTextProps: TextProps;
  helperTextProps: TextProps;
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
    color: '#718096',
    textStyle: 'pre-heading-06',
  },
  helperTextProps: {
    color: '#718096',
  },
};

export const FORM_INPUT_STYLE: InputProps = {
  height: '48px',
  px: '16px',
  py: '8px',
  fontSize: '16px',
  border: '1px solid',
  borderColor: '#E2E8F0',
  borderRadius: '4px',
  _focusVisible: {
    borderColor: '#3182CE',
    boxShadow: '0 0 0 1px #3182CE',
  },
  _placeholder: {
    color: 'text.tertiary',
  },
};

const EMAIL_LIST = [
  'gmail.com',
  'naver.com',
  'hanmail.net',
  'nate.com',
  'daum.net',
];

function Home() {
  const method = useSignupForm();
  const [info, setInfo] = useState<SignupFormDataType>();
  const {
    control,
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = method;

  const [isVisible, setIsVisible] = useState(false);

  const [isVisibleEmailList, setIsVisibleEmailList] = useState(false);

  const email = useWatch({ control, name: 'email' }) || '';

  const [local, domain] = email?.split('@');

  const { onBlur, ...restOfEmail } = register('email');

  const onSubmit = handleSubmit(
    (v) => {
      console.log(v);
      setInfo(v);

      alert('회원가입 성공');
    },
    (err) => {},
  );

  return (
    <FormProvider {...method}>
      <Box w="100%" as="form" py="80px" onSubmit={onSubmit}>
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
              <Text as="h1" fontSize="40px" fontWeight="700">
                회원가입
              </Text>
              <Text fontSize="24px" fontWeight="700" color="#718096">
                텍스트 필드 유효성 검사 작동예시
              </Text>
            </Flex>
            <Flex w="100%" columnGap="40px">
              <Flex w="100%" direction="column" rowGap="40px">
                <FormHelper
                  isRequired
                  label="이름"
                  {...FORM_HELPER_STYLE}
                  errorText={errors.username?.message}
                >
                  <Input
                    {...FORM_INPUT_STYLE}
                    placeholder="이름을 입력해 주세요"
                    {...register('username')}
                  />
                </FormHelper>
                <FormHelper
                  isRequired
                  label="생년월일"
                  {...FORM_HELPER_STYLE}
                  errorText={errors.birthdate?.message}
                >
                  <Controller
                    name="birthdate"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <Input
                        {...FORM_INPUT_STYLE}
                        placeholder="1991-01-01"
                        {...register('birthdate')}
                        value={value || ''}
                        onChange={(e) => {
                          onChange(formatBirthdate(e.target.value));
                        }}
                      />
                    )}
                  />
                </FormHelper>
                <FormHelper
                  isRequired
                  label="이메일"
                  {...FORM_HELPER_STYLE}
                  errorText={errors.email?.message}
                >
                  <Box w="100%" position="relative">
                    <Input
                      autoComplete="off"
                      {...FORM_INPUT_STYLE}
                      placeholder="이메일을 입력해 주세요"
                      {...restOfEmail}
                    />
                    {!email.match(regex.EMAIL) && email?.includes('@') && (
                      <Flex
                        position="absolute"
                        top="49px"
                        zIndex={10}
                        direction="column"
                        w="100%"
                        maxH="144px"
                        overflow="auto"
                        bg="white"
                        border="1px"
                        borderColor="#E2E8F0"
                        rounded="6px"
                      >
                        {EMAIL_LIST.filter((el) => el.includes(domain)).map(
                          (item) => (
                            <Flex
                              as="button"
                              type="button"
                              key={item}
                              px="16px"
                              py="13px"
                              _hover={{
                                bg: 'rgba(112, 115, 124, 0.08)',
                              }}
                              onClick={() => {
                                setValue('email', `${local}@${item}`, {
                                  shouldValidate: true,
                                });
                              }}
                            >
                              <Text>
                                {local}@{item}
                              </Text>
                            </Flex>
                          ),
                        )}
                      </Flex>
                    )}
                  </Box>
                </FormHelper>
                <FormHelper
                  isRequired
                  label="아이디"
                  {...FORM_HELPER_STYLE}
                  errorText={errors.id?.message}
                >
                  <Input
                    {...FORM_INPUT_STYLE}
                    placeholder="아이디를 입력해 주세요"
                    {...register('id')}
                  />
                </FormHelper>
                <FormHelper
                  isRequired
                  label="비밀번호"
                  {...FORM_HELPER_STYLE}
                  errorText={errors.password?.message}
                >
                  <InputGroup>
                    <Input
                      type={isVisible ? 'text' : 'password'}
                      {...FORM_INPUT_STYLE}
                      placeholder="비밀번호를 입력해 주세요"
                      {...register('password')}
                    />
                    <InputRightElement
                      as="button"
                      type="button"
                      tabIndex={-1}
                      top="50%"
                      transform="translateY(-50%)"
                      onClick={() => {
                        setIsVisible((props) => !props);
                      }}
                      sx={{
                        '&>svg>path': {
                          fill: isVisible ? '#333' : '#A0AEC0',
                        },
                      }}
                    >
                      <VisibleIcon />
                    </InputRightElement>
                  </InputGroup>
                </FormHelper>
                <FormHelper
                  isRequired
                  label="비밀번호 재입력"
                  {...FORM_HELPER_STYLE}
                  errorText={errors.passwordConfirm?.message}
                  helperText="8~20자로 영문, 숫자, 특수문자를 각 1자 이상 포함해 주세요"
                >
                  <Input
                    type="password"
                    {...FORM_INPUT_STYLE}
                    placeholder="비밀번호를 한 번 더 입력해 주세요"
                    {...register('passwordConfirm')}
                  />
                </FormHelper>
                <FormHelper
                  isRequired
                  label="휴대폰 번호"
                  {...FORM_HELPER_STYLE}
                  errorText={errors.phone?.message}
                >
                  <Controller
                    name="phone"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <Input
                        {...FORM_INPUT_STYLE}
                        placeholder="휴대폰 번호를 입력해 주세요"
                        {...register('phone')}
                        value={value || ''}
                        onChange={(e) => {
                          onChange(formatPhoneNumberKR(e.target.value));
                        }}
                      />
                    )}
                  />
                </FormHelper>
                <FormHelper
                  label="닉네임"
                  {...FORM_HELPER_STYLE}
                  errorText={errors.nickname?.message}
                  helperText="2~10자로 입력해 주세요"
                >
                  <Input
                    {...FORM_INPUT_STYLE}
                    placeholder="닉네임을 입력해 주세요"
                    {...register('nickname')}
                  />
                </FormHelper>
              </Flex>
              {info && (
                <Flex direction="column" rowGap="20px">
                  {Object.entries(info).map(([key, value]) => (
                    <Flex key={key} alignItems="center" columnGap="8px">
                      <Text>{key}: </Text>
                      <Text>{value}</Text>
                    </Flex>
                  ))}
                </Flex>
              )}
            </Flex>
            <Button type="submit" w="100%" h="48px" bg="#3182CE">
              회원가입 하기
            </Button>
          </Flex>
        </Flex>
      </Box>
    </FormProvider>
  );
}
export default Home;
