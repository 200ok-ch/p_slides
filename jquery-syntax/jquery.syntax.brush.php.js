// This file is part of the "jQuery.Syntax" project, and is distributed under the MIT License.
// Copyright (c) 2011 Samuel G. D. Williams. <http://www.oriontransfer.co.nz>


Syntax.brushes.dependency('php','php-script');Syntax.register('php',function(brush){brush.push({pattern:/(<\?(php)?)((.|\n)*?)(\?>)/gm,matches:Syntax.extractMatches({klass:'keyword'},null,{brush:'php-script'},null,{klass:'keyword'})})});