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

  // Ensure the canvas is cleared first
  context.clearRect(0, 0, canvas.width, canvas.height);

  // Load the overlay frame and draw it first
  const frameImage = new Image();
  frameImage.src = frame.src;

  frameImage.onload = () => {
    console.log("Frame image loaded successfully."); // Debugging message
    // Draw the frame first on the canvas
    context.drawImage(frameImage, 0, 0, canvas.width, canvas.height);

    // Check if video is playing and draw it on top of the frame
    if (video.srcObject) {
      console.log("Video source is available."); // Debugging message
      context.drawImage(video, 0, 0, 280, 340);

      // Set z-index to ensure video is on top of the frame
      video.style.zIndex = "2"; // Higher value to ensure it's on top
      video.style.top = "50%";
      video.style.left = "50%";
      video.style.transform = "translate(-50%, -50%)";
      canvas.style.zIndex = "1"; // Lower value for the canvas
    } else {
      console.error("Video source is not available."); // Debugging message
    }

    // Hide video and show the canvas
    video.style.display = "none";
    canvas.style.display = "block";
    snapBtn.style.display = "none";
    downloadBtn.style.display = "block";
    frame.style.display = "none";

    // Set the download link with the canvas data
    const dataURL = canvas.toDataURL("image/jpeg");
    downloadBtn.href = dataURL;
    downloadBtn.download = "photo_with_frame.jpg";
    downloadBtn.textContent = "Download Photo";
  };

  frameImage.onerror = () => {
    console.error("Failed to load the frame image."); // Debugging message
  };
});
