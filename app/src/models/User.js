"use strict";
const { response} = require("express");
const UserStorage = require("./UserStorage");

class User{
    constructor(body){
        this.body = body;
    }

    async login(){
      const userInfo = await UserStorage.getUserInfo(this.body.id);
      // return console.log(await UserStorage.getUserInfo(this.body.id));
      // console.log(id.id);
      if(userInfo.id){
        if(userInfo.id === this.body.id && userInfo.psword === this.body.psword){
            return { success : true };
        }
        return { success : false, msg : "비밀번호가 일치하지 않습니다." };
      }
      return { success : false, msg : "존재하지 않는 아이디입니다." };
    }

   async register(){
    try{
      const respnse = await UserStorage.save(this.body);
      return respnse;
    } catch (err) {
      // return { success: false, msg: err };
      return console.error(err);
    }
    
  }
}

module.exports = User;