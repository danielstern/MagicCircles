var lol = {
    guid: function() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }

        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    },
    physics: function() {
        var equations = [
            "v = v0 + at",
            "x = x0 + v0t + ½at2",
            "v2 = v02 + 2a(x − x0)",
            "v = ½(v + v0)",
        ]

        //to do!

    }
}
