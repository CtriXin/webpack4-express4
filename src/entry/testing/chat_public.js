/*
 * @Author: xin.song 
 * @Date: 2018-07-04 17:39:03 
 * @Last Modified by: xin.song
 * @Last Modified time: 2018-08-29 18:43:12
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
        room: '',
        roomlist: '',
    },
    created: function () {
        let self = this;

        socket.emit('checkRoom');



        let myname = sessionStorage.getItem('myname');
        let myavatar = sessionStorage.getItem('myavatar');
        self.baseTime = new Date().toLocaleString();
        if (myname != null && myavatar != null) {
            console.log('用户已登录');
            self.myname = myname;
            self.avatar = myavatar;
            self.addName = false;

            socket.emit('add user', {
                username: myname,
                avatar: myavatar
            });
        }
        self.lastMsgTime = Math.round(new Date().getTime() / 1000)

    },
    mounted: function () {
        let self = this;
        // 加入房间
        socket.on('publish message', function (data) {
            self.thisMsgTime = Math.round(new Date().getTime() / 1000)
            console.log(self.thisMsgTime - self.lastMsgTime);
            let nowtime = new Date().toLocaleString();
            let time
            if (self.thisMsgTime - self.lastMsgTime > 60) {
                time = '<div class="time-keepme">' + nowtime + '</div>'
            }
            $('#memo').append(time);

            let html
            if (data.uname === self.myname) {
                html = '<div class="my-message-keepme"><div class="my-avatar"><img src="' + data.avatar + '" alt=""></div><div class="my-message-txt">' + data.msg + '</div></div>'
            } else {
                html = '<div class="fri-message-keepme"><div class="fri-avatar"><img src="' + data.avatar + '" alt=""></div><div class="fri-message-group"><div class="fri-name">' + data.uname + '</div><div class="fri-message-txt">' + data.msg + '</div></div></div>'
            }
            $('#memo').append(html);
            window.scrollTo(0, document.body.scrollHeight)
        });

        socket.on('username add', function (user) {
            $('#memo').append($('<div class="memo-info">').text('用户 ' + user + ' 刚刚登陆'));
        });

        socket.on('count num', function (num) {
            self.totalNum = num;
        });

        socket.on('showRoom', function (data) {
            self.roomlist = data;
        });


        //登录成功
        socket.on('loginSuccess', function (data) {
            self.myname = data.username
            self.addName = false;
            sessionStorage.setItem('myname', data.username);
            sessionStorage.setItem('myavatar', data.avatar);
            return false;
        });

        //登录失败
        socket.on('loginFail', function () {
            alert('昵称重复')
        });

        //又登陆了
        socket.on('loginAgain', function (user) {
            $('#memo').append($('<div class="memo-info">').text('用户 ' + user + ' 又回来了'));
        });

        /*退出群聊提示*/
        socket.on('leave', function (name) {
            console.log(name);
            if (name != null) {
                $('#memo').append($('<div class="memo-info">').text('用户 ' + name + ' 已退出'));
                $('.avatar-img').removeClass('avatar-img-keepme');
                $('.correct-icon').hide();
                self.addName = true
            }
        })


        // 监听房间消息
        socket.on('roomMsg', function (msg, room) {
            console.log('hahaha');
            $('#memo').append($('<div class="memo-info">').text(msg + room));
        });


    },
    methods: {
        adduser() {
            let self = this;
            self.username = $.trim($('#add-user-input').val());
            console.log(self.username, self.avatar);
            if (self.room) {
                console.log('加入房间');
                socket.emit('join', {
                    username: self.username,
                    room: self.room
                });
            }
            if (self.username && self.avatar != "") {
                socket.emit('add user', {
                    username: self.username,
                    avatar: self.avatar
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
            socket.emit('post message', {
                uname: self.myname,
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
            let self = this;
            sessionStorage.clear();
            socket.emit('logout', self.myname);
        },
        join(roomname, event) {
            let self = this;
            self.room = roomname;
            let el = event.target;
            $('.room-item').removeClass('room-item-select-keepme');
            $(el).addClass('room-item-select-keepme');
            window.location.href = '/test/chat/' + roomname;
        }
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

    // var socket = io(); 

    // $('.msg').submit(function () {
    //     socket.emit('chat message', $('#msg').val());
    //     $('#msg').val('');
    //     return false;
    // });
    // socket.on('chat message', function (msg) {
    //     $('#messages').append($('<li>').text(msg));
    // });

    // $('.username').submit(function () {
    //     socket.emit('add user', {
    //         username: $('#uname').val()
    //     }, function (data) {
    //         console.log(data);
    //     });


    //     // socket.emit('add user', $('#uname').val(), function (data) {
    //     //     if (data) {
    //     //         $('#nickWrap').hide();
    //     //         $('#contentWrap').show();
    //     //     } else {
    //     //         $('#nickError').html('That username is already taken!  Try again.');
    //     //     }
    //     // });

    //     $('#uname').val('');
    //     return false;
    // });
    // socket.on('username add', function (user) {
    //     $('#messages').append($('<li>').text('用户 ' + user + ' 刚刚登陆'));
    // });


});