---
title: 'How to install claude-code on Windows'
description: "Now that Anthropic allows Windows users to use claude-code without WSL (Windows Subsystem for Linux), let's dive into setting up your AI code companion with a step-by-step approach that anyone can follow."
pubDate: 2025-07-19
heroImage: '/images/blog/claude-code/claude.png'  # Optional - blog post header image
tags: ['claude', 'claude-code', 'tutorial']  # Add relevant tags
category: 'Programming'
draft: false  # Set to true to hide from published posts
---

![claude-code logo](/images/blog/claude-code/claude.png)

# How to install claude-code on Windows

Now that Anthropic allows Windows users to use claude-code without WSL (Windows Subsystem for Linux), let's dive into setting up your AI code companion with a step-by-step approach that anyone can follow.

## What Changed Recently?

> **Thought**
> 
> Anthropic released a significant update allowing Windows users to bypass the Linux submachine (WSL) setup entirely. This makes Claude Code accessible to everyone, regardless of technical expertise!

Previously, Windows users needed to:
- Install and configure WSL
- Set up a Linux environment
- Navigate complex terminal commands

**Now**, you can install Claude Code directly on Windows using familiar tools. This guide will walk you through every step, assuming no prior technical knowledge.

## What is Claude Code?

> **NOTE**
> 
> Claude Code is an AI-powered coding assistant that works directly in your terminal or IDE. Think of it as having an expert programmer (or a junior one if you don't know/want to direct it properly) sitting next to you, ready to help with code, explanations, debugging, and more.

**Key Benefits:**
-  Real-time coding assistance
-  Code review and optimization
-  Debugging help
-  Documentation generation
-  Learning support for new technologies

## Prerequisites: What You Need First

Before we begin, you'll need to install some foundational tools, namely : node.js (and npm) and Git.

### 1. Node.js and npm (The Basics)

**What is Node.js?** It's a platform that lets you run JavaScript programs on your computer. npm is its package manager (think of it as an app store for code).

> **TIP**
> 
> **Easy Installation Options:**
> - **Option A:** Download from [nodejs.org](https://nodejs.org/) (choose LTS version - it's more stable)
> - **Option B:** If you have Chocolatey installed: `choco install nodejs`

**Step-by-step installation:**

1. Go to [nodejs.org](https://nodejs.org/)
2. Click the **LTS** button (Long Term Support - more stable)
3. Run the downloaded installer
4. **Important:** Check "Add to PATH" during installation
5. Click "Next" through all prompts and "Install"

**Verify it worked:**
1. Press `Windows Key + R`
2. Type `powershell` and press Enter
3. Type these commands one by one:

```powershell
node --version
npm --version
```

> **NOTE**
> 
> You should see version numbers like `v20.x.x` and `10.x.x`. If you see errors, restart your computer and try again.

### 2. Git for Windows (Version Control)

**What is Git?** It's a tool that helps track changes in code. Claude Code uses it for various operations.

1. Go to [git-scm.com/download/win](https://git-scm.com/download/win)
2. Download and run the installer
3. **Important settings during installation:**
    - Choose "Use Git from the Windows Command Prompt"
    - Keep all other default settings

**Verify it worked:**
```powershell
git --version
```

> **TIP**
> 
> If you see a version number, you're all set.  If not, restart PowerShell (in admin mode) and try again.

### 3. A paid Anthropic account

You cannot use Claude Code on free accounts. I highly recommend you just take a [pro account](https://www.anthropic.com/) to see if this setup suits you. 

Obviously, if you're **really** new to all of this, please take the time to familiarize yourself with AI Agents before spending money on something that wouldn't suit you.

![--versions](/images/blog/claude-code/version.png)

## Installation Process: Step by Step

### Step 1: Open PowerShell as Administrator

> **IMPORTANT**
> 
> **Why Administrator?** Installing global packages requires elevated permissions.

1. Press `Windows Key`
2. Type "PowerShell"
3. **Right-click** on "Windows PowerShell"
4. Select "Run as administrator"
5. Click "Yes" if prompted

> **WARNING**
> 
> You'll see "Administrator" in the title bar. If you don't see this, close PowerShell and try again.

### Step 2: Install Claude Code

Copy and paste this command into PowerShell:

```powershell
npm install -g @anthropic-ai/claude-code
```

> **NOTE**
> 
> **What does this do?**
> - `npm install` = Download and install a package
> - `-g` = Install globally (available everywhere on your system)
> - `@anthropic-ai/claude-code` = The official Claude Code package

**What you'll see:**
- Download progress bars
- Installation messages
- "Success" message when complete

> **TIP**
> 
> **Having issues?** Try these troubleshooting steps:
> - Check your internet connection
> - Disable antivirus temporarily
> - If behind a corporate firewall, contact your IT department, your company policy may not allow this beauty..

### Step 3: Find Where Claude Code Was Installed

Run these commands to see where npm put Claude Code:

```powershell
npm config get prefix
npm root -g
```

> **NOTE**
> 
> **Typical locations:**
> - `C:\Users\[YourUsername]\.npm-global`
> - `C:\Users\[YourUsername]\AppData\Roaming\npm`

**Remember this location** - we'll need it in the next step!

### Step 4: Add Claude Code to Your PATH

> **IMPORTANT**
> 
> **What is PATH?** It's a list of folders where Windows looks for programs. Adding Claude Code to PATH lets you run it from anywhere.

**Method 1: Using PowerShell (Recommended)**

Replace `[YourUsername]` with your actual username:

```powershell
[Environment]::SetEnvironmentVariable("Path", $env:Path + ";C:\Users\[YourUsername]\.npm-global", [EnvironmentVariableTarget]::User)
```

> **TIP**
> 
> **Don't know your username?** Type `whoami` in PowerShell to see it!

**Method 2: Using Windows Settings (Visual Method)**

1. Press `Windows Key + X`
2. Select "System"
3. Click "Advanced system settings"
4. Click "Environment Variables"
5. Under "User variables", find and select "Path"
6. Click "Edit"
7. Click "New"
8. Add: `C:\Users\[YourUsername]\.npm-global`
9. Click "OK" on all windows

### Step 5: Test Your Installation

**Close and reopen PowerShell** (this refreshes the PATH), then test:

```powershell
claude --version
```

> **CAUTION**
> 
> **If you see "command not found":** Don't panic! This is common. Try these solutions:

**Solution A: Use the full path**
```powershell
& "C:\Users\[YourUsername]\.npm-global\claude.cmd" --version
```

**Solution B: Create a shortcut script**

1. Open Notepad
2. Type:
```batch
@echo off
"C:\Users\[YourUsername]\.npm-global\claude.cmd" %*
```
3. Save as `claude-helper.bat` in your Documents folder
4. Use `claude-helper` instead of `claude`

**Solution C: Restart your computer**

Sometimes Windows needs a little help to recognize PATH changes.

## First-Time Setup: Getting Started

### Authentication with Anthropic

> **IMPORTANT**
> 
> **You need an Anthropic account** to use Claude Code. If you don't have one:
> 1. Go to [claude.ai](https://claude.ai)
> 2. Sign up for a free account
> 3. Upgrade to Pro or Max (this won't work on a free account)

**Start Claude Code:**
```powershell
claude
```

> **NOTE**
> 
> **What happens next:**
> - Claude Code will open in your browser
> - You'll log in to your Anthropic account
> - A authentication token will be saved locally
> - You'll return to the terminal ready to use Claude

### Basic Configuration

**Check your current settings:**
```powershell
claude config
```

**Recommended beginner settings:**
```powershell
# Set a dark theme (easier on the eyes)
claude config set theme dark

# Set default model to Sonnet (good balance of speed and capability)
claude config set model sonnet

# Enable helpful prompts
claude config set interactive true
```

> **TIP**
> 
> **Don't worry about getting these perfect.** You can always change them later.

## How to Use Claude Code: Practical Examples

### Interactive Mode (Recommended for Beginners)

Simply type:
```powershell
claude
```

This opens a conversation where you can:
- Ask coding questions
- Get help with debugging
- Request code explanations
- Generate documentation

> [!TIP]
> **Try these example prompts:**
> - "Explain what this Python function does: [paste your code]"
> - "Help me fix this error: [paste error message]"
> - "Write a simple HTML webpage for a portfolio"
> - "What's the difference between Git and GitHub?"
> - "What's the answer to everything in the universe ?"

![42](/images/blog/claude-code/42.png)


### Project-Specific Help

This is where Claude Code really shines. 

#### Option 1: Working with an Existing Project (Most Common)

**1. Navigate to where you want your project**

If you have code on GitHub/GitLab:

```powershell
# Go to your Documents folder (safe place to start)
cd Documents

# Create a new folder for your projects
mkdir MyProjects
cd MyProjects
```
**2.Download your project**

```powershell
# Replace [your-repo-address] with your actual GitHub link
git clone https://github.com/username/your-project-name.git

# Go into your project folder
cd your-project-name
```
**3. Start Claude Code**

```powershell
claude
```
#### Option 2: Starting a New Project

**1.Create your project folder**

```powershell
cd Documents
mkdir MyNewProject
cd MyNewProject
```
**2.Start Claude Code**

```powershell
claude
```

> **TIP**
> 
> **Windows Path Tip:** You can drag a folder from File Explorer into PowerShell to get its full path automatically!

### Useful Commands for Beginners

| Command | What It Does | When to Use |
|---------|-------------|-------------|
| `claude` | Start interactive chat | General coding help |
| `claude --help` | Show all options | When you're stuck |
| `claude --continue` | Resume last conversation | Pick up where you left off |
| `claude --version` | Show version info | Troubleshooting |
| `claude config` | View/change settings | Customize experience |


## Verification Checklist

Before considering your installation complete, check all these items:

- [ ]  Node.js is installed (`node --version` shows a version)
- [ ]  npm is installed (`npm --version` shows a version)
- [ ]  Git is installed (`git --version` shows a version)
- [ ]  Claude Code is installed (`claude --version` shows version OR full path works)
- [ ]  You can authenticate with Anthropic
- [ ]  Interactive mode works (`claude` starts a conversation)
- [ ]  Quick commands work (`claude --help` shows options)

> [!TIP]
> **If any item fails,** go back to that section and follow the troubleshooting steps!

## Next Steps: Making the Most of Claude Code

### Learning and Exploration

> **NOTE**
> 
> **Start with simple tasks** to build confidence:

1. **Ask for code explanations:**
   ```powershell
   claude --print "Explain this CSS: body { margin: 0; padding: 0; }"
   ```

2. **Get coding tutorials:**
   ```powershell
   claude "Teach me the basics of Python variables"
   ```

3. **Debug simple errors:**
   ```powershell
   claude "Why does my HTML page not show colors?"
   ```

### IDE Integration

> [!TIP]
> **Popular IDEs that work great with Claude Code:**
> - **VS Code** (free, beginner-friendly)
> - **PyCharm** (great for Python)
> - **WebStorm** (excellent for web development)

**Using with VS Code:**
1. Open your project in VS Code
2. Open the terminal (Ctrl + `)
3. Type `claude` to start helping with your project

### Advanced Features (When You're Ready)

```powershell
# Use different AI models
claude --model opus    # More capable, slower
claude --model haiku   # Faster, simpler tasks

# Save conversation history
claude --session-id my-project-help

# Work with specific tools only
claude --allowedTools "Edit,Browse"

# Debug mode for troubleshooting
claude --debug
```

## Security and Best Practices

### What Claude Code Can Access

> **IMPORTANT**
> **Claude Code can:**
> - Read files in your project directory
> - Suggest code changes
> - Create and modify files (with your permission)
> - Run certain commands (with your permission)

> **WARNING**
> **Claude Code cannot:**
> - Access files outside your project (unless you explicitly allow it)
> - Make changes without asking
> - Access your passwords or sensitive system files
> - Connect to the internet independently


## Conclusion: You're Ready to Code with AI!

Congratulations!  You've successfully installed Claude Code on Windows. You now have:

-  A working AI coding assistant
-  The ability to get instant help with programming
-  A tool that grows with your skills
-  Access to cutting-edge AI technology

### Your First Steps

> **NOTE**
> 
> **Recommended first actions:**

1. **Start simple:** `claude "Hello! I'm new to programming. Can you help me write my first HTML page?"`
2. **Explore:** Try asking about technologies you're curious about
3. **Practice:** Use Claude Code on small projects to build confidence
4. **Learn:** Don't just copy code - ask Claude to explain what it's doing

### Getting Help

> **T**IP
> **If you get stuck:**

- **Built-in help:** `claude --help`
- **Community:** Search for "Claude Code" discussions online
- **Official docs:** Check Anthropic's documentation
- **This guide:** Bookmark this tutorial for future reference

### Remember

> **IMPORTANT**
> 
> I cannot stress this enough :
> **Claude Code is a tool to enhance your learning, not replace it.** Use it to:
> - Understand concepts better
> - Learn best practices
> - Speed up development
> - Gain confidence in coding

Claude Code is an amazing tool to help you code better, but AI **will never** be able to think for you. If your mind is not set on a particular project and you don't know what you want, you'll never be able to make it with Claude.


**Happy coding with your new AI companion!**
