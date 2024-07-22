"use strict";

const fs = require("fs").promises;

class UserStorage {
    
    //은닉화한 함수는 보통 최상단에 배치함
    static #getUserInfo(id, data) {
    
        const users = JSON.parse(data);
        const idx = users.id.indexOf(id); // 받아온 아이디가 유저목록에서 몇번째인지
        const userKeys = Object.keys(users); // 유저키들만 받아옴 =[id,psword]
        const userInfo = userKeys.reduce((newUser, info) => { // 각 user key에 리듀스 id돌고 -> psword돌고 -> name돌고  acc 누적값 cur 
            newUser[info] = users[info][idx];
            //newUser는 초기에 객체라서 누적값이{}인것임 그래서 {}안에[id aaa = pw11] 이런식으로 누적시키는것임 {}초기값없으면 이런형태로 안해도될듯
            //id        :       aaa
            //psword   :       11
            //name     :       nnn
            return newUser;
        },{});
        // console.log(userInfo);
        return userInfo;
        
    }
    static #getUsers(data, isAll, fileds) {
        const users = JSON.parse(data);
        if(isAll) return users;
        const newUsers = fileds.reduce((newUsers, filed) => {
            if(users.hasOwnProperty(filed)){ // 필드가 있으면
                newUsers[filed] = users[filed];
            }
            return newUsers;
        },{});
        return newUsers;
    
    }

    static getUsers(isAll,...fileds) {

        return fs
        .readFile("./src/databases/users.json")
        .then((data) => {
            return this.#getUsers(data, isAll, fileds);
        })
        .catch((err) => {console.error(err);});

    }
    
    static getUserInfo(id){
        // const users = this.#users;
        return fs
        .readFile("./src/databases/users.json")
        .then((data) => {
            return this.#getUserInfo(id, data);
        })
        .catch((err) => {console.error(err);});
    }
    

    static async save(userInfo) {
        const users = await this.getUsers(true);
        if(!users.id.includes(userInfo.id)){
            users.id.push(userInfo.id);
            users.name.push(userInfo.name);
            users.psword.push(userInfo.psword);
            fs.writeFile("./src/databases/users.json", JSON.stringify(users));
            return {success: true};
        }else{
           throw '이미있는 아이디';
        }

    }
}

module.exports = UserStorage;