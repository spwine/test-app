// Get the video element, canvas, overlay frame, and buttons
const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const snapBtn = document.getElementById("snapBtn");
const downloadBtn = document.getElementById("downloadBtn");
const frame = document.getElementById("overlay");

// Set up the video stream from the camera
navigator.mediaDevices
  .getUserMedia({ video: true })
  .then((stream) => {
    video.srcObject = stream;
  })
  .catch((error) => {
    console.error("Error accessing the camera: ", error);
  });

// Set canvas size to match the frame (348 x 552 px)
canvas.width = 348;
canvas.height = 552;

// Take a photo when the button is clicked
snapBtn.addEventListener("click", () => {
  // Get the canvas context
  const context = canvas.getContext("2d");

  // Draw the current video frame on the canvas
  context.drawImage(video, 0, 0, canvas.width, canvas.height);

  // Load the overlay frame and draw it on top of the video frame
  const frameImage = new Image();
  frameImage.src = frame.src;
  frameImage.onload = () => {
    context.drawImage(frameImage, 0, 0, canvas.width, canvas.height);

    // Hide video and show the canvas
    video.style.display = "none";
    canvas.style.display = "block";
    snapBtn.style.display = "none";
    downloadBtn.style.display = "block";

    // Set the download link with the canvas data
    const dataURL = canvas.toDataURL("image/jpeg");
    downloadBtn.href = dataURL;
    downloadBtn.download = "photo_with_frame.jpg";
    downloadBtn.textContent = "Download Photo";
  };
});
