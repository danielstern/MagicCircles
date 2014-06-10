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
            "∑ F = m a",
            "ac = − ω2 r",
            "P = Fv cos θ",
            "θ = θ0 + ω0t + ½αt2",
            "L = mrv sin θ",
            "ρ1A1v1 = ρ2A2v2",
            "ΔA = 2αA0ΔT",
        ]

        return equations[Math.floor(Math.random() * equations.length)];

        //to do!

    },
    randomColor: function() {
        var letters = '0123456789ABCDEF'.split('');
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    },
    hipster: function() {
        var equations = [
            "Chillwave selfies narwhal actually blog. Marfa Austin craft beer tousled fixie ",
            "DIY street art wolf, Carles hoodie Echo Park 90's ",
            "Truffaut deep v put a bird on it pop-up, aesthetic mixtape readymade ugh Echo Park ",
            "polaroid semiotics mustache dreamcatcher swag bespoke Thundercats drinking vinegar ",
            "Pinterest bicycle rights McSweeney's fap. Schlitz vegan distillery bitters, semiotics quinoa vinyl Carles fingerstache ",
            "Direct trade you probably haven't heard of them photo booth fanny pack ",
            "banh mi typewriter single-origin coffee biodiesel cornhole ",
            "Meggings cliche leggings lomo Thundercats, cred twee kale chips. Raw denim aesthetic ",
            "American Apparel shabby chic beard roof party. Jean shorts master cleanse slow-carb ",
            "IPhone tote bag salvia, Portland Bushwick chia next level letterpress farm-to-table 3 wolf moon trust fund shabby chic Marfa cray. ",
        ]

        return equations[Math.floor(Math.random() * equations.length)];

        //to do!

    }
}
