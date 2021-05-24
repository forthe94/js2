/**
 * http://usejsdoc.org/
 */

let text = 'A South Carolina parrot was the sole witness to the death by neglect of a 98-year-old woman. \'Help me, Help me,\' said the parrot. \'Ha ha ha!\
\' (reported in Harper\'s Magazine, February 2011)'
	
console.log(text)

let regexp1 = /\' /g
let regexp2 = /\ '/g
    
console.log(text.match(regexp1))
console.log(text.match(regexp2))

text = text.replace(regexp1, '\" ')
text = text.replace(regexp2, '\ "')
console.log(text)