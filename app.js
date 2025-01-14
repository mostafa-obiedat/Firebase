import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    updateDoc,
    doc,
    deleteDoc,
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCHLXurvQfxcUZbx-HsYbEGE7bcvWntzEk",
    authDomain: "testfirbase-f173c.firebaseapp.com",
    projectId: "testfirbase-f173c",
    storageBucket: "testfirbase-f173c.firebasestorage.app",
    messagingSenderId: "567750117685",
    appId: "1:567750117685:web:53a67981fee8768da1a47c",
    measurementId: "G-3DKVN6MT37"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// DOM Elements
const productForm = document.getElementById('create-product-form');
const productList = document.getElementById('product-list');

// Product Constructor
class Product {
    constructor(id, title, price, description, image, isDeleted = false) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.description = description;
        this.image = image;
        this.isDeleted = isDeleted;
    }

    render() {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="${this.image}" alt="${this.title}">
            <h3>${this.title}</h3>
            <p>Price: $${this.price}</p>
            <p>${this.description}</p>
            <button class="delete" data-id="${this.id}">Delete</button>
            <button class="update" data-id="${this.id}">Update</button>
        `;
        productList.appendChild(card);
    }
}

// Fetch and Render Products
const fetchProducts = async () => {
    productList.innerHTML = '';
    const querySnapshot = await getDocs(collection(db, "products"));

    // Use map to process the documents
    const products = querySnapshot.docs
        .map(doc => {
            const data = doc.data();
            if (!data.isDeleted) {
                return new Product(doc.id, data.title, data.price, data.description, data.image);
            }
            return null; // Return null for deleted products
        })
        .filter(product => product !== null); // Filter out null values (deleted products)

    // Render each product
    products.map(product => product.render());
};


// Create Product
productForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = document.getElementById('product-title').value;
    const price = document.getElementById('product-price').value;
    const description = document.getElementById('product-description').value;
    const image = document.getElementById('product-image').value;

    try {
        await addDoc(collection(db, "products"), {
            title,
            price: parseFloat(price),
            description,
            image,
            isDeleted: false
        });
        alert("Product added successfully!");
        productForm.reset();
        fetchProducts();
    } catch (error) {
        console.error("Error adding product:", error);
        alert("Failed to add product. Check the console for details.");
    }
});

// Update Product
productList.addEventListener('click', async (e) => {
    if (e.target.classList.contains('update')) {
        const id = e.target.dataset.id;
        const newTitle = prompt("Enter new title:");
        if (newTitle) {
            const docRef = doc(db, "products", id);
            await updateDoc(docRef, { title: newTitle });
            fetchProducts();
        }
    }
});

// Delete Product
productList.addEventListener('click', async (e) => {
    if (e.target.classList.contains('delete')) {
        const id = e.target.dataset.id;
        const docRef = doc(db, "products", id);
        await deleteDoc(docRef, { isDeleted: true });
        fetchProducts();
    }
});

fetchProducts();






//Authentication

// import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
// import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

// const firebaseConfig = {
//     apiKey: "AIzaSyCHLXurvQfxcUZbx-HsYbEGE7bcvWntzEk",
//     authDomain: "testfirbase-f173c.firebaseapp.com",
//     projectId: "testfirbase-f173c",
//     storageBucket: "testfirbase-f173c.firebasestorage.app",
//     messagingSenderId: "567750117685",
//     appId: "1:567750117685:web:53a67981fee8768da1a47c",
//     measurementId: "G-3DKVN6MT37"
// };

// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);

// const userEmail = document.querySelector("#userEmail");
// const userPassword = document.querySelector("#userPassword");
// const authForm = document.querySelector("#auth-form");
// const secretContent = document.querySelector("#secretContent");
// const signUpBtn = document.querySelector("#signUpBtn");
// const signInBtn = document.querySelector("#signInBtn");
// const signOutBtn = document.querySelector("#signOutBtn");

// const userSignUp = async () => {
//     try {
//         const userCredential = await createUserWithEmailAndPassword(auth, userEmail.value, userPassword.value);
//         alert("Account created!");
//         console.log(userCredential.user);
//     } catch (error) {
//         console.error(error.message);
//     }
// };

// const userSignIn = async () => {
//     try {
//         const userCredential = await signInWithEmailAndPassword(auth, userEmail.value, userPassword.value);
//         alert("Signed in successfully!");
//         console.log(userCredential.user);
//     } catch (error) {
//         console.error(error.message);
//     }
// };

// const userSignOut = async () => {
//     await signOut(auth);
//     alert("Signed out!");
// };

// const checkAuthState = () => {
//     onAuthStateChanged(auth, user => {
//         if (user) {
//             authForm.style.display = "none";
//             secretContent.style.display = "block";
//         } else {
//             authForm.style.display = "block";
//             secretContent.style.display = "none";
//         }
//     });
// };

// checkAuthState();

// signUpBtn.addEventListener("click", userSignUp);
// signInBtn.addEventListener("click", userSignIn);
// signOutBtn.addEventListener("click", userSignOut);