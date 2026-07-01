import styled from '@emotion/styled'
import { Link } from 'react-router-dom'

// Link of react-router-dom without default styles of <a> tag
export const KCStyledLink = styled(Link)`
  &,
  &:hover,
  &:visited,
  &:active {
    color: inherit;
    text-decoration: none;
  }
`
