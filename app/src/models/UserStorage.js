"use strict";

class UserStorage {
    
    static #users = {
        id: ["aaa","bbb","ccc"],
        psword: ["11","12","13"],
        name:['nnn','sss','ggg'],
    };

    static getUsers(...fileds) {
        const users = this.#users;
        const newUsers = fileds.reduce((newUsers, filed) => {
            if(users.hasOwnProperty(filed)){ // 필드가 있으면
                newUsers[filed] = users[filed];
            }
            return newUsers;
        },{});
        return newUsers;
    }
    
    static getUserInfo(id){
        const users = this.#users;
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
        return userInfo;
    }

    static save(userInfo) {
        // const { id, psword,...rest } = userInfo; // userInfo에서 id, pw, name만 ���아서 rest에 ��음
        const users = this.#users;
        users.id.push(userInfo.id);
        users.name.push(userInfo.name);
        users.psword.push(userInfo.psword);
        return {success: true};
        // console.log(users);
        // Object.assign(users, rest); // rest를 users에 assign
        // return userInfo;

    }
}

module.exports = UserStorage;