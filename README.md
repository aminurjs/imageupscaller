# Image Upscaler Web App

A web application that allows users to upload images for automatic upscaling. The app supports drag-and-drop and file upload features, providing an intuitive and seamless experience. After processing the image using the AI-powered upscaling service, users can preview the results and download the enhanced image.

## Features

- **Drag-and-Drop Upload**: Drop an image directly into the upload area for processing.
- **File Upload**: Select an image file from your device using the file input.
- **Image Upscaling**: Automatically upscale images using AI technology.
- **Preview**: View the upscaled image before downloading.
- **Download**: Download the upscaled image directly to your device.
- **Progress Indicator**: Visualize the upload and processing progress.
- **Responsive Design**: Works on all devices including mobile and desktop.

## Installation

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (version 12 or higher)
- [npm](https://www.npmjs.com/) (Node Package Manager)

### Steps to Install

1. Clone the repository:

   ```bash
   git clone https://github.com/aminurjs/imageupscaller.git
   cd image-upscaler-app
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open your browser and visit `http://localhost:3000` to see the app in action.

## Usage

1. **Upload an image**: You can either drag and drop an image into the designated area or click the "Upload Image" button to select a file from your device.
2. **Wait for processing**: Once the image is uploaded, it will be processed by the AI upscaling service. A progress bar will show the current processing status.
3. **Preview the result**: After processing, the upscaled image will be displayed.
4. **Download the image**: Click the "Download" button below the image to save the enhanced version.

## API Integration

The app integrates with the **AI Image Upscaler** API to upscale images. Ensure you have a valid API key and set it up in the `api` folder or environment variables to enable the image processing functionality.

## Technologies Used

- **Next.js**: Framework for building the React-based app.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Axios**: HTTP client for making API requests.
- **FileSaver.js**: Library for saving files on the client-side.

## Topics

- image upscaling
- web app
- drag-and-drop upload
- file upload
- AI-powered image processing
- download image

## License

MIT License. See the [LICENSE](LICENSE) file for more details.
