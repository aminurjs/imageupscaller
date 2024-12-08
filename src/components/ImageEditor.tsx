import React, { FC } from "react";
import Image from "next/image";

interface ImageEditorProps {
  beforeImage: string;
  afterImage: string;
}

const ImageEditor: FC<ImageEditorProps> = ({ beforeImage, afterImage }) => {
  return (
    <div className="flex flex-col items-center mt-6">
      <div className="relative w-full max-w-2xl">
        <div className="flex items-center">
          <div className="w-1/2 relative">
            <Image
              src={beforeImage}
              alt="Before"
              layout="responsive"
              width={500}
              height={500}
              className="rounded-md"
            />
            <p className="absolute top-2 left-2 bg-gray-700 text-white px-2 py-1 text-sm">Before</p>
          </div>
          <div className="w-1/2 relative">
            <Image
              src={afterImage}
              alt="After"
              layout="responsive"
              width={500}
              height={500}
              className="rounded-md"
            />
            <p className="absolute top-2 right-2 bg-gray-700 text-white px-2 py-1 text-sm">After</p>
          </div>
        </div>
        <div className="absolute inset-x-0 top-1/2 transform -translate-y-1/2 flex justify-center">
          <div className="w-6 h-6 bg-white border-2 border-gray-400 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default ImageEditor;
