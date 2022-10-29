import AppDataSource from "../../data-source";
import Users from "../../entities/users.entity";

export const listAllUsersService = async () => {
    const usersRepository = AppDataSource.getRepository(Users)
    const users = await usersRepository.find()

    return users
}
