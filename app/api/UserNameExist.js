import { getDatabase, ref, get, set } from 'firebase/database';
import fireBaseApp from './Firebase';
import { getFirestore, where, query, getDocs, collection } from 'firebase/firestore';

async function UserNameExist(username) {

      const db = getDatabase(fireBaseApp);
      const fs = getFirestore(fireBaseApp);
      const q = query(collection(fs, 'users'), where("username", "==", username));
      const querySnapshot = await getDocs(q);
      if (querySnapshot.size > 0){
        console.log("username", querySnapshot.docs[0].data());
        return true;
      }else{
        return false;
      }
      // const usersRef = ref(db, 'users');
      // const snapshot = await get(usersRef);
    
      // if (snapshot.exists()) {
      //   const users = snapshot.val();
      //   console.log(users);
      //   var res = Object.values(users).some((user) => user.username === username)
      //   console.log("return username", res);
      //   if(res){
      //     return true;
      //   }else{
      //     return false;
      //   }
      // }else{
      //   return false;
      // }
    
    }

export default UserNameExist;