import ITeam from './team'

interface IUser {
  id: number
  email: string
  name: string
  team: ITeam
}

export interface ISignUpData {
  email: string
  password: string
  name: string
  teamName: string
}

export default IUser
