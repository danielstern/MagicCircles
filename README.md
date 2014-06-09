MagicCircles
============

The world's awesomest, most useless library.
-----------------------------

![Magic Circle Man](https://raw.githubusercontent.com/danielstern/MagicCircles/master/project_images/logo.jpg)

What is Magic Circles?
--------
Magic Circles is a library for making sweet animated magic (or "summoning") circles like in Diablo, Final Fantasy, etc. Magic Circles uses D3 and SVG graphics to provide a smooth experience.

<h2>
  <a href="http://azureda.com/magicCircles/">Check out the Demo Page!
</h2>

### But, why?
Because I DON'T KNOW!

### How it works?
Magic Circles uses the following simple syntax.

```
  var magicCircle = new MagicCircle("#myDiv");
  
  magicCircle.cast()
    .ring(25) // draws a ring with a width of 25.
    .text(16,"Magic Circles by Azureda") // makes a ring of text 16px high.
    .ring(5)
      .color('purple') // makes a snazzy purple ring
    .text(14,"I II III IV V")
    // ... etc;

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

![Magic Circle Man](https://raw.githubusercontent.com/danielstern/MagicCircles/master/project_images/ring.jpg)

Draws a ring with a width of `strokeWidth`. If a margin is included, adds that much space after the ring (since rings take up no space)

##### Circle Ring  
#####` magicCircle.cast().circleRing(count, radius, optionalSpeed, optionalReverseDirection)`

![Magic Circle Man](https://raw.githubusercontent.com/danielstern/MagicCircles/master/project_images/circleRing1.jpg)

Draw a circle of `count` * other, smaller circles, each with a radius of `radius`. Optional speed paramater makes this section of the circle spin faster of slower.

You can create some cool effects by using some irrational numbers.

![Magic Circle Man](https://raw.githubusercontent.com/danielstern/MagicCircles/master/project_images/circleRing2.jpg)

```javascript
magic.cast()
		.space(50)
		.circleRing(16,16)
		.circleRing(12,8)
		.circleRing(8,32);
```

##### Text
##### `magicCircle.cast().text(fontSize, text, optionalSpeed, optionalReverseDirection)`

![Magic Circle Man](https://raw.githubusercontent.com/danielstern/MagicCircles/master/project_images/text.jpg)

Draw a circle of text equal to `text`, with a font height of `fontSize`;

<a name="autofit"></a>
###### Autofit

You can pass the string `"autofit"` as the fontSize variable. If so, Magic Circles will automatically size the text for you.

![Autofit](https://raw.githubusercontent.com/danielstern/MagicCircles/master/project_images/autofit.jpg)

*Note: This will not work as expected if you are applying certain custom styles via CSS such as leading. For that you will need to manually calculate size.*

##### Space
##### `magicCircle.cast().space(distance)`
Creates an empty space equal to [distance] between the proceeding and preceeding elements.

##### Backspace
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
![Magic Circle Man](https://raw.githubusercontent.com/danielstern/MagicCircles/master/project_images/colors.jpg)
##### `color(newColor)`

The `color()` function can be used to change the fill color of text and rings, and the stroke color of circle rings.

```
magic.cast().ring(5).color("magenta");
```

##### Fill
![Magic Circle Man](https://raw.githubusercontent.com/danielstern/MagicCircles/master/project_images/fill.jpg)
##### `fill(newColor)`

The fill function can be used to change the color of the fill of circle rings

```
magic.cast().circleRing(6,12).color("orange");
```

#### Interactivity
You can trigger mouse events for hovering or clicking on rings. Currently only rings are supported as they're the only thing that makes sense for interacivy.

##### On
##### `on(eventName,listener)`

The `on` function is used to attach an event listener to a ring. 

Often you will want to create invisible "sensor" rings, which can be done by using `color("useNone")`. See demo page for example.

```
magic.cast()
  .space(50)
  .text(25,"You're the")
    .color('blue')
  .backspace(25)
  .ring(25)
    .color('useNone')
    .on('mouseover',function(target){
      alert("Ring now dog!")
   })
```

##### `getLast()`

Returns a permanent reference to the last ring created. This works well with interactivity;

```
var caster = magic.cast()
  .space(50);
var ring = caster.ring(50)
  .color('blue');

setTimeout(function(){
  caster
  .target(ring)
  .color("pink");
},2000)
```

##### `target(element)`

Changes the active target of the caster to an element returned by `getLast()`;