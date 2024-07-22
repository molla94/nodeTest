"use strict";

const db = require("../config/db");

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

    }
    
    static getUserInfo(id){
        return new Promise((resolve, reject) => {    
            db.query("SELECT * FROM users where id = ?",[id], (err, data) => {
             if(err) reject(err);
             resolve(data[0]);
            });
        });
    }
    
    
    static async save(userInfo) {
        return new Promise((resolve, reject) => { 
            const query = "INSERT INTO users (id, name, psword) VALUES (?,?,?);";   
            db.query(
                query,
                [userInfo.id,userInfo.name,userInfo.psword],
            (err) => {
             if(err) reject(err);
             resolve( {success: true});
            });
        });
    
    }
}

module.exports = UserStorage;