import { TouchableOpacity, TouchableOpacityProps } from 'react-native';

const IconButton = ({ children, ...rest }: TouchableOpacityProps) => {
  return <TouchableOpacity {...rest}>{children}</TouchableOpacity>;
};

export default IconButton;
