function romanize(num) {
  if (num === 0) return 0;
  if (!+num)
    return false;
  var digits = String(+num).split(""),
    key = ["", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM",
      "", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC",
      "", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"
    ],
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
  }, {
    name: "Avarice & Prodigality",
    description: "The miserly and spendthrift push great heavy weights together, crashing them time and time again.",
    color: "#FF5633"
  }, {
    name: "Wrath & Sullenness",
    description: "The wrathful fight each other on the surface of the Styx while the sullen gurgle beneath it. ",
    color: "#FF3618"
  }, {
    name: "Heresy",
    description: "Heretics are trapped in flaming tombs. ",
    color: "#FF1400"
  }, {
    name: "Violence",
    description: "The violent against people and property, the suicides, the blashphemers, the sodomites and the usurers.",
    color: "#4a1a35",
    subcircles: [{
      name: "Outer Ring",
      description: "Sinners are immersed in Phlegethon, a river of boiling blood and fire, to a level commensurate with their sins:",
      color: "#702650"
    }, {
      name: "Middle ring",
      description: " suicides – the violent against self – are transformed into gnarled thorny bushes and trees and then fed upon by Harpies.",
      color: "#97326b"
    }, {
      name: "Inner ring",
      description: "All reside in a desert of flaming sand with fiery flakes raining from the sky, a fate similar to Sodom and Gomorrah:",
      color: "#bf3d87"
    }]
  }, {
    name: "Fraud",
    description: "Panderers and seducers, flatterers, sorcerers and false prophets, liars, thieves, and Ulysses and Diomedes.",
    color: "#0d0e26",
    subcircles: [{
      name: "Bolgia I",
      description: " Panderers and seducers march in separate lines in opposite directions, whipped by demons",
      color: "#1a1c4c"
    }, {
      name: "Bolgia II",
      description: " suicides – the violent against self – are transformed into gnarled thorny bushes and trees and then fed upon by Harpies.",
      color: "#070713"
    }, {
      name: "Bolgia III",
      description: " Flatterers also exploited other people, this time using language. They are steeped in human excrement, which represents the words they produced.",
      color: "#0d0e26"
    }, {
      name: "Bolgia IIII",
      description: " Sorcerers, astrologers, and false prophets here have their heads twisted around on their bodies backward",
      color: "#141539"
    }, {
      name: "Bolgia V",
      description: "Corrupt politicians (barrators) are immersed in a lake of boiling pitch, which represents the sticky fingers and dark secrets of their corrupt deals",
      color: "#1a1c4c"
    }, {
      name: "Bolgia VI",
      description: "The hypocrites listlessly walk along wearing gilded lead cloaks, which represent the falsity behind the surface appearance of their actions",
      color: "#202260"
    }, {
      name: "Bolgia VII",
      description: " Two cantos are devoted to the thieves. They are guarded by the centaur Cacus, who has a fire-breathing dragon on his shoulders and snakes covering his equine back",
      color: "#262973"
    }, {
      name: "Bolgia VIII",
      description: "Two further cantos are devoted to fraudulent advisers or evil counsellors, who are concealed within individual flames",
      color: "#2c2f87"
    }, {
      name: "Bolgia IX",
      description: "In the ninth Bolgia, a sword-wielding demon hacks at the Sowers of Discord, dividing parts of their bodies as in life they divided others",
      color: "#31359b"
    }, {
      name: "Bolgia ",
      description: "In the final Bolgia, various sorts of falsifiers (alchemists, counterfeiters, perjurers, and impostors) – who are a disease on society",
      color: "#373bae"
    }]
  }, {
    name: "Treachery",
    description: "Betrayers of special relationships are frozen in a lake of ice. Satan, Judas, Brutus, and Cassius are here.",
    color: "black",
    subcircles: [{
        name: "Round I - Caina",
        description: "Traitors to kindred are here immersed in the ice up to their chins",
        color: "#702650"
      }, {
        name: "Round II - Antenora",
        description: "Traitors to political entities, such as parties, cities, or countries, are located here and imprisoned in the same way as the traitors in Caina",
        color: "#97326b"
      }, {
        name: "Round III - Antenora",
        description: "Traitors to their guests are punished here, lying supine in the ice, which covers them, except for their faces.",
        color: "#bf3d87"
      }, {
        name: "Round IV - Judecca",
        description: "Here are the traitors to their lords and benefactors",
        color: "#bf3d87"
      }
    ]}, {
    name: "Satan",
    description: "In the very centre of Hell, condemned for committing the ultimate sin (personal treachery against God), is Satan.",
    color: "black",
  }]
  magic.cast()
    .ring(150)
    .color('black')
    .backspace(150)
    .circleRing(24,75,4,true)
    .color("gray")


  hell = hell.reverse();


  var caster = magic.cast();
  var SCALE = 1;

  function drawRing(canto, verso) {

    function rotateText() {
      _.each(subTexts, function(text) {
        console.log("rotating.", text);
        text.rotation(-15);
      })
    }


    function resumeAnimation() {
      _.each(subTexts, function(text) {
        text.animate();
      })
    }




    var totalSize = 24 * SCALE;

    var subTexts = [];


    caster
      .ring(totalSize)
      .color(canto.color)
      .backspace(totalSize);
    var text1 = caster
      .text(10  * SCALE, canto.description, 1, verso % 2)
      .color('#eee')
      .getLast();

    var text2 = caster
      .text(14  * SCALE, canto.name, 1, verso % 2)
      .color('white')
      .getLast();

    subTexts.push(text1);
    subTexts.push(text2);

    caster
      .backspace(totalSize)
      .ring(totalSize)
      .color("rgba(255,0,0,0")
      .on("mouseover", rotateText)
      .on("mouseout", resumeAnimation)


  }
  _.each(hell, function(level, i) {


    function rotateText() {
      _.each(subTexts, function(text) {
        text.rotation(-15);
      })
    }

    function resumeAnimation() {
      _.each(subTexts, function(text) {
        text.animate();
      })
    }



    var subTexts = [];


    var totalSize = 50  * SCALE;
    // if (level.subcircles) {
    //     totalSize += 20 * level.subcircles.length;
    // }

    if (level.subcircles) {
      var subcircles = level.subcircles.reverse();

      _.each(level.subcircles, function(sub, index) {
        drawRing(sub, index);
      })

    }

    caster
      .ring(totalSize)
      .color(level.color)
      .backspace(totalSize)
    var text4 = caster
      .text(15  * SCALE, level.description, i / 6, i % 2)
      .color('white')
      .getLast();
    caster
    var text3 = caster
      .text(25  * SCALE, 'CIRCLE ' + romanize(i) || "" + ": " + level.name, i / 6, i % 2)
      .color('white')
      .getLast();
    caster
      .ring(5  * SCALE)
      .color('white')
      .backspace(totalSize)
      .ring(totalSize)
        .color("useNone")
      .on("mouseover", rotateText)
      .on("mouseout", resumeAnimation)

    console.log("Total size?", level.name, totalSize)

    subTexts.push(text3);
    subTexts.push(text4);



  })

  magic.cast()
    .ring(5  * SCALE)
    .text(15  * SCALE, "Welcome to Hell!");

})()
