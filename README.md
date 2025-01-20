# Calculator
This is a basic calculator built with Vanilla JS as part of The Odin Project's Javascript module in the Foundations course. The calculator can perform basic operations, show errors, limit input to 8 characters and truncate output to 8 characters:
- Binary operations supported: add, subtract, multiply, divide
- Unary operations supported: change to %, change sign of number
- Decimal points are supported ('.' is disabled if input already contains it)
- Edge case: operands are always resolved so that the calculator operates on *pairs* of operands; if 2 + 2 + 3 is clicked, the calculator will evaluate this to 4 + 3 and display 4 on the screen
- Edge case: when two successive binary operators are clicked, only the latest click counts
- Edge case: when only one number is input, the equal sign does nothing
- Edge case: when dividing by 0, the calculator displays ERROR
- No numbers or decimal points are accepted beyond 8 characters
- If answers are longer than 8 characters, they are truncated between [-9999999, 99999999]

## Tech Used
**Tech Used:** HTML, CSS (Flexbox), JavaScript (DOM manipulation, event listeners, logic)

I practiced the following:
- HTML & CSS Styling
- String processing
- Math / mathematical evaluations
- Event handling via delegation in Javascript

## What I Learnt
- How to manage local and remote Git branches
- Using Javascript to automate repetitive HTML element creation
- Reinforced event delegation to parent node, and using `event.target` accordingly
- Practiced divide and conquer: breaking down the problem and coding each segment

## Potential next steps 
- Further refactoring code to standardize language and function interface (types of parameters)
- Accepting keyboard input
- Disabling the calculator or resetting it after divide by zero error
- Expanding it to a scientific calculator