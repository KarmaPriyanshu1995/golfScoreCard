import React, { useState } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  ImageBackground,
  SafeAreaView,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { updateHoleScore } from '../redux/scoreSlice';
import { scale } from 'react-native-size-matters';
import { FONTS } from '../assets/fonts/font';
import { Colors } from '../assets/color/colors';

const AddScore = ({ navigation }: any) => {
  const dispatch = useDispatch();
  const scores = useSelector((state: any) => state.scores);
  const [currentHole, setCurrentHole] = useState(1);

  const score = scores[currentHole]?.score || 0;
  const putts = scores[currentHole]?.putts || 0;

  const updateScore = ({ type, value }: any) => {
    dispatch(
      updateHoleScore({
        hole: currentHole,
        data: {
          score: type === 'score' ? value : score,
          putts: type === 'putts' ? value : putts,
        },
      }),
    );
  };

  const handleSubmit = () => {
    navigation.navigate('Scorecard');
  };

  const HEADER_TEXT = [
    {
      name: 'YARDS',
      number: '200',
    },
    {
      name: 'PAR',
      number: '3',
    },
    {
      name: 'INDEX',
      number: '12',
    },
  ];

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={{ paddingVertical: scale(25) }}>
          <View>
            <Image
              source={require('../assets/images/CrossIcon.png')}
              style={{ height: scale(16), width: scale(16) }}
            />
          </View>
          <View></View>
        </View>
        <ImageBackground
          source={require('../assets/images/backgroundImage.png')}
        >
          <View style={styles.headerStyle}>
            <Image
              source={require('../assets/images/leftarrow.png')}
              style={{
                transform: [{ rotate: '0deg' }],
                height: scale(20),
                width: scale(20),
              }}
              resizeMode="contain"
              tintColor={'white'}
            />
            <View
              style={{
                backgroundColor: Colors.BLACK,

                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <View style={styles.circleTextContainor}>
                <Text style={styles.circleTextStyle}>1</Text>
              </View>
            </View>
            {HEADER_TEXT.map((item, index) => {
              return (
                <View>
                  <Text
                    style={{
                      fontFamily: FONTS.BOLD,
                      fontWeight: '600',
                      fontSize: scale(16),
                      color: Colors.WHITE,
                    }}
                  >
                    {item?.name}
                  </Text>
                  <Text
                    style={{
                      fontFamily: FONTS.BOLD,
                      fontWeight: '800',
                      fontSize: scale(26),
                      color: Colors.WHITE,
                    }}
                  >
                    {item?.number}
                  </Text>
                </View>
              );
            })}

            <Image
              source={require('../assets/images/leftarrow.png')}
              style={{
                transform: [{ rotate: '180deg' }],
                height: scale(20),
                width: scale(20),
              }}
              resizeMode="contain"
              tintColor={'white'}
            />
          </View>
        </ImageBackground>

        <Text style={styles.title}>Hole {currentHole}</Text>
        <Text style={styles.label}>Score: {score}</Text>
        <View style={styles.row}>
          <Button
            title="-"
            onPress={() =>
              updateScore({ type: 'score', value: Math.max(0, score - 1) })
            }
          />
          <Button
            title="+"
            onPress={() => updateScore({ type: 'score', value: score + 1 })}
          />
        </View>
        <Text style={styles.label}>Putts: {putts}</Text>
        <View style={styles.row}>
          <Button
            title="-"
            onPress={() =>
              updateScore({ type: 'putts', value: Math.max(0, putts - 1) })
            }
          />
          <Button
            title="+"
            onPress={() => updateScore({ type: 'putts', value: putts + 1 })}
          />
        </View>
        <View style={styles.row}>
          <Button
            title="Previous"
            disabled={currentHole === 1}
            onPress={() => setCurrentHole(prev => Math.max(1, prev - 1))}
          />
          <Button
            title="Next"
            disabled={currentHole === 18}
            onPress={() => setCurrentHole(prev => Math.min(18, prev + 1))}
          />
        </View>
        <Button title="Submit" onPress={handleSubmit} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  label: { fontSize: 18, marginVertical: 10 },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  headerStyle: {
    backgroundColor: 'rgba(37, 60, 81, 0.8)',
    paddingVertical: scale(10),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scale(10),
  },
  circleTextContainor: {
    backgroundColor: Colors.FADE_WHITE,
    height: scale(54),
    width: scale(54),
    borderRadius: scale(60),
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleTextStyle: {
    fontFamily: FONTS.BOLD,
    fontWeight: '800',
    fontSize: scale(30),
    color: Colors.FADE_GREY,
    textAlign: 'center',
  },
});

export default AddScore;
