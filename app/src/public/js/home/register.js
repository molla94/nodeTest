"use strict";

const id = document.querySelector("#id");
const name = document.querySelector("#name")
,psword = document.querySelector("#psword")
,confirmPsword = document.querySelector("#confirm-psword")
,registerBtn = document.querySelector("#button");


registerBtn.addEventListener("click", register);

function register(){
    if(id.value === ''){return alert("아이디입력 하세요");}
    if(psword.value !== confirmPsword.value) {
        return alert("비밀번호확인이 같지않음");
    }

    const req =  {
     id : id.value,
     name : name.value,
     psword : psword.value,
     };
     console.log(req);
     fetch("/register", {
         method : "POST",
         headers:{
             "Content-Type" : "application/json",
         },
         body:JSON.stringify(req),
     })
     .then( (res) => res.json()) //응답 데이터를 제이슨으로 바꾼뒤 프로미스로 응답데이터를 다 받아온순간 이후에 then(그다음에) 처리
     .then( (res) => {
        if (res.success) {
            location.href="/login";
        }else{
            alert(res.msg);
        }
     }) //출력(응답처리)
     .catch( (err) => {
        console.error(err + `회원가입 중 에러발생`);
        // console.error(new Error(err + "회원가입 중 에러발생"));
     }); //
  }