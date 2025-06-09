# File Upload Control for Power Apps (PCF)

A reusable Power Apps Component Framework (PCF) control for uploading files within your model-driven or canvas Power Apps. Built with React and Fluent UI, this control enables drag-and-drop and traditional file selection, along with file previews and removal.

## Credits

This code is derived from the awesome work of Tim Van Onckelen: 

> https://github.com/TimVanOnckelen/Power-Platform-PCFs/tree/main/fileUploader

## Features

- Drag-and-drop file upload or button-triggered file picker
- Multiple file support
- File preview with icons (PDF, document, etc.)
- Remove files before submission
- Customizable texts, icons, and accepted file types

## Installation

1. Clone or download this repository.
2. Navigate to the project folder:
   ```pwsh
   cd PCF-FileUpload
   ```
3. Install dependencies:
   ```pwsh
   npm install
   ```
4. Build the control:
   ```pwsh
   npm run buildp
   ```
5. Navigate to solution folder:
   ```pwsh
   cd solution
   ```
6. Build solution:
   ```pwsh
   dotnet build
   ```
7. Import `solution\bin\Debug\solution.zip` into your Power Platform environment.



