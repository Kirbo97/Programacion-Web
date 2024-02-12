function imageGallery() {
  const highlight = document.querySelector("img.mediano");
  const previews = document.querySelectorAll(".pequeño img");

  previews.forEach((preview) => {
    preview.addEventListener("click", function () {
      const smallSrc = this.src;
      highlight.src = smallSrc;
    });
  });
}

imageGallery();