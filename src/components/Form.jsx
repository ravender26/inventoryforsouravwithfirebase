import { useEffect, useState } from 'react';
import {
  collection,
  addDoc,
  getFirestore,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
  setDoc,
} from 'firebase/firestore';
import { storage } from 'firebase/storage';
import { getStorage, ref } from "firebase/storage";

const Form = () => {
  const storage = getStorage();
  const [images,setImages]= useState(null);
  const [firebaseData, setFirebaseData] = useState([]);
  const [categoryArray, setCategoryArray] = useState([
    'irem1',
    'item2',
    'item3',
    'item4',
  ]);
  const [subCategoryArray, setSubCategoryArray] = useState([
    'irem11',
    'item22',
    'item33',
    'item44',
  ]);
  const [items, setItems] = useState({
    category: '',
    subCategory: '',
    itemName: '',
    quanTity: '',
    hsnCode: '',
    taxSlab: '',
    mrp: '',
    discount: '',
    purchasePrice: '',
    salePrice: '',
    onSale: '',
    showOnWebsite: '',
    itemComeOnBilling: '',
    image: '',
  });
  const [updateItemState, setUpdateItemState] = useState({
    category: 'test1',
    subCategory: 'test',
    itemName: 'test',
    quanTity: 'test',
    hsnCode: 'test',
    taxSlab: 'test',
    mrp: 'test',
    discount: 'test',
    purchasePrice: 'test',
    salePrice: 'test',
    onSale: 'test',
    showOnWebsite: 'test',
    itemComeOnBilling: 'test',
    image: 'test',
  });

  useEffect(() => {
    console.log('firebaseData: ', firebaseData);
    seeData();
  }, []);

  const db = getFirestore();
  const writeUserData = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, 'items'), {
        category: items.category,
        subCategory: items.subCategory,
        itemName: items.itemName,
        quanTity: items.quanTity,
        hsnCode: items.hsnCode,
        taxSlab: items.taxSlab,
        mrp: items.mrp,
        discount: items.discount,
        purchasePrice: items.purchasePrice,
        salePrice: items.salePrice,
        onSale: items.onSale,
        showOnWebsite: items.showOnWebsite,
        itemComeOnBilling: items.itemComeOnBilling,
        image: items.image,
      });
      console.log('Document written with ID: ', docRef.id);
    } catch (e) {
      console.error('Error adding document: ', e);
    }
    setItems({
      category: '',
      subCategory: '',
      itemName: '',
      quanTity: '',
      hsnCode: '',
      taxSlab: '',
      mrp: '',
      discount: '',
      purchasePrice: '',
      salePrice: '',
      onSale: '',
      showOnWebsite: '',
      itemComeOnBilling: '',
      image: '',
    });
    seeData();
  };

  const handleUploadChange = (e) => {
   console.log("upload", e.target.files);
   if(e.target.files[0]){
     setImages(e.target.files[0])
   }
  };
  const handleUpload = () => {
    console.log("upload", images);
    // const storage = storage();
    // const uploadTask = storage.ref(`images/${image.name}`).put(image);
    // uploadTask.on(
    //   "stage_changed",
    //   snapshot => {},
    //   error => {
    //     console.log("error");
    //   },
    //   () => {
    //     .ref("images")
    //     .child(image.name)
    //       .getDownloadURL()
    //       .then(url => {
    //         console.log(url)
    //       })
    //   }
    // )
   }

  const deleteItem = async (key) => {
    console.log('delete', key);
    await deleteDoc(doc(db, 'items', key));
  };

  const updateItem = async (items) => {
    const newData = doc(db, 'items', items.key);
    await updateDoc(newData, { ...updateItemState });
  };

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

  const handleChange = (e) => {
    setItems({
      ...items,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <h1>form</h1>
      <form onSubmit={writeUserData}>
        <label>Category :</label>
        <select
          onChange={handleChange}
          required
          value={items.category}
          name="category"
        >
          {categoryArray.map((category, i) => {
            return <option required value={category}>{category}</option>;
          })}
        </select>

        {/*<input
          type="text"
          value={items.category}
          placeholder="Category"
          required
          name="category"
          onChange={handleChange}
        />*/}

        <br />
        <label>Sub Category :</label>
        <select
          onChange={handleChange}
          required
          value={items.subCategory}
          name="subCategory"
        >
          {subCategoryArray.map((subCategory, i) => {
            return <option value={subCategory}>{subCategory}</option>;
          })}
        </select>
        {/*<input
          type="text"
          value={items.subCategory}
          placeholder="Sub Category"
          required
          name="subCategory"
          onChange={handleChange}
        />*/}
        <br />
        <label>Item Name :</label>
        <input
          type="text"
          placeholder="Item Name"
          required
          value={items.itemName}
          name="itemName"
          onChange={handleChange}
        />
        <br />
        <label>QuanTity :</label>
        <input
          type="text"
          placeholder="QuanTity"
          required
          value={items.quanTity}
          name="quanTity"
          onChange={handleChange}
        />
        <br />
        <label>HSN Code :</label>
        <input
          type="text"
          placeholder="HSN Code"
          required
          value={items.hsnCode}
          name="hsnCode"
          onChange={handleChange}
        />
        <br />
        <label>Tax Slab :</label>
        <input
          type="text"
          placeholder="Tax Slab"
          required
          value={items.taxSlab}
          name="taxSlab"
          onChange={handleChange}
        />
        <br />
        <label>MRP :</label>
        <input
          placeholder="MRP"
          required
          type="text"
          value={items.mrp}
          name="mrp"
          onChange={handleChange}
        />
        <br />
        <label>Discount :</label>
        <input
          placeholder="Discount"
          required
          type="text"
          value={items.discount}
          name="discount"
          onChange={handleChange}
        />
        <br />
        {/*<label>Discount :</label>
        <input
          placeholder="Discount"
          required
          type="text"
          value={items.discount}
          name="Discount"
          onChange={handleChange}
        />
        <br />*/}
        <label>Purchase Price :</label>
        <input
          placeholder="Purchase Price"
          required
          type="text"
          value={items.purchasePrice}
          name="purchasePrice"
          onChange={handleChange}
        />
        <br />
        <label>Sale price :</label>
        <input
          placeholder="Sale price"
          required
          type="text"
          value={items.salePrice}
          name="salePrice"
          onChange={handleChange}
        />
        <br />
        <label>On Sale :</label>
        <select
          onChange={handleChange}
          required
          value={items.onSale}
          name="onSale"
        >
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
        {/*} <input
          placeholder="On Sale"
          required
          type="text"
          value={items.onSale}
          name="onSale"
          onChange={handleChange}
      />*/}
        <br />
        <label>Show on website :</label>
        <select
        onChange={handleChange}
        required
        value={items.showOnWebsite}
        name="showOnWebsite"
      >
        <option value="true">Yes</option>
        <option value="false">No</option>
      </select>
        {/*<input
          placeholder="Show on website"
          required
          type="text"
          value={items.showOnWebsite}
          name="showOnWebsite"
          onChange={handleChange}
        />*/}
        <br />
        <label>Item come on billing :</label>
        <select
        onChange={handleChange}
        required
        value={items.itemComeOnBilling}
        name="itemComeOnBilling"
      >
        <option value="true">Yes</option>
        <option value="false">No</option>
      </select>
        {/*<input
          placeholder="Item come on billing"
          required
          type="text"
          value={items.itemComeOnBilling}
          name="itemComeOnBilling"
          onChange={handleChange}
        />*/}
        <br />
        <label>Image :</label>
        <input
          placeholder="Image"
          required
          type="text"
          value={items.image}
          name="image"
          onChange={handleChange}
        />
        <br />
        <br />
        <input type="file" onchange={handleUploadChange}/>
        <button type="submit">Add Item</button>
        </form>

        <button onClick={handleUpload}>upload</button>

      <br />

      {firebaseData.map((items, key) => {
        return (
          <div className="itemBorder" key={key}>
            <p>{items.key}</p>
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
            <button onClick={() => updateItem(items)}>Edit</button>
            <button onClick={() => deleteItem(items.key)}>Delete</button>
          </div>
        );
      })}
    </div>
  );
};

export default Form;
