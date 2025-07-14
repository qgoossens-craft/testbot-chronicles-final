export interface ColorPalette {
  primary: string;
  secondary: string;
  accent: string;
  isDark: boolean;
}

export function extractColorsFromImage(imagePath: string): Promise<ColorPalette> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        resolve(getDefaultPalette());
        return;
      }
      
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      
      try {
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const colors = analyzeImageData(imageData);
        resolve(colors);
      } catch (error) {
        resolve(getDefaultPalette());
      }
    };
    
    img.onerror = () => {
      resolve(getDefaultPalette());
    };
    
    img.src = imagePath;
  });
}

function analyzeImageData(imageData: ImageData): ColorPalette {
  const data = imageData.data;
  const colorMap = new Map<string, number>();
  const sampleRate = 10; // Sample every 10th pixel for performance
  
  for (let i = 0; i < data.length; i += 4 * sampleRate) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const a = data[i + 3];
    
    // Skip transparent pixels
    if (a < 128) continue;
    
    // Skip very dark or very light pixels
    const brightness = (r + g + b) / 3;
    if (brightness < 30 || brightness > 225) continue;
    
    // Group similar colors
    const normalizedR = Math.round(r / 51) * 51;
    const normalizedG = Math.round(g / 51) * 51;
    const normalizedB = Math.round(b / 51) * 51;
    
    const colorKey = `${normalizedR},${normalizedG},${normalizedB}`;
    colorMap.set(colorKey, (colorMap.get(colorKey) || 0) + 1);
  }
  
  // Get the most common colors
  const sortedColors = Array.from(colorMap.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);
  
  if (sortedColors.length === 0) {
    return getDefaultPalette();
  }
  
  const primaryColor = sortedColors[0][0];
  const [r, g, b] = primaryColor.split(',').map(Number);
  
  const primary = `rgb(${r}, ${g}, ${b})`;
  const secondary = createVariation(r, g, b, 0.15);
  const accent = createVariation(r, g, b, -0.2);
  const isDark = (r + g + b) / 3 < 128;
  
  return {
    primary,
    secondary,
    accent,
    isDark
  };
}

function createVariation(r: number, g: number, b: number, factor: number): string {
  const newR = Math.max(0, Math.min(255, r + (r * factor)));
  const newG = Math.max(0, Math.min(255, g + (g * factor)));
  const newB = Math.max(0, Math.min(255, b + (b * factor)));
  
  return `rgb(${Math.round(newR)}, ${Math.round(newG)}, ${Math.round(newB)})`;
}

function getDefaultPalette(): ColorPalette {
  return {
    primary: 'rgb(59, 130, 246)', // Blue-500
    secondary: 'rgb(147, 197, 253)', // Blue-300
    accent: 'rgb(30, 64, 175)', // Blue-800
    isDark: false
  };
}

export function rgbToHex(rgb: string): string {
  const values = rgb.match(/\d+/g);
  if (!values || values.length < 3) return '#3B82F6';
  
  const r = parseInt(values[0]);
  const g = parseInt(values[1]);
  const b = parseInt(values[2]);
  
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

export function getContrastColor(backgroundColor: string): string {
  const rgb = backgroundColor.match(/\d+/g);
  if (!rgb || rgb.length < 3) return '#000000';
  
  const r = parseInt(rgb[0]);
  const g = parseInt(rgb[1]);
  const b = parseInt(rgb[2]);
  
  // Calculate luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  
  return luminance > 0.5 ? '#000000' : '#FFFFFF';
}