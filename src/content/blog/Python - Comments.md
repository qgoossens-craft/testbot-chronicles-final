---
title: 'Python - Comments'
description: 'A brief overview of Python comments'
pubDate: 2025-07-14
updatedDate: 2025-07-14   # Optional - only add if you update the post
heroImage: 'images/blog/python/errors/python.png'  # Optional - blog post header image
tags: ['python', 'code', 'learn']  # Add relevant tags
category: 'programming'
draft: false  # Set to true to hide from published posts
---



![python logo](/images/blog/python/errors/python.png)

## What Are Comments?

*Comments* are notes we leave in our code that Python will ignore when running the program. They're like sticky notes we put in our code to help ourselves and others understand what's happening.

> [!NOTE] Think of It This Way
> Imagine you're writing instructions for a recipe. The actual steps (code) tell you what to do, but the little notes in the margins (comments) explain *why* you're doing each step or offer helpful tips. These notes don't affect the cooking process, but they make it easier to understand!

## Python Comments Reference Table

| Term                   | Definition                                                                  |
| ---------------------- | --------------------------------------------------------------------------- |
| Single-line Comment    | Text following a # symbol that Python ignores during execution              |
| Docstring              | Multi-line comment using triple quotes (""" or ''') used for documentation  |
| Inline Comment         | Comment placed on the same line after code                                  |
| Function Documentation | Docstring that explains a function's purpose, parameters, and return values |
| Module Documentation   | Docstring at the start of a file explaining the module's purpose            |
| Comment Marker         | The # symbol that tells Python to ignore the rest of the line               |
| Documentation String   | Another term for docstring, can be accessed programmatically                |
| Block Comment          | Multiple single-line comments grouped together to explain complex logic     |

## Types of Comments in Python 🎨

### Single-Line Comments

```python
# This is a single-line comment
name = "Alice"    # Comments can also go after code

# You can use comments to explain complex calculations
total = subtotal * 1.15  # Adding 15% tax to the subtotal
```

> [!TIP] When to Use Single-Line Comments
> Use single-line comments when you need to:
> - Explain *why* you're doing something
> - Provide **quick context** about a specific line
> - Add reminders or notes to yourself

### Multi-Line Comments (Docstrings)

```python
"""
This is a multi-line comment (docstring).
It can span several lines and is often used
to explain more complex pieces of code.
"""

def calculate_tax(amount):
    """
    Calculate sales tax for a given amount.
    
    Args:
        amount (float): The original price
        
    Returns:
        float: The amount with 15% tax added
    """
    return amount * 1.15
```

> [!IMPORTANT] Understanding Docstrings
> Docstrings are **special comments** that:
> - Are enclosed in *triple quotes* (`"""` or `'''`)
> - Can span multiple lines
> - Are used primarily for *documentation*
> - Can be accessed by Python's help system

## Best Practices for Writing Comments 📚

### 1. Explain the Why, Not the What

```python
# BAD COMMENT - explains what (obvious from code)
x = x + 1  # Add 1 to x

# GOOD COMMENT - explains why
x = x + 1  # Increment counter to track number of attempts
```

> [!WARNING] Comment Wisely
> Your comments should explain:
> - The *purpose* behind the code
> - Any **non-obvious** implications
> - Important warnings or notes
> Never just restate what the code obviously does!

### 2. Keep Comments Updated

```python
# DANGEROUS: Outdated comment
# Calculate tax at 10%
total = subtotal * 1.15  # Actual calculation uses 15%

# BETTER: Accurate comment
# Calculate tax at current rate (15%)
total = subtotal * 1.15
```

> [!CAUTION] Remember
> **Outdated comments are worse than no comments** because they can mislead other developers (including future you!)

### 3. Using Comments for Debugging

```python
def process_data(data):
    # Debug: Print input data
    # print("Input:", data)
    
    result = perform_calculation(data)
    
    # Debug: Print result
    # print("Result:", result)
    
    return result
```

> [!TIP] Debugging with Comments
> Comments can be used to:
> - *Temporarily* disable code
> - Add debug print statements
> - Mark areas that need attention
## Real-World Examples 🌟

### 1. Documenting a Function

```python
def calculate_discount(price, customer_type):
    """
    Calculate discount based on customer type.
    
    Args:
        price (float): Original price
        customer_type (str): Type of customer ('regular' or 'premium')
        
    Returns:
        float: Final price after discount
        
    Examples:
        >>> calculate_discount(100, 'premium')
        80.0  # 20% discount for premium customers
    """
    if customer_type == 'premium':
        return price * 0.8  # 20% discount
    return price * 0.95    # 5% discount for regular customers
```

### 2. Explaining Complex Logic

```python
def validate_password(password):
    # We require at least 8 characters to provide adequate security
    if len(password) < 8:
        return False
        
    # Check for mixed case to increase password strength
    has_upper = any(c.isupper() for c in password)
    has_lower = any(c.islower() for c in password)
    
    # Special characters make passwords harder to guess
    has_special = any(not c.isalnum() for c in password)
    
    return all([has_upper, has_lower, has_special])
```

## When to Use Comments (and When Not To) 🤔

### Good Uses of Comments

```python
# GOOD: Explaining business rules
# Orders over $100 get free shipping
if order_total > 100:
    shipping_cost = 0

# GOOD: Warning about edge cases
# Note: This function assumes input is always positive
def calculate_square_root(n):
    return n ** 0.5

# GOOD: Explaining complex algorithms
# Using binary search to find target value
# Time complexity: O(log n)
def binary_search(array, target):
    # Implementation here...
```

### Unnecessary Comments

```python
# BAD: Stating the obvious
x = 0  # Set x to 0

# BAD: Commenting every line
name = input("Enter name: ")  # Get user input for name
age = input("Enter age: ")    # Get user input for age

# BAD: Redundant information
# This function returns the sum of a and b
def add(a, b):
    return a + b  # Return the sum
```

## Practice Exercises 💪

### 1. Comment Improvement
Look at these comments and improve them:

```python
# Original
x = x + 1  # Add one to x

# Better
x = x + 1  # Increment retry counter for failed login attempts

# Original
def process_data(data):
    # Process the data
    return data.upper()

# Better
def process_data(data):
    """
    Convert input string to uppercase for consistent database storage.
    This ensures case-insensitive comparisons in searches.
    """
    return data.upper()
```

Remember: Good comments are like good teachers - they explain things clearly, don't state the obvious, and help you understand the bigger picture!