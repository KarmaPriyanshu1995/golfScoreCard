import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

const Scorecard = () => {
  const scores = useSelector(state => state.scores);
  console.log(scores, '[][][][]');
  const renderRow = (label, key) => (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      {[...Array(18)].map((_, i) => (
        <Text key={i} style={styles.cell}>
          {scores[i + 1]?.[key] ?? '-'}
        </Text>
      ))}
      <Text style={styles.cell}>
        {[...Array(9)].reduce(
          (acc, _, i) => acc + (scores[i + 1]?.[key] || 0),
          0,
        )}
      </Text>
      <Text style={styles.cell}>
        {[...Array(9)].reduce(
          (acc, _, i) => acc + (scores[i + 10]?.[key] || 0),
          0,
        )}
      </Text>
      <Text style={styles.cell}>
        {[...Array(18)].reduce(
          (acc, _, i) => acc + (scores[i + 1]?.[key] || 0),
          0,
        )}
      </Text>
    </View>
  );

  return (
    <ScrollView style={styles.container} horizontal>
      <View>
        <View style={styles.row}>
          <Text style={styles.label}>Hole</Text>
          {[...Array(18)].map((_, i) => (
            <Text key={i} style={styles.cell}>
              {i + 1}
            </Text>
          ))}
          <Text style={styles.cell}>OUT</Text>
          <Text style={styles.cell}>IN</Text>
          <Text style={styles.cell}>TOTAL</Text>
        </View>
        {renderRow('Score', 'score')}
        {renderRow('Putts', 'putts')}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  row: { flexDirection: 'row', alignItems: 'center', marginBottom: 5 },
  label: { width: 60, fontWeight: 'bold' },
  cell: { width: 40, textAlign: 'center' },
});

export default Scorecard;
