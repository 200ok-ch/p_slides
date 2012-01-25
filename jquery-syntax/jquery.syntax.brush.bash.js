// This file is part of the "jQuery.Syntax" project, and is distributed under the MIT License.
// Copyright (c) 2011 Samuel G. D. Williams. <http://www.oriontransfer.co.nz>


Syntax.brushes.dependency('bash','bash-script');Syntax.register('bash',function(brush){brush.push({pattern:/^([\w@:~ ]*?[\$|\#])\s+(.*?)$/gm,matches:Syntax.extractMatches({klass:'prompt'},{brush:'bash-script'})});brush.push({pattern:/^\-\- .*$/gm,klass:'comment',allow:['href']});brush.push(Syntax.lib.singleQuotedString);brush.push(Syntax.lib.doubleQuotedString);brush.push(Syntax.lib.stringEscape);brush.push(Syntax.lib.webLink);brush.push({klass:'stderr',allow:['string','comment','constant','href']});});