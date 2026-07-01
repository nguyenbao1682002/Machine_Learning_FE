import styled from '@emotion/styled'
import { TextareaAutosize, TextareaAutosizeProps } from '@mui/material'
import { Path, useFormContext, UseFormReturn } from 'react-hook-form'

type TKCTextAreaAutosizeProps<IMEFormInput> = TextareaAutosizeProps & {
  name: Path<IMEFormInput>
}

const StyledTextareaAutosizeWrapper = styled.div`
  font-family: -apple-system, 'system-ui', 'Segoe UI', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji';
  font-weight: 400;
  font-size: 1rem;
  line-height: 1.4375em;
  color: var(--mui-palette-text-primary);
  box-sizing: border-box;
  cursor: text;
  display: inline-flex;
  -webkit-box-align: center;
  align-items: center;
  position: relative;
  border-radius: var(--mui-shape-borderRadius);
  outline: none;
  textarea {
    resize: none;
  }
`

const StyledTextareaAutosize = styled(TextareaAutosize)`
  font: inherit;
  letter-spacing: inherit;
  color: currentcolor;
  border: 0px;
  box-sizing: content-box;
  background-image: none;
  background-position: initial;
  background-size: initial;
  background-repeat: initial;
  background-attachment: initial;
  background-origin: initial;
  background-clip: initial;
  height: 1.4375em;
  margin: 0px;
  -webkit-tap-highlight-color: transparent;
  display: block;
  min-width: 0px;
  width: 100%;
  animation-name: mui-auto-fill-cancel;
  animation-duration: 10ms;
  background-color: var(--bg-kc-input);
  border-radius: var(--rounded-kc-primary);
  padding: 0.5rem 0.75rem;
  outline: none;
  // placeholder:text-sm
  &::placeholder {
    font-size: 1rem /* 14px */;
    line-height: 1.25rem /* 20px */;
  }
`

export function KCTextAreaAutosize<IMEFormInput>(props: TKCTextAreaAutosizeProps<IMEFormInput>) {
  const formMethods: UseFormReturn = useFormContext()
  const { name, onBlur, ...otherProps } = props
  return (
    <StyledTextareaAutosizeWrapper>
      <StyledTextareaAutosize minRows={1} {...otherProps} {...formMethods.register(name, { onBlur })} />
    </StyledTextareaAutosizeWrapper>
  )
}
