import React,{ useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { MoonIcon, SunIcon} from '@heroicons/react/24/solid'

const ThemeSwitch = () => {
    const [mounted, setMounted] = useState(false)
    useEffect(()=>{
      setMounted(true)
    },[])
    const { theme, setTheme } = useTheme();
  
    const renderThemeChanger = () => {
      if(!mounted) return null
      
      console.log('currentTheme:', theme)
  
      if(theme === 'dark') {
        return(
          <SunIcon className='w-7 h-7' role='button' onClick={() => setTheme('light')} />
        );
      } else {
        return(
          <MoonIcon className='w-7 h-7 text-gray-800' role='button' onClick={() => setTheme('dark')} />
        );
      }
    }
  
    return ( <div className='flex justify-center items-center'>{ renderThemeChanger() }</div>)
}

export default ThemeSwitch