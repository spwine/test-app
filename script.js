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

// Take a photo when the button is clicked
snapBtn.addEventListener("click", () => {
  // Set canvas dimensions to match the frame
  canvas.width = 300;
  canvas.height = 762.71;

  // Get the canvas context
  const context = canvas.getContext("2d");

  // Draw the current video frame on the canvas
  context.drawImage(video, 0, 0, 300, 762.71);

  // Load the overlay frame and draw it on top of the video frame
  const frameImage = new Image();
  frameImage.src = document.getElementById("overlay").src;
  frameImage.onload = () => {
    context.drawImage(frameImage, 0, 0, 300, 762.71);

    // Show the canvas and hide the video
    video.style.display = "none";
    video.style.opacity = "0";
    canvas.style.display = "block";
    snapBtn.style.display = "none";
    downloadBtn.style.display = "block";
    frame.style.display = "none";
  };
});

// Download the photo with the frame when the download button is clicked
downloadBtn.addEventListener("click", () => {
  const link = document.createElement("a");
  link.download = "photo_with_frame.jpg";
  link.href = canvas.toDataURL();
  link.click();
});
