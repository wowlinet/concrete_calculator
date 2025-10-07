'use client'

import React, { useState, useCallback } from 'react';
import { Calculator, RotateCcw, Download, Building, Home, Square, Columns, Car, BrickWall, Footprints } from 'lucide-react';

// 项目类型枚举
type ProjectType = 'slabs' | 'footings' | 'tube' | 'curb' | 'stairs';

// 单位类型
type UnitType = 'feet' | 'inches' | 'yards' | 'meters' | 'centimeters';

// 计算结果接口
interface CalculationResult {
  volume: number; // 混凝土体积
  volumeImperial: number; // 立方码
  cement: number; // 水泥重量(kg)
  cementBags: number; // 水泥袋数
  sand: number; // 砂子重量(kg)
  gravel: number; // 石子重量(kg)
  water: number; // 水重量(kg)
  totalCost: number; // 总成本
}

// 项目参数接口
interface ProjectParams {
  length: string;
  lengthUnit: UnitType;
  width: string;
  widthUnit: UnitType;
  height: string;
  heightUnit: UnitType;
  diameter?: string; // 圆柱直径
  diameterUnit?: UnitType;
  steps?: string; // 楼梯步数
  stepHeight?: string; // 楼梯步高
  stepHeightUnit?: UnitType;
  stepDepth?: string; // 楼梯步深
  stepDepthUnit?: UnitType;
}

/**
 * 混凝土计算器组件
 * 提供完整的混凝土体积、材料用量和成本计算功能
 */
