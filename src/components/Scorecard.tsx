import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { scale } from 'react-native-size-matters';
import { useSelector } from 'react-redux';
import { Colors } from '../assets/color/colors';

const { width } = Dimensions.get('window');

const Scorecard = ({navigation}:any) => {
  const scores = useSelector((state:any) => state.scores);
  const [isParExpanded, setIsParExpanded] = useState(true);
  const [isPlayerExpanded, setIsPlayerExpanded] = useState(true);
  
  const scrollViewRef = useRef(null);
  
  console.log(scores, '[][][][]');

  const toggleParSection = () => {
    setIsParExpanded(!isParExpanded);
  };

  const togglePlayerSection = () => {
    setIsPlayerExpanded(!isPlayerExpanded);
  };

  const convertScoresToArray = () => {
    const playerScores = [];
    const puttsScores = [];
    
    for (let hole = 1; hole <= 18; hole++) {
      const holeData = scores[hole.toString()];
      const score = holeData?.score || 0;
      const putts = holeData?.putts || 0;
      
      let scoreObj = { value: score };
      
      const par = parData[hole - 1];
      if (score > 0) {
        if (score <= par - 2) {
          scoreObj.circle = 'yellow'; 
        } else if (score === par - 1) {
          scoreObj.circle = 'red'; 
        } else if (score === par + 1) {
          scoreObj.circle = 'black'; 
        } else if (score >= par + 2) {
          scoreObj.circle = 'purple';
        }
      }
      
      playerScores.push(scoreObj);
      puttsScores.push(putts);
    }
    
    return { playerScores, puttsScores };
  };

  const calculatePlayerTotal = (scores, startHole, endHole) => {
    return scores.slice(startHole - 1, endHole).reduce((acc, score) => {
      const value = typeof score === 'object' ? score.value : score;
      return acc + (value || 0);
    }, 0);
  };

  const calculateSectionTotal = (data, startIndex, endIndex, label) => {
    const sliceData = data.slice(startIndex, endIndex);
    
    const hasSymbols = sliceData.some(item => 
      typeof item === 'string' && (item === '✓' || item === '×' || isNaN(Number(item)))
    );
    
    if (hasSymbols) {
      return sliceData.some(item => item === '✓') ? '✓' : '';
    } else {
      return sliceData.reduce((acc, item) => {
        const value = typeof item === 'object' ? item.value : item;
        return acc + (Number(value) || 0);
      }, 0);
    }
  };

  const renderDataColumn = (label, data, hasExpandButton = false, isExpanded = true, toggleFunction = null, bgColor = 'white') => (
    <View style={[styles.dataColumn, { backgroundColor: bgColor }]}>
      <View style={styles.labelContainer}>
        <Text style={[styles.label, label === 'PAR' && styles.parText, label.includes('Thakor') && styles.playerName]}>
          {label}
        </Text>
        {hasExpandButton && (
          <TouchableOpacity onPress={toggleFunction} style={styles.expandButton}>
            <Text style={styles.expandIcon}>{isExpanded ? '−' : '+'}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  const renderScrollableRow = (data, label) => (
    <View style={styles.scrollableRow}>
      {data.slice(0, 9).map((value, i) => (
        <View key={i} style={styles.scoreCell}>
          {value.circle && (
            <View style={[
              styles.circle, 
              value.circle === 'blue' ? styles.blueCircle :
              value.circle === 'red' ? styles.redCircle :
              value.circle === 'yellow' ? styles.yellowCircle :
              value.circle === 'black' ? styles.blackCircle :
              value.circle === 'purple' ? styles.purpleCircle : null
            ]} />
          )}
          <Text style={[styles.cell, styles.scoreText]}>
            {typeof value === 'object' ? (value.value || 0) : (value || 0)}
          </Text>
        </View>
      ))}
      
      <View style={[styles.totalCell, { backgroundColor: label === 'PAR' || label === 'YARD' || label === 'INDEX' ? '#ecf0f1' : 
                                      label.includes('Thakor') ? '#e8f4fd' : 
                                      '#f8f9fa' }]}>
        <Text style={[styles.cell, { 
          fontWeight: 'bold', 
          color: 'black',
          fontSize: 11 
        }]}>
          {label === 'PAR' ? '36' : 
           label.includes('Thakor') ? calculatePlayerTotal(data, 1, 9) : 
           label === 'YARD' ? '3101' :
           label === 'INDEX' ? '' :
           label === 'Putts' ? calculateSectionTotal(data, 0, 9, label) :
           calculateSectionTotal(data, 0, 9, label)}
        </Text>
      </View>
      
      {data.slice(9, 18).map((value, i) => (
        <View key={i + 9} style={styles.scoreCell}>
          {value.circle && (
            <View style={[
              styles.circle, 
              value.circle === 'blue' ? styles.blueCircle :
              value.circle === 'red' ? styles.redCircle :
              value.circle === 'yellow' ? styles.yellowCircle :
              value.circle === 'black' ? styles.blackCircle :
              value.circle === 'purple' ? styles.purpleCircle : null
            ]} />
          )}
          <Text style={[styles.cell, styles.scoreText]}>
            {typeof value === 'object' ? (value.value || 0) : (value || 0)}
          </Text>
        </View>
      ))}
      
      <View style={[styles.totalCell, { backgroundColor: label === 'PAR' || label === 'YARD' || label === 'INDEX' ? '#ecf0f1' : 
                                      label.includes('Thakor') ? '#e8f4fd' : 
                                      '#f8f9fa' }]}>
        <Text style={[styles.cell, { 
          fontWeight: 'bold', 
          color: 'black',
          fontSize: 11 
        }]}>
          {label === 'PAR' ? '36' : 
           label.includes('Thakor') ? calculatePlayerTotal(data, 10, 18) : 
           label === 'YARD' ? '3270' :
           label === 'INDEX' ? '' :
           label === 'Putts' ? calculateSectionTotal(data, 9, 18, label) :
           calculateSectionTotal(data, 9, 18, label)}
        </Text>
      </View>
      
      <View style={[styles.totalCell, { backgroundColor: label === 'PAR' || label === 'YARD' || label === 'INDEX' ? '#ecf0f1' : 
                                      label.includes('Thakor') ? '#e8f4fd' : 
                                      '#f8f9fa' }]}>
        <Text style={[styles.cell, { 
          fontWeight: 'bold', 
          color: 'black',
          fontSize: 11 
        }]}>
          {label === 'PAR' ? '72' : 
           label.includes('Thakor') ? calculatePlayerTotal(data, 1, 18) : 
           label === 'YARD' ? '6371' :
           label === 'INDEX' ? '' :
           label === 'Putts' ? calculateSectionTotal(data, 0, 18, label) :
           calculateSectionTotal(data, 0, 18, label)}
        </Text>
      </View>
    </View>
  );
  const parData = Array(18).fill(4);
  const yardData = [400, 190, 400, 145, 319, 370, 510, 315, 400, 140, 143, 130, 142, 343, 190, 513, 379, 400];
  const indexData = [13, 1, 7, 11, 15, 17, 13, 3, 9, 18, 12, 10, 14, 16, 8, 4, 2, 6];
  const { playerScores, puttsScores } = convertScoresToArray();
  
  const firData = Array(18).fill('✓');
  const regData = Array(18).fill('✓');
  const upDownData = Array(18).fill('✓');
  const penaltyData = Array(18).fill(0);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={()=>navigation.goBack()}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Score Card - 2nd Feb, 2022 (Wed) - Qutab Golf Course</Text>
      </View>
      <View style={styles.table}>
        <View style={styles.tableContainer}>
          <View style={styles.fixedColumnContainer}>
            <View style={styles.fixedHeader}>
              <Text style={styles.headerText}>HOLE</Text>
            </View>
            {renderDataColumn('PAR', parData, true, isParExpanded, toggleParSection, '#ecf0f1')}
            {isParExpanded && (
              <>
                {renderDataColumn('YARD', yardData, false, true, null, '#f8f9fa')}
                {renderDataColumn('INDEX', indexData, false, true, null, '#f8f9fa')}
              </>
            )}
            
            {/* Player Section */}
            {renderDataColumn('Deepak Thakor', playerScores, true, isPlayerExpanded, togglePlayerSection, '#e8f4fd')}
            
            {/* Player Sub-data (expandable) */}
            {isPlayerExpanded && (
              <>
                {renderDataColumn('Putts', puttsScores, false, true, null, '#fff')}
                {renderDataColumn('FIR', firData, false, true, null, '#fff')}
                {renderDataColumn('REG', regData, false, true, null, '#fff')}
                {renderDataColumn('UP&DOWN', upDownData, false, true, null, '#fff')}
                {renderDataColumn('Penalty', penaltyData, false, true, null, '#fff')}
              </>
            )}
          </View>

          {/* Scrollable Right Section */}
          <ScrollView 
            ref={scrollViewRef}
            horizontal 
            showsHorizontalScrollIndicator={false} 
            style={styles.scrollableSection}
          >
            <View style={styles.scrollableContent}>
              {/* Header Row */}
              <View style={[styles.scrollableRow, { backgroundColor: '#34495e' }]}>
                {/* Holes 1-9 */}
                {[...Array(9)].map((_, i) => (
                  <View key={i} style={styles.headerCell}>
                    <Text style={[styles.cell, styles.headerText, styles.holeNumber]}>
                      {i + 1}
                    </Text>
                  </View>
                ))}
                
                {/* OUT Header */}
                <View style={styles.totalCell}>
                  <Text style={[styles.cell, styles.headerText, styles.totalText]}>OUT</Text>
                </View>
                
                {/* Holes 10-18 */}
                {[...Array(9)].map((_, i) => (
                  <View key={i + 9} style={styles.headerCell}>
                    <Text style={[styles.cell, styles.headerText, styles.holeNumber]}>
                      {i + 10}
                    </Text>
                  </View>
                ))}
                
                {/* IN Header */}
                <View style={styles.totalCell}>
                  <Text style={[styles.cell, styles.headerText, styles.totalText]}>IN</Text>
                </View>
                
                {/* TOTAL Header */}
                <View style={styles.totalCell}>
                  <Text style={[styles.cell, styles.headerText, styles.totalText]}>TOTAL</Text>
                </View>
              </View>

              {/* PAR Row */}
              <View style={[styles.scrollableRow, { backgroundColor: '#ecf0f1' }]}>
                {renderScrollableRow(parData, 'PAR')}
              </View>
              
              {/* PAR Sub-data (expandable) */}
              {isParExpanded && (
                <>
                  <View style={[styles.scrollableRow, { backgroundColor: '#f8f9fa' }]}>
                    {renderScrollableRow(yardData, 'YARD')}
                  </View>
                  <View style={[styles.scrollableRow, { backgroundColor: '#f8f9fa' }]}>
                    {renderScrollableRow(indexData, 'INDEX')}
                  </View>
                </>
              )}
              
              {/* Player Row */}
              <View style={[styles.scrollableRow, { backgroundColor: '#e8f4fd' }]}>
                {renderScrollableRow(playerScores, 'Deepak Thakor')}
              </View>
              
              {/* Player Sub-data (expandable) */}
              {isPlayerExpanded && (
                <>
                  <View style={[styles.scrollableRow, { backgroundColor: '#fff' }]}>
                    {renderScrollableRow(puttsScores, 'Putts')}
                  </View>
                  <View style={[styles.scrollableRow, { backgroundColor: '#fff' }]}>
                    {renderScrollableRow(firData, 'FIR')}
                  </View>
                  <View style={[styles.scrollableRow, { backgroundColor: '#fff' }]}>
                    {renderScrollableRow(regData, 'REG')}
                  </View>
                  <View style={[styles.scrollableRow, { backgroundColor: '#fff' }]}>
                    {renderScrollableRow(upDownData, 'UP&DOWN')}
                  </View>
                  <View style={[styles.scrollableRow, { backgroundColor: '#fff' }]}>
                    {renderScrollableRow(penaltyData, 'Penalty')}
                  </View>
                </>
              )}
            </View>
          </ScrollView>
        </View>
      </View>

      {/* Legend */}
      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={[styles.legendIcon, styles.yellowIcon]} />
          <Text style={styles.legendText}>Eagle/Better</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendIcon, styles.redIcon]} />
          <Text style={styles.legendText}>Birdie</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendIcon, styles.blackIcon]} />
          <Text style={styles.legendText}>Bogey</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendIcon, styles.purpleIcon]} />
          <Text style={styles.legendText}>Double Bogey/Worse</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
    padding: 12,
    borderRadius: 4,
    marginBottom: 16,
    marginVertical:scale(20)
  },
  backButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    width: 32,
    height: 32,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerTitle: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 10,
  },
  table: {
    backgroundColor: 'white',
    borderRadius: 4,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  tableContainer: {
    flexDirection: 'row',
  },
  fixedColumnContainer: {
    width: 80,
    borderRightWidth: 1,
    borderRightColor: '#ddd',
  },
  scrollableSection: {
    flex: 1,
  },
  scrollableContent: {
    // Container for all scrollable rows
  },
  
  // Header styles
  fixedHeader: {
    backgroundColor: '#34495e',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerCell: {
    width: 32,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#34495e',
  },
  
  // Data row styles
  dataColumn: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    minHeight: 36,
  },
  scrollableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    minHeight: 36,
  },
  
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  expandButton: {
    marginLeft: 4,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: 'rgba(0,0,0,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  expandIcon: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
  },
  
  cell: {
    paddingHorizontal: 2,
    fontSize: 11,
  },
  totalCell: {
    width: scale(40),
    backgroundColor: '#253C51',
    borderLeftWidth: 1,
    borderLeftColor: '#34495e',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  totalText: {
    fontWeight: 'bold',
    color: 'white'
  },
  holeNumber: {
    color: 'white',
    fontWeight: 'bold',
  },
  headerText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 11,
    textAlign: 'center',
  },
  parText: {
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  playerName: {
    color: '#2980b9',
    fontWeight: 'bold',
  },
  scoreCell: {
    width: 32,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  scoreText: {
    fontSize: 11,
    fontWeight: 'bold',
  },
  circle: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
  },
  blueCircle: {
    borderColor: '#3498db',
  },
  redCircle: {
    borderColor: '#e74c3c',
  },
  yellowCircle: {
    borderColor: '#f1c40f',
  },
  blackCircle: {
    borderColor: '#2c3e50',
  },
  purpleCircle: {
    borderColor: '#8e44ad',
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    padding: 12,
    marginTop: 16,
    borderRadius: 4,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    flexWrap: 'wrap',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  legendIcon: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 6,
  },
  yellowIcon: {
    backgroundColor: '#f1c40f',
  },
  redIcon: {
    backgroundColor: '#e74c3c',
  },
  blackIcon: {
    backgroundColor: '#2c3e50',
  },
  purpleIcon: {
    backgroundColor: '#8e44ad',
  },
  legendText: {
    fontSize: 10,
    color: '#7f8c8d',
  },
});

export default Scorecard;
