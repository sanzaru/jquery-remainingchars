jquery-remainingChars
=====================

jQuery plugin to add remaining characters text to textbox and input elements.

Usage:
------
The easiest way to use the plugin would be like:

```html
<input type="text" class=".remchars" />
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

Valid option parameters:
------------------------
* statustext: The text to show in the status area {optional} If no text is passed the default message is taken.  
**IMPORTANT:** The statustext string must include a *%d* for being replaced with the count of remaining characters (e.g. "Remaining: %d").

