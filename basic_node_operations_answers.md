# Questions:

> Run the commands `sort`, `wc` and `uniq` on the `commands.js` file. Explain how they work and what the output was.

`sort`: This sorted all the lines in the file by their first ASCII code, including tabs and spaces.

`wc`: This output a count of all the lines, words, and characters in the file.

`uniq`: This removes all duplicate lines in the file

> Using the pipe (|) connect at least two commands and run it on commands.js. Explain what the output was and why the specific data was outputted.

`sort commands.js | wc`

This output the same as `wc commands.js` because there should be the same amount of lines, words, and characters but the lines are sorted.

#Programming Question 6:

```js
function reverseString(inputString) {
  let stringAsArray = inputString.split(' ');
  let reversedStringAsArray = [];
  stringAsArray.forEach( word => {
    let wordAsArray = word.split('');
    wordAsArray.reverse();
    let reversedWord = wordAsArray.join('');
    reversedStringAsArray.push(reversedWord);
  });
  let reversedString = reversedStringAsArray.join(' ');
  return reversedString;
}
```