import React, { useState } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  ImageBackground,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { updateHoleScore } from '../redux/scoreSlice';
import { scale } from 'react-native-size-matters';
import { FONTS } from '../assets/fonts/font';
import { Colors } from '../assets/color/colors';
import DirectionCircle from '../common/DirectionCircle'
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
const SCORES_DATA =[{name:'SANDIE',img:require('../assets/images/Tick.png')},{name:'UP/DOWN',img:require('../assets/images/Tick.png')},{name:'PENALTY',img:require('../assets/images/Zero.png')},]
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={{ paddingVertical: scale(25) ,flexDirection:"row",alignItems:"center",justifyContent:"space-between",paddingHorizontal:scale(15),top:scale(15)}}>
          <View style={styles.headerStyleContainor}>
            <Image
              source={require('../assets/images/CrossIcon.png')}
              style={{ height: scale(24), width: scale(24) }}
            />
            <Text style={{fontFamily:FONTS.BOLD,fontWeight:'600',fontSize:scale(20)}}>Qutab Golf course</Text>
          </View>
          <View style={styles.headerStyleContainor}>
            <TouchableOpacity onPress={handleSubmit} >
              <Image source={require('../assets/images/ScorecardIcon.png')} style={{width:scale(20.53),height:scale(14)}}/>
            </TouchableOpacity>
            <TouchableOpacity>
              <Image source={require('../assets/images/UserLabelIcon.png')} style={{width:scale(24),height:scale(24)}}/>
            </TouchableOpacity>
          </View>
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
<View style={styles.cardStyle}>
 <View style={{ flexDirection:"row",alignItems:"center",justifyContent:"space-between",paddingHorizontal:scale(15)}}>
          <View style={styles.headerStyleContainor}>
            <Image
              source={require('../assets/images/userImage.png')}
              style={{ height: scale(48), width: scale(48) }}
            />
            <View>

            <Text style={{fontFamily:FONTS.BOLD,fontWeight:'400',fontSize:scale(16),color:Colors.BLACK}}>James Gordon</Text>
            <Text style={{fontFamily:FONTS.BOLD,fontWeight:'400',fontSize:scale(14),color:"#095290"}}>HCAP 4 | Total: 0 (0)</Text>
            </View>
          </View>
          <View style={[styles.headerStyleContainor,{gap:scale(10)}]}>
            <View style={{flexDirection:'row',height:scale(48),width:scale(48),borderWidth:scale(2),borderColor:Colors.HARD_APP_COLOR,justifyContent:"center",borderRadius:scale(60),paddingTop:scale(2)}}>
             <Text style={{fontFamily:FONTS.BOLD,fontWeight:'800',fontSize:scale(25),color:Colors.HARD_APP_COLOR}}>4</Text>
             <Text style={{fontFamily:FONTS.BOLD,fontWeight:'600',fontSize:scale(18),textAlignVertical:'bottom',lineHeight:scale(40),color:Colors.HARD_APP_COLOR}}>2</Text>
            </View>
            <TouchableOpacity>
              <Image source={require('../assets/images/leftarrow.png')} style={{width:scale(24),height:scale(24), transform: [{ rotate: '90deg' }],}}/>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{flexDirection:"row",justifyContent:"space-around",marginVertical:scale(15)}}>

  <DirectionCircle
        label="FR"
        arrows={[
          { direction: 'top-left', highlight: true },
          { direction: 'top-right', highlight: true },
        ]}
      />
      <DirectionCircle
        label="GIR"
        arrows={[
          { direction: 'up', highlight: true },
          { direction: 'left', highlight: false },
          { direction: 'right', highlight: false },
          { direction: 'down', highlight: false },
        ]}
      />
        </View>
        <View style={{flexDirection:"row",gap:scale(20),justifyContent:"center"}}>
         {SCORES_DATA.map((item,index)=>{
          return(
 <View style={{justifyContent:'center',alignItems:"center"}}>
 <Image source={item?.img} height={scale(18)} width={scale(26)}/>
          <Text style={{fontFamily:FONTS.BOLD,fontWeight:'500',fontSize:scale(16),color:Colors.BLACK}}>{item?.name}</Text>
          </View>
          )
         })}
         
        </View>
        <View style={{borderColor:Colors?.GREY_COLOR,borderBottomWidth:scale(1),marginHorizontal:scale(15),marginVertical:scale(10)}}/>
     <View style={{flexDirection:"row",justifyContent:"space-around",marginHorizontal:scale(20)}} >
      <View style={{justifyContent:"center",alignItems:"center"}}>
        <Text style={{fontFamily:FONTS.BOLD,fontSize:scale(16),fontWeight:'600'}}>Hole</Text>
         <View style={{flexDirection:"row",alignItems:"center"}}>
        <TouchableOpacity activeOpacity={0.9}  disabled={currentHole === 1}
            onPress={() => setCurrentHole(prev => Math.max(1, prev - 1))}
            >

        <Image source={require('../assets/images/minusIcon.png')}/>
        </TouchableOpacity>
      <Text style={{color:Colors.HARD_APP_COLOR,fontSize:scale(28),fontWeight:'800'}}>{currentHole}</Text>
           <TouchableOpacity activeOpacity={0.9}    disabled={currentHole === 18}
            onPress={() => setCurrentHole(prev => Math.min(18, prev + 1))}>

        <Image source={require('../assets/images/pluseIcon.png')}/>
        </TouchableOpacity>
      </View>
      </View>
      <View style={{justifyContent:"center",alignItems:"center"}}>
        <Text style={{fontFamily:FONTS.BOLD,fontSize:scale(16),fontWeight:'600'}}>Score </Text>
         <View style={{flexDirection:"row",alignItems:"center"}}>
        <TouchableOpacity activeOpacity={0.9}  onPress={() =>
              updateScore({ type: 'score', value: Math.max(0, score - 1) })
            }>

        <Image source={require('../assets/images/minusIcon.png')}/>
        </TouchableOpacity>
      <Text style={{color:Colors.HARD_APP_COLOR,fontSize:scale(28),fontWeight:'800'}}>{score}</Text>
           <TouchableOpacity activeOpacity={0.9}  onPress={() => updateScore({ type: 'score', value: score + 1 })}>

        <Image source={require('../assets/images/pluseIcon.png')}/>
        </TouchableOpacity>
      </View>
      </View>
      <View style={{justifyContent:"center",alignItems:"center"}}>
        <Text style={{fontFamily:FONTS.BOLD,fontSize:scale(16),fontWeight:'600'}}>Putts</Text>
         <View style={{flexDirection:"row",alignItems:"center"}}>
        <TouchableOpacity activeOpacity={0.9}  onPress={() =>
              updateScore({ type: 'putts', value: Math.max(0, putts - 1) })
            }>

        <Image source={require('../assets/images/minusIcon.png')}/>
        </TouchableOpacity>
      <Text style={{color:Colors.HARD_APP_COLOR,fontSize:scale(28),fontWeight:'800'}}>{putts}</Text>
           <TouchableOpacity activeOpacity={0.9}  onPress={() => updateScore({ type: 'putts', value: putts + 1 })}>

        <Image source={require('../assets/images/pluseIcon.png')}/>
        </TouchableOpacity>
      </View>
      </View>
     </View>
</View>
        {/* <Text style={styles.title}>Hole {currentHole}</Text>
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
        <Button title="Submit" onPress={handleSubmit} /> */}
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
  headerStyleContainor:{flexDirection:"row",alignItems:"center",gap:scale(5)},
  cardStyle:{backgroundColor:Colors.WHITE,elevation:0.8,margin:scale(10),paddingVertical:scale(15),borderRadius:scale(6)}
});

export default AddScore;
