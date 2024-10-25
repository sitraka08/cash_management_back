// 4 digits number
import fs from "fs";

export const addZero = (num) => {
  if (num < 10) {
    return `000${num}`;
  } else if (num < 100) {
    return `00${num}`;
  } else if (num < 1000) {
    return `0${num}`;
  } else {
    return num;
  }
};

export const filePath = (req) => {
  return `uploads/${req.file?.filename}`;
};
export const removeUpload = (path) => {
  return path.toString().replace("uploads/", "");
};

export const deleteFile = (path) => {
  fs.unlink(path, (err) => {
    if (err) {
      console.error("Error deleting file:", err);
    } else {
      console.log("File deleted due to error");
    }
  });
};
