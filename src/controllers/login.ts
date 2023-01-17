import { Body, Controller, Ctx, Post } from 'amala'
import { findOrCreateUser } from '../models/User'
import EmailLogin from '../validators/EmailLogin'
import GoogleLogin from '../validators/GoogleLogin'
import getGoogleUser from '../helpers/getGoogleUser'

@Controller('/login')
export default class LoginController {

  @Post('/google')
  async google(@Body({ required: true }) { accessToken }: GoogleLogin) {
    const userData = await getGoogleUser(accessToken)
    const user = await findOrCreateUser({
      name: userData.name,
      email: userData.email,
    })
    return user.strippedAndFilled({ withExtra: true })
  }

  @Post('/email')
  async email(@Body({ required: true }) { email, name }: EmailLogin) {
    const user = await findOrCreateUser({ email, name })
    return user.strippedAndFilled({ withExtra: true })
  }
}
