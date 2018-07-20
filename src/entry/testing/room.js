/*
 * @Author: xin.song 
 * @Date: 2018-07-04 17:39:03 
 * @Last Modified by: xin.song
 * @Last Modified time: 2018-07-20 17:28:25
 */
import Vue from 'vue';

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
    },
    created: function () {
        let self = this;



        socket.emit('join', {
            room: self.room,
            public: true, //TODO:将来加上判断公共还是私有的房间
        });


        // let myname;
        // let myavatar;
        // self.baseTime = new Date().toLocaleString();
        // if (myname != null && myavatar != null) {
        //     console.log('用户已登录');
        //     self.username = myname;
        //     self.avatar = myavatar;
        //     self.addName = false;

        //     socket.emit('add user', {
        //         username: myname,
        //         avatar: myavatar
        //     });
        // }
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
                time = '<div class="time-keepme">' + nowtime + '</div>'
            }
            $('#memo').append(time);

            let html
            if (data.uname === self.username) {
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
            socket.emit('postMessageRoom', {
                room: self.room,
                uname: self.username,
                avatar: self.avatar,
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