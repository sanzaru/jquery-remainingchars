/**
 * Simple object to calculate the remaining chars in a textfield,
 * chop the text if maximum is reached and print the status.
 * 
 * NOTE: This object ist based on jQuery, so include that in your
 *       code before this class.
 *
 * Valid option parameters:
 * ------------------------
 *   maxChars: The count of maximum chars allowed {required}
 *   textarea: The textarea element, id or class string {required}
 *   statusarea: The status area element, id or class string {required}
 *   statustext: The text to show in the status area {optional}
 *               If no text is passed the default message is taken.
 *               IMPORTANT: The statustext string must include a %d for being
 *                          replaced with the count of remaining characters.
 *    
 * @author Martin Albrecht <martin.albrecht@javacoffee.de> 
 * @param {object} opts Option array
 * @return {undefined|false} Returns false on error
 */
function remainingChars(opts) {
  var self = this;
  
  // Check options
  if( typeof opts.maxChars === undefined || opts.maxChars <= 0 ) {
    alert('Please define a valid maxChar option!');
    return false;
  } else {
    this.maxChars = opts.maxChars;
  }
  
  if( typeof opts.textarea === undefined ) {
    alert('textarea option needed!');
    return false;
  }
        
  this.textarea = $(opts.textarea);
  if( this.textarea.position() === undefined || this.textarea.length > 1) {
    alert('Please give a valid textarea option (id, this, class)!');
    return false;
  }
  
  if( typeof opts.statusarea === undefined ) {
    alert('statusarea option needed!');
    return false;
  }
  
  this.statusarea = $(opts.statusarea);
  if( this.statusarea.position() === undefined || this.statusarea.length > 1) {
    alert('Please give a valid statusarea option (id, this, class)!');
    return false;
  }          
  
  if( typeof opts.statustext === undefined || opts.statustext.search(/%d/) === -1 ) {
    this.statustext = 'Remaining: %d';
  } else {
    this.statustext = opts.statustext;
  }            
  
  // Show the status message
  this.showStatus = function(remaining) {
    this.statusarea.text(self.statustext.replace(/%d/, remaining)).html();
  };
  
  // Bind textarea to change events and set statustext      
  this.textarea.on('change keyup', function(){          
    var actualCount = self.textarea.val().length;               
    
    if(actualCount > self.maxChars) {
      var newVal = $(this).val().substring(0, self.maxChars);
      $(this).val(newVal);          
      return false;
    }              
    self.showStatus((self.maxChars-actualCount));
  });           
  
  // Initial status message
  this.showStatus(this.maxChars);
};

