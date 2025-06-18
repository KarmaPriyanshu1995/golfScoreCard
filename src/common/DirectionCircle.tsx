import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { scale } from 'react-native-size-matters';

type Direction = 'top-left' | 'top-right' | 'up' | 'down' | 'left' | 'right';

interface Props {
  label: string;
  arrows: { direction: Direction; highlight: boolean }[];
}

const getArrowRotation = (direction: Direction) => {
  switch (direction) {
    case 'top-left': return '-45deg';
    case 'top-right': return '45deg';
    case 'up': return '0deg';
    case 'down': return '180deg';
    case 'left': return '-90deg';
    case 'right': return '90deg';
    default: return '0deg';
  }
};

import { DimensionValue } from 'react-native';

const getArrowPosition = (direction: Direction): {
  top?: DimensionValue;
  left?: DimensionValue;
  right?: DimensionValue;
  bottom?: DimensionValue;
} => {
  switch (direction) {
    case 'top-left': return { top: 20, left: 20 };
    case 'top-right': return { top: 20, right: 20 };
    case 'up': return { top: 10, left: '43%' };
    case 'down': return { bottom: 10, left: '43%' };
    case 'left': return { left: 10, top: '43%' };
    case 'right': return { right: 10, top: '43%' };
    default: return {};
  }
};

const DirectionCircle = ({ label, arrows }: Props) => {
  return (
    <View style={styles.circleWrapper}>
      {/* Background Circle */}
      <View style={styles.circle}>
        {/* Green Arc Backgrounds */}
        {arrows.map((item, idx) =>
          item.highlight ? (
            <View
              key={`bg-${idx}`}
              style={[
                styles.highlightSector,
                item.direction === 'top-left' && { transform: [{ rotate: '-45deg' }] },
                item.direction === 'top-right' && { transform: [{ rotate: '45deg' }] },
                item.direction === 'up' && { transform: [{ rotate: '0deg' }] },
              ]}
            />
          ) : null
        )}

       
        {arrows.map((item, idx) => (
          <View
            key={`arrow-${idx}`}
            style={[styles.arrowContainer, getArrowPosition(item?.direction)]}>
            <Image
              source={require('../assets/images/circlearrow.png')}
              style={{
                height: scale(24),
                width: scale(24),
                tintColor: item.highlight ? '#7FBF69' : '#888',
                transform: [{ rotate: getArrowRotation(item.direction) }],
              }}
              resizeMethod="resize"
            />
          </View>
        ))}
        <View style={styles.label}>
          <Text style={styles.labelText}>{label}</Text>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    marginTop: 100,
  },
  circleWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection:"row"
  },
  circle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#eef3f5',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  highlightSector: {
    position: 'absolute',
    top: 0,
    // width: 120,
    // height: 60,
    backgroundColor: '#C8E6A0',
    // borderBottomLeftRadius: 60,
    // borderBottomRightRadius: 60,
  },
  label: {
    position: 'absolute',
    backgroundColor: '#fff',
    paddingHorizontal: scale(10),
    paddingVertical: scale(8),
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#bbb',
    
  },
  labelText: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  arrowContainer: {
    position: 'absolute',
 
  },
});

export default DirectionCircle