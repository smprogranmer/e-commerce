const mongoose = require("mongoose");
const slugify = require("slugify");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,

    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },
    model:{
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    sizes: {
      type: Map,
      of: Number,
      default: {},
      validate: {
        validator: function (sizes) {
          return [...sizes.keys()].every((size) =>
            [52, 54, 56].includes(Number(size))
          );
        },
        message: "Sizes must be one of 52, 54, 56.",
      },
    },
    colors:{
      type:[String],
      required: true
    },
    images: [
      {
        url: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

productSchema.pre("save", function (next) {
  this.slug = slugify(`${this.name}-${this.model}`, {
    lower: true,
    strict: true,
  });
  next();
});

module.exports = mongoose.model("Products", productSchema);
