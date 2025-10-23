import React, { useRef, useEffect, useState } from 'react';
import { Palette, Eraser, RotateCcw, Minus, Plus } from 'lucide-react';

interface DrawingCanvasProps {
  onStartDrawing: (e: React.MouseEvent<HTMLCanvasElement>) => void;
  onDraw: (e: React.MouseEvent<HTMLCanvasElement>) => void;
  onStopDrawing: () => void;
  onClear: () => void;
  color: string;
  onColorChange: (color: string) => void;
  size: number;
  onSizeChange: (size: number) => void;
  isDisabled: boolean;
  canvasRef: React.RefObject<HTMLCanvasElement>;
}

export const DrawingCanvas = ({
  onStartDrawing,
  onDraw,
  onStopDrawing,
  onClear,
  color,
  onColorChange,
  size,
  onSizeChange,
  isDisabled,
  canvasRef
}: DrawingCanvasProps) => {
  const [showColorPicker, setShowColorPicker] = useState(false);
  
  // Set canvas dimensions properly
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      
      // Set the internal canvas size to match the display size
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      
      // Scale the context to match the device pixel ratio
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.scale(dpr, dpr);
        ctx.lineCap = 'round';
      }
    }
  }, []);
  
  const presetColors = [
    '#000000', '#FFFFFF', '#FF0000', '#00FF00', '#0000FF', '#FFFF00',
    '#FF00FF', '#00FFFF', '#FFA500', '#800080', '#FFC0CB', '#A52A2A'
  ];

  const adjustSize = (delta: number) => {
    const newSize = Math.max(1, Math.min(50, size + delta));
    onSizeChange(newSize);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Canvas */}
      <div className="relative mb-4 rounded-2xl overflow-hidden shadow-2xl border-4 border-slate-700">
        <canvas
          ref={canvasRef}
          className={`w-full h-64 sm:h-96 bg-white cursor-crosshair transition-all duration-300 ${
            isDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-inner'
          }`}
          onMouseDown={onStartDrawing}
          onMouseMove={onDraw}
          onMouseUp={onStopDrawing}
          onMouseOut={onStopDrawing}
        />
        {isDisabled && (
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
            <div className="bg-slate-800 text-white px-4 py-2 rounded-lg font-semibold">
              Waiting for your turn...
            </div>
          </div>
        )}
      </div>

      {/* Drawing Tools */}
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-4 border border-slate-700">
        <div className="flex flex-wrap items-center justify-center gap-4">
          {/* Color Picker */}
          <div className="relative">
            <button
              onClick={() => setShowColorPicker(!showColorPicker)}
              className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-all duration-300 group"
              disabled={isDisabled}
            >
              <Palette className="w-4 h-4 text-slate-300 group-hover:text-white" />
              <div 
                className="w-6 h-6 rounded-full border-2 border-white shadow-lg"
                style={{ backgroundColor: color }}
              />
            </button>
            
            {showColorPicker && (
              <div className="absolute top-full mt-2 bg-slate-800 rounded-lg p-3 border border-slate-700 shadow-xl z-10">
                <div className="grid grid-cols-6 gap-2 mb-3">
                  {presetColors.map((presetColor) => (
                    <button
                      key={presetColor}
                      onClick={() => {
                        onColorChange(presetColor);
                        setShowColorPicker(false);
                      }}
                      className="w-8 h-8 rounded-full border-2 border-slate-600 hover:border-white transition-all duration-200 hover:scale-110"
                      style={{ backgroundColor: presetColor }}
                    />
                  ))}
                </div>
                <input
                  type="color"
                  value={color}
                  onChange={(e) => onColorChange(e.target.value)}
                  className="w-full h-8 rounded border border-slate-600"
                />
              </div>
            )}
          </div>

          {/* Brush Size */}
          <div className="flex items-center gap-2 bg-slate-700 rounded-lg p-2">
            <button
              onClick={() => adjustSize(-2)}
              className="p-1 hover:bg-slate-600 rounded transition-colors"
              disabled={isDisabled || size <= 1}
            >
              <Minus className="w-4 h-4 text-slate-300" />
            </button>
            <div className="flex items-center gap-2 px-3">
              <div 
                className="rounded-full bg-white"
                style={{ 
                  width: Math.max(4, Math.min(20, size)), 
                  height: Math.max(4, Math.min(20, size)) 
                }}
              />
              <span className="text-sm text-slate-300 font-medium min-w-[2rem] text-center">
                {size}px
              </span>
            </div>
            <button
              onClick={() => adjustSize(2)}
              className="p-1 hover:bg-slate-600 rounded transition-colors"
              disabled={isDisabled || size >= 50}
            >
              <Plus className="w-4 h-4 text-slate-300" />
            </button>
          </div>

          {/* Eraser */}
          <button
            onClick={() => onColorChange('#FFFFFF')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
              color === '#FFFFFF'
                ? 'bg-blue-600 text-white'
                : 'bg-slate-700 hover:bg-slate-600 text-slate-300 hover:text-white'
            }`}
            disabled={isDisabled}
          >
            <Eraser className="w-4 h-4" />
            <span className="hidden sm:inline">Eraser</span>
          </button>

          {/* Clear Canvas */}
          <button
            onClick={onClear}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all duration-300 transform hover:scale-105"
            disabled={isDisabled}
          >
            <RotateCcw className="w-4 h-4" />
            <span className="hidden sm:inline">Clear</span>
          </button>
        </div>
      </div>
    </div>
  );
};