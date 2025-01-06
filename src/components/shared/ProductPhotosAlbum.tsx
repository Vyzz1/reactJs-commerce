import React from "react";
import Lightbox from "yet-another-react-lightbox";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";

import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "react-photo-album/rows.css";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
type ProductPhotosAlbumProps = {
  images: string[];
};
const ProductPhotosAlbum = ({ images }: ProductPhotosAlbumProps) => {
  const [index, setIndex] = React.useState(-1);

  const photoUrls = images?.map((src) => ({ src, width: 4500, height: 5000 }));

  if (images.length === 0) return null;

  return (
    <>
      <ScrollArea className="w-full px-2 whitespace-nowrap rounded-md border">
        <div className="flex p-4 items-center gap-3">
          {images.map((image, i) => (
            <img
              key={i}
              src={image}
              alt="product"
              className="w-40 border rounded-sm aspect-square  object-cover"
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      <Lightbox
        slides={photoUrls}
        index={index}
        close={() => setIndex(-1)}
        open={index > -1}
        plugins={[Fullscreen, Slideshow, Zoom]}
      />
    </>
  );
};

export default ProductPhotosAlbum;
