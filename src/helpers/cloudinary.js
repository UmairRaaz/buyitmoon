import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
});

export const uploads = async (file, folder) => {
    const arraybuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arraybuffer)
    // const bytes = Buffer.from(buffer);
    return await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
            {
                resource_type: "auto",
                folder: folder,
            },
            async (err, result) => {
                if (err) {
                    console.error("Cloudinary upload error:", err);
                    reject(err.message);
                    return
                }
                console.log("Cloudinary upload result:", result);
                 resolve(result);
            }
        ).end(buffer);
    });
};


