import { getApp, getApps, initializeApp } from 'firebase/app'
import { GoogleAuthProvider, getAuth, signInWithPopup, signOut } from 'firebase/auth'

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

export default app
export { signInWithGoogle, logout, auth }
