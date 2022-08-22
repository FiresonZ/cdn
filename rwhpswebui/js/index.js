if (!Cookies.get("token")) {
    $("#fab").removeClass("mdui-fab-hide");
} else {
    $.ajax(
        {
            url: "http://" + Cookies.get("ipAddr") + "/plugin/httpApi/get/info",
            type: "GET",
            dataType: "json",
            xhrFields: {
                withCredentials: true
            },
            success: function (data) {
                if (data.code != 200) {
                    mdui.snackbar("错误: " + data.reason)
                } else {
                    Cookies.remove("token")
                    $("#fab").removeClass("mdui-fab-hide");
                }
            }
        }
    )
}

function submit() {
    let token = $("#token").val()
    let ipAddr = $("#ipAddress").val()
    if (ipAddr != "") {
        if (token != "") {
            mdui.snackbar("连接中...")
            $.ajax(
                {
                    url: "http://" + ipAddr + "/plugin/httpApi/post/auth",
                    type: "POST",
                    dataType: "json",
                    xhrFields: {
                        withCredentials: true
                    },
                    data: {
                        token: token
                    },
                    success: function (data) {
                        if (data.code != 200) {
                            mdui.snackbar("错误: " + data.reason)
                        } else {
                            Cookies.set("token", data.data, { expires: 30, domain: ipAddr })
                            Cookies.set("ipAddr", ipAddr, { expires: 30 })
                        }
                    }
                }
            )
        } else {
            mdui.snackbar("你还没有输入token哦~")
        }
    } else {
        mdui.snackbar("你还没有输入服务器地址哦~")
    }
}