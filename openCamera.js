const video = document.createElement("video");
const sectionScanEl = document.querySelector(".section-scan");

// Open camera when the section is in view
const obs = new IntersectionObserver(
  (entries) => {
    const ent = entries[0];

    if (ent.isIntersecting) {
      navigator.mediaDevices
        .getUserMedia({ video: { facingMode: "environment" } })
        .then((stream) => {
          video.setAttribute("playsinline", true); // required to tell iOS Safari we don't want fullscreen
          video.srcObject = stream;
          video.play();
          // Append video element to the section
          sectionScanEl.appendChild(video);
          video.style.width = "100%"; // Adjust as needed
          video.style.height = "auto"; // Adjust as needed
        })
        .catch((err) => {
          console.error("Error accessing the camera: ", err);
        });
    }
  },
  {
    root: null,
    threshold: 0,
    rootMargin: "0px",
  }
);
obs.observe(sectionScanEl);
