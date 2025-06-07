import { useSlideStore } from '@/store/useSlideStore'
import React from 'react'


const ThemeChooser = () => {
    const {setCurrentTheme , currentTheme , project} = useSlideStore()
  return (
    <div>ThemeChooser</div>
  )
}

export default ThemeChooser