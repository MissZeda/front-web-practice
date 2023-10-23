import request from '../../util/recaptchaIntegration.ts'

export default{
  getVerificationCode(data) {
    return request.get("/siteverify", data)
  }
}
