interface IUser {
  id: number
  email: string
  name: string
}

export interface ISignUpData {
  email: string
  password: string
  name: string
  teamName: string
}

export default IUser
