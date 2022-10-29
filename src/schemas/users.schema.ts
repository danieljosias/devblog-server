import * as yup from "yup";
import { SchemaOf } from "yup";
import { IUserRequest} from "../interfaces/users";

export const UserSchema: SchemaOf<IUserRequest> = yup.object().shape({
	name: yup.string().required(),
	email: yup.string().email().required(),
    avatar: yup.string().url().required(),
	password: yup.string().min(9).required()
});