export default function ConcreteCalculator() {
  const [projectType, setProjectType] = useState<ProjectType>('slabs');
  const [unit, setUnit] = useState<UnitType>('meters');
  const [params, setParams] = useState<ProjectParams>({
    length: '',
    lengthUnit: 'meters',
    width: '',
    widthUnit: 'meters',
    height: '',
    heightUnit: 'meters',
    diameter: '',
    diameterUnit: 'meters',
    steps: '',
    stepHeight: '',
    stepHeightUnit: 'meters',
    stepDepth: '',
    stepDepthUnit: 'meters'
  });
  const [concreteGrade, setConcreteGrade] = useState<string>('C25');
  const [unitPrice, setUnitPrice] = useState<string>('300'); // 每立方米价格
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // 混凝土配比数据 (每立方米)
  const concreteRatios: Record<string, { cement: number; sand: number; gravel: number; water: number }> = {
    C15: { cement: 284, sand: 702, gravel: 1351, water: 185 },
    C20: { cement: 343, sand: 637, gravel: 1301, water: 175 },
    C25: { cement: 372, sand: 576, gravel: 1282, water: 175 },
    C30: { cement: 461, sand: 512, gravel: 1252, water: 175 },
    C35: { cement: 500, sand: 479, gravel: 1231, water: 175 },
    C40: { cement: 539, sand: 447, gravel: 1210, water: 175 }
  };

  // 项目类型配置
  const projectTypes = {
    slabs: { name: 'Slabs, Square Footings, or Walls', icon: '/tab-square-01.svg', description: 'Rectangular concrete structures' },
    footings: { name: 'Hole, Column, or Round Footings', icon: '/tab-hole-01.svg', description: 'Circular concrete structures' },
    tube: { name: 'Circular Slab or Tube', icon: '/tab-tube-01.svg', description: 'Tubular concrete structures' },
    curb: { name: 'Curb and Gutter Barrier', icon: '/tab-curb-01.svg', description: 'Curb and gutter concrete' },
    stairs: { name: 'Stairs', icon: '/tab-stair-01.svg', description: 'Concrete stairs' }
  };

  // 单位转换常数
  const CUBIC_METERS_TO_CUBIC_YARDS = 1.30795;
  const CEMENT_BAG_WEIGHT = 50; // kg per bag

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
      default:
        return { symbol: 'm', isMetric: true, toMeters: 1 };
    }
  };

  const getVolumeUnit = (unit: UnitType) => {
    const unitInfo = getUnitInfo(unit);
    if (unitInfo.isMetric) {
      return 'm³';
    } else {
      return 'yd³';
    }
  };

  const getPriceUnit = (unit: UnitType) => {
    const unitInfo = getUnitInfo(unit);
    if (unitInfo.isMetric) {
      return '$/m³';
    } else {
      return '$/yd³';
    }
  };

  // 创建单位选择下拉菜单的辅助函数
  const createUnitSelector = (value: UnitType, onChange: (unit: UnitType) => void, className: string = "") => (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as UnitType)}
      className={`flex-1 px-2 py-1.5 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground border-border ${className}`}
    >
      <option value="feet">foot</option>
      <option value="inches">inch</option>
      <option value="yards">yard</option>
      <option value="meters">meter</option>
      <option value="centimeters">centimeters</option>
    </select>
  );

  // 根据项目类型获取对应的示意图路径
  const getProjectTypeImage = (projectType: ProjectType): string => {
    switch (projectType) {
      case 'slabs':
        return '/square-01.svg';
      case 'footings':
        return '/hole-01.svg';
      case 'tube':
        return '/tube-01.svg';
      case 'curb':
        return '/curb-01.svg';
      case 'stairs':
        return '/stair-01.svg';
      default:
        return '/square-01.svg';
    }
  };

  /**
   * 验证输入参数
   * @returns 是否验证通过
   */
  const validateInputs = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    // 根据项目类型验证不同参数
    switch (projectType) {
      case 'footings':
      case 'tube':
        if (!params.diameter || parseFloat(params.diameter) <= 0) {
          newErrors.diameter = 'Please enter a valid diameter';
        }
        if (!params.height || parseFloat(params.height) <= 0) {
          newErrors.height = 'Please enter a valid height';
        }
        break;
      case 'stairs':
        if (!params.steps || parseInt(params.steps) <= 0) {
          newErrors.steps = 'Please enter valid number of steps';
        }
        if (!params.stepHeight || parseFloat(params.stepHeight) <= 0) {
          newErrors.stepHeight = 'Please enter valid step height';
        }
        if (!params.stepDepth || parseFloat(params.stepDepth) <= 0) {
          newErrors.stepDepth = 'Please enter valid step depth';
        }
        if (!params.width || parseFloat(params.width) <= 0) {
          newErrors.width = 'Please enter valid width';
        }
        break;
      default:
        if (!params.length || parseFloat(params.length) <= 0) {
          newErrors.length = 'Please enter a valid length';
        }
        if (!params.width || parseFloat(params.width) <= 0) {
          newErrors.width = 'Please enter a valid width';
        }
        if (!params.height || parseFloat(params.height) <= 0) {
          newErrors.height = 'Please enter a valid height';
        }
        break;
    }
    
    if (!unitPrice || parseFloat(unitPrice) <= 0) {
      newErrors.unitPrice = 'Please enter a valid unit price';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * 计算不同项目类型的体积
   * @returns 计算得出的体积（立方米）
   */
  const calculateVolume = (): number => {
    // 将所有输入值转换为米
    const l = parseFloat(params.length || '0') * getUnitInfo(params.lengthUnit).toMeters;
    const w = parseFloat(params.width || '0') * getUnitInfo(params.widthUnit).toMeters;
    const h = parseFloat(params.height || '0') * getUnitInfo(params.heightUnit).toMeters;
    const d = parseFloat(params.diameter || '0') * getUnitInfo(params.diameterUnit || 'meters').toMeters;
    const steps = parseInt(params.steps || '0');
    const stepH = parseFloat(params.stepHeight || '0') * getUnitInfo(params.stepHeightUnit || 'meters').toMeters;
    const stepD = parseFloat(params.stepDepth || '0') * getUnitInfo(params.stepDepthUnit || 'meters').toMeters;
    
    switch (projectType) {
      case 'footings':
      case 'tube':
        // 圆柱体积 = π × r² × h
        return Math.PI * Math.pow(d / 2, 2) * h;
      case 'stairs':
        // 楼梯体积 = 步数 × 宽度 × 步深 × 步高 × 0.5 (三角形近似)
        return steps * w * stepD * stepH * 0.5;
      default:
        // 矩形体积 = 长 × 宽 × 高
        return l * w * h;
    }
  };

  /**
   * 主计算函数
   * 计算混凝土体积、材料用量和成本
   */
  const calculateConcrete = () => {
    if (!validateInputs()) {
      return;
    }

    const volume = calculateVolume();
    const ratio = concreteRatios[concreteGrade];
    const price = parseFloat(unitPrice);

    // 单位转换
    const volumeImperial = volume * CUBIC_METERS_TO_CUBIC_YARDS;

    const calculatedResult: CalculationResult = {
      volume: Math.round(volume * 100) / 100,
      volumeImperial: Math.round(volumeImperial * 100) / 100,
      cement: Math.round(volume * ratio.cement * 100) / 100,
      cementBags: Math.ceil(volume * ratio.cement / CEMENT_BAG_WEIGHT),
      sand: Math.round(volume * ratio.sand * 100) / 100,
      gravel: Math.round(volume * ratio.gravel * 100) / 100,
      water: Math.round(volume * ratio.water * 100) / 100,
      totalCost: Math.round(volume * price * 100) / 100
    };

    setResult(calculatedResult);
  };

  /**
   * 更新参数
   * @param key 参数键名
   * @param value 参数值
   */
  const updateParam = (key: keyof ProjectParams, value: string) => {
    setParams(prev => ({ ...prev, [key]: value }));
    // 清除对应的错误信息
    if (errors[key]) {
      setErrors(prev => ({ ...prev, [key]: '' }));
    }
  };

  /**
   * 重置表单
   */
  const resetForm = () => {
    setParams({
      length: '',
      lengthUnit: 'meters',
      width: '',
      widthUnit: 'meters',
      height: '',
      heightUnit: 'meters',
      diameter: '',
      diameterUnit: 'meters',
      steps: '',
      stepHeight: '',
      stepHeightUnit: 'meters',
      stepDepth: '',
      stepDepthUnit: 'meters'
    });
    setConcreteGrade('C25');
    setUnitPrice('300');
    setResult(null);
    setErrors({});
  };

  /**
   * 导出结果
   */
  const exportResult = () => {
    if (!result) return;

    const projectTypeName = projectTypes[projectType].name;
    
    let dimensionsText = '';
    switch (projectType) {
      case 'footings':
      case 'tube':
        dimensionsText = `Diameter: ${params.diameter}${getUnitInfo(params.diameterUnit || 'meters').symbol}, Height: ${params.height}${getUnitInfo(params.heightUnit).symbol}`;
        break;
      case 'stairs':
        dimensionsText = `Steps: ${params.steps}, Width: ${params.width}${getUnitInfo(params.widthUnit).symbol}, Step Height: ${params.stepHeight}${getUnitInfo(params.stepHeightUnit || 'meters').symbol}, Step Depth: ${params.stepDepth}${getUnitInfo(params.stepDepthUnit || 'meters').symbol}`;
        break;
      default:
        dimensionsText = `Length: ${params.length}${getUnitInfo(params.lengthUnit).symbol}, Width: ${params.width}${getUnitInfo(params.widthUnit).symbol}, Height: ${params.height}${getUnitInfo(params.heightUnit).symbol}`;
        break;
    }

    const data = `Concrete Calculator Results\n\n` +
      `Project Type: ${projectTypeName}\n` +
      `Dimensions: ${dimensionsText}\n` +
      `Concrete Grade: ${concreteGrade}\n\n` +
      `Required Materials:\n` +
      `Concrete Volume: ${result.volume} m³\n` +
      `Cement: ${result.cement} kg (${result.cementBags} bags)\n` +
      `Sand: ${result.sand} kg\n` +
      `Gravel: ${result.gravel} kg\n` +
      `Water: ${result.water} kg\n\n` +
      `Total Cost: $${result.totalCost}`;

    const blob = new Blob([data], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'concrete-calculator-results.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-card rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-semibold text-card-foreground mb-6 flex items-center">
        <Calculator className="mr-2 h-6 w-6" />
        Concrete Calculator
      </h2>
      
      {/* Project Type Selection */}
      <div className="mb-6">
        <h3 className="text-lg font-medium text-card-foreground mb-3">
          Project Type
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {Object.entries(projectTypes).map(([key, config]) => {
            return (
              <button
                key={key}
                onClick={() => setProjectType(key as ProjectType)}
                className={`p-3 rounded-lg border-2 transition-all duration-200 flex flex-col items-center space-y-1 text-sm cursor-pointer ${
                  projectType === key
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-border hover:border-border/80 text-muted-foreground'
                }`}
              >
                <img 
                  src={config.icon} 
                  alt={config.name}
                  className="h-22 w-22 object-contain" 
                />
                <span className="text-lg font-bold">{config.name}</span>
              </button>
            );
          })}
        </div>
      </div>



      {/* Input Fields */}
      <div className="mb-6">
        <h3 className="text-lg font-medium text-card-foreground mb-3">
          Dimensions
        </h3>
        
        {/* Flex container for input fields and diagram */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Input fields section - left half */}
          <div className="flex-1">
            {/* Dynamic input fields based on project type */}
            {projectType === 'footings' || projectType === 'tube' ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">
                    Diameter
                  </label>
                  <div className="flex gap-1">
                    <input
                      type="number"
                      value={params.diameter}
                      onChange={(e) => updateParam('diameter', e.target.value)}
                      className={`flex-1 px-2 py-1.5 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground ${
                        errors.diameter ? 'border-destructive' : 'border-border'
                      }`}
                      placeholder="0.00"
                      step="0.01"
                      min="0"
                    />
                    {createUnitSelector(params.diameterUnit || 'meters', (unit) => updateParam('diameterUnit', unit), "w-16")}
                  </div>
                  {errors.diameter && <p className="text-destructive text-sm mt-1">{errors.diameter}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">
                    Height
                  </label>
                  <div className="flex gap-1">
                    <input
                      type="number"
                      value={params.height}
                      onChange={(e) => updateParam('height', e.target.value)}
                      className={`flex-1 px-2 py-1.5 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground ${
                        errors.height ? 'border-destructive' : 'border-border'
                      }`}
                      placeholder="0.00"
                      step="0.01"
                      min="0"
                    />
                    {createUnitSelector(params.heightUnit, (unit) => updateParam('heightUnit', unit), "w-16")}
                  </div>
                  {errors.height && <p className="text-destructive text-sm mt-1">{errors.height}</p>}
                </div>
              </div>
            ) : projectType === 'stairs' ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">
                    Number of Steps
                  </label>
                  <input
                    type="number"
                    value={params.steps}
                    onChange={(e) => updateParam('steps', e.target.value)}
                    className={`flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground ${
                      errors.steps ? 'border-destructive' : 'border-border'
                    }`}
                    placeholder="0"
                    min="1"
                  />
                  {errors.steps && <p className="text-destructive text-sm mt-1">{errors.steps}</p>}
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
                      placeholder="0.00"
                      step="0.01"
                      min="0"
                    />
                    {createUnitSelector(params.widthUnit, (unit) => updateParam('widthUnit', unit), "w-16")}
                  </div>
                  {errors.width && <p className="text-destructive text-sm mt-1">{errors.width}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">
                    Step Height
                  </label>
                  <div className="flex gap-1">
                    <input
                      type="number"
                      value={params.stepHeight}
                      onChange={(e) => updateParam('stepHeight', e.target.value)}
                      className={`flex-1 px-2 py-1.5 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground ${
                        errors.stepHeight ? 'border-destructive' : 'border-border'
                      }`}
                      placeholder="0.00"
                      step="0.01"
                      min="0"
                    />
                    {createUnitSelector(params.stepHeightUnit || 'meters', (unit) => updateParam('stepHeightUnit', unit), "w-16")}
                  </div>
                  {errors.stepHeight && <p className="text-destructive text-sm mt-1">{errors.stepHeight}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">
                    Step Depth
                  </label>
                  <div className="flex gap-1">
                    <input
                      type="number"
                      value={params.stepDepth}
                      onChange={(e) => updateParam('stepDepth', e.target.value)}
                      className={`flex-1 px-2 py-1.5 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground ${
                        errors.stepDepth ? 'border-destructive' : 'border-border'
                      }`}
                      placeholder="0.00"
                      step="0.01"
                      min="0"
                    />
                    {createUnitSelector(params.stepDepthUnit || 'meters', (unit) => updateParam('stepDepthUnit', unit), "w-16")}
                  </div>
                  {errors.stepDepth && <p className="text-destructive text-sm mt-1">{errors.stepDepth}</p>}
                </div>
              </div>
            ) : (
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
                      placeholder="0.00"
                      step="0.01"
                      min="0"
                    />
                    {createUnitSelector(params.lengthUnit, (unit) => updateParam('lengthUnit', unit), "w-16")}
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
                      placeholder="0.00"
                      step="0.01"
                      min="0"
                    />
                    {createUnitSelector(params.widthUnit, (unit) => updateParam('widthUnit', unit), "w-16")}
                  </div>
                  {errors.width && <p className="text-destructive text-sm mt-1">{errors.width}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">
                    {projectType === 'curb' ? 'Height' : 'Thickness or Height (h)'}
                  </label>
                  <div className="flex gap-1">
                    <input
                      type="number"
                      value={params.height}
                      onChange={(e) => updateParam('height', e.target.value)}
                      className={`flex-1 px-2 py-1.5 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground ${
                        errors.height ? 'border-destructive' : 'border-border'
                      }`}
                      placeholder="0.00"
                      step="0.01"
                      min="0"
                    />
                    {createUnitSelector(params.heightUnit, (unit) => updateParam('heightUnit', unit), "w-16")}
                  </div>
                  {errors.height && <p className="text-destructive text-sm mt-1">{errors.height}</p>}
                </div>
              </div>
            )}
          </div>

          {/* Diagram section - right half */}
          <div className="flex-1 flex items-center justify-center">
            <div className="w-full">
              <img
                src={getProjectTypeImage(projectType)}
                alt={`${projectTypes[projectType].name} diagram`}
                className="w-full h-auto object-contain rounded-lg border border-border bg-muted/20 p-4"
              />
              <p className="text-center text-sm text-muted-foreground mt-2">
                {projectTypes[projectType].name} Shape
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Concrete Grade and Unit Price */}
      <div className="flex flex-col lg:flex-row gap-6 mb-6">
        {/* Options section - left half */}
        <div className="flex-1 space-y-4">
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              Concrete Grade
            </label>
            <select
              value={concreteGrade}
              onChange={(e) => setConcreteGrade(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground"
            >
              <option value="C15">C15 (Light Load)</option>
              <option value="C20">C20 (General)</option>
              <option value="C25">C25 (Residential)</option>
              <option value="C30">C30 (Commercial)</option>
              <option value="C35">C35 (High-rise)</option>
              <option value="C40">C40 (Heavy Load)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              Unit Price ({getPriceUnit(unit)})
            </label>
            <input
              type="number"
              value={unitPrice}
              onChange={(e) => setUnitPrice(e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground ${
                errors.unitPrice ? 'border-destructive' : 'border-border'
              }`}
              placeholder="0.00"
              step="0.01"
              min="0"
            />
            {errors.unitPrice && <p className="text-destructive text-sm mt-1">{errors.unitPrice}</p>}
          </div>
        </div>

        {/* Information section - right half */}
        <div className="flex-1 bg-muted/20 rounded-lg p-4 border border-border">
          <h4 className="text-sm font-medium text-foreground mb-3">Concrete Strength & Pricing Guide</h4>
          <div className="text-sm text-muted-foreground space-y-2">
            <p>
              In the US, concrete strength is typically measured in PSI (pounds per square inch) rather than the C-grade system (C15, C20, etc.) used in China and Europe (EN 206 standard).
            </p>
            <div className="mt-3">
              <p className="font-medium text-foreground mb-2">Average Prices (2025):</p>
              <ul className="space-y-1">
                <li>• 3000 psi concrete: $120 – $150 / cubic yard</li>
                <li>• 4000 psi concrete: $140 – $170 / cubic yard</li>
                <li>• 5000 psi concrete: $160 – $200 / cubic yard</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 mb-6">
        <button
          onClick={calculateConcrete}
          className="flex-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
        >
          <Calculator className="mr-2 h-4 w-4" />
          Calculate
        </button>
        <button
          onClick={resetForm}
          className="bg-secondary hover:bg-secondary/80 text-secondary-foreground font-semibold py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
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
          
          {/* Volume and Cost Summary */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-primary/10 p-3 rounded-lg">
              <div className="text-sm text-primary font-medium">Volume</div>
              <div className="text-xl font-bold text-primary">
                {result.volume} m³
              </div>
            </div>
            <div className="bg-primary/10 p-3 rounded-lg">
              <div className="text-sm text-primary font-medium">Total Cost</div>
              <div className="text-xl font-bold text-primary">
                ${result.totalCost}
              </div>
            </div>
          </div>
          
          {/* Material Quantities */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-primary/10 p-3 rounded-lg">
              <div className="text-sm text-primary font-medium">Cement</div>
              <div className="text-lg font-bold text-primary">
                {result.cement} kg
              </div>
              <div className="text-xs text-muted-foreground">
                ({result.cementBags} bags)
              </div>
            </div>
            <div className="bg-primary/10 p-3 rounded-lg">
              <div className="text-sm text-primary font-medium">Sand</div>
              <div className="text-lg font-bold text-primary">
                {result.sand} kg
              </div>
            </div>
            <div className="bg-primary/10 p-3 rounded-lg">
              <div className="text-sm text-primary font-medium">Gravel</div>
              <div className="text-lg font-bold text-primary">
                {result.gravel} kg
              </div>
            </div>
            <div className="bg-primary/10 p-3 rounded-lg">
              <div className="text-sm text-primary font-medium">Water</div>
              <div className="text-lg font-bold text-primary">
                {result.water} kg
              </div>
            </div>
          </div>
          
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
            Enter project parameters and click Calculate
          </p>
        </div>
      )}
    </div>
  );
}