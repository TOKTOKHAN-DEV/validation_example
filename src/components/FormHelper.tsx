import { ReactNode } from 'react';

import {
  BoxProps,
  Flex,
  FlexProps,
  FormControl,
  FormControlProps,
  FormErrorMessage,
  FormErrorMessageProps,
  FormHelperText,
  Text,
  TextProps,
} from '@chakra-ui/react';

interface FormHelperProps extends FormControlProps {
  helperText?: ReactNode;
  errorText?: ReactNode;
  successText?: ReactNode;
  label?: string;
  children: ReactNode | ReactNode[];

  wrapperProps?: FlexProps;
  labelProps?: BoxProps;
  labelTextProps?: TextProps;
  successTextProps?: TextProps;
  helperTextProps?: TextProps;
  errorTextProps?: FormErrorMessageProps;
}

/**
 * Chakra 의 FormControl 을 Wrapping 하여 Label, Error Text, Success Text 등을 추가로 넘겨 줄수 있는 컴포넌트입니다.
 *
 * Chakra FormControl 은
 * Chakra 의 Form Element 를 children 으로 받아, isInvalid, isDisabled, isRequired 와 같은 상태를
 * 자식 Chakra Form Component 에게 Context 로 전달해줍니다.
 *
 * @see https://chakra-ui.com/docs/components/form/form-control
 * */
const FormHelper = ({
  //
  helperText,
  errorText,
  successText,
  children,
  label,

  wrapperProps,
  labelProps,
  labelTextProps,
  successTextProps,
  helperTextProps,
  errorTextProps,

  ...basisProps
}: FormHelperProps) => {
  const isShowErrorText = !!errorText;
  const isShowSuccessText = !!successText && !isShowErrorText;
  const isShowHelper = !!helperText && !isShowErrorText && !isShowErrorText;

  return (
    <FormControl
      display="flex"
      flexDirection="column"
      isInvalid={!!errorText}
      {...basisProps}
    >
      <Flex w="100%" h="100%" alignItems="center" {...wrapperProps}>
        {!!label && (
          <Flex as="label" columnGap="4px" {...labelProps}>
            <Text as="label" {...labelTextProps}>
              {label}
            </Text>
            {basisProps.isRequired && '*'}
          </Flex>
        )}
        <Flex w="100%" h="100%" direction="column">
          {children}
          {isShowErrorText && (
            <FormErrorMessage color="#E53E3E" {...errorTextProps}>
              {errorText}
            </FormErrorMessage>
          )}
        </Flex>
      </Flex>

      {isShowSuccessText && (
        <FormHelperText color="custom.primary" {...successTextProps}>
          {successText}
        </FormHelperText>
      )}
      {isShowHelper && (
        <FormHelperText {...helperTextProps}>{helperText}</FormHelperText>
      )}
    </FormControl>
  );
};

export default FormHelper;
