import { getDatabase, ref, get, set } from 'firebase/database';
import fireBaseApp from './Firebase';
import { getFirestore , query, where, getDocs, collection } from 'firebase/firestore';

async function EmailExists(email) {

      const db = getDatabase(fireBaseApp);
      const fs = getFirestore(fireBaseApp);
      const q = query(collection(fs, 'users'), where('email', '==', email));
    
    // Execute the query and get the snapshot
    const querySnapshot = await getDocs(q);

    // Check if there is a matching document
      if (querySnapshot.size > 0) {
    // console.log("data",querySnapshot.docs[0].data());

        return true;
      }else{
        return false;
      }
      // const usersRef = ref(db, 'users');
      // const snapshot = await get(usersRef);
    
      // if (snapshot.exists()) {
      //   const users = snapshot.val();
      //   console.log(users);
      //   var res = Object.values(users).some((user) => user.email === email)
      //   console.log("return", res);
      //   if(res){
      //     return true;
      //   }else{
      //     return false;
      //   }
      // }else{
      //   return false;
      // }
    
    }

export default EmailExists;