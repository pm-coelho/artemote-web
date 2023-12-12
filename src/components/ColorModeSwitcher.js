import React from 'react';
import { useColorMode, useColorModeValue, IconButton } from '@chakra-ui/react';
import {RiSunFill, RiMoonFill} from "react-icons/ri";

export const ColorModeSwitcher = props => {
  const { toggleColorMode } = useColorMode();
  const text = useColorModeValue('dark', 'light');
  const SwitchIcon = useColorModeValue(RiMoonFill, RiSunFill);

  return (
    <IconButton
      size="sm"
      fontSize="lg"
      aria-label={`Switch to ${text} mode`}
      variant="ghost"
      marginLeft="2"
      color={'teal'}
      onClick={toggleColorMode}
      icon={<SwitchIcon />}
      isRound
      {...props}
    />
  );
};
