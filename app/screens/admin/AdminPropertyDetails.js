import React from 'react';
import { View, Text, StyleSheet, FlatList, Button, Alert } from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import * as propertyActions from '../../store/actions/property.actions';

import Colors from '../../constants/Colors';

const AdminPropertyDetails = (props) => {
  const dispatch = useDispatch();
  const propertyId = props.navigation.getParam('propertyID');
  console.log(`PropID ${propertyId}`);
  const selectedProperty = useSelector((state) =>
    state.properties.propertyList.find((property) => property.id === propertyId)
  );
  // console.log(`Selected property details ${JSON.stringify(selectedProperty)}`);

  const editPropertyHandler = (id) => {
    props.navigation.navigate('EditProperty', { propertyID: id });
  };

  const deleteHandler = (id) => {
    Alert.alert(
      'Are you sure?',
      'Do you really want to delete this property?',
      [
        { text: 'No', style: 'default' },
        {
          text: 'Yes',
          style: 'destructive',
          onPress: () => {
            dispatch(propertyActions.deleteProperty(id));
            props.navigation.navigate('Properties');
          },
        },
      ]
    );
  };
  
  const createChecklist = (id,address,duties) => {
    fetch('http://10.69.1.89:3030/checklist',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        propertyID: id,
        address: address,
        tasks:duties
      })
    })
  }

  return (
    <View style={styles.screen}>
      <View style={styles.container}>
        <View style={styles.propInfoContainer}>
          <View style={styles.information}>
            <Text style={styles.textTitle}>{selectedProperty.address}</Text>
            <View style={styles.rowText}>
              <Text style={styles.textTitle}>Owner:    </Text>
              <Text style={styles.text}>{selectedProperty.owner}</Text>
            </View>
            <View style={styles.rowText}>
              <Text style={styles.textTitle}>Email:    </Text>
              <Text style={styles.text}>{selectedProperty.email}</Text>
            </View>
            <View style={styles.rowText}>
              <Text style={styles.textTitle}>Type:    </Text>
              <Text style={styles.text}>{selectedProperty.type}</Text>
            </View>
            <View style={styles.rowText}>
              <Text style={styles.textTitle}>Lockbox:    </Text>
              <Text style={styles.text}>{selectedProperty.lockbox}</Text>
            </View>
            <View style={styles.rowText}>
              <Text style={styles.textTitle}>Doorcode:    </Text>
              <Text style={styles.text}>{selectedProperty.doorcode}</Text>
            </View>
            {selectedProperty.duties.map((keyName, i) => (
              <Text style={styles.text} key={i}>
                {keyName.id}: {keyName.task}{' '}
              </Text>
            ))}
          </View>
          <View style={styles.description}>
            <Text style={styles.textTitle}>Description:</Text>
            <Text style={styles.text}>
             {selectedProperty.description}
            </Text>
          </View>
        </View>
        <View style={styles.checklistContainer} />
        {/* <Text>Property Detail page</Text> */}
      </View>

      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          <Button
            title='EDIT'
            color={Colors.secondary}
            onPress={() => {
              editPropertyHandler(propertyId);
            }}
          />
        </View>
        <View style={styles.button}>
          <Button
            title='REMOVE'
            color={Colors.secondary}
            onPress={deleteHandler.bind(this, propertyId)}
          />
        </View>
      </View>
      <View style={styles.button}>
          <Button
            title='CREATE CHECKLIST'
            color={Colors.secondary}
            onPress={createChecklist.bind(this, propertyId,selectedProperty.address,selectedProperty.duties)}
          />
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
  },
  container: {
    width: '95%',
    height: '80%',
    marginTop: 20,
    marginBottom:0,
    padding: 20,
    flexDirection: 'row',
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  propInfoContainer: {
    backgroundColor: '#fff',
    width: '60%',
    height: '95%',
    borderRadius: 15,
    padding: 20,
    flexDirection: 'column',
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
  },
  checklistContainer: {
    backgroundColor: '#fff',
    width: '35%',
    height: '95%',
    marginLeft: 20,
    borderRadius: 15,
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
  },
  button: {
    backgroundColor: Colors.primary,
    borderRadius: 15,
    padding: 8,
    width: 300,
    marginBottom: 8,
    marginRight:15,
    marginTop:0
  },
  information: {
    padding: 10,
    height: '70%',
    backgroundColor: Colors.lightTan,
    borderRadius: 15,
  },
  description: {
    marginTop: 25,
    padding: 10,
    height: '25%',
    backgroundColor: Colors.lightTan,
    borderRadius: 15,
  },
  rowText:{
    flexDirection:'row'
  },
  text: {
    fontFamily: 'montserat',
    fontSize: 18,
    marginTop: 10,
  },
  textTitle:{
    fontFamily:'montserat-bold',
    fontSize:20,
    marginTop:10,
    color: Colors.text
  }
});

export default AdminPropertyDetails;
