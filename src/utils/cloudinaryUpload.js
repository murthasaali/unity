import axios from "axios";
const uploadToCloudinary = async (file) => {
    console.log(file)
  const form = new FormData();
  form.append("file", file);
  form.append("upload_preset", "products"); // Replace with your upload preset

  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/dskqse6v2/upload`, // Replace {cloud_name} with your actual Cloudinary cloud name
      form
    );

    if (response.status === 200 && response.data.url) {
      return response.data.url;
    } else {
      throw new Error("Failed to upload image to Cloudinary");
    }
  } catch (error) {
    throw new Error("Error during image upload: " + error.message);
  }
};

export default uploadToCloudinary;
