import styled from '@emotion/styled'
import { Collapse } from '@mui/material'
import classNames from 'classnames'
import React from 'react'
import { useLocation } from 'react-router-dom'
import { ISideBarItemParent } from '../../types'
import { hasAtLeastOneChildMatchedPath } from '../../utils'
import SideBarItemChildren from '../SideBarItemChildren'

interface ISideBarItemParentProps {
  children?: React.ReactNode
  parent: ISideBarItemParent
}

SideBarItemParent.defaultProps = {
  children: <></>,
}

const SDiv_ParentCollapseContainer = styled.div`
  .collapse-content {
    position: relative;
    margin-left: 21px;
  }
  &.has-icon > .collapse-content {
    position: relative;
    margin-left: 32px;
  }

  .MuiCollapse-wrapperInner .sidebar-item-children-container {
    padding-left: 12px;
    &:before {
      content: '';
      position: absolute;
      top: 4px;
      left: 4px;
      width: 16px;
      height: 16px;
      border-left: 2px solid #c7cad1;
      border-bottom: 2px solid #c7cad1;
      border-radius: 0 0 0 8px;
    }
  }

  .MuiCollapse-wrapperInner > .sidebar-item-children-container:not(:last-child) {
    &:after {
      content: '';
      position: absolute;
      left: 4px;
      border-left: 2px solid #c7cad1;
      width: 17px;
      top: 15px;
      border-radius: 0 0 0 0;
      height: 100%;
    }
  }
`

export default function SideBarItemParent(props: ISideBarItemParentProps) {
  const location = useLocation()
  const [open, setOpen] = React.useState(hasAtLeastOneChildMatchedPath(props.parent.children ?? []))

  React.useEffect(() => {
    setOpen((prev) => prev || hasAtLeastOneChildMatchedPath(props.parent.children ?? []))
  }, [location.pathname])

  return (
    <SDiv_ParentCollapseContainer className={classNames('sidebar-item-children-container relative', { 'has-icon': Boolean(props.parent.icon) })}>
      <SideBarItemChildren onClick={() => setOpen((prev) => !prev)} isParent isParentOpen={open} {...(props.parent as any)} />

      <Collapse className='collapse-content' in={open} timeout='auto' unmountOnExit>
        {props.children}
      </Collapse>
    </SDiv_ParentCollapseContainer>
  )
}
