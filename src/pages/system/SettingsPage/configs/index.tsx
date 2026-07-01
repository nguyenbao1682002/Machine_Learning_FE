import React from 'react'
import { useTranslation } from 'react-i18next'
import * as BiIcons from 'react-icons/bi'
import * as CgIcons from 'react-icons/cg'
import * as MdIcons from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import AuthContext from '~contexts/AuthContext'
import { Languages } from '~translation/index'

interface ISettingsItem {
  icon: React.ReactNode
  onClick?: () => void
  mainLabel: React.ReactNode
  subLabel: React.ReactNode
}

export const SelectLanguage = () => {
  const { i18n, t } = useTranslation()
  const onChangeLang = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const lang_code = e.target.value
    i18n.changeLanguage(lang_code)
  }

  return (
    <select className='cursor-pointer justify-center rounded bg-transparent text-base text-kc-highlight outline-none' defaultValue={i18n.language} onChange={onChangeLang}>
      {Languages.map(({ code, label }) => (
        <option key={code} value={code}>
          {label}
        </option>
      ))}
    </select>
  )
}

export const getSettingsGrid: () => ISettingsItem[] = () => {
  const { logout } = React.useContext(AuthContext)
  const navigate = useNavigate()
  const { t } = useTranslation()

  const openOtherSettings = () => {
    navigate({ pathname: './other-settings' }, { replace: true })
  }

  return [
    {
      icon: (
        <div className='flex h-[28px] w-[28px] items-center justify-center'>
          <CgIcons.CgProfile size={25} className='text-kc-highlight' />
        </div>
      ),
      mainLabel: t('Profile'),
      subLabel: t('Sub_Profile'),
      isDisabled: true,
    },
    {
      icon: (
        <div className='flex h-[28px] w-[28px] items-center justify-center'>
          <MdIcons.MdSecurity size={22} className='text-kc-highlight' />
        </div>
      ),
      mainLabel: t('Security'),
      subLabel: t('Sub_Security'),
      isDisabled: true,
    },
    { icon: <BiIcons.BiColorFill size={28} className='text-kc-highlight' />, mainLabel: t('Theme'), subLabel: t('Sub_Theme'), isDisabled: true },
    {
      icon: (
        <div className='flex h-[28px] w-[28px] items-center justify-center'>
          <MdIcons.MdLanguage size={25} className='text-kc-highlight' />
        </div>
      ),
      mainLabel: (
        <div className='h-fit-content flex w-full flex-row items-center'>
          {t('Language')}: <SelectLanguage />
        </div>
      ),
      subLabel: t('Sub_Language'),
      isDisabled: false,
    },
    {
      icon: <MdIcons.MdOutlineSettingsSuggest size={28} className='text-kc-highlight' />,
      mainLabel: t('Threshold_Settings'),
      subLabel: t('Sub_Threshold_Settings'),
      onClick: openOtherSettings,
      isDisabled: false,
    },
    {
      icon: (
        <div className='flex h-[28px] w-[28px] items-center justify-center'>
          <BiIcons.BiLogOut size={25} className='text-kc-highlight' />
        </div>
      ),
      mainLabel: t('LogOut'),
      subLabel: t('Sub_LogOut'),
      onClick: logout,
      isDisabled: false,
    },
  ]
}
