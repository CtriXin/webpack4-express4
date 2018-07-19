/*
 * @Author: xin.song 
 * @Date: 2018-07-04 17:39:03 
 * @Last Modified by: xin.song
 * @Last Modified time: 2018-07-19 12:14:19
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


    },
    created: function () {
        let self = this;
    },
    mounted: function () {
        let self = this;
        socket.on('publish message', function (data) {
            var html
            if (data.uname === self.myname) {
                html = '<div class="my-message-keepme"><div class="my-avatar"></div><div class="my-message-txt">' + data.msg + '</div></div>'
            } else {
                html = '<div class="fri-message-keepme"><div class="fri-avatar"></div><div class="fri-message-group"><div class="fri-name">' + data.uname + '</div><div class="fri-message-txt">' + data.msg + '</div></div></div>'
            }
            $('.chat-con').append(html);

            // if (data.uname == self.myname) {
            //     $('#messages').append($('<li>').text(data.uname + ' : ' + data.msg));
            // } else {
            //     $('#messages').append($('<li>').text(data.uname + ' : ' + data.msg));
            // }
        });

        socket.on('username add', function (user) {
            $('#memo').append($('<div class="memo-info">').text('用户 ' + user + ' 刚刚登陆'));
        });


        //登录成功
        socket.on('loginSuccess', function (data) {
            self.myname = data.userName
            self.addName = false;
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
            if (name != null) {
                $('#memo').append($('<div class="memo-info">').text('用户 ' + name + ' 已退出'));
            }
        })
    },
    methods: {
        adduser() {
            let self = this;
            self.username = $.trim($('#add-user-input').val());
            if (self.username) {
                socket.emit('add user', {
                    userName: self.username
                });
                $('#add-user-input').val('');

            } else {
                alert('请输入用户名')
            }

        },
        sendMsg() {
            let self = this;
            self.msg = $('#msg').val();
            socket.emit('post message', {
                uname: self.myname,
                msg: self.msg
            });
            $('#msg').val('');
            return false;
        },

        //FIXME: END HERE
    }
};




$(() => {

    // Start
    let VM = new Vue(indexPage);
    console.log(VM);


    $(document).keydown(function (event) {
        if (event.keyCode == 13) {
            VM.sendMsg()
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
    //         userName: $('#uname').val()
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