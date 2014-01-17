/*
Dynamic Input Width jQuery Plugin v0.1
https://github.com/hirokiosame/dynamicInputWidth

Copyright (C) 2012 by Hiroki Osame

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/


$.fn.dynamicInputWidth = function(options) {
	'use strict';

	var self = this instanceof jQuery ? this : $(this);

	// Must be Input
	if( !self.is("input") ){ return this; }


	// Default Options
	options = $.extend({

		// Return Width or this
		returnWidth: false,

		// Context to which the Shadow Input is applied (May be affected by CSS)
		context: "body",

		// Use Placeholder as minimum width?
		placeholder: true,

		// Use Input Style for the Shadow Input
		useInputStyle: true,

		// Min Width of the Shadow Input
		minWidth: 1,

		// Apply a Class to the Shadow Input
		"class": "",

		// Apply CSS to the Shadow Input
		css:	{}
	}, options);


	var value = self.val(),
		placeholder = options.placeholder ? self.attr("placeholder") || "" : "";

	// If No Value
	if( value.length+placeholder.length === 0 ){ self.width(options.minWidth); return this; }

	// Use Value or Placeholder?
	value = (value.length > placeholder.length ? value : placeholder);

	var shadow		=	$("<span>", { "class": options['class'] })
						.css(jQuery.extend(

							// Default Shadow CSS
							{
								width: 'auto',
								visibility: 'hidden',
								whiteSpace: 'nowrap'
							},

							// Use Input CSS?
							(options.useInputStyle ? self.css([
								'font-size',
								'font-family',
								'font-weight',
								'font-style',
								'font-variant',
								'word-spacing',
								'letter-spacing',
								'text-indent',
								'text-rendering',
								'text-transform'
							]) : {} ),

							// Any Extra CSS?
							options.css
						))
						.text(value)
						.appendTo(options.context),
		width		=	shadow.width();

	// Remove Shadow
	shadow.remove();

	// Set Width
	return ( options.returnWidth ? width : self.width( width ) );
};