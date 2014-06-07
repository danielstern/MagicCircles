MagicCircles
============

The world's awesomest, most useless library.
-----------------------------

![Magic Circle Man](https://raw.githubusercontent.com/danielstern/MagicCircles/master/logo.jpg)

What is Magic Circles?
--------
Magic Circles is a library for making sweet animated magic (or "summoning") circles like in Diablo, Final Fantasy, etc. Magic Circles uses D3 and SVG graphics to provide a smooth experience.

<h2>
  <a href="http://azureda.com/magicCircles/demo.html">Check out the Demo Page!
</h2>

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


#### drawing

##### `magicCircle.cast():caster`
This is the function used to initialize a ring. It a returns a chainable caster object.
  
##### `magicCircle.cast().ring(strokeWidth,optionalSpaceBefore,optionalSpaceAfter)`
Draws a ring with a width of `strokeWidth`. If a margin is included, adds that much space after the ring (since rings take up no space)
  
#####` magicCircle.cast().circleRing(count, radius, optionalSpeed, optionalReverseDirection)`
Draw a circle of `count` * other, smaller circles, each with a radius of `radius`. Optional speed paramater makes this section of the circle spin faster of slower.

##### `magicCircle.cast().text(fontSize, text, optionalSpeed, optionalReverseDirection)`
Draw a circle of text equal to `text`, with a font height of `fontSize`;

##### `magicCircle.cast().space(distance)`
Creates an empty space equal to [distance] between the proceeding and preceeding elements.

##### `magicCircle.cast().backspace(distance)`
Moves the drawing radius inwards [distance], cool for overlapping effects!

#####` magicCircle.disperse()`
Makes the magic circle disappear. Runs a cleanup as well to reduce processor strain.


#### Styling
##### Setting Global Styles

You can change the default colors for the elements like so.

```javascript
magicCircle.styles.colors.ring = "#f0f";  // styles the rings
magicCircle.styles.colors.text = "#f00";  // colors the text
magicCircle.styles.colors.smallRing = "#f0c";  // colors the smaller rings in circleRing()
```

##### Styling Individual Elements

You can change the color of an element any time after it has been cast.

###### `color()`

The `color()` function can be used to change the fill color of text and rings, and the stroke color of circle rings.

```
	magic.cast().ring(5).color("magenta");
```

###### `fill()`

The fill function can be used to change the color of the fill of circle rings

```
	magic.cast().circleRing(6,12).color("orange");
```
