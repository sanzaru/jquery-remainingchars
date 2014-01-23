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
 *   limitinput: If set to true, the input field will take only as much characters
 *               as in data-maxlen defined (e.g. data-maxlen="120" will result in
 *               120 possible characters).
 *               NOTE: This attribute can also be set via data-limitinput="true" 
                       HTML attribute, so set it individually for an element.
 *    
 * @author Martin Albrecht <martin.albrecht@javacoffee.de> 
 * @param {object} opts Option array
 * @return {undefined}
 */
$.fn.remainingChars = function(opts) {
    var statustext = 'Remaining: %d',
        limitinput = false,
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
                var remaining = parseInt(methods.getRemaining(el));
                var newVal = methods.getStatusText(remaining);     
                var statusArea = $(el).nextAll('.remcharsCount:first');

                if( remaining < 0 ) {
                    statusArea.addClass('error');
                }

                if( remaining >= 0 && statusArea.hasClass('error')) {
                    statusArea.removeClass('error');
                }

                statusArea.html(newVal);
            },
            limitInput: function(el) {
                $(el).attr('maxlength', $(el).data('maxlen'));
            }
        };

    // Parse and set options
    if( opts && typeof(opts.statustext) !== 'undefined' && opts.statustext.search(/%d/) !== -1 ) {        
        statustext = opts.statustext;
    }

    if( opts && typeof(opts.limitinput) !== 'undefined' && opts.limitinput === true ) {        
        limitinput = true;
    }

    for(var i=0, len=this.length; i<len; i++) {
        var el = $(this[i]);
        var text = methods.getStatusText(methods['getRemaining'].apply(el));

        if( limitinput === true || $(el).data('limitinput') === true ) {
            methods.limitInput(el);
        }

        el.after('<div class="remcharsCount">' + text + '</div>');
        el.on('change keyup', function() {
            methods.showRemaining(this);
        });
    }
};