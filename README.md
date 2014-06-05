MagicCircles
============

The world's awesomest, most useless library.
-----------------------------

![Magic Circle Man](https://raw.githubusercontent.com/danielstern/MagicCircles/master/logo.jpg)

What is Magic Circles?
--------
Magic Circles is a library for making sweet animated magic (or "summoning") circles like in Diablo, Final Fantasy, etc. Magic Circles uses D3 and SVG graphics to provide a smooth experience.

### But, why?
Because I DON'T KNOW!

### How it works?
Magic Circles uses the following simple syntax.

```
  var magicCircle = new MagicCircle("#myDiv");
  
  magicCircle.cast()
    .ring()
    .text("HOWDY!")
    .ring()
```

Each element that you define (or cast) is added to the ring in another concentric circle. If this does not make sense, check out the first example on the demo page.

#### Dependencies
MC (Magic Circles) has the following depencies, that will need to be loaded before the magicCircles.js file.

- d3.js
- jquery
- underscore.js


#### functions

##### magicCircle.cast():caster
This is the function used to initialize a ring. It a returns a chainable caster object.
  
##### magicCircle.cast().ring(optionalMargin)
Draws a ring. If a margin is included, adds that much space after the ring (since rings take up no space)
  
##### magicCircle.cast().circleRing(count, radius, optionalSpeed, optionalReverseDirection)
Draw a circle of [count] * other, smaller circles, each with a radius of [radius]. Optional speed paramater makes this section of the circle spin faster of slower.

##### magicCircle.cast().text(text, fontSize, optionalSpeed, optionalReverseDirection)
Draw a circle of text equal to [text], with a font height of [fontSize];

##### `magicCircle.cast().space(distance)`
Creates an empty space equal to [distance] between the proceeding and preceeding elements.

##### `magicCircle.cast().backspace(distance)`
Moves the drawing radius inwards [distance], cool for overlapping effects!

##### magicCircle.disperse()
Makes the magic circle disappears. Runs a cleanup as well to reduce processor strain.


#### Styling
Limited styling is currently available.

```javascript
magicCircle.styles.colors.ring = "#f0f";  // styles the rings
magicCircle.styles.colors.text = "#f00";  // colors the text
magicCircle.styles.colors.smallRing = "#f0c";  // colors the smaller rings in circleRing()
```


