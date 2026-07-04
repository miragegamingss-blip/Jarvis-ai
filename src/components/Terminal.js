import React from 'react';
import {
  ScrollView,
  Text,
  StyleSheet,
} from 'react-native';

const Terminal = ({ logs }) => {
  return (
    <ScrollView style={styles.terminal}>
      {logs.map((log, index) => (
        <Text key={index} style={styles.log}>
          {log}
        </Text>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  terminal: {
    height: 120,
    backgroundColor: 'rgba(0, 15, 30, 0.7)',
    borderWidth: 1,
    borderColor: '#00f0ff',
    padding: 10,
    borderRadius: 6,
  },
  log: {
    fontFamily: 'monospace',
    fontSize: 11,
    color: '#00f0ff',
    marginBottom: 4,
  },
});

export default Terminal;
