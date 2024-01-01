import firebase from 'firebase/compat/app'

export default interface Iclip{
    docId?: string;
    uid: string;
    displayName:  string;
    title:  string;
    fileName: string;
    url: string;
    screenshotUrl: string;
    screenshotFilename: string;
    timestamp: firebase.firestore.FieldValue;

}