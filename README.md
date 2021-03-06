# jquery-remainingchars

jQuery plugin to add remaining characters text to textbox and input elements. 

### Build project
1. Clone or download repository
1. Install dependencies: npm install
2. Build with: grunt

### Demo
<a href="http://htmlpreview.github.io/?https://raw.githubusercontent.com/sanzaru/jquery-remainingchars/master/demo/example.htm" target="_blank">http://htmlpreview.github.io/?https://raw.githubusercontent.com/sanzaru/jquery-remainingchars/master/demo/example.htm</a>

### Usage

If you just want to use the plugin simply download the minified version and include it in your HTML.

The easiest way of usage would be like:

```html
<input type="text" data-maxlen="20" class="remchars" />
<script src="path_to_your_javascripts/jquery-remainingchars.min.js"></script>
<script>
    $('.remchars').remainingChars();
</script>
```

With options it would be:

```html
<input type="text" data-maxlen="20" class="remchars" />
<script src="path_to_your_javascripts/jquery-remainingchars.min.js"></script>
<script>
    $('.remchars').remainingChars({
        statustext: 'My remaining chars: %d'
    });
</script>
```

If you want to limit the input that can be made by the user you can either set the limit globally like:

```html
<input type="text" data-maxlen="20" class="remchars" />
<script src="path_to_your_javascripts/jquery-remainingchars.min.js"></script>
<script>
    $('.remchars').remainingChars({
        limitinput: true
    });
</script>
```
or you can set it individually like:

```html
<input type="text" data-maxlen="20" data-limitinput="true" class="remchars"  />
<script src="path_to_your_javascripts/jquery-remainingchars.min.js"></script>
<script>
    $('.remchars').remainingChars();
</script>
```

See the example.html in demo folder for a full example.

The plugin will add a div container after the inputs/textareas with the class name "remcharsCount", so if you want to
style the output declare some rules for this class in your CSS.

### Options
| Name | Description | 
| --- | --- | 
| statustext | The text to show in the status area {optional} If no text is passed the default message is taken.<br><br> **IMPORTANT:** The statustext string must include a *%d* for being replaced with the count of remaining characters (e.g. "Remaining: %d").|
| limitinput | If set to true, the input field will take only as much characters as in data-maxlen defined (e.g. data-maxlen="120" will result in 120 possible characters).<br><br>**NOTE:** This attribute can also be set via data-limitinput="true" HTML attribute, so set it individually for an element. |


### Changelog

* **Version 0.2.1:**
	* Added new option paramter limitinput
	* Added error class to status area when remaining character count gets less then 0

