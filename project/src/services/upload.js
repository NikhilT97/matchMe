import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { app } from "./firebase";
import { v4 as uuidv4 } from "uuid";

const storage = getStorage(app);

export const uploadUserImage = async (uid, file) => {
  const fileRef = ref(storage, `users/${uid}/pictures/${uuidv4()}-${file.name}`);
  await uploadBytes(fileRef, file);
  return await getDownloadURL(fileRef);
};
