jquery-remainingchars
=====================

jQuery plugin to add remaining characters text to textbox and input elements. 

Build project:
--------------
1. Clone or download repository
1. Install dependencies: npm install
2. Build with: grunt

Usage:
------
The easiest way to use the plugin would be like:

```html
<input type="text" class=".remchars" />
<script src="path_to_your_javascripts/jquery-remainingchars.min.js"></script>
<script>
    $('.remchars').remainingChars();
</script>
```

With options it would be:

```html
<input type="text" class=".remchars" />
<script>
    $('.remchars').remainingChars({
        statustext: 'My remaining chars: %d'
    });
</script>
```

See the example.html in demo folder for a full example.


Valid option parameters:
------------------------
* statustext: The text to show in the status area {optional} If no text is passed the default message is taken.  
**IMPORTANT:** The statustext string must include a *%d* for being replaced with the count of remaining characters (e.g. "Remaining: %d").

