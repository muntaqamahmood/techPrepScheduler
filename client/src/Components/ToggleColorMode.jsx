import React from 'react';


import {SunIcon , MoonIcon} from '@chakra-ui/icons';


import { Button } from '@chakra-ui/react';

import { useColorMode } from '@chakra-ui/color-mode';




const ToggleColorMode = () => {

    const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Button onClick={ ()=> toggleColorMode() }
    
        variant="ghost"
        size="md"
        borderRadius="md"
        colorScheme="Gray"
        _hover={{ bg: '#BEE3F8', color: '#2C5282' }}
        _active={{ bg: '#D6BCFA', color: '#2C5282'}}
        border="2px solid #CBD5E0"
        px={4}
    
    > 
            {colorMode === "dark" ? <MoonIcon color = "blue.500"/> :<SunIcon color= "orange.400"/> }
     </Button>
  )
}

export default ToggleColorMode
