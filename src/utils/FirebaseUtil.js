import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { collection, deleteDoc, doc, getDocs, getFirestore, setDoc } from "firebase/firestore";
import { uuid } from 'uuidv4';

export function firebaseConfig (){
    const config = {
        apiKey: "AIzaSyCzU87CBqPnvCTiVL_9v-s4KIYZGn5XSRg",
        authDomain: "sistema-ed223.firebaseapp.com",
        projectId: "sistema-ed223",
        storageBucket: "sistema-ed223.appspot.com",
        messagingSenderId: "779141169917",
        appId: "1:779141169917:web:3e0406c7beae42e470f494",
        measurementId: "G-VFX67P9977"
      };
      
      // Initialize Firebase
      const app = initializeApp(config);
      const analytics = getAnalytics(app);
}

export function firebaseRegistrarUsuario(email, password) {
    createUserWithEmailAndPassword(getAuth(), email, password)
      .then(credenciales => {
      })
  }
  
  export async function firebaseIniciarSesion(email, password) {
    try {
      let credenciales = await signInWithEmailAndPassword(getAuth(), email, password);
      //credenciales.user
    } catch (e) {
      return false;
    }
    return true;
  }
  
  export async function firebaseBuscar(coleccionABuscar) {
    let listado = [];
    let consulta = collection(getFirestore(), coleccionABuscar);
    let resultado = await getDocs(consulta);
    resultado.forEach(documento => {
      let objeto = documento.data();
      objeto.id = documento.id;
      listado.push(objeto);
    });
    return listado;
  }
  
  export function firebaseCrear(coleccion, objeto) {
    objeto.id = uuid();
    let referencia = doc(getFirestore(), coleccion, objeto.id);
    setDoc(referencia, objeto);
  }
  
  export async function firebaseEliminar(coleccion, id) {
    await deleteDoc(doc(getFirestore(), coleccion, id));
  }


