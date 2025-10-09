'use client'

import React, { useState, useEffect } from 'react';
import { Calculator, RotateCcw, Download, Info } from 'lucide-react';

// 单位类型
type UnitType = 'feet' | 'inches' | 'yards' | 'meters' | 'centimeters' | 'millimeters';

// 计算结果接口
interface CalculationResult {
  volume: number; // 体积 (cubic meters)
  volumeYards: number; // 体积 (cubic yards)
  volumeFeet: number; // 体积 (cubic feet)
  gravelWeight: number; // 砾石重量 (tons)
  gravelWeightKg: number; // 砾石重量 (kg)
  totalCost: number; // 总成本
  area: number; // 面积 (square meters)
}

// 砾石类型预设
interface GravelPreset {
  label: string;
  density: number; // kg/m³
}

const GRAVEL_PRESETS: Record<string, GravelPreset> = {
  'regular-gravel': { label: 'Regular gravel', density: 1346 },
  'gravel-dry': { label: 'Gravel (dry)', density: 1510 },
  'gravel-dry-1-4-2': { label: 'Gravel (dry, 1/4 - 2”)', density: 1680 },
  'gravel-wet-1-4-2': { label: 'Gravel (wet, 1/4 - 2”)', density: 2020 },
  'gravel-pit-run': { label: 'Gravel (pit-run)', density: 1930 },
  'gravel-sand-dry': { label: 'Gravel and sand (dry)', density: 1720 },
  'gravel-sand-wet': { label: 'Gravel and sand (wet)', density: 2020 },
  'gravel-clay-dry': { label: 'Gravel and clay (dry)', density: 1420 },
  'gravel-clay-wet': { label: 'Gravel and clay (wet)', density: 1540 },
  'cheshire-pink-gravel': { label: 'Cheshire pink gravel', density: 1545 },
  'cotswold-gold-gravel': { label: 'Cotswold gold gravel', density: 2098 },
  'crushed-stone': { label: 'Crushed Stone', density: 1600 },
  'ivory-coast-gravel': { label: 'Ivory coast gravel', density: 1506 },
  'dolomite-gravel': { label: 'Dolomite gravel', density: 1865 },
  'pea-gravel': { label: 'Pea Gravel', density: 1788 },
  'sunset-gold-gravel': { label: 'Sunset Gold gravel', density: 1505 },
};

// 项目参数接口
interface ProjectParams {
  length: string;
  lengthUnit: UnitType;
  width: string;
  widthUnit: UnitType;
  depth: string;
  depthUnit: UnitType;

  gravelType: string; // 'custom' 或预设类型 key
  customDensity: string; // 自定义密度 (kg/m³)

  wasteFactor: string; // 损耗百分比
  pricePerTon: string; // 每吨价格
}

// 组件 Props 接口
interface GravelCalculatorProps {
  defaultGravelType?: string; // 默认砾石类型
}

/**
 * 砾石计算器组件
 * 提供完整的砾石体积、重量和成本计算功能
 */
