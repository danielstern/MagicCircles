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

##### Cast
##### `magicCircle.cast()`
Drawing always starts with cast. Returns a chainable caster object.
 
##### Ring 
##### `magicCircle.cast().ring(strokeWidth,optionalSpaceBefore,optionalSpaceAfter)`

![Magic Circle Man](https://raw.githubusercontent.com/danielstern/MagicCircles/master/examples/ring.jpg)

Draws a ring with a width of `strokeWidth`. If a margin is included, adds that much space after the ring (since rings take up no space)

##### Circle Ring  
#####` magicCircle.cast().circleRing(count, radius, optionalSpeed, optionalReverseDirection)`

![Magic Circle Man](https://raw.githubusercontent.com/danielstern/MagicCircles/master/examples/circleRing1.jpg)

Draw a circle of `count` * other, smaller circles, each with a radius of `radius`. Optional speed paramater makes this section of the circle spin faster of slower.

You can create some cool effects by using some irrational numbers.

![Magic Circle Man](https://raw.githubusercontent.com/danielstern/MagicCircles/master/examples/circleRing2.jpg)

```javascript
magic.cast()
		.space(50)
		.circleRing(16,16)
		.circleRing(12,8)
		.circleRing(8,32);
```

##### Text
##### `magicCircle.cast().text(fontSize, text, optionalSpeed, optionalReverseDirection)`

![Magic Circle Man](https://raw.githubusercontent.com/danielstern/MagicCircles/master/examples/text.jpg)

Draw a circle of text equal to `text`, with a font height of `fontSize`;

##### Space
##### `magicCircle.cast().space(distance)`
Creates an empty space equal to [distance] between the proceeding and preceeding elements.

##### Distance
##### `magicCircle.cast().backspace(distance)`
Moves the drawing radius inwards [distance], cool for overlapping effects!

##### Disperse
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

##### Color
![Magic Circle Man](https://raw.githubusercontent.com/danielstern/MagicCircles/master/examples/colors.jpg)
##### `color(newColor)`

The `color()` function can be used to change the fill color of text and rings, and the stroke color of circle rings.

```
magic.cast().ring(5).color("magenta");
```

##### Fill
![Magic Circle Man](https://raw.githubusercontent.com/danielstern/MagicCircles/master/examples/fill.jpg)
##### `fill(newColor)`

The fill function can be used to change the color of the fill of circle rings

```
magic.cast().circleRing(6,12).color("orange");
```
