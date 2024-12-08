"use client";

/* eslint-disable @next/next/no-img-element */
import { useState, useRef } from "react";
import axios from "axios";
import { saveAs } from "file-saver";
type ApiKey = {
  apiKey: string;
};

const DragDropFile = ({ apiKey }: ApiKey) => {
  const [isDragging, setIsDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [processedImages, setProcessedImages] = useState<{ name: string; base64: string }[]>([]);
  const dragCounter = useRef(0);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current += 1;
    if (!isDragging) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current -= 1;
    if (dragCounter.current === 0) {
      setIsDragging(false);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    dragCounter.current = 0;

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      await processFiles(files);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      await processFiles(files);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click(); // Ensure the file input is triggered
  };

  const processFiles = async (files: File[]) => {
    setLoading(true);
    setProgress(0);
    const results: { name: string; base64: string }[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      setProgress(((i + 1) / files.length) * 100);

      try {
        const formData = new FormData();
        formData.append("image", file);

        const options = {
          method: "POST",
          url: "https://ai-image-upscaler1.p.rapidapi.com/v1",
          headers: {
            "x-rapidapi-key": apiKey,
            "x-rapidapi-host": "ai-image-upscaler1.p.rapidapi.com",
            "Content-Type": "multipart/form-data",
          },
          data: formData,
        };

        const response = await axios.request(options);
        results.push({
          name: file.name,
          base64: response.data.result_base64,
        });
        console.log(`File ${file.name} processed successfully:`, response.data);
      } catch (error) {
        console.error(`Error processing file ${file.name}:`, error);
      }
    }

    setProcessedImages(results);
    setLoading(false);
    setProgress(0);
  };

  const downloadImage = (base64: string, name: string) => {
    // Remove the base64 prefix if present (like data:image/jpeg;base64,)
    const base64Data = base64.replace(/^data:image\/[a-z]+;base64,/, "");

    // Decode the base64 data
    const byteCharacters = atob(base64Data); // Decode base64 string

    const byteArray = new Uint8Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteArray[i] = byteCharacters.charCodeAt(i);
    }

    const blob = new Blob([byteArray], { type: "image/jpeg" });
    saveAs(blob, name); // Trigger the download
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className="relative"
    >
      {/* Drag and Drop Overlay */}
      <div
        className={`fixed min-h-screen w-screen inset-0 z-50 bg-black bg-opacity-80 transition flex justify-center lg:p-10 ${
          isDragging ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div className="w-full h-full rounded-xl flex justify-center items-center border-4 border-dashed border-white">
          <p className="text-3xl text-white font-medium">Drop image anywhere</p>
        </div>
      </div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png, image/jpeg"
        multiple
        hidden
        onChange={handleFileChange}
      />

      {/* Content Section */}
      <div className="lg:pt-32 lg:pb-20 pb-8 lg:px-48 px-4 pt-24 bg-white">
        <div className=" p-3 hero-bg lg:block rounded-3xl xl:border-[3px] xl:border-[#7755FF4D]">
          <div className="py-6 dashed-editor rounded-xl gap-4 flex flex-col justify-center items-center">
            <div className="w-64 flex justify-center items-center">
              <button
                onClick={handleButtonClick}
                className="items-center justify-center lg:w-auto w-full h-auto py-3 px-4 bg-[#7755ff] rounded-xl transition text-white hover:bg-[#907ef9] active:bg-[#d9d6fe] border-b border-[#0000001f] focus:outline-none focus:ring-2 focus:ring-[#d9d6fe]"
              >
                <p className="font-extrabold">Upload image</p>
              </button>
            </div>
            <span className="H40B text-[#8c8a94]">
              Drag &amp; drop a file / Ctrl + V to paste image
            </span>
          </div>
        </div>
      </div>

      {/* Loading Indicator */}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-60">
          <div className="text-center">
            <p className="text-white text-xl">Uploading... {Math.round(progress)}%</p>
            <div className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden mt-2">
              <div className="h-full bg-blue-500" style={{ width: `${progress}%` }}></div>
            </div>
          </div>
        </div>
      )}

      {/* Preview Section */}
      {processedImages.length > 0 && (
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">Processed Images</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {processedImages.map((image, index) => (
              <div key={index} className="border p-2 rounded-lg">
                <img
                  src={`data:image/jpeg;base64,${image.base64}`}
                  alt={image.name}
                  className="w-full h-auto rounded-md"
                />
                <p className="text-sm mt-2 truncate">{image.name}</p>
                <button
                  onClick={() => downloadImage(image.base64, image.name)}
                  className="mt-2 py-1 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600"
                >
                  Download
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DragDropFile;
