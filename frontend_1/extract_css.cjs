const fs = require('fs');

const data = fs.readFileSync('c:/Users/Suyash/CXO/frontend/error_clean.txt', 'utf16le');

// Find where the CSS actually starts. The error output dumps the source code.
// The source code string has lines like: 
//   '  --font-serif: \'Playfair Display\', serif;\r\n' +
// We need to parse this properly. 
// Every line of the dumped code starts with a quote, has the string, then a quote, then ` + \r\n` or something similar.

let lines = data.split('\n');
let cssLines = [];

let inSource = false;

for (let line of lines) {
  // Check if it's part of the dumped string
  if (line.includes("source: '@tailwind")) {
    inSource = true;
    continue;
  }
  
  // If we're not inside the string, or if we hit the end, skip/break
  if (inSource) {
    let trimmed = line.trim();
    // Usually lines look like: '  --font-serif: \'Playfair Display\', serif;\r\n' +
    if (trimmed.startsWith("'") && trimmed.endsWith(" +")) {
      // Extract string between first quote and last quote before +
      let content = trimmed.substring(1, trimmed.length - 2);
      if (content.endsWith("'")) content = content.substring(0, content.length - 1);
      
      // Replace literal \r\n with nothing since we join with \n anyway
      content = content.replace(/\\r\\n/g, '');
      // Unescape quotes
      content = content.replace(/\\'/g, "'");
      
      cssLines.push(content);
    } else if (trimmed.startsWith("'") && trimmed.endsWith("',")) {
      // Last line of source
      let content = trimmed.substring(1, trimmed.length - 2);
      content = content.replace(/\\r\\n/g, '');
      content = content.replace(/\\'/g, "'");
      cssLines.push(content);
      break; // End of source block
    } else if (trimmed.startsWith("'") && trimmed.endsWith("'")) {
       let content = trimmed.substring(1, trimmed.length - 1);
       content = content.replace(/\\r\\n/g, '');
       content = content.replace(/\\'/g, "'");
       cssLines.push(content);
    }
  }
}

// Ensure the first few lines are clean, and strip the @tailwind directives since we use @import "tailwindcss"; now
let finalCSS = cssLines.join('\n');
finalCSS = finalCSS.replace(/@tailwind base;/g, '');
finalCSS = finalCSS.replace(/@tailwind components;/g, '');
finalCSS = finalCSS.replace(/@tailwind utilities;/g, '');

fs.writeFileSync('src/App.css', finalCSS);
console.log('Successfully wrote parsed CSS to src/App.css');
