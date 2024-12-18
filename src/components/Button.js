import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';

const Button = ({title, onPress,style}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: 'blue',
        padding: 10,
        paddingVertical: 15,
        width: '90%',
        alignItems: 'center',
        borderRadius: 8,
        marginTop: 8,
        ...style
      }}>
      <Text style={{color: 'white'}}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;
