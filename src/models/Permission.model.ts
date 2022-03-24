import mongoose from "mongoose";
import { Permissions } from "../types";
import { RoleDoc } from "./Role.model";

interface PermissionAttrs {
  name: Permissions;
  status: boolean;
  roles: string[];
}

interface PermissionModel extends mongoose.Model<PermissionDoc> {
  build(attrs: PermissionAttrs): PermissionDoc;
}

interface PermissionDoc extends mongoose.Document {
  name: Permissions;
  status: boolean;
  roles: RoleDoc[];
  createdAt: string;
  updatedAt: string;
}

const PermissionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      enum: Object.values(Permissions),
      unique: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
    roles: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Role",
      },
    ],
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

PermissionSchema.statics.build = (attrs: PermissionAttrs) =>
  new Permission(attrs);

const Permission = mongoose.model<PermissionDoc, PermissionModel>(
  "Permission",
  PermissionSchema
);

export { Permission, PermissionDoc, PermissionAttrs };
