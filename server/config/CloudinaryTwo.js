const cloudinary = require('cloudinary').v2;
const fs = require('fs');

cloudinary.config({
    cloud_name: 'dlmjkprba',
    api_key: '516442183868363',
    api_secret: '0h5n9KPUr7CSztPQMY0HiKPIifs'
});
const uploadOnCloudinaryTwo = async (localFilePaths) => {
    try {
      if (!localFilePaths || localFilePaths.length === 0) return null;
  
      // Upload all images concurrently using Promise.all
      const uploadPromises = localFilePaths.map((filePath) =>
        cloudinary.uploader
          .upload(filePath, {
            resource_type: "auto",
            folder: "IMAGES",
            transformation: [
              {
                width: 800,
                height: 600,
                crop: "limit",
                quality: "auto",
                fetch_format: "auto",
              },
            ],
          })
          .then((res) => {
            console.log(`✅ File uploaded: ${res.secure_url}`);
            fs.unlinkSync(filePath); // Delete local file after upload
            return res.secure_url;
          })
          .catch((err) => {
            console.error(`❌ Upload failed for ${filePath}:`, err);
            if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
            return null; // Return null for failed uploads
          })
      );
  
      // Wait for all uploads to complete
      const uploadedUrls = await Promise.all(uploadPromises);
      
      // Filter out null values (failed uploads)
      return uploadedUrls.filter((url) => url !== null);
    } catch (error) {
      console.error("❌ Cloudinary Upload Error:", error);
      return null;
    }
  };

module.exports = uploadOnCloudinaryTwo;