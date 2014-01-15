/**
 * jQuery plugin to add remaining characters text to textbox and input elements.
 *
 * Valid option parameters:
 * ------------------------
 *   statustext: The text to show in the status area {optional}
 *               If no text is passed the default message is taken.
 *               IMPORTANT: The statustext string must include a %d for being
 *                          replaced with the count of remaining characters
 *                          (e.g. "Remaining: %d").
 *    
 * @author Martin Albrecht <martin.albrecht@javacoffee.de> 
 * @version 0.1.1
 * @param {object} opts Option array
 * @return {undefined}
 */
$.fn.remainingChars = function(opts) {
    var statustext = 'Remaining: %d',
        methods = {
            // Get remaining characters
            getRemaining: function(el) {
                var element = (typeof(el) !== 'undefined') ? $(el) : $(this);
                var max = element.data('maxlen') || 0;
                return (max - element.val().length);
            },
            // Get the status text
            getStatusText: function(remaining) {
                return statustext.replace(/%d/, remaining);
            },
            // Show remaining characters message
            showRemaining: function(el) {
                var remaining = methods.getRemaining(el);
                var newVal = methods.getStatusText(remaining);
                $(el).next().html(newVal);
            }
        };

    // Parse and set options
    if( opts && typeof(opts.statustext) !== 'undefined' && opts.statustext.search(/%d/) !== -1 ) {        
        statustext = opts.statustext;
    }

    for(var i=0, len=this.length; i<len; i++) {
        var el = $(this[i]);
        var text = methods.getStatusText(methods['getRemaining'].apply(el));

        el.after('<div class="remcharsCount">' + text + '</div>');
        el.on('change keyup', function() {
            console.log(methods.getRemaining(this));
            methods.showRemaining(this);
        });
    }
};