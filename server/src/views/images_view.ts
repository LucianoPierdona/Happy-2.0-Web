import Image from "../models/Image";

// Image Resolver
export default {
  render(image: Image) {
    return {
      id: image.id,
      url: `http://192.168.0.102:3333/uploads/${image.path}`,
    };
  },

  renderMany(images: Image[]) {
    console.log(images);
    return images.map((image) => this.render(image));
  },
};
