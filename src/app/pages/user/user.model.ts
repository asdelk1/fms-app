export class LoggedInUser {
  private readonly _firstName: string;
  private readonly _lastName: string;
  private readonly _username: string;
  private readonly _email: string;


  constructor(firstName: string, lastName: string, username: string, email: string) {
    this._firstName = firstName;
    this._lastName = lastName;
    this._username = username;
    this._email = email;
  }


  get firstName(): string {
    return this._firstName;
  }


  get lastName(): string {
    return this._lastName;
  }

  get username(): string {
    return this._username;
  }

  get email(): string {
    return this._email;
  }
}
