import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

export const Button = ({onPress, children}) => {
  const {textStyle, buttonStyle} = styles;

  return (
    <TouchableOpacity onPress={onPress} style={buttonStyle}>
      <Text style={textStyle}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    alignSelf: 'center',
    fontSize: 16,
    color: '#007aff',
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10,
  },
  buttonStyle: {
    alignSelf: 'stretch',
    flex: 1,
    backgroundColor: '#fff',
    borderColor: '#007aff',
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 5,
    borderWidth: 1,
  },
});
