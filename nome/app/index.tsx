import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
 
const firebaseConfig = {
  apiKey: "AIzaSyDxrFCgPAQ-fr_7R8iix-ZtA7tc5wHZgig",
  authDomain: "meuprimeirofirebase-cf68f.firebaseapp.com",
  projectId: "meuprimeirofirebase-cf68f",
  storageBucket: "meuprimeirofirebase-cf68f.appspot.com",
  messagingSenderId: "709282883024",
  appId: "1:709282883024:web:979ea8e879071ad5c545d5"
};
 
 
firebase.initializeApp(firebaseConfig);
 
 
import React, {useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
 
export default function App(){
  const [nomes, setNomes] = useState([]);
 
  useEffect(() => {
    const fetchData = async () => {
      const nomesCollection = firebase.firestore(). collection ('Nomes');
      const snapshot = await nomesCollection.get();
      const data = [];
      snapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data()});
      });
 
      setNomes(data);
    };
 
    fetchData();
 
  }, []);
 
  return (
    <view style={{ flex: 1, justifyContent: 'center', alignItems:'center'}}>
      <Text>Lista de Nomes:</Text>
      <FlatList
        data={nomes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <Text>{item.Nome} {item.Sobrenome}</Text>
          </View>
        )}
      />
    </view>
  );
}
 