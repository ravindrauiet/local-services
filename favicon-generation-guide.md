# Favicon Generation Guide for Mithila Shilpi

## Required Favicon Files

You need to create the following favicon files in your `/public` folder:

### 1. favicon.ico (16x16, 32x32, 48x48)
- **File**: `/public/favicon.ico`
- **Sizes**: 16x16, 32x32, 48x48 pixels
- **Format**: ICO format
- **Usage**: Browser tab icon

### 2. favicon-16x16.png
- **File**: `/public/favicon-16x16.png`
- **Size**: 16x16 pixels
- **Format**: PNG
- **Usage**: Small browser tab icon

### 3. favicon-32x32.png
- **File**: `/public/favicon-32x32.png`
- **Size**: 32x32 pixels
- **Format**: PNG
- **Usage**: Standard browser tab icon

### 4. apple-touch-icon.png
- **File**: `/public/apple-touch-icon.png`
- **Size**: 180x180 pixels
- **Format**: PNG
- **Usage**: iOS home screen icon

## How to Generate Favicons

### Option 1: Online Favicon Generator
1. Go to https://favicon.io/favicon-converter/
2. Upload your `logo.png` file
3. Download the generated favicon package
4. Extract and place the files in your `/public` folder

### Option 2: Using Image Editing Software
1. Open your `logo.png` in Photoshop, GIMP, or Canva
2. Resize to each required size
3. Save as PNG format
4. For favicon.ico, use an online converter

### Option 3: Command Line (if you have ImageMagick)
```bash
# Resize to different sizes
convert logo.png -resize 16x16 favicon-16x16.png
convert logo.png -resize 32x32 favicon-32x32.png
convert logo.png -resize 180x180 apple-touch-icon.png

# Create ICO file
convert logo.png -resize 32x32 favicon.ico
```

## File Structure After Generation
```
public/
├── logo.png (your original logo)
├── favicon.ico
├── favicon-16x16.png
├── favicon-32x32.png
└── apple-touch-icon.png
```

## Testing
After adding the favicon files:
1. Restart your development server
2. Check the browser tab for your favicon
3. Test on different devices and browsers

## Notes
- Make sure your logo works well at small sizes (16x16)
- Consider creating a simplified version for very small sizes
- Test on both light and dark browser themes
- The favicon should be recognizable even at 16x16 pixels
