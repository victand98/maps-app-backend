import mongoose from "mongoose";

interface PlaceTypeAttrs {
  name: string;
  description?: string;
  icon: string;
  color: string;
  status: boolean;
}

interface PlaceTypeModel extends mongoose.Model<PlaceTypeDoc> {
  build(attrs: PlaceTypeAttrs): PlaceTypeDoc;
}

interface PlaceTypeDoc extends mongoose.Document {
  name: string;
  description?: string;
  icon: string;
  color: string;
  status: boolean;
  createdAt: string;
  updatedAt: string;
}

const PlaceTypeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: String,
    icon: {
      type: String,
      required: true,
      unique: true,
    },
    color: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

PlaceTypeSchema.statics.build = (attrs: PlaceTypeAttrs) => new PlaceType(attrs);

const PlaceType = mongoose.model<PlaceTypeDoc, PlaceTypeModel>(
  "PlaceType",
  PlaceTypeSchema
);

export { PlaceType, PlaceTypeAttrs, PlaceTypeDoc };
