export default class  UserInfo{
constructor({userName, userJob, userAvatar}){
  this._nameElement = userName;
  this._jobElement = userJob;
  this._avatarElement = userAvatar;
}
getUserInfo() {
  return{
    userName: this._nameElement.textContent,
    userJob:  this._jobElement.textContent
  }
  
}
setUserInfo(data) {
  if (data.name && data.about) {
  this._nameElement.textContent = data.name;
  this._jobElement.textContent = data.about;
  }
}
setUserAvatar(data) {
  if(data.avatar){
  this._avatarElement.style.backgroundImage = `url('${data.avatar}')`;
  }
}
}