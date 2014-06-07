
function romanize (num) {
    if (!+num)
        return false;
    var digits = String(+num).split(""),
        key = ["","C","CC","CCC","CD","D","DC","DCC","DCCC","CM",
               "","X","XX","XXX","XL","L","LX","LXX","LXXX","XC",
               "","I","II","III","IV","V","VI","VII","VIII","IX"],
        roman = "",
        i = 3;
    while (i--)
        roman = (key[+digits.pop() + (i * 10)] || "") + roman;
    return Array(+digits.join("") + 1).join("M") + roman;
}
(function() {
    var magic = new MagicCircle("#circles", 3);

    var hell = [{
        name: "Limbo",
        description: "The unbaptized and virtuous pagans",
        color: "#FFA172"
    }, {
        name: "Lust",
        description: "Lustful souls are blown about in a violent storm, without hope of rest",
        color: "#FF8C5F"
    }, {
        name: "Gluttony",
        description: "The gluttons are forced to lie in vile, freezing slush, guarded by Ceberus",
        color: "#FF714B"
    },{
        name: "Avarice & Prodigality",
        description: "The miserly and spendthrift push great heavy weights together, crashing them time and time again.",
        color: "#FF5633"
    },{
        name: "Wrath & Sullenness",
        description: "The wrathful fight each other on the surface of the Styx while the sullen gurgle beneath it. ",
        color: "#FF3618"
    },{
        name: "Heresy",
        description: "Heretics are trapped in flaming tombs. ",
        color: "#FF1400"
    },{
        name: "Violence",
        description: "The violent against people and property, the suicides, the blashphemers, the sodomites and the usurers.",
        color: "#FF0000",
        subcircles: [{
            name: "Outer Ring",
            description: "Sinners are immersed in Phlegethon, a river of boiling blood and fire, to a level commensurate with their sins:",
            color: "#00FF00"
        },{
            name: "Middle ring",
            description: " suicides – the violent against self – are transformed into gnarled thorny bushes and trees and then fed upon by Harpies.",
            color: "#00AA00"
        },{
            name: "Inner ring",
            description: "All reside in a desert of flaming sand with fiery flakes raining from the sky, a fate similar to Sodom and Gomorrah:",
            color: "#00DD00"
        }]
    },{
        name: "Fraud",
        description: "Panderers and seducers, flatterers, sorcerers and false prophets, liars, thieves, and Ulysses and Diomedes.",
        color: "purple",
        subcircles: [{
            name: "Bolgia I",
            description: " Panderers and seducers march in separate lines in opposite directions, whipped by demons",
            color: "#00FF00"
        },{
            name: "Bolgia II",
            description: " suicides – the violent against self – are transformed into gnarled thorny bushes and trees and then fed upon by Harpies.",
            color: "#00AA00"
        },{
            name: "Bolgia III",
            description: " Flatterers also exploited other people, this time using language. They are steeped in human excrement, which represents the words they produced.",
            color: "#00DD00"
        },{
            name: "Bolgia IIII",
            description: " Sorcerers, astrologers, and false prophets here have their heads twisted around on their bodies backward",
            color: "#00DD00"
        },{
            name: "Bolgia V",
            description: "Corrupt politicians (barrators) are immersed in a lake of boiling pitch, which represents the sticky fingers and dark secrets of their corrupt deals",
            color: "#00DD00"
        },{
            name: "Bolgia VI",
            description: "The hypocrites listlessly walk along wearing gilded lead cloaks, which represent the falsity behind the surface appearance of their actions",
            color: "#00DD00"
        },{
            name: "Bolgia VII",
            description: " Two cantos are devoted to the thieves. They are guarded by the centaur Cacus, who has a fire-breathing dragon on his shoulders and snakes covering his equine back",
            color: "#00DD00"
        },{
            name: "Bolgia VIII",
            description: "Two further cantos are devoted to fraudulent advisers or evil counsellors, who are concealed within individual flames",
            color: "#00DD00"
        },{
            name: "Bolgia IX",
            description: "In the ninth Bolgia, a sword-wielding demon hacks at the Sowers of Discord, dividing parts of their bodies as in life they divided others",
            color: "#00DD00"
        },{
            name: "Bolgia ",
            description: "In the final Bolgia, various sorts of falsifiers (alchemists, counterfeiters, perjurers, and impostors) – who are a disease on society",
            color: "#00DD00"
        }]
    },{
        name: "Treachery",
        description: "Betrayers of special relationships are frozen in a lake of ice. Satan, Judas, Brutus, and Cassius are here.",
        color: "black"
    }]
    magic.cast()
        .ring(50)
        .color('red')

    hell = hell.reverse();


    var caster = magic.cast();
    function drawRing(canto) {

        function rotateText() {
            _.each(subTexts,function(text){
                console.log("rotating.",text);
                text.rotation(-15);
            })  
        }


        var totalSize = 20;

        var subTexts = [];


        caster
            .ring(20)
                .color(canto.color)
            .backspace(20);
        var text1 =  caster
            .text(10, canto.description, 6)
                .color('#eee')
                .getLast();

        var text2 = caster
            .text(10 , canto.name, 6)
                .color('white')
            .getLast();

            subTexts.push(text1);
            subTexts.push(text2);

        caster 
        .backspace(totalSize)
        .ring(totalSize)
            .color("rgba(255,0,0,0")
            .on("mouseover",rotateText)

    }
    _.each(hell, function(level, i) {


        function rotateText() {
            _.each(subTexts,function(text){
                console.log("rotating.",text);
                text.rotation(-15);
            })  
        }


        var subTexts = [];

      
        var totalSize = 50;
        // if (level.subcircles) {
        //     totalSize += 20 * level.subcircles.length;
        // }

        if (level.subcircles) {
            var subcircles = level.subcircles.reverse();

            _.each(level.subcircles,function(sub){
                drawRing(sub);
            })

        }

        caster
            .ring(50)
                .color(level.color)
            .backspace(50)
        var text4 = caster
            .text(15, level.description, i/6, i%2)
                .color('white')
                .getLast();
        caster
        var text3 = caster
            .text(25 + i,'CIRCLE ' + romanize(i + 1) + ": " +  level.name, i/6, i%2)
                .color('white')
            .getLast();
        caster
            .ring(5)
                .color('white')
            .backspace(totalSize)
            .ring(totalSize)
                .color("rgba(255,0,0,0")
                .on("mouseover",rotateText)

        console.log("Total size?",level.name,totalSize)

        subTexts.push(text3);
        subTexts.push(text4);
            
            

    })

    magic.cast()
        .ring(5)
        .text(15,"Welcome to Hell!")


})()