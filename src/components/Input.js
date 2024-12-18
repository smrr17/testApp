import {View, Text, TextInput} from 'react-native';
import React from 'react';

const Input = ({value, onChangeText, placeholder, style, numberOfLines}) => {
  return (
    <TextInput
      value={value}
      verticalAlign="top"
      multiline={numberOfLines ? true : false}
      numberOfLines={numberOfLines}
      onChangeText={onChangeText}
      style={{
        padding: 10,
        width: '90%',
        borderColor: 'gray',
        borderWidth: 1,
        marginTop: 8,
        borderRadius: 8,
        textAlignVertical: numberOfLines ? 'top' : 'center',
        ...style,
      }}
      placeholder={placeholder}
    />
  );
};

export default Input;
