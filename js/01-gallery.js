import { galleryItems } from "./gallery-items.js";
// Change code below this line

const gallery = document.querySelector(".gallery");

const createGalleryItem = ({ preview, original, description }) => {
  return `
    <li class="gallery__item">
      <a class="gallery__link" href="${original}">
        <img class="gallery__image" src="${preview}" data-source="${original}" alt="${description}" />
      </a>
    </li>
  `;
};

const galleryMarkup = galleryItems.map(createGalleryItem).join(" ");
gallery.innerHTML = galleryMarkup;

gallery.addEventListener("click", (event) => {
  event.preventDefault();

  const target = event.target;

  if (target.nodeName !== "IMG") {
    return;
  }

  const imageUrl = target.parentNode.getAttribute("href");
  const altDesc = target.alt;

  const instance = basicLightbox.create(`
    <img src="${imageUrl}" alt="${altDesc}" />
  `);

  document.addEventListener("keydown", callback);

  function callback(event) {
    if (event.code === "Escape") {
      instance.close();
      document.removeEventListener("keydown", callback);
    }
  }

  instance.show();
});