export default function GravelCalculator({ defaultGravelType = 'crushed-stone' }: GravelCalculatorProps = {}) {
  const initialGravelType = defaultGravelType || 'crushed-stone';
  const initialDensity = GRAVEL_PRESETS[initialGravelType]?.density.toString() || '1680';

  const [params, setParams] = useState<ProjectParams>({
    length: '10',
    lengthUnit: 'feet',
    width: '8',
    widthUnit: 'feet',
    depth: '4',
    depthUnit: 'inches',

    gravelType: initialGravelType,
    customDensity: initialDensity,

    wasteFactor: '5',
    pricePerTon: '',
  });

  const [result, setResult] = useState<CalculationResult | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // 单位辅助函数
  const getUnitInfo = (unit: UnitType) => {
    switch (unit) {
      case 'feet':
        return { symbol: 'ft', isMetric: false, toMeters: 0.3048 };
      case 'inches':
        return { symbol: 'in', isMetric: false, toMeters: 0.0254 };
      case 'yards':
        return { symbol: 'yd', isMetric: false, toMeters: 0.9144 };
      case 'meters':
        return { symbol: 'm', isMetric: true, toMeters: 1 };
      case 'centimeters':
        return { symbol: 'cm', isMetric: true, toMeters: 0.01 };
      case 'millimeters':
        return { symbol: 'mm', isMetric: true, toMeters: 0.001 };
      default:
        return { symbol: 'm', isMetric: true, toMeters: 1 };
    }
  };

  // 创建单位选择下拉菜单的辅助函数
  const createUnitSelector = (value: UnitType, onChange: (unit: UnitType) => void, className: string = "", showMM: boolean = false) => (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as UnitType)}
      className={`flex-1 px-2 py-1.5 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground border-border ${className}`}
    >
      <option value="feet">feet</option>
      <option value="inches">inches</option>
      <option value="yards">yards</option>
      <option value="meters">meters</option>
      <option value="centimeters">centimeters</option>
      {showMM && <option value="millimeters">millimeters</option>}
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
    if (!params.depth || parseFloat(params.depth) <= 0) {
      newErrors.depth = 'Please enter a valid depth';
    }

    // 验证密度
    if (params.gravelType === 'custom') {
      if (!params.customDensity || parseFloat(params.customDensity) <= 0) {
        newErrors.customDensity = 'Please enter a valid density';
      }
    }

    if (params.wasteFactor && (parseFloat(params.wasteFactor) < 0 || parseFloat(params.wasteFactor) > 100)) {
      newErrors.wasteFactor = 'Waste factor must be between 0 and 100';
    }

    if (params.pricePerTon && parseFloat(params.pricePerTon) < 0) {
      newErrors.pricePerTon = 'Please enter a valid price';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * 主计算函数
   */
  const calculateGravel = () => {
    if (!validateInputs()) {
      return;
    }

    // 转换所有尺寸到米
    const lengthM = parseFloat(params.length) * getUnitInfo(params.lengthUnit).toMeters;
    const widthM = parseFloat(params.width) * getUnitInfo(params.widthUnit).toMeters;
    const depthM = parseFloat(params.depth) * getUnitInfo(params.depthUnit).toMeters;

    // 计算基础体积 (立方米)
    const baseVolume = lengthM * widthM * depthM;

    // 应用损耗百分比
    const wasteFactor = parseFloat(params.wasteFactor || '0');
    const volume = baseVolume * (1 + wasteFactor / 100);

    // 转换体积到其他单位
    const volumeYards = volume * 1.30795; // m³ to yd³
    const volumeFeet = volume * 35.3147; // m³ to ft³

    // 获取密度
    let density = 1680; // 默认密度 (kg/m³)
    if (params.gravelType === 'custom') {
      density = parseFloat(params.customDensity);
    } else if (GRAVEL_PRESETS[params.gravelType]) {
      density = GRAVEL_PRESETS[params.gravelType].density;
    }

    // 计算重量
    const gravelWeightKg = volume * density;
    const gravelWeight = gravelWeightKg / 1000; // 转换为吨

    // 计算面积
    const area = lengthM * widthM;

    // 计算成本
    const pricePerTon = parseFloat(params.pricePerTon || '0');
    const totalCost = gravelWeight * pricePerTon;

    const calculatedResult: CalculationResult = {
      volume: Math.round(volume * 1000) / 1000,
      volumeYards: Math.round(volumeYards * 100) / 100,
      volumeFeet: Math.round(volumeFeet * 100) / 100,
      gravelWeight: Math.round(gravelWeight * 1000) / 1000,
      gravelWeightKg: Math.round(gravelWeightKg * 10) / 10,
      totalCost: Math.round(totalCost * 100) / 100,
      area: Math.round(area * 100) / 100,
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
   * 处理砾石类型选择
   */
  const handleGravelTypeChange = (type: string) => {
    setParams(prev => ({
      ...prev,
      gravelType: type,
      customDensity: type === 'custom' ? prev.customDensity : GRAVEL_PRESETS[type]?.density.toString() || '1680'
    }));

    // 清除相关错误
    if (type !== 'custom') {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.customDensity;
        return newErrors;
      });
    }
  };

  /**
   * 处理预设 Waste Factor 按钮
   */
  const setPresetWasteFactor = (factor: string) => {
    setParams(prev => ({ ...prev, wasteFactor: factor }));
    if (errors.wasteFactor) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.wasteFactor;
        return newErrors;
      });
    }
  };

  /**
   * 重置表单
   */
  const resetForm = () => {
    setParams({
      length: '10',
      lengthUnit: 'feet',
      width: '8',
      widthUnit: 'feet',
      depth: '4',
      depthUnit: 'inches',

      gravelType: initialGravelType,
      customDensity: initialDensity,

      wasteFactor: '5',
      pricePerTon: '',
    });
    setResult(null);
    setErrors({});
  };

  /**
   * 导出结果
   */
  const exportResult = () => {
    if (!result) return;

    const gravelTypeLabel = params.gravelType === 'custom'
      ? 'Custom'
      : GRAVEL_PRESETS[params.gravelType]?.label || 'Unknown';

    const density = params.gravelType === 'custom'
      ? parseFloat(params.customDensity)
      : GRAVEL_PRESETS[params.gravelType]?.density || 0;

    const data = `Gravel Calculator Results\n\n` +
      `Dimensions:\n` +
      `  Length: ${params.length}${getUnitInfo(params.lengthUnit).symbol}\n` +
      `  Width: ${params.width}${getUnitInfo(params.widthUnit).symbol}\n` +
      `  Depth: ${params.depth}${getUnitInfo(params.depthUnit).symbol}\n\n` +
      `Gravel Type: ${gravelTypeLabel}\n` +
      `Density: ${density} kg/m³\n` +
      `Waste Factor: ${params.wasteFactor}%\n\n` +
      `Area: ${result.area} m²\n\n` +
      `Volume (including ${params.wasteFactor}% waste):\n` +
      `  ${result.volume} cubic meters (m³)\n` +
      `  ${result.volumeYards} cubic yards (yd³)\n` +
      `  ${result.volumeFeet} cubic feet (ft³)\n\n` +
      `Gravel Weight:\n` +
      `  ${result.gravelWeight} tons\n` +
      `  ${result.gravelWeightKg} kg\n\n` +
      (params.pricePerTon ? `Price per Ton: $${params.pricePerTon}\n` : '') +
      (params.pricePerTon ? `Total Cost: $${result.totalCost}\n` : '');

    const blob = new Blob([data], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'gravel-calculator-results.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // 自动计算：当参数变化且已有结果时，自动重新计算
  useEffect(() => {
    if (result) {
      calculateGravel();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  return (
    <div className="bg-card rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-semibold text-card-foreground mb-6 flex items-center">
        <Calculator className="mr-2 h-6 w-6" />
        Gravel Calculator
      </h2>

      {/* Input Fields */}
      <div className="mb-6">
        <h3 className="text-lg font-medium text-card-foreground mb-3">
          Area Dimensions
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
                placeholder="10"
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
                placeholder="8"
                step="0.01"
                min="0"
              />
              {createUnitSelector(params.widthUnit, (unit) => updateParam('widthUnit', unit), "w-24")}
            </div>
            {errors.width && <p className="text-destructive text-sm mt-1">{errors.width}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              Depth
            </label>
            <div className="flex gap-1">
              <input
                type="number"
                value={params.depth}
                onChange={(e) => updateParam('depth', e.target.value)}
                className={`flex-1 px-2 py-1.5 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground ${
                  errors.depth ? 'border-destructive' : 'border-border'
                }`}
                placeholder="4"
                step="0.01"
                min="0"
              />
              {createUnitSelector(params.depthUnit, (unit) => updateParam('depthUnit', unit), "w-24", true)}
            </div>
            {errors.depth && <p className="text-destructive text-sm mt-1">{errors.depth}</p>}
            <div className="mt-2 p-3 rounded-lg border border-border">
              <div className="flex items-start space-x-2">
                <Info className="h-4 w-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-blue-600 dark:text-blue-400">
                  <div className="font-medium mb-1">Typical Gravel Depths:</div>
                  <div>• Driveways: 4-6 inches (10-15cm)</div>
                  <div>• Walkways: 2-4 inches (5-10cm)</div>
                  <div>• Drainage: 6-12 inches (15-30cm)</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Gravel Specifications */}
      <div className="mb-6">
        <h3 className="text-lg font-medium text-card-foreground mb-3">
          Gravel Specifications
        </h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              Gravel Type
            </label>
            <select
              value={params.gravelType}
              onChange={(e) => handleGravelTypeChange(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground border-border"
            >
              {Object.entries(GRAVEL_PRESETS).map(([key, preset]) => (
                <option key={key} value={key}>
                  {preset.label} ({preset.density} kg/m³)
                </option>
              ))}
              <option value="custom">Custom Density</option>
            </select>
          </div>

          {params.gravelType === 'custom' && (
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">
                Custom Density (kg/m³)
              </label>
              <input
                type="number"
                value={params.customDensity}
                onChange={(e) => updateParam('customDensity', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground ${
                  errors.customDensity ? 'border-destructive' : 'border-border'
                }`}
                placeholder="1680"
                step="1"
                min="0"
              />
              {errors.customDensity && <p className="text-destructive text-sm mt-1">{errors.customDensity}</p>}
              <p className="text-xs text-muted-foreground mt-1">
                Typical range: 1200-2000 kg/m³
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Waste Factor & Pricing */}
      <div className="mb-6">
        <h3 className="text-lg font-medium text-card-foreground mb-3">
          Waste Factor & Pricing
        </h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              Waste Factor (%)
            </label>
            <div className="flex gap-2 mb-2">
              <button
                type="button"
                onClick={() => setPresetWasteFactor('0')}
                className={`px-3 py-1 rounded-lg border transition-colors ${
                  params.wasteFactor === '0'
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-background text-foreground border-border hover:bg-muted'
                }`}
              >
                0%
              </button>
              <button
                type="button"
                onClick={() => setPresetWasteFactor('5')}
                className={`px-3 py-1 rounded-lg border transition-colors ${
                  params.wasteFactor === '5'
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-background text-foreground border-border hover:bg-muted'
                }`}
              >
                5%
              </button>
              <button
                type="button"
                onClick={() => setPresetWasteFactor('10')}
                className={`px-3 py-1 rounded-lg border transition-colors ${
                  params.wasteFactor === '10'
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-background text-foreground border-border hover:bg-muted'
                }`}
              >
                10%
              </button>
              <button
                type="button"
                onClick={() => setPresetWasteFactor('15')}
                className={`px-3 py-1 rounded-lg border transition-colors ${
                  params.wasteFactor === '15'
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-background text-foreground border-border hover:bg-muted'
                }`}
              >
                15%
              </button>
            </div>
            <input
              type="number"
              value={params.wasteFactor}
              onChange={(e) => updateParam('wasteFactor', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground ${
                errors.wasteFactor ? 'border-destructive' : 'border-border'
              }`}
              placeholder="5"
              step="1"
              min="0"
              max="100"
            />
            {errors.wasteFactor && <p className="text-destructive text-sm mt-1">{errors.wasteFactor}</p>}
            <p className="text-xs text-muted-foreground mt-1">
              Add extra material for spillage and compaction (typically 5-10%)
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              Price per Ton ($) <span className="text-xs font-normal">(Optional)</span>
            </label>
            <input
              type="number"
              value={params.pricePerTon}
              onChange={(e) => updateParam('pricePerTon', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground ${
                errors.pricePerTon ? 'border-destructive' : 'border-border'
              }`}
              placeholder="50.00"
              step="0.01"
              min="0"
            />
            {errors.pricePerTon && <p className="text-destructive text-sm mt-1">{errors.pricePerTon}</p>}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 mb-6">
        <button
          onClick={calculateGravel}
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

          {/* Area Summary */}
          <div className="bg-primary/10 p-4 rounded-lg border border-border">
            <div className="text-sm text-primary font-medium mb-3">Coverage Area</div>
            <div className="text-lg font-bold text-primary">
              {result.area} m²
            </div>
          </div>

          {/* Volume Summary */}
          <div className="bg-primary/10 p-4 rounded-lg border border-border">
            <div className="text-sm text-primary font-medium mb-3">
              Gravel Volume (with {params.wasteFactor}% waste)
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <div className="text-xs text-muted-foreground">Cubic Meters</div>
                <div className="text-lg font-bold text-primary">
                  {result.volume} m³
                </div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Cubic Yards</div>
                <div className="text-lg font-bold text-primary">
                  {result.volumeYards} yd³
                </div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Cubic Feet</div>
                <div className="text-lg font-bold text-primary">
                  {result.volumeFeet} ft³
                </div>
              </div>
            </div>
          </div>

          {/* Weight Summary */}
          <div className="bg-primary/10 p-4 rounded-lg border border-border">
            <div className="text-sm text-primary font-medium mb-3">Gravel Weight</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <div className="text-xs text-muted-foreground">Tons</div>
                <div className="text-lg font-bold text-primary">
                  {Number(result.gravelWeight.toFixed(3))} tons
                </div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Kilograms</div>
                <div className="text-lg font-bold text-primary">
                  {result.gravelWeightKg} kg
                </div>
              </div>
            </div>
          </div>

          {/* Cost Summary */}
          {params.pricePerTon && parseFloat(params.pricePerTon) > 0 && (
            <div className="bg-primary/10 p-3 rounded-lg">
              <div className="text-sm text-primary font-medium">Total Cost</div>
              <div className="text-xl font-bold text-primary">
                ${result.totalCost}
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                Based on ${params.pricePerTon} per ton
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
            Enter your dimensions and specifications, then click Calculate
          </p>
        </div>
      )}
    </div>
  );
}
