import userMapper from "../mappers/userMapper.js";

interface ILoginUser{
  name: string;
  password: string
}

function checkLoginParams(name: string, password: string) {
  if (name === '' || password === "") {
    throw new Error('参数异常')
  }
}

class userService {
  /**
   * 用户登录
   * @param {*} param
   * @returns 
   */
  async userLogin({ name, password }: ILoginUser) {
    checkLoginParams(name, password)
    const result = await userMapper.queryUserByNameAndPassword(name, password)
    if (!result.length) {
      throw new Error('数据库中没有符合条件的数据')
    } else {
      // TODO: 更加友好的返回码，该用户不存在，密码错误
      // 没有匹配到对应的用户名和密码
      const user = result[0]
      return user
    }
  }
}



export default new userService()
