import { getApp, getApps, initializeApp } from 'firebase/app'
import { GoogleAuthProvider, getAuth, signInWithPopup, signOut } from 'firebase/auth'
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
  Timestamp,
  GeoPoint,
  updateDoc,
} from 'firebase/firestore'
import { Expense } from 'types'

const firebaseConfig = {
  apiKey: 'AIzaSyDx0hXBvqwhTAtGJcTPHv6ASjIMwsMtiVo',
  authDomain: 'billow-90246.firebaseapp.com',
  projectId: 'billow-90246',
  storageBucket: 'billow-90246.appspot.com',
  messagingSenderId: '44335454036',
  appId: '1:44335454036:web:49ce99e4a90bd578775ac1',
  measurementId: 'G-WPYQHR39RZ',
}

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const auth = getAuth(app)

const googleProvider = new GoogleAuthProvider()

const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider)
  } catch (err: any) {
    console.error(err)
    alert(err.message)
  }
}

const logout = () => {
  signOut(auth)
}

let email: string | null = null

// get user email
auth.onAuthStateChanged((user) => {
  if (user) {
    // console.log(user.email)
    email = user.email
  }
})

// get all expenses from Expenses collection
const getExpenses = async () => {
  const q = query(collection(getFirestore(app), 'Expenses'))
  const querySnapshot = await getDocs(q)
  querySnapshot.forEach((doc) => {
    // console.log(doc.id, ' => ', doc.data())
  })
}

// get all expenses from Expenses collection where user email is equal to the email of the logged in user
const getExpensesByUser = async () => {
  const q = query(collection(getFirestore(app), 'Expenses'), where('email', '==', email))
  const querySnapshot = await getDocs(q)

  // sort by date (older to newer)
  // date in this format: "2023-04-25"
  querySnapshot.docs.sort((a, b) => {
    const dateA = a.data().date
    const dateB = b.data().date
    return dateA < dateB ? -1 : dateA > dateB ? 1 : 0
  })

  return querySnapshot
}

const uploadExpense = async (expense: Expense) => {
  try {
    const docRef = await addDoc(collection(getFirestore(app), 'Expenses'), {
      name: expense.name,
      date: expense.date,
      price: expense.price,
      type: expense.type,
      status: expense.status,
      email: email,
    })
    // console.log('Document written with ID: ', docRef.id)
  } catch (err: any) {
    // console.error('Error adding document: ', err)
    alert(err.message)
  }
}

export default app
export { signInWithGoogle, logout, auth, getExpenses, getExpensesByUser, uploadExpense }
