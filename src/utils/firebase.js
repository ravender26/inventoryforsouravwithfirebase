import { initializeApp, getApps } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyABwjwlmcjjCahv6RrspmowKP3uz-Xt2Sc",
  authDomain: "inventory-for-shop.firebaseapp.com",
  databaseURL: "https://inventory-for-shop-default-rtdb.firebaseio.com",
  projectId: "inventory-for-shop",
  storageBucket: "inventory-for-shop.appspot.com",
  messagingSenderId: "333206895722",
  appId: "1:333206895722:web:687403e5b94f8a75775e13"
};

if (getApps().length === 0){

  initializeApp(firebaseConfig);
}

initializeApp(firebaseConfig);


