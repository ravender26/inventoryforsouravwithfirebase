import { useEffect, useState } from 'react';
import {
  collection,
  addDoc,
  getFirestore,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
// import AlertForm from './Alert';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import ItemCard from "./Card";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const Form = () => {
  const classes = useStyles();
  var storage = getStorage();
  const db = getFirestore();
  const [open, setOpen] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [imageName, setImageName] = useState('');
  const [imageURl, setImageUrl] = useState('');
  const [images, setImages] = useState(null);
  const [firebaseData, setFirebaseData] = useState([]);
  const [categoryArray, setCategoryArray] = useState([
    'item1',
    'item2',
    'item3',
    'item4',
  ]);
  const [subCategoryArray, setSubCategoryArray] = useState([
    'item11',
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
    imageURL: '',
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
    imageURL: 'test',
  });

  useEffect(() => {
    seeData();
  }, []);

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
        imageURL: items.imageURL,
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
      imageURL: '',
    });
    seeData();
    setImageUrl('');
    setShowButton(!showButton);
  };

  const handleUploadChange = (e) => {
    if (e.target.files[0]) {
      setImages(e.target.files[0]);
    }
  };

  const handleUpload = (e) => {
    e.preventDefault();
    let file = images;
    let a = file.name;
    setImageName(a);
    console.log('file name', a);
    var storageRef = ref(storage, 'folder/' + file.name);
    // 'file' comes from the Blob or File API
    uploadBytes(storageRef, file).then((snapshot) => {
      console.log('Uploaded a blob or file!');
      setShowButton(true);
      setImageName(snapshot.metadata.name);
    });
  };
  useEffect(() => {
    getDownloadURL(ref(storage, `folder/${imageName}`)).then((url) => {
      setImageUrl(url);
    });
  }, [imageName]);

  useEffect(() => {
    console.log('Uploaded a blob or file!', imageName, imageURl);
    setItems({
      ...items,
      imageURL: imageURl,
    });
  }, [imageURl]);

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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setShowButton(false);
  };

  return (
    <div>
      <div>
        <Button variant="outlined" color="primary" onClick={handleClickOpen}>
          Add New Item
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Add Item</DialogTitle>
          <DialogContent>
            <form onSubmit={writeUserData}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel id="demo-simple-select-outlined-label">
                    Category
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    label="category"
                    onChange={handleChange}
                    required
                    value={items.category}
                    name="category"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {categoryArray.map((category, i) => {
                      return <MenuItem value={category}> {category}</MenuItem>;
                    })}
                  </Select>
                </FormControl>

                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel id="demo-simple-select-outlined-label">
                    Sub Category
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    label="subCategory"
                    onChange={handleChange}
                    required
                    value={items.subCategory}
                    name="subCategory"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {subCategoryArray.map((subCategory, i) => {
                      return (
                        <MenuItem value={subCategory}> {subCategory}</MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </div>

              <br />

              <input type="file" onChange={handleUploadChange} />
              <Button variant="contained" color="primary" onClick={handleUpload}>upload</Button>

              <br />
              <TextField
                label="Item Name"
                variant="outlined"
                type="text"
                required
                value={items.itemName}
                name="itemName"
                onChange={handleChange}
              />
              <br />
              <TextField
                label="QuanTity"
                variant="outlined"
                type="text"
                required
                value={items.quanTity}
                name="quanTity"
                onChange={handleChange}
              />

              <br />

              <TextField
                label="HSN Code"
                variant="outlined"
                type="text"
                required
                value={items.hsnCode}
                name="hsnCode"
                onChange={handleChange}
              />

              <br />
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">
                  Tax Slab
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  label="Tax Slab"
                  onChange={handleChange}
                  required
                  value={items.taxSlab}
                  name="taxSlab"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={5}>5</MenuItem>
                  <MenuItem value={12}>12</MenuItem>
                  <MenuItem value={18}>18</MenuItem>
                  <MenuItem value={28}>28</MenuItem>
                </Select>
              </FormControl>

              <br />
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <TextField
                  variant="outlined"
                  label="MRP"
                  required
                  type="text"
                  value={items.mrp}
                  name="mrp"
                  onChange={handleChange}
                />

                <br />
                <TextField
                  variant="outlined"
                  label="Discount"
                  required
                  type="text"
                  value={items.discount}
                  name="discount"
                  onChange={handleChange}
                />
              </div>

              <br />
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <TextField
                  variant="outlined"
                  label="Purchase Price"
                  required
                  type="text"
                  value={items.purchasePrice}
                  name="purchasePrice"
                  onChange={handleChange}
                />

                <br />
                <TextField
                  variant="outlined"
                  label="Sale price"
                  required
                  type="text"
                  value={items.salePrice}
                  name="salePrice"
                  onChange={handleChange}
                />
              </div>

              <br />
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel id="demo-simple-select-outlined-label">
                    On Sale
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    label="On Sale"
                    onChange={handleChange}
                    required
                    value={items.onSale}
                    name="onSale"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={true}>Yes</MenuItem>
                    <MenuItem value={false}>No</MenuItem>
                  </Select>
                </FormControl>

                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel id="demo-simple-select-outlined-label">
                    Show on website
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    label="showOnWebsite"
                    onChange={handleChange}
                    required
                    value={items.showOnWebsite}
                    name="showOnWebsite"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={true}>Yes</MenuItem>
                    <MenuItem value={false}>No</MenuItem>
                  </Select>
                </FormControl>
              </div>

              <br />

              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">
                  Item come on billing
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  label="itemComeOnBilling"
                  onChange={handleChange}
                  required
                  value={items.itemComeOnBilling}
                  name="itemComeOnBilling"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={true}>Yes</MenuItem>
                  <MenuItem value={false}>No</MenuItem>
                </Select>
              </FormControl>

              <br />

              <br />
              {showButton ? (
                <Button type="submit" color="primary">
                  Add Item
                </Button>
              ) : (
                ''
              )}

              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
            </form>
          </DialogContent>
          <DialogActions></DialogActions>
        </Dialog>
      </div>

      {firebaseData.map((items, key) => {
        return (
          <div className="itemBorder" key={key}>
          <ItemCard items={items} />
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
