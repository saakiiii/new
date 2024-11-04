import fireBaseApp from './Firebase';
import { getFirestore , query, where, getDocs, collection, addDoc, getDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';

const fs = getFirestore(fireBaseApp);

export function addDocument(collection_, data, collection_1, code){
    addDoc(collection(fs, collection_), data)
        .then((docRef) => {
            console.log('Document added with ID:', docRef.id);
            if(collection_ == "baseworks"){
                addDoc(collection(fs, "sourcecodes"), {"baseid":data["baseid"], "code":""}).then((docRef)=>{console.log(docRef.id)})
            }
        })
        .catch((error) => {
            console.error('Error adding document:', error);
        });
}

export async function getDocuments(collection_, username){
    const q = query(collection(fs, collection_), where("created_by", "==", username), where("type", "==", 'base'));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.size > 0) {
        // console.log(querySnapshot.docs);
        return querySnapshot.docs;
    }
    else{
        return [];
    }
}

export async function getDocument(collection_, baseid){
    const q = query(collection(fs, collection_), where("baseid", "==", baseid));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.size > 0) {
        // console.log(querySnapshot.docs);
        return querySnapshot.docs[0].data();
    }
    else{
        return [];
    }
}

export async function getDocumentsT(collection_, username){
    const q = query(collection(fs, collection_), where("created_by", "==", username), where("type", "==", 'trash'));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.size > 0) {
        // console.log(querySnapshot.docs);
        return querySnapshot.docs;
    }
    else{
        return [];
    }
}

export async function getUsernameByEmail(collection_, email){
    const q = query(collection(fs, collection_), where('email', '==', email));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.size > 0) {
        // console.log(querySnapshot.docs);
        return querySnapshot.docs[0].data()["username"];
    }
    else{
        return ;
    }
}

export async function getUserdata(collection_, username){
    const q = query(collection(fs, collection_), where('username', '==', username));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.size > 0) {
        // console.log(querySnapshot.docs);
        return querySnapshot.docs[0].data();
    }
    else{
        return ;
    }
}

export async function setCode(collection_, baseid, value){
    const q = query(collection(fs, collection_), where('baseid', '==', baseid));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.size > 0) {
        // Get the reference to the first matching document
        const docRef = querySnapshot.docs[0].ref;
        console.log(docRef);
        // const ref = querySnapshot.ref;
        // Update the field in the document
        await updateDoc(docRef, {"code":value})
        // await docRef.updateDoc({
        //   ["code"]: value
        // });
        return "";
    }
    return "Not stored";
}

export async function getCode(collection_, baseid){
    const q = query(collection(fs, collection_), where('baseid', '==', baseid));
    const querySnapshot = await getDocs(q);
    if(querySnapshot.size > 0){
        return querySnapshot.docs[0].data()["code"];
    }
    else{
        return "not found";
    }
}

export async function deleteBase(collection_, baseid){
    const q = query(collection(fs, collection_), where('baseid', '==', baseid));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.size > 0) {
        // console.log(querySnapshot.docs);
        const docRef = querySnapshot.docs[0].ref;
        console.log(docRef);
        // const ref = querySnapshot.ref;
        // Update the field in the document
        await updateDoc(docRef, {"type":"trash", "deleted_at":new Date()})
        return "ok"
    }
    else{
        return ;
    }
}

export async function recoverBase(collection_, baseid){
    const q = query(collection(fs, collection_), where('baseid', '==', baseid));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.size > 0) {
        // console.log(querySnapshot.docs);
        const docRef = querySnapshot.docs[0].ref;
        console.log(docRef);
        // const ref = querySnapshot.ref;
        // Update the field in the document
        await updateDoc(docRef, {"type":"base"})
        return "ok"
    }
    else{
        return ;
    }
}

export async function sendInvites(collection_, username, baseid){
    const q = query(collection(fs, collection_), where('username', '==', username));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.size > 0) {
        // console.log(querySnapshot.docs);
        const docRef = querySnapshot.docs[0].ref;
        console.log(docRef);
        // const ref = querySnapshot.ref;
        // Update the field in the document
        await updateDoc(docRef, {"invites":arrayUnion(baseid)})
        return "ok";
    }
    else{
        console.log("added");
        addDocument(collection_, {"username":username, invites:[baseid], contributions:[]});
        return ;
    }
}

export async function getInvites(collection_, username){
    const q = query(collection(fs, collection_), where('username', '==', username));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.size > 0) {
        // console.log(querySnapshot.docs);
        const docs = querySnapshot.docs;
        console.log("fs",docs[0].data());
        // const ref = querySnapshot.ref;
        // Update the field in the document
        return docs[0];
    }
    else{
        return ;
    }
}

export async function getBases(collection_, username){
    // console.log(collection_, username);
    const q = query(collection(fs, collection_), where('created_by', '==', username), where("type", "==", "base"));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.size > 0) {
        const docs = querySnapshot.docs;
        console.log("fs",docs[0].data());
        return docs;
    }
    else{
        return ;
    }
}

export async function rejectInvite(collection_, username, baseid){
    const q = query(collection(fs, collection_), where('username', '==', username));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.size > 0) {
        // console.log(querySnapshot.docs);
        const docRef = querySnapshot.docs[0].ref;
        console.log(docRef);
        // const ref = querySnapshot.ref;
        // Update the field in the document
        await updateDoc(docRef, {"invites":arrayRemove(baseid)})
        return "ok";
    }
    else{
        return ;
    }
}

export async function acceptInvite(collection_, baseid, username){
    const q = query(collection(fs, collection_), where("baseid", "==", baseid));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.size > 0) {
        // console.log(querySnapshot.docs);
        const docRef = querySnapshot.docs[0].ref;
        await updateDoc(docRef, {"invites":arrayUnion(username)});
        await rejectInvite("invites", username, baseid);
    }
    else{
        return [];
    }
}

export async function movetoContributions(collection_, username, baseid){
    const q = query(collection(fs, collection_), where('username', '==', username));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.size > 0) {
        // console.log(querySnapshot.docs);
        const docRef = querySnapshot.docs[0].ref;
        console.log(docRef);
        // const ref = querySnapshot.ref;
        // Update the field in the document
        await updateDoc(docRef, {"contributions":arrayUnion(baseid)})
        return "ok";
    }
    else{
        return ;
    }
}