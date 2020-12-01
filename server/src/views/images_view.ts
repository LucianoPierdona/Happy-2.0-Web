import Image from "../models/Image";

// Image Resolver
export default {
  render(image: Image) {
    return {
      id: image.id,
      url: `${process.env.API_URL}/uploads/${image.path}`,
    };
  },

  renderMany(images: Image[]) {
    console.log(images);
    return images.map((image) => this.render(image));
  },
};
