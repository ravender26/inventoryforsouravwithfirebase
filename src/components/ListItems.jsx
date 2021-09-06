import { useEffect, useState } from 'react';
import {
  collection,
  addDoc,
  getFirestore,
  getDocs,
  doc,
  deleteDoc,
} from 'firebase/firestore';

const Form = () => {
  const [firebaseData, setFirebaseData] = useState([]);


  useEffect(() => {
    console.log('firebaseData: ', firebaseData);
    seeData();
  }, [firebaseData]);

  const db = getFirestore();

  const seeData = async () => {
    const querySnapshot = await getDocs(collection(db, 'items'));
    const tempArray = [];
    querySnapshot.forEach((doc) => {
      console.log('jashdkjhd', `${doc.id} => ${doc.data()}`);
      console.log('test', doc.data());
      const document = { key: doc.id, data: doc.data() };
      tempArray.push(document);
    });
    setFirebaseData(tempArray);
  };

  return (
    <div>
      {firebaseData.map((items) => {
        return (
          <div className="itemBorder">
            <p>{items.data.category}</p>
            <p>{items.data.subCategory}</p>
            <p>{items.data.itemName}</p>
            <p>{items.data.quanTity}</p>
            <p>{items.data.hsnCode}</p>
            <p>{items.data.taxSlab}</p>
            <p>{items.data.mrp}</p>
            <p>{items.data.discount}</p>
            <p>{items.data.purchasePrice}</p>
            <p>{items.data.salePrice}</p>
            <p>{items.data.onSale}</p>
            <p>{items.data.showOnWebsite}</p>
            <p>{items.data.itemComeOnBilling}</p>
            <p>{items.data.image}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Form;
