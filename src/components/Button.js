import {View, Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import React from 'react';

const Button = ({title, onPress, style, loading}) => {
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
        ...style,
      }}>
      {loading ? (
        <ActivityIndicator size="small" color="white" />
      ) : (
        <Text style={{color: 'white'}}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

export default Button;
