import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useState } from "react";

export default function useFirebaseFile({ setValue, getValues }) {
  const [progress, setProgress] = useState(0);
  const [file, setFile] = useState("");
  const [nameFile, setNameFile] = useState("");
  if (!setValue || !getValues) return;

  const handleUploadFile = (file) => {
    const storage = getStorage();
    const storageRef = ref(storage, "upload-pdf/" + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progressPercent =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progressPercent);
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            console.log("Nothing at all");
        }
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          setFile(downloadURL);
        });
      }
    );
  };

  const handleSelectFile = (e) => {
    const file = e.target.files[0];
    console.log("file: ", file);
    if (!file) return;
    setValue("file_name", file.name);
    setNameFile(file.name);
    handleUploadFile(file);
  };

  const handleDeleteFile = () => {
    const storage = getStorage();
    const fileRef = ref(storage, "upload-pdf/" + getValues("file_name"));
    deleteObject(fileRef)
      .then(() => {
        console.log("Remove image successfully");
        setFile("");
        setProgress(0);
      })
      .catch((error) => {
        console.log("Can not delete file");
      });
  };
  return {
    file,
    setFile,
    nameFile,
    progress,
    setProgress,
    handleSelectFile,
    handleDeleteFile,
  };
}
