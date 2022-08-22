let point = $("#point")
let command = $("#command")

let dHeight = $(document).height()
point.height(dHeight - 200)

if (!Cookies.get("token")) {
    command.attr("disabled", true)
    point.html("<h1>未设置服务器</h1>")
}

command.keydown(function (e) {
    if (e.keyCode == 13 && command.val() != "") {
        point.prepend("> " + command.val() + "\n")
        $.ajax(
            {
                url: "http://127.0.0.1:5123/plugin/httpApi/post/command",
                type: "POST",
                dataType: "json",
                xhrFields: {
                    withCredentials: true //允许跨域带Cookie
                },
                data: {
                    "exec": command.val()
                },
                success: function (data) {
                    point.prepend(data.data.split("\n").reverse().join(''))
                }
            }
        )
        command.val("")
    }
});