/**
 * Simple class to calculate the remaining chars in a textfield or input field.
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
 * @param {object} opts Option array
 * @return {undefined|false} Returns false on error
 */
function remainingChars(opts) {
  var self = this;

  this.insertAfter = function insertAfter(element, target) {  
      var parent = target.parentNode;
      if(parent.lastchild == target) {    
          parent.appendChild(element);
      } else {    
          parent.insertBefore(element, target.nextSibling);
      }
  };

  this.appendCharCount = function(element, id) {
      var count = document.createElement('div');      
      count.setAttribute('class', 'remcharsCount');
      count.setAttribute('id', 'remchars_' + id);
      count.innerHTML = this.statustext;

      this.insertAfter(count, element);
  };

  this.showRemaining = function(element) {
      console.log(this);
      var max = element.getAttribute('data-maxlen') || 0;
      var arr = Array.prototype.slice.call(this.elements);
      var id = arr.indexOf(element);      
      var statusarea = document.getElementById('remchars_' + id);
      var remaining = max - element.value.length;         
      console.log(element);         

      statusarea.innerHTML = this.statustext.replace(/%d/, remaining);
  };

  // Append counters to elements and attach event listener
  this.load = function() {      
      for(var i=0, len=this.elements.length; i<len; i++) {
          var id = i;          
          if( this.elements[i].hasAttribute('data-maxlen') ) {
              this.appendCharCount(this.elements[i], id);
              this.showRemaining(this.elements[i]);

              if( this.elements[i].nodeName.toLowerCase() === 'input' ) {
                  this.elements[i].onchange = function() { self.showRemaining(self.elements[i]) };
              } 

              if( this.elements[i].nodeName.toLowerCase() === 'textarea' ) {
                  this.elements[i].onchange = function() { self.showRemaining(self.elements[i]) };
                  this.elements[i].onkeyup = function() { self.showRemaining(self.elements[i]) };
              } 
          }
      }  
  }

  // Fetch all elements
  this.elements = document.querySelectorAll('.remchars'); 
  if( typeof(this.elements) === 'undefined' || this.elements === null || this.elements.length <= 0 ) {
      return false;
  }

  // Parse and set options
  if( typeof opts.statustext === undefined || opts.statustext.search(/%d/) === -1 ) {
      this.statustext = 'Remaining: %d';
  } else {
      this.statustext = opts.statustext;
  }
};

