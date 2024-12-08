import ImageUploader from "@/components/ImageUploader";
import React from "react";

const Home = () => {
  return (
    <div>
      <ImageUploader apiKey={process.env.AI_IMAGE_UPSCALER_API_KEY!} />
    </div>
  );
};

export default Home;
