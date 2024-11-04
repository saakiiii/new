import { NextResponse } from 'next/server'
import fireBaseApp from '../Firebase';
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { getDatabase, ref, set } from 'firebase/database';
import { getFirestore, doc, setDoc, collection, addDoc, } from "firebase/firestore";
import EmailExist from '../EmailExist';
import UserNameExist from '../UserNameExist';

function UserNameValid(input) {
  // Requires only numbers and letters, and a minimum length of 8 characters
  const regex = /^[a-zA-Z0-9]{1,8}$/;
  return regex.test(input);
}

function EmailFormatValid(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function PasswordStrength(password) {
  const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()-_+=])[A-Za-z\d!@#$%^&*()-_+=]{8,}$/;
  // return passwordRegex.test(password);
  return true;
}

export async function POST(request){
  const auth = getAuth(fireBaseApp);
  const db = getDatabase(fireBaseApp);
  const fs= getFirestore(fireBaseApp);
  // const collection = fs.collection("users");
  // const ref = db
  try {
    const {username, email, password, cpassword} = await request.json();
    console.log(username, email, password, cpassword);
    console.log(EmailExist(email));
    console.log(EmailFormatValid(email));
    var errormsg = "";
    const usernameexist = await UserNameExist(username);
    console.log("usernameexist", usernameexist);
    if(UserNameValid(username)){
      if(!usernameexist){
            if (EmailFormatValid(email)){
                console.log("emailexist", );
                const emailexist = await EmailExist(email);
                console.log('emailexist', emailexist)
                if (!emailexist){
                    if(PasswordStrength(password)){ 
                        if (password === cpassword){
                            let result = await createUserWithEmailAndPassword(auth, email, password).then((x)=>{
                              const userid_ = x.user.uid;
                              // const userRef = ref(db, 'users/' + userid_);
                              // set(userRef, {
                              //   username: username,
                              //   email: email,
                              // });
                              // setDoc(doc(fs, "users", userid_), {
                              //   username: username,
                              //   email: email,
                              // });
                              // collection.add({
                              //   username: username,
                              //   email: email,
                              // })
                              addDoc(collection(fs, 'users'), {
                                userId: userid_,
                                username: username,
                                email: email,
                              })
                                  .then((docRef) => {
                                    console.log('Document added with ID:', docRef.id);
                                  })
                                  .catch((error) => {
                                    console.error('Error adding document:', error);
                                  });
                            });
                            return NextResponse.json({ msg: "ok" }, { status: 200 })
                        } 
                        else{
                          errormsg += '<p>Passwords not matching</p>';
                        }
                    }else{
                      errormsg += '<p>Password requires atleast 1 uppercase letter, 1 lowercase letter, 1 digit, 1 special character, min 8 chars';
                    }
                }else{
                  errormsg += '<p>Email already exists</p>';
                }
            }else{
              errormsg += '<p>Not a valid email</p>';
            }
      }else{
        errormsg += '<p>Username not available</p>';
      }
    }else{
      errormsg += '<p>Letters and numbers only available for username</p>';
    }
    // console.log(result.uid);
    // const userid_ = result.user.uid;
    console.log(errormsg);
    return NextResponse.json({ msg: errormsg }, { status: 200 })
  } catch (error) {
    console.error('Error registering user:', error.code);
    if(error.code == "auth/weak-password"){
      return NextResponse.json({ msg: 'Weak password' }, { status: 200 });
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// export async function GET(request) {
//   return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
// }