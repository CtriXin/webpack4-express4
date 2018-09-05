/*
 * @Author: xin.song 
 * @Date: 2018-07-04 17:39:03 
 * @Last Modified by: xin.song
 * @Last Modified time: 2018-07-24 17:03:36
 */


// import axios from 'axios'

import io from "socket.io-client";

import "cssPath/testChatRoom.scss";

var socket = io();

let indexPage = {
    el: "#vm",
    data: {
        usernameInput: "", //用户输入的名字
        avatarInput: "", //用户输入的头像
        selectAvatar: "", //选择的头像
        addNewUser: true, //增加用户
        isOldUser: false, //老用户
        userInfo: "", //用户数据集=
        totalNum: "", //总用户数
        userList: "" //在线用户组
    },
    created: function () {
        let self = this;
        //检查数据
        socket.emit("checkRoom");
        socket.emit("checkUser");
        socket.emit("checkTotalNum");
        let data = sessionStorage.getItem("userInfo");
        let lastTime = sessionStorage.getItem("userInfoAddTime");
        let thisTime = Math.round(new Date().getTime() / 1000);
        console.log(data, thisTime - lastTime);
        if (thisTime - lastTime > 60 * 60) {
            console.log("session保存超过一小时，强制退出");
            sessionStorage.clear();
            return;
        }
        if (data) {
            self.addNewUser = false;
            self.userInfo = JSON.parse(data);
            socket.emit("loadInfo", self.userInfo);
            self.isOldUser = JSON.parse(data).oldUser;
        }
    },
    mounted: function () {
        let self = this;

        //注册/登录成功
        socket.on("signInSuccess", function (data) {
            console.log(data);
            self.addNewUser = false; //关闭注册
            self.userInfo = data.userInfo;
            self.isOldUser = data.oldUser;
            sessionStorage.setItem("userInfo", JSON.stringify(data.userInfo));
            let lastMsgTime = Math.round(new Date().getTime() / 1000);
            sessionStorage.setItem("userInfoAddTime", lastMsgTime);
        });
        socket.on("loginSuccess", function (data) {
            console.log(data);
            self.addNewUser = false; //关闭注册
            self.userInfo = data.userInfo;
            self.isOldUser = data.oldUser;
            self.newsid = data.sid;
            sessionStorage.setItem("userInfo", JSON.stringify(data.userInfo));
            let lastMsgTime = Math.round(new Date().getTime() / 1000);
            sessionStorage.setItem("userInfoAddTime", lastMsgTime);
        });

        //显示房间列表
        socket.on("showRoom", function (data) {
            self.roomlist = data;
        });

        //显示在线用户
        socket.on("showUser", function (data) {
            console.log("用户信息", data);
            self.userList = data;
            console.log(self.userList);
        });

        //显示在线用户数
        socket.on("showTotalNum", function (num) {
            self.totalNum = num;
            console.log(self.totalNum);
        });

        // 开始聊天
        socket.on("startChat", function (data) {
            console.log(
                data,
                "http://localhost:5657/test/private/" +
                data.fromuid +
                "-" +
                data.touid
            );
        });

        //更新sid
        socket.on("updateid", function (data) {
            console.log(data);
            self.userInfo.sid = data.sid;
            self.userInfo.uid = data.uid;
            let userinfo = JSON.parse(sessionStorage.getItem("userInfo"));
            userinfo.sid = data.sid;
            userinfo.uid = data.uid;
            sessionStorage.setItem("userInfo", JSON.stringify(userinfo));
        });

        //历史消息
        socket.on("historyMsg", function (data) {
            console.log(data);
            console.log(self.userList);
            for (var i in self.userList) {
                if (self.userList[i].uid == data.fromuid) {
                    self.userList[i].haveMsg = true;
                    self.userList[i].room = data.room;
                }
            }
        });
    },
    methods: {
        adduser() {
            let self = this;
            self.usernameInput = $.trim($("#add-user-input").val());
            console.log(self.usernameInput, self.avatarInput);
            if (self.usernameInput && self.avatarInput != "") {
                socket.emit("signin", {
                    username: self.usernameInput,
                    avatar: self.avatarInput
                });
                $("#add-user-input").val("");
            } else {
                alert("请输入用户名或选择头像");
            }
        },
        chat(uid, name) {
            let self = this;
            console.log("touid " + uid);
            console.log(
                "http://localhost:5657/test/private/" +
                self.userInfo.uid +
                "-" +
                uid
            );
            socket.emit("gochat", {
                uid: uid,
                username: name
            });
        },
        chooseAvatar(num, event) {
            let self = this;
            let el = event.target;
            $(".avatar-img").addClass("avatar-img-keepme");
            $(el).removeClass("avatar-img-keepme");
            console.log(el, event);
            console.log($(el).attr("src"));
            self.avatarInput = $(el).attr("src");
            self.selectAvatar = num;
        }
        //FIXME: END HERE
    }
};

$(() => {
    // Start
    let VM = new Vue(indexPage);
    console.log(VM);

    $("#msg").keydown(function (event) {
        if (event.keyCode == 13) {
            VM.sendMsg();
        }
    });
    $("#add-user-input").keydown(function (event) {
        if (event.keyCode == 13) {
            VM.adduser();
        }
    });
});