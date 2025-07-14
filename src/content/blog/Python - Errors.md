---
title: "Python - Errors"
pubDate: 2025-07-14
updatedDate: 2025-07-14 
heroImage : 'images/blog/python/errors/python.png'
description: "A short overview of Python Errors"
tags: ["learning", "python", "code"]
category: 'programming'
draft: false
---

![python logo](/images/blog/python/errors/python.png)

#python #learning #code #lesson 
## What Are Python Errors?

When something goes wrong in your Python program, Python tries to tell you what happened through *error messages*. These aren't just annoyances - they're actually helpful messages that point you toward solutions.

> [!NOTE] Think of It This Way
> Imagine you're following a recipe and something goes wrong. Maybe you're missing an ingredient, or the temperature is wrong. The error messages Python gives are like having an experienced chef looking over your shoulder, pointing out what went wrong and how to fix it.

## Common Python Errors Reference Table

| Error Type | Description | Common Cause | Example |
|------------|-------------|--------------|---------|
| `SyntaxError` | Code structure is incorrect | Missing parenthesis, incorrect indentation | `print "Hello"` (missing parentheses) |
| `NameError` | Using a variable or function that doesn't exist | Misspelled variable name, undefined variable | `print(varaible)` (misspelled 'variable') |
| `TypeError` | Operation between incompatible types | Adding string and integer | `"hello" + 5` |
| `IndexError` | Accessing a non-existent index | List index out of range | `list[10]` (list has fewer items) |
| `KeyError` | Accessing a non-existent dictionary key | Using a key that doesn't exist | `dict['missing_key']` |
| `ValueError` | Right type but wrong value | Converting invalid string to int | `int("hello")` |
| `ZeroDivisionError` | Division by zero | Dividing by zero | `10 / 0` |
| `AttributeError` | Using non-existent attribute/method | Calling wrong method | `"hello".upper_case()` (should be upper()) |
| `IndentationError` | Incorrect indentation | Wrong number of spaces | Inconsistent spaces in code blocks |
| `FileNotFoundError` | Accessing non-existent file | Wrong file path | `open("missing.txt")` |

## Understanding Error Messages 📚

When Python shows an error, it typically includes several pieces of information:

```python
Traceback (most recent call last):
  File "script.py", line 5
    print(undefined_variable)
NameError: name 'undefined_variable' is not defined
```

Let's break this down:
1. The *traceback* shows where the error occurred
2. The *file name* and *line number* point to the problem
3. The *error type* tells us what kind of error it is
4. The *error message* explains what went wrong

> [!TIP] Reading Error Messages
> Always read error messages from bottom to top:
> 1. Start with the actual error message (last line)
> 2. Then look at where it happened (file and line number)
> 3. Finally, trace back through the code that led to the error

## Handling Errors Gracefully 🛡️

### Using try-except Blocks

```python
# Basic error handling
try:
    # Potentially problematic code
    age = int(input("Enter your age: "))
    print(f"Next year, you'll be {age + 1}")
except ValueError:
    # Code to handle the error
    print("Please enter a valid number")
```

> [!IMPORTANT] Why Use try-except?
> Think of error handling like wearing a safety net:
> - The `try` block is like attempting a trapeze act
> - The `except` block is the safety net that catches you if you fall
> - Without it, your program would crash when something goes wrong

### Multiple Error Types

```python
def safe_division():
    try:
        # Multiple things could go wrong here
        number = float(input("Enter a number: "))
        result = 10 / number
        print(f"10 divided by {number} is {result}")
    except ValueError:
        print("Please enter a valid number")
    except ZeroDivisionError:
        print("Cannot divide by zero!")
    except Exception as e:
        # Catch any other unexpected errors
        print(f"An unexpected error occurred: {e}")
```

## Common Error Patterns and Solutions 🎯

### 1. SyntaxError
```python
# Common mistake
if x == 5    # Missing colon
    print(x)

# Correct version
if x == 5:   # Added colon
    print(x)
```

### 2. IndentationError
```python
# Common mistake
def my_function():
print("Wrong indentation")  # Should be indented

# Correct version
def my_function():
    print("Correct indentation")  # Properly indented
```

### 3. TypeError
```python
# Common mistake
age = "25"
result = age + 5  # Can't add string and integer

# Correct version
age = int("25")  # Convert to integer first
result = age + 5
```

## Best Practices for Error Handling 📌

1. **Be Specific with Exceptions**
```python
# Not so good (too broad)
try:
    do_something()
except Exception:
    print("Something went wrong")

# Better (specific handling)
try:
    do_something()
except ValueError:
    print("Invalid value provided")
except FileNotFoundError:
    print("Required file is missing")
```

2. **Use else and finally**
```python
try:
    file = open("data.txt")
    data = file.read()
except FileNotFoundError:
    print("File not found")
else:
    # Runs if no error occurred
    print("File read successfully")
finally:
    # Always runs, error or not
    file.close()
```

## Practice Exercises 💪

### 1. Error Identification
```python
# What errors will these cause?
print(hello)                  # NameError
"5" + 5                      # TypeError
list_example = [1, 2, 3]
print(list_example[5])       # IndexError
```

### 2. Error Handling Practice
```python
def get_user_age():
    """
    Ask user for age and handle possible errors
    """
    while True:
        try:
            age = int(input("Enter your age: "))
            if age < 0 or age > 150:
                raise ValueError("Age must be between 0 and 150")
            return age
        except ValueError as e:
            print(f"Invalid age: {e}")
```

Remember:
- Errors are helpful guides, not obstacles
- Always read the error message carefully
- Handle specific exceptions rather than catching all errors
- Test your error handling with different inputs

> [!TIP] Debugging Strategy
> When you encounter an error:
> 1. Read the error message carefully
> 2. Locate where the error occurred
> 3. Check your assumptions about the data
> 4. Test with simpler cases first
> 5. Use print statements to check values

