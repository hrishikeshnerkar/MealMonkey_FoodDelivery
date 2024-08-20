import { getApp, getApps, initializeApp } from 'firebase/app';
import { getFirestore} from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyByo8unep9IYSlKI0qlKrJImkiGw6AfSrM",
    authDomain: "restaurantapp-6ee8d.firebaseapp.com",
    databaseURL: "https://restaurantapp-6ee8d-default-rtdb.firebaseio.com",
    projectId: "restaurantapp-6ee8d",
    storageBucket: "restaurantapp-6ee8d.appspot.com",
    messagingSenderId: "491076022436",
    appId: "1:491076022436:web:c9e8bca65306fb302d3631",
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, firestore, storage };