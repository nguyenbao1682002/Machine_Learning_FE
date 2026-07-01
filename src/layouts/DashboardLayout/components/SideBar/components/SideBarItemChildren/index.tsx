import styled from '@emotion/styled'
import classNames from 'classnames'
import { compile } from 'path-to-regexp'
import React from 'react'
import { useTranslation } from 'react-i18next'
import * as Icons from 'react-icons/hi'
import { matchPath, useLocation, useParams } from 'react-router-dom'
import { KCStyledLink } from '~components/KCStyledLink'
import { ISideBarItemChildren, ISideBarItemParent } from '../../types'
import { hasAtLeastOneChildMatchedPath } from '../../utils'

interface ISideBarItemChildrenProps {
  isParent: boolean
  isParentOpen: boolean
  onClick?: React.MouseEventHandler<HTMLDivElement>
}

SideBarItemChildren.defaultProps = {
  isParent: false,
  isParentOpen: false,
  onClick: () => {},
  activeDependencies: [],
}

const SDiv_SideBarItemChildrenContainer = styled.div`
  .children-content-container {
    padding: 6px 12px;
    border-radius: var(--rounded-kc-primary);
    border-bottom: 2px solid transparent;
    &.highlight-with-card-style {
      &.item-selected {
        color: var(--text-kc-primary-reverse);
        background: var(--kc-highlight);
        font-weight: 500;
      }
    }

    &.highlight-only-label.item-selected {
      font-weight: 500;
      color: var(--kc-highlight);
    }
  }
`

export default function SideBarItemChildren(props: ISideBarItemChildrenProps & ISideBarItemChildren) {
  const params = useParams()
  const location = useLocation()
  const { t, i18n } = useTranslation()
  const isMatchedRoute =
    // if this is children
    [props.path, ...(props.highlightPatterns ?? [])].some((path) => path && matchPath(path, location.pathname)) ||
    // if this is children and also parent
    hasAtLeastOneChildMatchedPath((props as any as ISideBarItemParent).children)

  const actualPath = React.useMemo(() => {
    if (props.path) {
      const pattern = props.path
      const toPath = compile(pattern)
      const result = toPath(params)
      return result
    }
    return props.path
  }, [props.path, JSON.stringify(params)])

  const SideBarItemContent = React.useMemo(
    () => (
      <div className={classNames('hover:text-system-highlight flex cursor-pointer items-center justify-center py-1 lg:h-auto lg:justify-between')} onClick={props.onClick}>
        <div
          className={classNames('children-content-container mx-4 flex flex-1 items-center gap-4', props.highlightStyle, {
            ['item-selected']: isMatchedRoute,
          })}
        >
          {props.icon}
          <span className='text-base'>{props.translationLabel ? props.translationLabel(t) : t(props.label)}</span>
        </div>
        {props.isParent && <div className='pr-4'>{props.isParentOpen ? <Icons.HiChevronDown size={18} /> : <Icons.HiChevronRight size={18} />}</div>}
      </div>
    ),
    [isMatchedRoute, props.icon, props.label, props.isParentOpen, props.highlightStyle, props.isParent, props.onClick, i18n.language],
  )

  return (
    <SDiv_SideBarItemChildrenContainer
      className={classNames({ 'sidebar-item-children-container relative': props.isParent === false, 'has-icon': Boolean(props.icon) && props.isParent === false })}
    >
      {props.isParent ? SideBarItemContent : <KCStyledLink to={actualPath}>{SideBarItemContent}</KCStyledLink>}
    </SDiv_SideBarItemChildrenContainer>
  )
}
