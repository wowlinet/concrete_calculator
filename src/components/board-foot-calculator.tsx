'use client'

import React, { useState, useEffect } from 'react';
import { Calculator, RotateCcw, Download, Info } from 'lucide-react';

// 单位类型
type UnitType = 'feet' | 'inches' | 'centimeters' | 'millimeters';

// 计算结果接口
interface CalculationResult {
  boardFeet: number; // 总 Board Feet
  totalCost: number; // 总成本
  boardFeetPerPiece: number; // 每件的 Board Feet
}

// 项目参数接口
interface ProjectParams {
  length: string;
  lengthUnit: UnitType;
  width: string;
  widthUnit: UnitType;
  thickness: string;
  thicknessUnit: UnitType;
  quantity: string; // 数量
  pricePerBoardFoot: string; // 每 Board Foot 价格
}

/**
 * Board Foot 计算器组件
 * 用于计算硬木木材的体积（Board Feet）
 */
export default function BoardFootCalculator() {
  const [params, setParams] = useState<ProjectParams>({
    length: '96',
    lengthUnit: 'inches',
    width: '6',
    widthUnit: 'inches',
    thickness: '1',
    thicknessUnit: 'inches',
    quantity: '10',
    pricePerBoardFoot: '',
  });

  const [result, setResult] = useState<CalculationResult | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // 单位辅助函数
  const getUnitInfo = (unit: UnitType) => {
    switch (unit) {
      case 'feet':
        return { symbol: 'ft', toInches: 12 };
      case 'inches':
        return { symbol: 'in', toInches: 1 };
      case 'centimeters':
        return { symbol: 'cm', toInches: 0.393701 };
      case 'millimeters':
        return { symbol: 'mm', toInches: 0.0393701 };
      default:
        return { symbol: 'in', toInches: 1 };
    }
  };

  // 创建单位选择下拉菜单的辅助函数
  const createUnitSelector = (value: UnitType, onChange: (unit: UnitType) => void, className: string = "") => (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as UnitType)}
      className={`flex-1 px-2 py-1.5 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground border-border ${className}`}
    >
      <option value="inches">inches</option>
      <option value="feet">feet</option>
      <option value="centimeters">centimeters</option>
      <option value="millimeters">millimeters</option>
    </select>
  );

  /**
   * 验证输入参数
   */
  const validateInputs = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!params.length || parseFloat(params.length) <= 0) {
      newErrors.length = 'Please enter a valid length';
    }
    if (!params.width || parseFloat(params.width) <= 0) {
      newErrors.width = 'Please enter a valid width';
    }
    if (!params.thickness || parseFloat(params.thickness) <= 0) {
      newErrors.thickness = 'Please enter a valid thickness';
    }
    if (!params.quantity || parseFloat(params.quantity) <= 0 || !Number.isInteger(parseFloat(params.quantity))) {
      newErrors.quantity = 'Please enter a valid quantity (whole number)';
    }
    if (params.pricePerBoardFoot && parseFloat(params.pricePerBoardFoot) < 0) {
      newErrors.pricePerBoardFoot = 'Please enter a valid price';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * 主计算函数
   * Board Feet = (Thickness in inches × Width in inches × Length in inches) / 144 × Quantity
   */
  const calculateBoardFeet = () => {
    if (!validateInputs()) {
      return;
    }

    // 转换所有尺寸到英寸
    const lengthInches = parseFloat(params.length) * getUnitInfo(params.lengthUnit).toInches;
    const widthInches = parseFloat(params.width) * getUnitInfo(params.widthUnit).toInches;
    const thicknessInches = parseFloat(params.thickness) * getUnitInfo(params.thicknessUnit).toInches;
    const quantity = parseInt(params.quantity);

    // 计算单件 Board Feet
    // 公式: Board Feet = (T × W × L) / 144
    const boardFeetPerPiece = (thicknessInches * widthInches * lengthInches) / 144;

    // 计算总 Board Feet
    const totalBoardFeet = boardFeetPerPiece * quantity;

    // 计算成本
    const pricePerBoardFoot = parseFloat(params.pricePerBoardFoot || '0');
    const totalCost = totalBoardFeet * pricePerBoardFoot;

    const calculatedResult: CalculationResult = {
      boardFeet: Math.round(totalBoardFeet * 100) / 100,
      totalCost: Math.round(totalCost * 100) / 100,
      boardFeetPerPiece: Math.round(boardFeetPerPiece * 100) / 100,
    };

    setResult(calculatedResult);
  };

  /**
   * 更新参数
   */
  const updateParam = (key: keyof ProjectParams, value: string) => {
    setParams(prev => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors(prev => ({ ...prev, [key]: '' }));
    }
  };

  /**
   * 重置表单
   */
  const resetForm = () => {
    setParams({
      length: '96',
      lengthUnit: 'inches',
      width: '6',
      widthUnit: 'inches',
      thickness: '1',
      thicknessUnit: 'inches',
      quantity: '10',
      pricePerBoardFoot: '',
    });
    setResult(null);
    setErrors({});
  };

  /**
   * 导出结果
   */
  const exportResult = () => {
    if (!result) return;

    const data = `Board Foot Calculator Results\n\n` +
      `Dimensions:\n` +
      `  Length: ${params.length}${getUnitInfo(params.lengthUnit).symbol}\n` +
      `  Width: ${params.width}${getUnitInfo(params.widthUnit).symbol}\n` +
      `  Thickness: ${params.thickness}${getUnitInfo(params.thicknessUnit).symbol}\n` +
      `  Quantity: ${params.quantity} pieces\n\n` +
      `Results:\n` +
      `  Board Feet per Piece: ${result.boardFeetPerPiece} BF\n` +
      `  Total Board Feet: ${result.boardFeet} BF\n\n` +
      (params.pricePerBoardFoot ? `Price per Board Foot: $${params.pricePerBoardFoot}\n` : '') +
      (params.pricePerBoardFoot ? `Total Cost: $${result.totalCost}\n` : '');

    const blob = new Blob([data], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'board-foot-calculator-results.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // 自动计算：当参数变化且已有结果时，自动重新计算
  useEffect(() => {
    if (result) {
      calculateBoardFeet();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  return (
    <div className="bg-card rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-semibold text-card-foreground mb-6 flex items-center">
        <Calculator className="mr-2 h-6 w-6" />
        Board Foot Calculator
      </h2>

      {/* Input Fields */}
      <div className="mb-6">
        <h3 className="text-lg font-medium text-card-foreground mb-3">
          Lumber Dimensions
        </h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              Length
            </label>
            <div className="flex gap-1">
              <input
                type="number"
                value={params.length}
                onChange={(e) => updateParam('length', e.target.value)}
                className={`flex-1 px-2 py-1.5 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground ${
                  errors.length ? 'border-destructive' : 'border-border'
                }`}
                placeholder="96"
                step="0.01"
                min="0"
              />
              {createUnitSelector(params.lengthUnit, (unit) => updateParam('lengthUnit', unit), "w-24")}
            </div>
            {errors.length && <p className="text-destructive text-sm mt-1">{errors.length}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              Width
            </label>
            <div className="flex gap-1">
              <input
                type="number"
                value={params.width}
                onChange={(e) => updateParam('width', e.target.value)}
                className={`flex-1 px-2 py-1.5 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground ${
                  errors.width ? 'border-destructive' : 'border-border'
                }`}
                placeholder="6"
                step="0.01"
                min="0"
              />
              {createUnitSelector(params.widthUnit, (unit) => updateParam('widthUnit', unit), "w-24")}
            </div>
            {errors.width && <p className="text-destructive text-sm mt-1">{errors.width}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              Thickness
            </label>
            <div className="flex gap-1">
              <input
                type="number"
                value={params.thickness}
                onChange={(e) => updateParam('thickness', e.target.value)}
                className={`flex-1 px-2 py-1.5 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground ${
                  errors.thickness ? 'border-destructive' : 'border-border'
                }`}
                placeholder="1"
                step="0.01"
                min="0"
              />
              {createUnitSelector(params.thicknessUnit, (unit) => updateParam('thicknessUnit', unit), "w-24")}
            </div>
            {errors.thickness && <p className="text-destructive text-sm mt-1">{errors.thickness}</p>}
            <div className="mt-2 p-3 rounded-lg border border-border">
              <div className="flex items-start space-x-2">
                <Info className="h-4 w-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-blue-600 dark:text-blue-400">
                  <div className="font-medium mb-1">Common Lumber Sizes:</div>
                  <div>• 1×4: 0.75&quot; × 3.5&quot;</div>
                  <div>• 1×6: 0.75&quot; × 5.5&quot;</div>
                  <div>• 2×4: 1.5&quot; × 3.5&quot;</div>
                  <div>• 2×6: 1.5&quot; × 5.5&quot;</div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              Quantity (pieces)
            </label>
            <input
              type="number"
              value={params.quantity}
              onChange={(e) => updateParam('quantity', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground ${
                errors.quantity ? 'border-destructive' : 'border-border'
              }`}
              placeholder="10"
              step="1"
              min="1"
            />
            {errors.quantity && <p className="text-destructive text-sm mt-1">{errors.quantity}</p>}
          </div>
        </div>
      </div>

      {/* Pricing */}
      <div className="mb-6">
        <h3 className="text-lg font-medium text-card-foreground mb-3">
          Pricing
        </h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              Price per Board Foot ($) <span className="text-xs font-normal">(Optional)</span>
            </label>
            <input
              type="number"
              value={params.pricePerBoardFoot}
              onChange={(e) => updateParam('pricePerBoardFoot', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground ${
                errors.pricePerBoardFoot ? 'border-destructive' : 'border-border'
              }`}
              placeholder="5.00"
              step="0.01"
              min="0"
            />
            {errors.pricePerBoardFoot && <p className="text-destructive text-sm mt-1">{errors.pricePerBoardFoot}</p>}
            <p className="text-xs text-muted-foreground mt-1">
              Enter price per board foot to calculate total cost
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 mb-6">
        <button
          onClick={calculateBoardFeet}
          className="flex-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-[0.7rem] px-4 rounded-lg transition-colors duration-200 flex items-center justify-center cursor-pointer"
        >
          <Calculator className="mr-2 h-4 w-4" />
          Calculate
        </button>
        <button
          onClick={resetForm}
          className="bg-secondary hover:bg-secondary/80 text-secondary-foreground font-semibold py-[0.7rem] px-4 rounded-lg transition-colors duration-200 flex items-center justify-center cursor-pointer"
        >
          <RotateCcw className="mr-2 h-4 w-4" />
          Reset
        </button>
      </div>

      {/* Results Display */}
      {result ? (
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-card-foreground">
            Calculation Results
          </h3>

          {/* Board Feet Summary */}
          <div className="bg-primary/10 p-4 rounded-lg border border-border">
            <div className="text-sm text-primary font-medium mb-3">Board Feet</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <div className="text-xs text-muted-foreground">Per Piece</div>
                <div className="text-lg font-bold text-primary">
                  {result.boardFeetPerPiece} BF
                </div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Total ({params.quantity} pieces)</div>
                <div className="text-lg font-bold text-primary">
                  {result.boardFeet} BF
                </div>
              </div>
            </div>
          </div>

          {/* Cost Summary */}
          {params.pricePerBoardFoot && parseFloat(params.pricePerBoardFoot) > 0 && (
            <div className="bg-primary/10 p-3 rounded-lg">
              <div className="text-sm text-primary font-medium">Total Cost</div>
              <div className="text-xl font-bold text-primary">
                ${result.totalCost}
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                Based on ${params.pricePerBoardFoot} per board foot
              </div>
            </div>
          )}

          <button
            onClick={exportResult}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
          >
            <Download className="mr-2 h-4 w-4" />
            Export Results
          </button>
        </div>
      ) : (
        <div className="text-center py-8">
          <Calculator className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground">
            Enter lumber dimensions and quantity, then click Calculate
          </p>
        </div>
      )}
    </div>
  );
}
