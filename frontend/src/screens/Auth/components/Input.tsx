import * as React from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  TextInputProps,
} from 'react-native';

interface Props extends TextInputProps {
  name: string;
  label?: string;
  labelStyle?: TextStyle;
  error?: any;
  showSuccess?: boolean
}

export default React.forwardRef<any, Props>(
  (props, ref): React.ReactElement => {
    const { label, labelStyle, error, showSuccess, ...rest } = props;

    return (
      <View style={styles.container}>
        {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}
        <TextInput
          autoCapitalize="none"
          ref={ref}
          style={[styles.input, { borderColor: error ? '#fc6d47' : (showSuccess && (!error?.message && rest.value)) ? '#5cb85c' : 'rgba(0,0,0,0.2)' }]}
          {...rest}
        />
        {/* <Text style={styles.textError}>{error && error.message}</Text> */}
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  input: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical: 5,
    paddingLeft: 5,
    fontSize: 16,
    height: 40,
  },
  label: {
    paddingVertical: 5,
    fontSize: 13,
    color: 'rgba(0,0,0,0.7)'
    // fontWeight: 'bold'
  },
  textError: {
    color: '#fc6d47',
    fontSize: 14,
  },
});
