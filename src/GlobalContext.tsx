import React, { Dispatch, PropsWithChildren, SetStateAction, useContext } from 'react'

export const themeModes = Object.freeze(['dark', 'light'])

export type ThemeMode = (typeof themeModes)[number]

export type GlobalSettings = {
  mode?: ThemeMode
  reducedMotionEnabled?: boolean
}

export type GlobalSettingsActions = {
  setMode?: Dispatch<SetStateAction<ThemeMode | undefined>>
  setReducedMotionEnabled?: Dispatch<SetStateAction<boolean | undefined>>
}

export const GlobalContext = React.createContext<GlobalSettings>({
  // mode: 'light',
  reducedMotionEnabled: false,
})

export const GlobalSettingsProvider = ({
  children,
  mode,
  reducedMotionEnabled,
}: PropsWithChildren<GlobalSettings>) => {
  return (
    <GlobalContext.Provider value={{ mode, reducedMotionEnabled }}>
      {children}
    </GlobalContext.Provider>
  )
}

export const useGlobalSettings = (): GlobalSettings => useContext(GlobalContext)
