
import Vuelazyload from "vue-lazyload";

import SDK from "../../js/NIM_Web_SDK_v5.4.3";
import "cssPath/chat.scss";

//lazyload
Vue.use(Vuelazyload, {
    error:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABIBAMAAACnw650AAAAGFBMVEXa2uP////7+/zh4ejn5+3y8vXs7PH29viHz8qbAAABOklEQVRIx+3TsVKDUBAF0DdCsM1dQdq8gNqSmA9IHO1Dkg8gWtgG8/8z7r6FAmZTWNlwC2DgMJe3gJsyZcr/ZlY6TfTtl6cb6Jx3pgWnNE0E6jBCjha675HH0/uHB1UG2vWoLrWzMNq8oqSKXNgjM9YGRe2iXwcZbYoSzJ0mKY22bCdojb1spctqK1Ykbaj6RVhtW0GxXt09flnIZ44R9+QBzW+0BVSHh9mcTbTCVlAMZGEaJvI5Q+I2qTvbKEERUE01d3pGZlsjKEZ6h0rQwkAtiSSe5AwXnhUuVtuDIICqCCkfyESj0ajWaBSlPASGP1c5mRttgvZyQ9G9TBqYmNsCImkBNfoRF6O2vaJUdm+g0+vmMPx8w2MoumgPQq6jcac6rO7eJKhnN8xnM/w548Py5eimTJny5/wCLSIp8U8N+gkAAAAASUVORK5CYII=",
    loading:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABIBAMAAACnw650AAAAGFBMVEXa2uP////7+/zh4ejn5+3y8vXs7PH29viHz8qbAAABOklEQVRIx+3TsVKDUBAF0DdCsM1dQdq8gNqSmA9IHO1Dkg8gWtgG8/8z7r6FAmZTWNlwC2DgMJe3gJsyZcr/ZlY6TfTtl6cb6Jx3pgWnNE0E6jBCjha675HH0/uHB1UG2vWoLrWzMNq8oqSKXNgjM9YGRe2iXwcZbYoSzJ0mKY22bCdojb1spctqK1Ykbaj6RVhtW0GxXt09flnIZ44R9+QBzW+0BVSHh9mcTbTCVlAMZGEaJvI5Q+I2qTvbKEERUE01d3pGZlsjKEZ6h0rQwkAtiSSe5AwXnhUuVtuDIICqCCkfyESj0ajWaBSlPASGP1c5mRttgvZyQ9G9TBqYmNsCImkBNfoRF6O2vaJUdm+g0+vmMPx8w2MoumgPQq6jcac6rO7eJKhnN8xnM/w548Py5eimTJny5/wCLSIp8U8N+gkAAAAASUVORK5CYII="
});

