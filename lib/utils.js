// 4 digits number

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

export const addUpload = (req) => {
  return `uploads/${req.file.filename}`;
};
export const removeUpload = (path) => {
  return path.toString().replace("uploads/", "");
};
export const getFilePath = (req) => {
  return req?.file?.path;
};
