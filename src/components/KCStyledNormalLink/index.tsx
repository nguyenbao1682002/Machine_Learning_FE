import styled from '@emotion/styled'

// Link of react-router-dom without default styles of <a> tag
export const KCStyledNormalLink = styled.a`
  &,
  &:hover,
  &:visited,
  &:active {
    text-decoration: none;
  }
`
