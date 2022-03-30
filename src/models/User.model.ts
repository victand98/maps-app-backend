import mongoose from "mongoose";
import { Password } from "../helpers/Password";
import { CyclistTypes, Genders } from "../types";
import { RoleDoc } from "./Role.model";

interface UserAttrs {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  status: boolean;
  role: string;
  cyclistType?: CyclistTypes;
  gender?: Genders;
}

interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

interface UserDoc extends mongoose.Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  status: boolean;
  role: RoleDoc;
  cyclistType?: CyclistTypes;
  gender?: Genders;
  createdAt: string;
  updatedAt: string;
}

const UserSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    status: {
      type: Boolean,
      default: true,
    },
    cyclistType: {
      type: String,
      enum: Object.values(CyclistTypes),
    },
    gender: {
      type: String,
      enum: Object.values(Genders),
    },
    role: {
      type: mongoose.Types.ObjectId,
      ref: "Role",
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
      },
    },
  }
);

UserSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const passwordHashed = await Password.toHash(this.get("password"));
    this.set("password", passwordHashed);
  }
  done();
});

UserSchema.statics.build = (attrs: UserAttrs) => new User(attrs);

const User = mongoose.model<UserDoc, UserModel>("User", UserSchema);

export { User, UserDoc, UserAttrs };