let VM = new Vue({
    el: "#vm",
    data: {
        documentH: $(window).height(),
        documentW: $(window).width(),
        nim: "", //云信实例
        sessions: "", //会话数组
        friends: "", //好友列表
        friendsOrignal: "", //好友列表原始的 -- 订阅用
        myInfo: "", //我的信息
        getMyInfo: "", //从链接中获取的我的信息
        sendInput: "", //消息input
        toUser: "", //聊天的用户
        toUserSessionid: "", //当前聊天用户的sessionid
        msgGroup: {}, //消息组
        showSessionList: false, //显示回话列表 - btn
        showFriendList: true, //显示好友列表- btn
        offlineMsgGroup: {}, //离线数据
        historyMsgGroup: {}, //历史数据
        changeDom: false, //更新dom
        lastSessionName: "", //最后一个会话消息好友
        chatInfo: {}, //聊天对像信息
        emojiGroup: {
            0: "😀",
            1: "😁",
            2: "😂",
            3: "🤣",
            4: "😃",
            5: "😄",
            6: "😅",
            7: "😆",
            8: "😉",
            9: "😊",
            10: "😋",
            11: "😎",
            12: "😍",
            13: "😘",
            14: "😗",
            15: "😙",
            16: "😚",
            17: "🙂",
            18: "🤗",
            19: "🤩",
            20: "🤔",
            21: "🤨",
            22: "😐",
            23: "😑",
            24: "😶",
            25: "🙄",
            26: "😏",
            27: "😣",
            28: "😥",
            29: "😮",
            30: "🤐",
            31: "😯",
            32: "😪",
            33: "😫",
            34: "😴",
            35: "😌",
            36: "😛",
            37: "😜",
            38: "😝",
            39: "🤤",
            40: "😒",
            41: "😓",
            42: "😔",
            43: "😕",
            44: "🙃",
            45: "🤑",
            46: "😲",
            47: "🙁",
            48: "😖",
            49: "😞",
            50: "😟",
            51: "😤",
            52: "😢",
            53: "😭",
            54: "😦",
            55: "😧",
            56: "😨",
            57: "😩",
            58: "🤯",
            59: "😬",
            60: "😰",
            61: "😱",
            62: "😳",
            63: "🤪",
            64: "😵",
            65: "😡",
            66: "😠",
            67: "🤬",
            68: "😷",
            69: "🤒",
            70: "🤕",
            71: "🤢",
            72: "🤮",
            73: "🤧",
            74: "😇",
            75: "🤠",
            76: "🤡",
            77: "🤥",
            78: "🤫",
            79: "🤭",
            80: "🧐",
            81: "🤓",
            82: "😈",
            83: "👿",
            84: "👹",
            85: "👺",
            86: "💀",
            87: "👻",
            88: "👽",
            89: "🤖",
            90: "💩",
            91: "😺",
            92: "😸",
            93: "😹",
            94: "😻",
            95: "😼",
            96: "😽",
            97: "🙀",
            98: "😿",
            99: "😾"
        },
        showEmoji: false,
        showNoti: false,
        notificationTxt: "", //提示文案
        showtoast: false,
        toasttxt: "", //toast文案
        totalUnread: 0 //总未读数
    },
    created: function() {
        let self = this;
        let appkey = decodeURIComponent(self.GetQueryString("appkey"));
        let token = decodeURIComponent(self.GetQueryString("yunxinToken"));
        let account = decodeURIComponent(self.GetQueryString("uid"));
        let avatar = decodeURIComponent(self.GetQueryString("avatar"));
        let gender = decodeURIComponent(self.GetQueryString("gender"));
        let username = decodeURIComponent(self.GetQueryString("username"));
        console.log(appkey, token, account, avatar, gender, username);
        self.getMyInfo = {
            uid: account,
            name: username,
            gender: gender,
            avatar: avatar
        };
        let data = {
            uid: account,
            page: 1,
            pageSize: 20
        };
        let postData = {
            rpc: "businessContactInfo",
            data: JSON.stringify(data)
        };
        $.ajax({
            type: "POST",
            url: "/grpc/im_proto",
            data: postData,
            success(response) {
                console.log(response);
                let fgroup = [];
                self.friendsOrignal = response.uids; //用于注册订阅上线信息，单一的uid元素
                for (var i in response.uids) {
                    //设置默认的朋友信息
                    let obj = {
                        online: false,
                        account: response.uids[i],
                        lastMsg: "",
                        unread: 0,
                        avatar:
                            "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/7QCcUGhvdG9zaG9wIDMuMAA4QklNBAQAAAAAAIAcAmcAFEtrbFNnM2tISGpYcUlCSGZySWxGHAIoAGJGQk1EMDEwMDBhOTkwMTAwMDBmMTAxMDAwMDNmMDIwMDAwNjAwMjAwMDA4YTAyMDAwMGNlMDIwMDAwMTUwMzAwMDA0ODAzMDAwMDZmMDMwMDAwYTIwMzAwMDAwNjA0MDAwMP/bAIQACAYGBwYFCAcHBwkJCAoMFA0MCwsMGRITDxQdGh8eHRocHCAkLicgIiwjHBwoNyksMDE0NDQfJzk9ODI8LjM0MgEJCQkMCwwYDQ0YMiEcITIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIy/8IAEQgAMgAyAwEiAAIRAQMRAf/EABsAAAIDAQEBAAAAAAAAAAAAAAAGAgQFAQMH/9oACAEBAAAAAPqpdnngerKL1YLDEYFQOtAsRDrJNZiXdn0I5GcyewHFX//EABYBAQEBAAAAAAAAAAAAAAAAAAIAAf/aAAgBAhAAAABlUHHNQp//xAAWAQEBAQAAAAAAAAAAAAAAAAABAAL/2gAIAQMQAAAAylazKGqz/8QALBAAAgECBQIDCQEAAAAAAAAAAQIDBBEABRASMSAhQVJhEzM0UWJyc5Gx0f/aAAgBAQABPwDSHK6iUXYezX6+TiTKKhEZkKybfljjnopgGqogeC6/3XMAorpdvoT0USh6yJSbd936765koXMZgDe7XPpfoR2Rg6mxU3BxBMstOsq8MMO6xozt2VRc4kdpZC7G7MbnoRWdgqKWY8AC+KWIw0kcZ5Ud8SxiWF08ykYeN4mKSKVYeB1osuapUSSHZFftblsRQRU6bYkAHifE6ywpMmyVAw9cVuWGBDLCSyDuw8v+6UnwcH416aj3bfadP//EABgRAQADAQAAAAAAAAAAAAAAAAEAECAR/9oACAECAQE/AJ3a0Ov/xAAXEQADAQAAAAAAAAAAAAAAAAAAESAQ/9oACAEDAQE/ABWsVf/Z"
                    };
                    fgroup.push(obj);
                }
                self.friends = fgroup;
            },
            complete() {
                console.log("finish");
                $("#loader").hide();
                if (appkey != "null" && token != "null" && account != "null") {
                    self.appkey = appkey;
                    self.account = account;
                    self.token = token;
                    self.connect();
                } else {
                    alert("请键入正确的链接！");
                }
            }
        });
    },
    mounted: function() {
        let self = this;
    },
    methods: {
        connect() {
            let self = this;
            self.toasttxt = "请稍后，正在加速连接中！";
            self.showtoast = true;
            self.nim = SDK.NIM.getInstance({
                appKey: self.appkey,
                account: self.account,
                token: self.token,
                onsessions: self.onSessions, //获取回话列表
                onupdatesession: self.onUpdateSession,
                onofflinemsgs: self.onOfflineMsgs,
                onroamingmsgs: self.onRoamingMsgs,
                onloginportschange: self.onLoginPortsChange, //多端登录
                onmsg: self.onMsg,
                onmyinfo: self.onMyInfo, //获取用户信息
                onpushevents: self.onPushEvents,
                onconnect: function() {
                    console.log("sdk 链接成功");
                    if (self.friendsOrignal.length > 0) {
                        //数量大于0 有好友
                        self.nim.subscribeEvent({
                            type: 1,
                            accounts: self.friendsOrignal,
                            subscribeTime: 3600 * 24 * 30,
                            sync: true,
                            done: function onSubscribeEvent(err, res) {
                                if (err) {
                                    console.error("订阅好友事件失败", err);
                                } else {
                                    console.info("订阅好友事件成功", res);
                                }
                            }
                        });
                    }
                    self.showtoast = false;
                },
                ondisconnect: function(obj) {
                    console.log("SDK 连接断开", obj);
                    self.toasttxt = "连接已断开";
                    self.showtoast = true;
                },
                onerror: function(error) {
                    console.log("SDK 连接失败", error);
                    self.toasttxt = "连接失败";
                    self.showtoast = true;
                    setTimeout(() => {
                        self.showtoast = false;
                    }, 1500);
                }
            });
        },
        logout() {
            let self = this;
            self.nim.disconnect();
            alert("你已退出 请从新刷新页面");
        },
        onLoginPortsChange(loginPorts) {
            console.log("当前登录帐号在其它端的状态发生改变了", loginPorts);
        },
        onPushEvents(param) {
            let self = this;
            self.changeDom = false;
            console.log("触发了订阅的事件", param.msgEvents);
            if (param.msgEvents) {
                param.msgEvents.forEach(data => {
                    // console.log(updateMultiPortStatus(data))
                    let serverConfig = JSON.parse(data.serverConfig);
                    let customType = 0;
                    let multiPortStatus;
                    let online = false;
                    console.log(serverConfig.online);
                    if (serverConfig.online) {
                        if (serverConfig.online.indexOf(4) >= 0) {
                            multiPortStatus = "电脑";
                            customType = 4;
                            online = true;
                            console.log(data.account + "电脑在线");
                            self.showNoti = true;
                            self.notificationTxt = data.account + " 电脑在线";
                            setTimeout(() => {
                                self.showNoti = false;
                            }, 1000);
                        } else if (serverConfig.online.indexOf(2) >= 0) {
                            multiPortStatus = "iOS";
                            customType = 2;
                            online = true;
                            console.log(data.account + "iOS在线");
                            self.showNoti = true;
                            self.notificationTxt = data.account + " iOS在线";
                            setTimeout(() => {
                                self.showNoti = false;
                            }, 1000);
                        } else if (serverConfig.online.indexOf(1) >= 0) {
                            multiPortStatus = "Android";
                            customType = 1;
                            online = true;
                            console.log(data.account + "Android在线");
                            self.showNoti = true;
                            self.notificationTxt =
                                data.account + " Android在线";
                            setTimeout(() => {
                                self.showNoti = false;
                            }, 1000);
                        } else if (serverConfig.online.indexOf(16) >= 0) {
                            multiPortStatus = "Web";
                            customType = 16;
                            online = true;
                            console.log(data.account + "Web在线");
                            self.showNoti = true;
                            self.notificationTxt = data.account + " Web在线";
                            setTimeout(() => {
                                self.showNoti = false;
                            }, 1000);
                        } else if (serverConfig.online.indexOf(64) >= 0) {
                            multiPortStatus = "Mac";
                            customType = 64;
                            online = true;
                            console.log(data.account + "Mac在线");
                            self.showNoti = true;
                            self.notificationTxt = data.account + " Mac在线";
                            setTimeout(() => {
                                self.showNoti = false;
                            }, 1000);
                        } else {
                            online = false;
                            console.log(data.account + "离线");
                            self.showNoti = true;
                            self.notificationTxt = data.account + " 已离线";
                            setTimeout(() => {
                                self.showNoti = false;
                            }, 1000);
                        }
                    } else {
                        console.log(data.account + "离线");
                        self.showNoti = true;
                        self.notificationTxt = data.account + " 已离线";
                        setTimeout(() => {
                            self.showNoti = false;
                        }, 1000);
                    }

                    for (var i in self.friends) {
                        if (self.friends[i].account == data.account) {
                            self.friends[i].online = online;
                        }
                    }
                    for (var i in self.sessions) {
                        if (self.sessions[i].to == data.account) {
                            self.sessions[i].online = online;
                        }
                    }

                    self.changeDom = true;
                });
            }
        },
        onMyInfo(user) {
            let self = this;
            console.log("收到我的名片", user);
            self.myInfo = user;
            if (user.avatar == "" || user.avatar == undefined) {
                //如果没有头像 默认一个头像
                self.myInfo.avatar = self.getMyInfo.avatar;
            }
            if (user.nick == "" || user.nick == undefined) {
                self.myInfo.nick = self.getMyInfo.name;
            }
            if (user.gender == "" || user.gender == undefined) {
                self.myInfo.gender = self.getMyInfo.gender;
            }
        },
        onUpdateSession(session) {
            let self = this;
            console.log("会话更新了", session);

            let inSession = false;

            for (var i in self.sessions) {
                if (self.sessions[i].id == session.id) {
                    inSession = true;
                    self.sessions[i].lastMsg = session.lastMsg;
                    console.log(self.sessions[i]);
                    break;
                }
            }
            if (inSession) {
                //session 中有此对话
                console.log(session.id);
            } else {
                console.log("没有对应回话 将注册默认数据");
                session.online = false;
                session.avatar =
                    "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/7QCcUGhvdG9zaG9wIDMuMAA4QklNBAQAAAAAAIAcAmcAFEtrbFNnM2tISGpYcUlCSGZySWxGHAIoAGJGQk1EMDEwMDBhOTkwMTAwMDBmMTAxMDAwMDNmMDIwMDAwNjAwMjAwMDA4YTAyMDAwMGNlMDIwMDAwMTUwMzAwMDA0ODAzMDAwMDZmMDMwMDAwYTIwMzAwMDAwNjA0MDAwMP/bAIQACAYGBwYFCAcHBwkJCAoMFA0MCwsMGRITDxQdGh8eHRocHCAkLicgIiwjHBwoNyksMDE0NDQfJzk9ODI8LjM0MgEJCQkMCwwYDQ0YMiEcITIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIy/8IAEQgAMgAyAwEiAAIRAQMRAf/EABsAAAIDAQEBAAAAAAAAAAAAAAAGAgQFAQMH/9oACAEBAAAAAPqpdnngerKL1YLDEYFQOtAsRDrJNZiXdn0I5GcyewHFX//EABYBAQEBAAAAAAAAAAAAAAAAAAIAAf/aAAgBAhAAAABlUHHNQp//xAAWAQEBAQAAAAAAAAAAAAAAAAABAAL/2gAIAQMQAAAAylazKGqz/8QALBAAAgECBQIDCQEAAAAAAAAAAQIDBBEABRASMSAhQVJhEzM0UWJyc5Gx0f/aAAgBAQABPwDSHK6iUXYezX6+TiTKKhEZkKybfljjnopgGqogeC6/3XMAorpdvoT0USh6yJSbd936765koXMZgDe7XPpfoR2Rg6mxU3BxBMstOsq8MMO6xozt2VRc4kdpZC7G7MbnoRWdgqKWY8AC+KWIw0kcZ5Ud8SxiWF08ykYeN4mKSKVYeB1osuapUSSHZFftblsRQRU6bYkAHifE6ywpMmyVAw9cVuWGBDLCSyDuw8v+6UnwcH416aj3bfadP//EABgRAQADAQAAAAAAAAAAAAAAAAEAECAR/9oACAECAQE/AJ3a0Ov/xAAXEQADAQAAAAAAAAAAAAAAAAAAESAQ/9oACAEDAQE/ABWsVf/Z";
                self.sessions = self.nim.mergeSessions(self.sessions, session);
                self.lastSessionName = session.to;
            }

            if (self.msgGroup[session.id]) {
                //会话列表里有此对应聊天 不做处理
            } else {
                //会话更新的时候 数组里没有此sessionid 对应的聊天
                session.online = false;
                session.avatar =
                    "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/7QCcUGhvdG9zaG9wIDMuMAA4QklNBAQAAAAAAIAcAmcAFEtrbFNnM2tISGpYcUlCSGZySWxGHAIoAGJGQk1EMDEwMDBhOTkwMTAwMDBmMTAxMDAwMDNmMDIwMDAwNjAwMjAwMDA4YTAyMDAwMGNlMDIwMDAwMTUwMzAwMDA0ODAzMDAwMDZmMDMwMDAwYTIwMzAwMDAwNjA0MDAwMP/bAIQACAYGBwYFCAcHBwkJCAoMFA0MCwsMGRITDxQdGh8eHRocHCAkLicgIiwjHBwoNyksMDE0NDQfJzk9ODI8LjM0MgEJCQkMCwwYDQ0YMiEcITIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIy/8IAEQgAMgAyAwEiAAIRAQMRAf/EABsAAAIDAQEBAAAAAAAAAAAAAAAGAgQFAQMH/9oACAEBAAAAAPqpdnngerKL1YLDEYFQOtAsRDrJNZiXdn0I5GcyewHFX//EABYBAQEBAAAAAAAAAAAAAAAAAAIAAf/aAAgBAhAAAABlUHHNQp//xAAWAQEBAQAAAAAAAAAAAAAAAAABAAL/2gAIAQMQAAAAylazKGqz/8QALBAAAgECBQIDCQEAAAAAAAAAAQIDBBEABRASMSAhQVJhEzM0UWJyc5Gx0f/aAAgBAQABPwDSHK6iUXYezX6+TiTKKhEZkKybfljjnopgGqogeC6/3XMAorpdvoT0USh6yJSbd936765koXMZgDe7XPpfoR2Rg6mxU3BxBMstOsq8MMO6xozt2VRc4kdpZC7G7MbnoRWdgqKWY8AC+KWIw0kcZ5Ud8SxiWF08ykYeN4mKSKVYeB1osuapUSSHZFftblsRQRU6bYkAHifE6ywpMmyVAw9cVuWGBDLCSyDuw8v+6UnwcH416aj3bfadP//EABgRAQADAQAAAAAAAAAAAAAAAAEAECAR/9oACAECAQE/AJ3a0Ov/xAAXEQADAQAAAAAAAAAAAAAAAAAAESAQ/9oACAEDAQE/ABWsVf/Z";
                self.msgGroup[session.id] = [];
                self.msgGroup[session.id].push(session.lastMsg);
                self.sessions = self.nim.mergeSessions(self.sessions, session);
                self.lastSessionName = session.to;
            }
            console.log(self.sessions);
        },
        onSessions(sessions) {
            let self = this;
            for (var i in sessions) {
                console.log(sessions[i]);
                sessions[i].online = false;
                sessions[i].avatar =
                    "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/7QCcUGhvdG9zaG9wIDMuMAA4QklNBAQAAAAAAIAcAmcAFEtrbFNnM2tISGpYcUlCSGZySWxGHAIoAGJGQk1EMDEwMDBhOTkwMTAwMDBmMTAxMDAwMDNmMDIwMDAwNjAwMjAwMDA4YTAyMDAwMGNlMDIwMDAwMTUwMzAwMDA0ODAzMDAwMDZmMDMwMDAwYTIwMzAwMDAwNjA0MDAwMP/bAIQACAYGBwYFCAcHBwkJCAoMFA0MCwsMGRITDxQdGh8eHRocHCAkLicgIiwjHBwoNyksMDE0NDQfJzk9ODI8LjM0MgEJCQkMCwwYDQ0YMiEcITIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIy/8IAEQgAMgAyAwEiAAIRAQMRAf/EABsAAAIDAQEBAAAAAAAAAAAAAAAGAgQFAQMH/9oACAEBAAAAAPqpdnngerKL1YLDEYFQOtAsRDrJNZiXdn0I5GcyewHFX//EABYBAQEBAAAAAAAAAAAAAAAAAAIAAf/aAAgBAhAAAABlUHHNQp//xAAWAQEBAQAAAAAAAAAAAAAAAAABAAL/2gAIAQMQAAAAylazKGqz/8QALBAAAgECBQIDCQEAAAAAAAAAAQIDBBEABRASMSAhQVJhEzM0UWJyc5Gx0f/aAAgBAQABPwDSHK6iUXYezX6+TiTKKhEZkKybfljjnopgGqogeC6/3XMAorpdvoT0USh6yJSbd936765koXMZgDe7XPpfoR2Rg6mxU3BxBMstOsq8MMO6xozt2VRc4kdpZC7G7MbnoRWdgqKWY8AC+KWIw0kcZ5Ud8SxiWF08ykYeN4mKSKVYeB1osuapUSSHZFftblsRQRU6bYkAHifE6ywpMmyVAw9cVuWGBDLCSyDuw8v+6UnwcH416aj3bfadP//EABgRAQADAQAAAAAAAAAAAAAAAAEAECAR/9oACAECAQE/AJ3a0Ov/xAAXEQADAQAAAAAAAAAAAAAAAAAAESAQ/9oACAEDAQE/ABWsVf/Z";
                self.msgGroup[sessions[i].id] = [];
                self.msgGroup[sessions[i].id].push(sessions[i].lastMsg);
                self.totalUnread += sessions[i].unread;
                for (var j in self.friends) {
                    if (self.friends[j].account == sessions[i].to) {
                        self.friends[j].lastMsg = sessions[i].lastMsg;
                        self.friends[j].unread = sessions[i].unread;
                    }
                }
            }
            self.sessions = self.nim.mergeSessions(self.sessions, sessions);
            if (sessions.length > 0) {
                self.lastSessionName = sessions[0].to;
            }
            console.log("会话列表", self.sessions);
            console.log(self.msgGroup);

            // updateSessionsUI();
        },
        onOfflineMsgs(obj) {
            let self = this;
            console.log("收到离线消息", obj);
            self.offlineMsgGroup[obj.sessionId] = [];
            self.offlineMsgGroup[obj.sessionId] = obj.msgs;
            console.log(self.offlineMsgGroup[obj.sessionId]);
            self.msgGroup[obj.sessionId].shift();
            // pushMsg(obj.msgs);
        },
        onRoamingMsgs(obj) {
            //TODO:将会做
            let self = this;
            console.log("收到漫游消息", obj);
        },
        onMsg(msg) {
            let self = this;
            self.changeDom = false;
            console.log("收到消息", msg.scene, msg.type, msg);

            if (self.msgGroup[msg.sessionId]) {
                self.msgGroup[msg.sessionId].push(msg);
            } else {
                //会话更新的时候 数组里没有此sessionid 对应的聊天
                self.msgGroup[msg.sessionId] = [];
                self.msgGroup[msg.sessionId].push(msg);
            }

            for (var i in self.friends) {
                if (self.friends[i].account == msg.from) {
                    self.friends[i].lastMsg = msg;
                }
            }

            self.changeDom = true;

            var div = document.getElementById("message-container");
            console.log(div.scrollHeight, div.scrollTop);
            setTimeout(() => {
                div.scrollTop = div.scrollHeight;
            }, 100);

            if (self.toUser != msg.from) {
                for (var i in self.sessions) {
                    if (self.sessions[i].to == msg.from) {
                        self.sessions[i].unread += 1;
                        self.totalUnread += 1;
                    }
                }
                for (var j in self.friends) {
                    if (self.friends[j].account == msg.from) {
                        self.friends[j].unread += 1;
                    }
                }
            }
        },
        timeTrans(stamp) {
            let self = this;
            var date = new Date(stamp);
            let Y = date.getFullYear() + "/";
            let M =
                (date.getMonth() + 1 < 10
                    ? "0" + (date.getMonth() + 1)
                    : date.getMonth() + 1) + "/";
            let D =
                (date.getDate() + 1 < 10
                    ? "0" + (date.getDate() + 1)
                    : date.getDate() + 1) + " ";
            let h = date.getHours() + ":";
            let m =
                date.getMinutes() < 10
                    ? "0" + date.getMinutes()
                    : date.getMinutes();
            return Y + M + D + h + m;
        },
        dateTrans(stamp) {
            let self = this;
            var date = new Date(stamp);
            let Y = date.getFullYear() + "/";
            let M =
                (date.getMonth() + 1 < 10
                    ? "0" + (date.getMonth() + 1)
                    : date.getMonth() + 1) + "/";
            let D =
                date.getDate() + 1 < 10
                    ? "0" + (date.getDate() + 1)
                    : date.getDate() + 1;
            return Y + M + D;
        },
        getHistoryMsgsDone(error, obj) {
            let self = this;
            self.changeDom = false;
            console.log("获取p2p历史消息" + (!error ? "成功" : "失败"));
            console.log(error);
            console.log(obj);
            if (!error) {
                // console.log(obj.msgs);
                for (var i in obj.msgs) {
                    obj.msgs[i].avatar =
                        "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/7QCcUGhvdG9zaG9wIDMuMAA4QklNBAQAAAAAAIAcAmcAFEtrbFNnM2tISGpYcUlCSGZySWxGHAIoAGJGQk1EMDEwMDBhOTkwMTAwMDBmMTAxMDAwMDNmMDIwMDAwNjAwMjAwMDA4YTAyMDAwMGNlMDIwMDAwMTUwMzAwMDA0ODAzMDAwMDZmMDMwMDAwYTIwMzAwMDAwNjA0MDAwMP/bAIQACAYGBwYFCAcHBwkJCAoMFA0MCwsMGRITDxQdGh8eHRocHCAkLicgIiwjHBwoNyksMDE0NDQfJzk9ODI8LjM0MgEJCQkMCwwYDQ0YMiEcITIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIy/8IAEQgAMgAyAwEiAAIRAQMRAf/EABsAAAIDAQEBAAAAAAAAAAAAAAAGAgQFAQMH/9oACAEBAAAAAPqpdnngerKL1YLDEYFQOtAsRDrJNZiXdn0I5GcyewHFX//EABYBAQEBAAAAAAAAAAAAAAAAAAIAAf/aAAgBAhAAAABlUHHNQp//xAAWAQEBAQAAAAAAAAAAAAAAAAABAAL/2gAIAQMQAAAAylazKGqz/8QALBAAAgECBQIDCQEAAAAAAAAAAQIDBBEABRASMSAhQVJhEzM0UWJyc5Gx0f/aAAgBAQABPwDSHK6iUXYezX6+TiTKKhEZkKybfljjnopgGqogeC6/3XMAorpdvoT0USh6yJSbd936765koXMZgDe7XPpfoR2Rg6mxU3BxBMstOsq8MMO6xozt2VRc4kdpZC7G7MbnoRWdgqKWY8AC+KWIw0kcZ5Ud8SxiWF08ykYeN4mKSKVYeB1osuapUSSHZFftblsRQRU6bYkAHifE6ywpMmyVAw9cVuWGBDLCSyDuw8v+6UnwcH416aj3bfadP//EABgRAQADAQAAAAAAAAAAAAAAAAEAECAR/9oACAECAQE/AJ3a0Ov/xAAXEQADAQAAAAAAAAAAAAAAAAAAESAQ/9oACAEDAQE/ABWsVf/Z";
                }
                self.historyMsgGroup[self.toUserSessionid] = [];
                self.historyMsgGroup[self.toUserSessionid] = obj.msgs;
                //假刷新
                self.changeDom = true;
                var div = document.getElementById("message-container");
                console.log(div.scrollHeight, div.scrollTop);
                setTimeout(() => {
                    div.scrollTop = div.scrollHeight;
                }, 100);
            }
        },
        chatFriend(name, obj) {
            let self = this;
            console.log("chat friend");
            self.totalUnread -= obj.unread;

            obj.unread = 0;
            self.nim.resetSessionUnread(obj.id);

            for (var i in self.sessions) {
                if (self.sessions[i].to == name) {
                    self.sessions[i].unread = 0;
                }
            }

            console.log(obj);
            $(".friend-item").removeClass("activity");
            let target = ".friend-item-" + name;
            $(target).addClass("activity ");

            self.chatInfo.to = obj.account;
            self.chatInfo.avatar = obj.avatar;
            self.chatInfo.online = obj.online;
            let sessionId = "p2p-" + name;
            self.toUser = name;
            self.toUserSessionid = sessionId;
            this.$refs["input"].focus();
        },
        goChat(name, obj, event) {
            let self = this;
            self.toUser = name;
            self.toUserSessionid = obj.id;
            self.totalUnread -= obj.unread;
            //重置会话数
            obj.unread = 0;
            self.nim.resetSessionUnread(obj.id);
            console.log(obj);

            for (var i in self.friends) {
                if (self.friends[i].account == name) {
                    self.friends[i].unread = 0;
                }
            }

            self.chatInfo.to = name;
            self.chatInfo.avatar = obj.avatar;
            self.chatInfo.online = obj.online;

            //选中状态
            $(".session-item").removeClass("activity");
            let target = ".session-item-" + name;
            $(target).addClass("activity ");
            console.log(obj);
            console.log(self.historyMsgGroup.hasOwnProperty(obj.id));
            // if(historyMsgGroup.inde)

            this.$refs["input"].focus(); //获取焦点

            if (self.historyMsgGroup.hasOwnProperty(obj.id)) {
                console.log("取过历史消息");
                //滚动到底部
                var div = document.getElementById("message-container");
                console.log(
                    div.scrollHeight,
                    div.scrollTop,
                    $(".message-container").prop("scrollHeight")
                );
                setTimeout(() => {
                    div.scrollTop = div.scrollHeight;
                }, 100);
                return;
            }
            self.nim.getHistoryMsgs({
                scene: "p2p",
                to: self.toUser,
                done: self.getHistoryMsgsDone
            });
        },
        sendMsg() {
            let self = this;
            self.showEmoji = false;
            let msginput = self.sendInput;
            let to = self.toUser;

            self.sendInput = "";
            let msg = self.nim.sendText({
                scene: "p2p",
                to: to,
                text: msginput,
                done: self.sendMsgDone
            });

            console.log("正在发送p2p text消息, id=" + msg.idClient);
            if (self.msgGroup[msg.sessionId]) {
                self.msgGroup[msg.sessionId].push(msg);
            } else {
                //会话更新的时候 数组里没有此sessionid 对应的聊天
                self.msgGroup[msg.sessionId] = [];
                self.msgGroup[msg.sessionId].push(msg);
            }

            for (var i in self.friends) {
                if (self.friends[i].account == self.toUser) {
                    self.friends[i].lastMsg = msg;
                }
            }

            var div = document.getElementById("message-container");
            console.log(div.scrollHeight, div.scrollTop);
            setTimeout(() => {
                div.scrollTop = div.scrollHeight;
            }, 100);
        },
        sendMsgDone(error, msg) {
            console.log(error);
            console.log(msg);
            console.log(
                "发送" +
                    msg.scene +
                    " " +
                    msg.type +
                    "消息" +
                    (!error ? "成功" : "失败") +
                    ", id=" +
                    msg.idClient
            );
        },
        showEmojiFun() {
            let self = this;
            if (self.showEmoji) {
                self.showEmoji = false;
            } else {
                self.showEmoji = true;
            }
        },
        goEmoji(emoji) {
            let self = this;
            console.log(emoji);
            this.$refs["input"].focus();
            self.sendInput += emoji;
        },
        closeNoti() {
            let self = this;
            self.showNoti = false;
        },
        gotoSession() {
            //切换tag
            let self = this;
            self.showSessionList = true;
            self.showFriendList = false;
        },
        gotoFriend() {
            //切换tag
            let self = this;
            self.showSessionList = false;
            self.showFriendList = true;
        },
        GetQueryString(str) {
            let LocString = String(window.document.location.href);
            let rs = new RegExp("(^|)" + str + "=([^&]*)(&|$)", "gi").exec(
                    LocString
                ),
                tmp;
            if ((tmp = rs)) return tmp[2];
            return null;
        },
        //FIXME: END HERE
        // subscribeEventDone(error, obj) {
        //     let self = this;
        //     console.log("订阅事件" + (!error ? "成功" : "失败"), error, obj);
        // },
        // publishEventDone(error, obj) {
        //     let self = this;
        //     console.log("发布事件" + (!error ? "成功" : "失败"), error, obj);
        // },
        // onSysMsg(sysMsg) {
        //     let self = this;
        //     console.log("收到系统通知", sysMsg);
        // },
        // onUpdateSysMsg(sysMsg) {
        //     let self = this;
        //     console.log("收到系统通知更新", sysMsg);
        // },
        // onSysMsgUnread(obj) {
        //     let self = this;
        //     console.log("收到系统通知未读数", obj, obj.friend, obj.total);
        // },
        // onUpdateSysMsgUnread(obj) {
        //     let self = this;
        //     console.log("系统通知未读数更新了", obj, obj.friend, obj.total);
        // },
    }
});

$(() => {
    // Start
    console.log(VM);

    $(".input-style").keydown(function(event) {
        if (event.keyCode == 13) {
            VM.sendMsg();
        }
    });
});
