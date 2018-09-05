/*
 * @Author: xin.song 
 * @Date: 2018-07-04 17:39:03 
 * @Last Modified by: xin.song
 * @Last Modified time: 2018-07-23 16:43:49
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
        userList: '',
    },
    created: function () {
        let self = this;

        socket.emit('checkRoom');
        socket.emit('checkUser');
        socket.emit('checkTotalNum');







        self.lastMsgTime = Math.round(new Date().getTime() / 1000)

    },
    mounted: function () {
        let self = this;
        //显示房间列表
        socket.on('showRoom', function (data) {
            self.roomlist = data;
        });

        //显示在线用户
        socket.on('showUser', function (data) {
            console.log('用户信息', data);
            self.userList = data;
            console.log(self.userList);
        });

        //显示在线用户
        socket.on('showTotalNum', function (num) {
            self.totalNum = num;
            console.log(self.totalNum);
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
        },
        gouser(id) {
            let self = this;
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