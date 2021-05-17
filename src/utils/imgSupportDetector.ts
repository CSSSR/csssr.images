// https://avif.io/blog/tutorials/use-avif-in-css/

function imgSupportDetector () {
  const avif = new Image();
  avif.src = "data:image/avif;base64,AAAAFGZ0eXBhdmlmAAAAAG1pZjEAAACgbWV0YQAAAAAAAAAOcGl0bQAAAAAAAQAAAB5pbG9jAAAAAEQAAAEAAQAAAAEAAAC8AAAAGwAAACNpaW5mAAAAAAABAAAAFWluZmUCAAAAAAEAAGF2MDEAAAAARWlwcnAAAAAoaXBjbwAAABRpc3BlAAAAAAAAAAQAAAAEAAAADGF2MUOBAAAAAAAAFWlwbWEAAAAAAAAAAQABAgECAAAAI21kYXQSAAoIP8R8hAQ0BUAyDWeeUy0JG+QAACANEkA=";
  avif.onload = () => { document.documentElement.classList.add("avif") };

  // before we remove `generateAvif` flag, we want to detect webp support even if avif support is present
  const webp = new Image();
  webp.src = "data:image/webp;base64,UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==";
  webp.onload = () => { document.documentElement.classList.add("webp") };
}

imgSupportDetector();
