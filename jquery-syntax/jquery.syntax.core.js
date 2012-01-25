// This file is part of the "jQuery.Syntax" project, and is distributed under the MIT License.
// Copyright (c) 2011 Samuel G. D. Williams. <http://www.oriontransfer.co.nz>


if(!RegExp.prototype.indexOf){RegExp.indexOf=function(match,index){return match[0].indexOf(match[index])+match.index;};}
if(!RegExp.prototype.escape){RegExp.escape=function(pattern){return pattern.replace(/[\-\[\]{}()*+?.\\\^$|,#\s]/g,"\\$&");};}
if(!String.prototype.repeat){String.prototype.repeat=function(l){return new Array(l+1).join(this);};}
Syntax.innerText=function(element){var text;if(!element){return"";}
if(element.nodeName=='BR'){return'\n';}else if(element.textContent){text=element.textContent;}else if(document.body.innerText){text=element.innerText;}
return text.replace(/\r\n?/g,'\n');}
Syntax.extractElementMatches=function(elems,offset,tabWidth){var matches=[],current=[elems];offset=offset||0;tabWidth=tabWidth||4;(function(elems){for(var i=0;elems[i];i++){var text=null,elem=elems[i];if(elem.nodeType===3||elem.nodeType===4){offset+=elem.nodeValue.length;}else if(elem.nodeType===1){var text=Syntax.innerText(elem);matches.push(new Syntax.Match(offset,text.length,{klass:elem.className,force:true,element:elem,allow:'*'},text));}
if(elem.nodeType!==8&&elem.children){arguments.callee(elem.childNodes,offset);}}})(elems);matches.shift();return matches;}
Syntax.layouts.preformatted=function(options,html,container){return html;};Syntax.modeLineOptions={'tab-width':function(name,value,options){options.tabWidth=parseInt(value,10);}};Syntax.convertTabsToSpaces=function(text,tabSize){var space=[],pattern=/\r|\n|\t/g,tabOffset=0,offsets=[],totalOffset=0;tabSize=tabSize||4
for(var i="";i.length<=tabSize;i=i+" "){space.push(i);}
text=text.replace(pattern,function(match){var offset=arguments[arguments.length-2];if(match==="\r"||match==="\n"){tabOffset=-(offset+1);return match;}else{var width=tabSize-((tabOffset+offset)%tabSize);tabOffset+=width-1;totalOffset+=width-1
offsets.push([offset,width,totalOffset]);return space[width];}});return{text:text,offsets:offsets};};Syntax.convertToLinearOffsets=function(offsets,length){var current=0,changes=[];for(var i=0;i<length;i++){if(offsets[current]&&i>offsets[current][0]){if(offsets[current+1]){if(i<=offsets[current+1][0]){changes.push(offsets[current][2]);}else{current+=1;i-=1;}}else{changes.push(offsets[current][2]);}}else{changes.push(changes[changes.length-1]||0);}}
return changes;}
Syntax.updateMatchesWithOffsets=function(matches,linearOffsets,text){(function(matches){for(var i=0;i<matches.length;i++){var match=matches[i];var offset=match.offset+linearOffsets[match.offset];var end=match.offset+match.length;end+=linearOffsets[end];match.adjust(linearOffsets[match.offset],end-offset,text);if(match.children.length>0)
arguments.callee(match.children);}})(matches);return matches;};Syntax.extractMatches=function(){var rules=arguments;return function(match,expr){var matches=[];for(var i=0;i<rules.length;i+=1){var rule=rules[i],index=i+1;if(rule==null){continue;}
if(typeof(rule.index)!='undefined'){index=rule.index;}
if(rule.debug){Syntax.log("extractMatches",rule,index,match[index],match);}
if(match[index].length>0){if(rule.brush){matches.push(Syntax.brushes[rule.brush].buildTree(match[index],RegExp.indexOf(match,index)));}else{var expression=jQuery.extend({owner:expr.owner},rule);matches.push(new Syntax.Match(RegExp.indexOf(match,index),match[index].length,expression,match[index]));}}}
return matches;};};Syntax.lib.webLinkProcess=function(queryURI,lucky){if(lucky){queryURI="http://www.google.com/search?btnI=I&q="+encodeURIComponent(queryURI+" ");}
return function(element,match){return jQuery('<a>').attr('href',queryURI+encodeURIComponent(element.text())).attr('class',element.attr('class')).append(element.contents());};};Syntax.register=function(name,callback){var brush=Syntax.brushes[name]=new Syntax.Brush();brush.klass=name;callback(brush);};Syntax.lib.cStyleComment={pattern:/\/\*[\s\S]*?\*\//gm,klass:'comment',allow:['href']};Syntax.lib.cppStyleComment={pattern:/\/\/.*$/gm,klass:'comment',allow:['href']};Syntax.lib.perlStyleComment={pattern:/#.*$/gm,klass:'comment',allow:['href']};Syntax.lib.perlStyleRegularExpression={pattern:/\B\/([^\/]|\\\/)*?\/[a-z]*(?=\s*($|[^\w\s'"]))/gm,klass:'constant',incremental:true};Syntax.lib.cStyleFunction={pattern:/([a-z_][a-z0-9_]*)\s*\(/gi,matches:Syntax.extractMatches({klass:'function'})};Syntax.lib.camelCaseType={pattern:/\b_*[A-Z][\w]*\b/g,klass:'type'};Syntax.lib.cStyleType={pattern:/\b[_a-z][_\w]*_t\b/gi,klass:'type'};Syntax.lib.xmlComment={pattern:/(&lt;|<)!--[\s\S]*?--(&gt;|>)/gm,klass:'comment'};Syntax.lib.webLink={pattern:/\w+:\/\/[\w\-.\/?%&=@:;#]*/g,klass:'href'};Syntax.lib.hexNumber={pattern:/\b0x[0-9a-fA-F]+/g,klass:'constant'};Syntax.lib.decimalNumber={pattern:/\b[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?/g,klass:'constant'};Syntax.lib.doubleQuotedString={pattern:/"([^\\"\n]|\\.)*"/g,klass:'string'};Syntax.lib.singleQuotedString={pattern:/'([^\\'\n]|\\.)*'/g,klass:'string'};Syntax.lib.multiLineDoubleQuotedString={pattern:/"([^\\"]|\\.)*"/g,klass:'string'};Syntax.lib.multiLineSingleQuotedString={pattern:/'([^\\']|\\.)*'/g,klass:'string'};Syntax.lib.stringEscape={pattern:/\\./g,klass:'escape',only:['string']};Syntax.Match=function(offset,length,expression,value){this.offset=offset;this.endOffset=offset+length;this.length=length;this.expression=expression;this.value=value;this.children=[];this.parent=null;this.next=null;};Syntax.Match.prototype.shift=function(offset,text){this.adjust(offset,null,text);for(var i=0;i<this.children.length;i++){this.children[i].shift(offset,text)}};Syntax.Match.prototype.adjust=function(offset,length,text){this.offset+=offset;this.endOffset+=offset;if(length){this.length=length;this.endOffset=this.offset+length;}
if(text){this.value=text.substr(this.offset,this.length);}};Syntax.Match.sort=function(a,b){return(a.offset-b.offset)||(b.length-a.length);};Syntax.Match.prototype.contains=function(match){return(match.offset>=this.offset)&&(match.endOffset<=this.endOffset);};Syntax.Match.defaultReduceCallback=function(node,container){if(typeof(node)==='string'){node=document.createTextNode(node);}else{node=node[0];}
container[0].appendChild(node);};Syntax.Match.prototype.reduce=function(append,process){var start=this.offset;var container=jQuery('<span></span>');append=append||Syntax.Match.defaultReduceCallback;if(this.expression&&this.expression.klass){container.addClass(this.expression.klass);}
for(var i=0;i<this.children.length;i+=1){var child=this.children[i],end=child.offset;if(child.offset<this.offset){Syntax.log("Syntax Warning: Offset of child",child,"is before offset of parent",this);}
var text=this.value.substr(start-this.offset,end-start);append(text,container);append(child.reduce(append,process),container);start=child.endOffset;}
if(start===this.offset){append(this.value,container);}else if(start<this.endOffset){append(this.value.substr(start-this.offset,this.endOffset-start),container);}else if(start>this.endOffset){Syntax.log("Syntax Warning: Start position "+start+" exceeds end of value "+this.endOffset);}
if(process){container=process(container,this);}
return container;};Syntax.Match.prototype.canContain=function(match){if(match.expression.force){return true;}
if(this.complete){return false;}
if(match.expression.only){return true;}
if(typeof(this.expression.allow)==='undefined'){return false;}
if(jQuery.isArray(this.expression.disallow)&&jQuery.inArray(match.expression.klass,this.expression.disallow)!==-1){return false;}
if(this.expression.allow==='*'){return true;}
if(jQuery.isArray(this.expression.allow)&&jQuery.inArray(match.expression.klass,this.expression.allow)!==-1){return true;}
return false;};Syntax.Match.prototype.canHaveChild=function(match){var only=match.expression.only;if(only){var cur=this;while(cur!==null){if(jQuery.inArray(cur.expression.klass,only)!==-1){return true;}
cur=cur.parent;if(cur&&cur.complete){break;}}
return false;}
return true;};Syntax.Match.prototype._splice=function(i,match){if(this.canHaveChild(match)){this.children.splice(i,0,match);match.parent=this;if(!match.expression.owner){match.expression.owner=this.expression.owner;}
return this;}else{return null;}};Syntax.Match.prototype.insert=function(match,whole){if(!this.contains(match))
return null;if(whole){var top=this,i=0;while(i<top.children.length){if(top.children[i].contains(match)){top=top.children[i];i=0;}else{i+=1;}}
return top._insertWhole(match);}else{return this._insert(match);}}
Syntax.Match.prototype._insertWhole=function(match){var parts=this.bisectAtOffsets([match.offset,match.endOffset])
this.children=[];if(parts[0]){this.children=this.children.concat(parts[0].children);}
if(parts[1]){match.children=[];if(this.expression&&this.expression.owner){match.expression=this.expression.owner.getRuleForKlass(match.expression.klass)||match.expression;}
for(var i=0;i<parts[1].children.length;i+=1){var child=parts[1].children[i];if(match.canContain(child)){match.children.push(child);}}
this.children.push(match);}
if(parts[2]){this.children=this.children.concat(parts[2].children);}
return this;}
Syntax.Match.prototype.insertAtEnd=function(match){if(!this.contains(match)){Syntax.log("Syntax Error: Child is not contained in parent node!");return null;}
if(!this.canContain(match)){return null;}
if(this.children.length>0){var i=this.children.length-1;var child=this.children[i];if(match.offset<child.offset){if(match.force){return this._insert(match);}else{return null;}}else if(match.offset<child.endOffset){if(match.endOffset<=child.endOffset){var result=child.insertAtEnd(match);return result;}else{if(match.force){return this._insert(match);}else{return null;}}}else{return this._splice(i+1,match);}
return null;}else{return this._splice(0,match);}};Syntax.Match.prototype._insert=function(match){if(this.children.length==0)
return this._splice(0,match);for(var i=0;i<this.children.length;i+=1){var child=this.children[i];if(match.endOffset<=child.offset)
return this._splice(i,match);if(match.offset>=child.endOffset)
continue;if(child.contains(match)){return child._insert(match);}
var parts=match.bisectAtOffsets([child.offset,child.endOffset]);if(parts[0]){this._splice(i,parts[0])}
if(parts[1]){child.insert(parts[1])}
if(parts[2]){match=parts[2]}else{return this;}}
this._splice(this.children.length,match);}
Syntax.Match.prototype.bisectAtOffsets=function(splits){var parts=[],start=this.offset,prev=null,children=jQuery.merge([],this.children);splits=splits.slice(0);splits.push(this.endOffset);splits.sort(function(a,b){return a-b;});for(var i=0;i<splits.length;i+=1){var offset=splits[i];if(offset>this.endOffset){break;}
if(offset<this.offset||(offset-start)==0){parts.push(null);start=offset;continue;}
if(start<this.offset)
start=this.offset;var match=new Syntax.Match(start,offset-start,this.expression);match.value=this.value.substr(start-this.offset,match.length);if(prev){prev.next=match;}
prev=match;start=match.endOffset;parts.push(match);}
splits.length=parts.length;for(var i=0;i<parts.length;i+=1){if(parts[i]==null)
continue;var offset=splits[0];while(children.length>0){if(children[0].endOffset<=parts[i].endOffset){parts[i].children.push(children.shift());}else{break;}}
if(children.length){if(children[0].offset<parts[i].endOffset){var children_parts=children.shift().bisectAtOffsets(splits),j=0;for(;j<children_parts.length;j+=1){if(children_parts[j]==null)continue;parts[i+j].children.push(children_parts[j]);}
i+=(children_parts.length-2);splits.splice(0,children_parts.length-2);}}
splits.shift();}
if(children.length){Syntax.log("Syntax Error: Children nodes not consumed",children.length," remaining!");}
return parts;};Syntax.Match.prototype.split=function(pattern){var splits=[],match;while((match=pattern.exec(this.value))!==null){splits.push(pattern.lastIndex);}
var matches=this.bisectAtOffsets(splits);return jQuery.grep(matches,function(n,i){return n;});};Syntax.Brush=function(){this.klass=null;this.rules=[];this.parents=[];this.processes={};};Syntax.Brush.prototype.derives=function(name){this.parents.push(name);this.rules.push({apply:function(text,expr,offset){return Syntax.brushes[name].getMatches(text,offset);}});}
Syntax.Brush.prototype.allKlasses=function(){var klasses=[this.klass];for(var i=0;i<this.parents.length;i+=1){klasses=klasses.concat(Syntax.brushes[this.parents[i]].allKlasses());}
return klasses;}
Syntax.Brush.convertStringToTokenPattern=function(pattern,escape){var prefix="\\b",postfix="\\b";if(!pattern.match(/^\w/)){if(!pattern.match(/\w$/)){prefix=postfix="";}else{prefix="\\B";}}else{if(!pattern.match(/\w$/)){postfix="\\B";}}
if(escape)
pattern=RegExp.escape(pattern)
return prefix+pattern+postfix;}
Syntax.Brush.prototype.push=function(){if(jQuery.isArray(arguments[0])){var patterns=arguments[0],rule=arguments[1];var all="(";for(var i=0;i<patterns.length;i+=1){if(i>0)all+="|";var p=patterns[i];if(p instanceof RegExp){all+=p.source;}else{all+=Syntax.Brush.convertStringToTokenPattern(p,true);}}
all+=")";this.push(jQuery.extend({pattern:new RegExp(all,rule.options||'g')},rule));}else{var rule=arguments[0];if(typeof(rule.pattern)==='string'){rule.string=rule.pattern;rule.pattern=new RegExp(Syntax.Brush.convertStringToTokenPattern(rule.string,true),rule.options||'g')}
if(typeof(XRegExp)!=='undefined'){rule.pattern=new XRegExp(rule.pattern);}
if(rule.pattern&&rule.pattern.global||typeof(rule.pattern)=='undefined'){this.rules.push(jQuery.extend({owner:this},rule));}else{Syntax.log("Syntax Error: Malformed rule: ",rule);}}};Syntax.Brush.prototype.getMatchesForRule=function(text,rule,offset){var matches=[],match=null;if(typeof(rule.apply)!='undefined'){return rule.apply(text,rule,offset);}
if(typeof(rule.pattern)=='undefined'){return matches;}
var pattern=new RegExp;pattern.compile(rule.pattern);while((match=pattern.exec(text))!==null){if(rule.matches){matches=matches.concat(rule.matches(match,rule));}else if(rule.brush){matches.push(Syntax.brushes[rule.brush].buildTree(match[0],match.index));}else{matches.push(new Syntax.Match(match.index,match[0].length,rule,match[0]));}
if(rule.incremental){pattern.lastIndex=match.index+1;}}
if(offset&&offset>0){for(var i=0;i<matches.length;i+=1){matches[i].shift(offset);}}
if(rule.debug){Syntax.log("matches",matches);}
return matches;};Syntax.Brush.prototype.getRuleForKlass=function(klass){for(var i=0;i<this.rules.length;i+=1){if(this.rules[i].klass==klass){return this.rules[i];}}
return null;}
Syntax.Brush.prototype.getMatches=function(text,offset){var matches=[];for(var i=0;i<this.rules.length;i+=1){matches=matches.concat(this.getMatchesForRule(text,this.rules[i],offset));}
return matches;};Syntax.Brush.prototype.buildTree=function(text,offset,additionalMatches){offset=offset||0;text=text.replace(/\r/g,'');var matches=this.getMatches(text,offset);var top=new Syntax.Match(offset,text.length,{klass:this.allKlasses().join(" "),allow:'*',owner:this},text);matches.sort(Syntax.Match.sort);for(var i=0;i<matches.length;i+=1){top.insertAtEnd(matches[i]);}
if(additionalMatches){for(var i=0;i<additionalMatches.length;i+=1){top.insert(additionalMatches[i],true);}}
top.complete=true;return top;};Syntax.Brush.prototype.process=function(text,matches){var top=this.buildTree(text,0,matches);var lines=top.split(/\n/g);var html=jQuery('<pre class="syntax"></pre>');for(var i=0;i<lines.length;i+=1){var line=lines[i].reduce(null,function(container,match){if(match.expression){if(match.expression.process){container=match.expression.process(container,match);}
if(match.expression.owner){var process=match.expression.owner.processes[match.expression.klass];if(process){container=process(container,match);}}}
return container;});html.append(line);}
return html;};Syntax.highlightText=function(text,options,callback){var brushName=(options.brush||'plain').toLowerCase();brushName=Syntax.aliases[brushName]||brushName;Syntax.brushes.get(brushName,function(brush){if(options.tabWidth){replacement=Syntax.convertTabsToSpaces(text,options.tabWidth);if(options.matches&&options.matches.length){var linearOffsets=Syntax.convertToLinearOffsets(replacement.offsets,text.length);options.matches=Syntax.updateMatchesWithOffsets(options.matches,linearOffsets,replacement.text);}
text=replacement.text;}
var html=brush.process(text,options.matches);if(options.linkify!==false){jQuery('span.href',html).each(function(){jQuery(this).replaceWith(jQuery('<a>').attr('href',this.innerHTML).text(this.innerHTML));});}
callback(html,brush,text,options);});}
Syntax.highlight=function(elements,options,callback){if(typeof(options)==='function'){callback=options;options={};}
options.layout=options.layout||'preformatted';options.matches=[];if(typeof(options.tabWidth)==='undefined'){options.tabWidth=4;}
elements.each(function(){var container=jQuery(this);options.matches=options.matches.concat(Syntax.extractElementMatches(container));var text=Syntax.innerText(this);var match=text.match(/-\*- mode: (.+?);(.*?)-\*-/i);var endOfSecondLine=text.indexOf("\n",text.indexOf("\n")+1);if(match&&match.index<endOfSecondLine){options.brush=options.brush||match[1];var modeline=match[2];var mode=/([a-z\-]+)\:(.*?)\;/gi;while((match=mode.exec(modeline))!==null){var setter=Syntax.modeLineOptions[match[1]];if(setter){setter(match[1],match[2],options);}}}
Syntax.highlightText(text,options,function(html,brush){Syntax.layouts.get(options.layout,function(layout){html=layout(options,html,container);if(options.theme){var themes=Syntax.themes[options.theme];for(var i=0;i<themes.length;i+=1){html.addClass("syntax-theme-"+themes[i]);}
html.addClass("syntax-theme-"+options.theme);}
if(brush.postprocess){html=brush.postprocess(options,html,container);}
if(callback){html=callback(options,html,container);}
if(html&&options.replace===true){container.replaceWith(html);}});});});};Syntax.loader.core=true;