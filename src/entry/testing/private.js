/*
 * @Author: xin.song 
 * @Date: 2018-07-04 17:39:03 
 * @Last Modified by: xin.song
 * @Last Modified time: 2018-07-24 16:47:56
 */


// import axios from 'axios'

import io from 'socket.io-client'


import '../../css/testChat.scss'

var socket = io();

let indexPage = {
    el: "#vm",
    data: {
        myname: '',
        username: '',
        addName: true,
        msg: '',
        totalNum: '',
        avatar: '',
        selectAvatar: '',
        baseTime: '',
        lastMsgTime: 1,
        thisMsgTime: 1,
        room: $("#roomid").text().trim("&nbsp;"),
        userInfo: '', //用户数据集=
        historyMsgGroup: '',
    },
    created: function () {
        let self = this;




        socket.emit('join', {
            room: self.room,
            public: false,
        });



        //检查数据
        socket.emit('checkRoom');
        socket.emit('checkUser');
        socket.emit('checkTotalNum');
        let data = sessionStorage.getItem('userInfo');
        let lastTime = sessionStorage.getItem('userInfoAddTime');
        let thisTime = Math.round(new Date().getTime() / 1000);
        console.log(data, thisTime - lastTime);
        // if (thisTime - lastTime > 60) {
        //     console.log('session保存超过一小时，强制退出');
        //     sessionStorage.clear();
        //     TODO:这里以后要增加超时后跳转回页面让用户登录
        //     return
        // }
        if (data) {
            self.addName = false;
            self.userInfo = JSON.parse(data);
            socket.emit("loadInfo", self.userInfo);

        }

        self.lastMsgTime = Math.round(new Date().getTime() / 1000)


    },
    mounted: function () {
        let self = this;
        // 加入房间
        socket.on('publishMessageRoom', function (data) {
            self.thisMsgTime = Math.round(new Date().getTime() / 1000)
            console.log(self.thisMsgTime - self.lastMsgTime);
            let nowtime = new Date().toLocaleString();
            let time
            if (self.thisMsgTime - self.lastMsgTime > 60) {
                self.lastMsgTime = self.thisMsgTime
                time = '<div class="time-keepme">' + nowtime + '</div>'
            }
            $('#memo').append(time);

            let html
            if (data.uname === self.userInfo.username) {
                html = '<div class="my-message-keepme"><div class="my-avatar"><img src="' + data.avatar + '" alt=""></div><div class="my-message-txt">' + data.msg + '</div></div>'
            } else {
                html = '<div class="fri-message-keepme"><div class="fri-avatar"><img src="' + data.avatar + '" alt=""></div><div class="fri-message-group"><div class="fri-name">' + data.uname + '</div><div class="fri-message-txt">' + data.msg + '</div></div></div>'
            }
            $('#memo').append(html);
            window.scrollTo(0, document.body.scrollHeight)
        });



        //登录成功
        socket.on('loginSuccessRoom', function (data) {
            self.username = data.username
            self.avatar = data.avatar
            self.addName = false;
            sessionStorage.setItem('myname', data.username);
            sessionStorage.setItem('myavatar', data.avatar);
            sessionStorage.setItem('myroom', data.room);
            return false;
        });



        //又登陆了
        socket.on('loginAgainRoom', function (user) {
            $('#memo').append($('<div class="memo-info">').text('用户 ' + user + ' 又回来了'));
        });

        /*退出群聊提示*/
        socket.on('leaveRoom', function (name) {
            console.log(name, self.username);
            if (name != null && name == self.username) {
                $('#memo').append($('<div class="memo-info">').text('用户 ' + name + ' 已退出'));
                $('.avatar-img').removeClass('avatar-img-keepme');
                $('.correct-icon').hide();
                self.addName = true
            } else {
                $('#memo').append($('<div class="memo-info">').text('用户 ' + name + ' 已退出'));
            }
        })


        // 登录成功
        socket.on('signSuccessRoom', function (user) {
            $('#memo').append($('<div class="memo-info">').text('用户 ' + user + ' 进入房间了'));
        });


        //计数
        socket.on('countNumRoom', function (num) {
            self.totalNum = num;
        });


        //历史消息
        socket.on('historyMsgRoom', function (data) {
            console.log(data);
            self.historyMsgGroup = data;
        });

        //更新sid
        socket.on("updateSid", function (id) {
            console.log(id);
            self.userInfo.sid = id;
            let userinfo = JSON.parse(sessionStorage.getItem("userInfo"));
            userinfo.sid = id;
            sessionStorage.setItem("userInfo", JSON.stringify(userinfo));
            socket.emit("updateUserRoom", {
                username: self.userInfo.username,
                avatar: self.userInfo.avatar,
                sid: id,
                room: self.room
            });
        });




    },
    methods: {
        adduser() {
            let self = this;
            self.username = $.trim($('#add-user-input').val());
            console.log(self.username, self.avatar);
            if (self.username && self.avatar != "") {
                socket.emit('newUserRoom', {
                    username: self.username,
                    avatar: self.avatar,
                    room: self.room
                });
                $('#add-user-input').val('');

            } else {
                alert('请输入用户名或选择头像')
            }

        },
        sendMsg() {
            let self = this;
            self.msg = $('#msg').val();
            if (self.msg == '') {
                alert('请不要输入空消息');
                return
            }
            // let msg = {
            //     room: self.room,
            //     uname: self.userInfo.username,
            //     avatar: self.userInfo.avatar,
            //     sid: self.userInfo.sid,
            //     uid: self.userInfo.uid,
            //     msg: self.msg

            // }
            // let historyMsgGroup = self.historyMsgGroup
            // historyMsgGroup.push(msg);
            // if (historyMsgGroup.length > 3) {
            //     historyMsgGroup.splice(0, historyMsgGroup.length - 3);
            // }

            // console.log(historyMsgGroup);
            // socket.emit('postHistoryMsgRoom', {
            //     Msg: historyMsgGroup
            // });
            socket.emit('postMessageRoom', {
                room: self.room,
                uname: self.userInfo.username,
                avatar: self.userInfo.avatar,
                sid: self.userInfo.sid,
                uid: self.userInfo.uid,
                msg: self.msg
            });
            $('#msg').val('');
            return false;
        },
        chooseAvatar(num, event) {
            let self = this;
            let el = event.target;
            $('.avatar-img').addClass('avatar-img-keepme');
            $(el).removeClass('avatar-img-keepme')
            console.log(el, event);
            console.log($(el).attr('src'));
            self.avatar = $(el).attr('src');
            self.selectAvatar = num;
        },
        logout() {
            console.log('hahaha');
            let self = this;
            sessionStorage.clear();
            socket.emit('logoutRoom', {
                username: self.username,
                room: self.room
            });
        },

        //FIXME: END HERE
    }
};




$(() => {

    // Start
    let VM = new Vue(indexPage);
    console.log(VM);


    $('#msg').keydown(function (event) {
        if (event.keyCode == 13) {
            VM.sendMsg()
        }
    })
    $('#add-user-input').keydown(function (event) {
        if (event.keyCode == 13) {
            VM.adduser()
        }
    })

});