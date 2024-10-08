// Add event listener for refreshing the page
const refreshBtn = document.getElementById("refreshBtn");

refreshBtn.addEventListener("click", () => {
  // Refresh the browser window
  window.location.reload();

  // video.style.display = "unset";
  // canvas.style.display = "none";
  // snapBtn.style.display = "block";
  // downloadBtn.style.display = "none";
  // refreshBtn.style.display = "none";
  // frame.style.display = "block";
});

// Get the video element, canvas, overlay frame, and buttons
const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const snapBtn = document.getElementById("snapBtn");
const downloadBtn = document.getElementById("downloadBtn");
const frame = document.getElementById("overlay");

// video.controls = false;

// Set up the video stream from the camera
const obs = new IntersectionObserver(
  (entries) => {
    const ent = entries[0];

    if (ent.isIntersecting) {
      navigator.mediaDevices
        // .getUserMedia({ video: true })
        .getUserMedia({ video: { facingMode: "environment" } })
        .then((stream) => {
          video.setAttribute("playsinline", true);
          video.srcObject = stream;
          video.play();
        })
        .catch((error) => {
          console.error("Error accessing the camera: ", error);
        });
    }
  },
  {
    root: null,
    threshold: 0,
    rootMargin: "0px",
  }
);
obs.observe(video);

// Set canvas size to match the frame (348 x 552 px)
// canvas.width = 348;
// canvas.height = 663.56;
canvas.width = 348 * window.devicePixelRatio;
canvas.height = 680.83 * window.devicePixelRatio;
canvas.style.width = `${348}px`;
canvas.style.height = `${680.83}px`;

video.width = 271 * window.devicePixelRatio;
video.height = 430 * window.devicePixelRatio;
video.height = 430 * window.devicePixelRatio;
// video.style.width = `${254}px`;
// video.style.height = `${408}px`;

const videoX = 36 * window.devicePixelRatio; // Center the video horizontally
const videoY = 112 * window.devicePixelRatio; // Center the video vertically

// Take a photo when the button is clicked
snapBtn.addEventListener("click", () => {
  // Get the canvas context
  const context = canvas.getContext("2d");

  // Clear the canvas first
  context.clearRect(0, 0, canvas.width, canvas.height);

  // Load the overlay frame and draw it first
  const frameImage = new Image();
  frameImage.src = frame.src;

  frameImage.onload = () => {
    // Draw the frame first on the canvas

    context.drawImage(frameImage, 0, 0, canvas.width, canvas.height);

    // Draw the video frame on top of the overlay

    context.drawImage(video, videoX, videoY, video.width, video.height);

    // Hide video and show the canvas
    video.style.display = "none";
    canvas.style.display = "block";
    snapBtn.style.display = "none";
    downloadBtn.style.display = "block";
    refreshBtn.style.display = "block";
    frame.style.display = "none";

    // Set the download link with the canvas data
    const dataURL = canvas.toDataURL("image/jpeg", 1.0);
    downloadBtn.href = dataURL;
    downloadBtn.download = "photo_with_frame.jpg";
    downloadBtn.textContent = "Download Photo";
  };

  frameImage.onerror = () => {
    console.error("Failed to load the frame image."); // Debugging message
  };
});
