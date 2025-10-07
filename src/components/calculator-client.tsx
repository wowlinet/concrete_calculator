'use client'

import React, { useState, useCallback } from 'react';
import Link from 'next/link';
import { Calculator, RotateCcw, Download, Building, Home, Square, Columns } from 'lucide-react';

// 项目类型枚举
type ProjectType = 'rectangular' | 'driveway' | 'foundation' | 'floor' | 'column' | 'wall' | 'stairs';

// 单位类型
type UnitType = 'metric' | 'imperial';

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
  width: string;
  height: string;
  diameter?: string; // 圆柱直径
  steps?: string; // 楼梯步数
  stepHeight?: string; // 楼梯步高
  stepDepth?: string; // 楼梯步深
}

export default function CalculatorClient() {
  const [projectType, setProjectType] = useState<ProjectType>('rectangular');
  const [unit, setUnit] = useState<UnitType>('metric');
  const [params, setParams] = useState<ProjectParams>({
    length: '',
    width: '',
    height: '',
    diameter: '',
    steps: '',
    stepHeight: '',
    stepDepth: ''
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
    rectangular: { name: 'Rectangular Slab', icon: Square, description: 'Standard rectangular concrete slab' },
    driveway: { name: 'Driveway', icon: Square, description: 'Concrete driveway or pathway' },
    foundation: { name: 'Foundation', icon: Building, description: 'Building foundation' },
    floor: { name: 'Floor', icon: Home, description: 'Concrete floor slab' },
    column: { name: 'Column', icon: Columns, description: 'Cylindrical concrete column' },
    wall: { name: 'Wall', icon: Square, description: 'Concrete wall' },
    stairs: { name: 'Stairs', icon: Square, description: 'Concrete stairs' }
  };

  // 单位转换常数
  const CUBIC_METERS_TO_CUBIC_YARDS = 1.30795;
  const CEMENT_BAG_WEIGHT = 50; // kg per bag

  // 验证输入参数
  const validateInputs = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    // 根据项目类型验证不同参数
    switch (projectType) {
      case 'column':
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

  // 计算不同项目类型的体积
  const calculateVolume = (): number => {
    const l = parseFloat(params.length || '0');
    const w = parseFloat(params.width || '0');
    const h = parseFloat(params.height || '0');
    const d = parseFloat(params.diameter || '0');
    const steps = parseInt(params.steps || '0');
    const stepH = parseFloat(params.stepHeight || '0');
    const stepD = parseFloat(params.stepDepth || '0');
    
    switch (projectType) {
      case 'column':
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

  // 主计算函数
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

  // 更新参数
  const updateParam = (key: keyof ProjectParams, value: string) => {
    setParams(prev => ({ ...prev, [key]: value }));
    // 清除对应的错误信息
    if (errors[key]) {
      setErrors(prev => ({ ...prev, [key]: '' }));
    }
  };

  // 重置表单
  const resetForm = () => {
    setParams({
      length: '',
      width: '',
      height: '',
      diameter: '',
      steps: '',
      stepHeight: '',
      stepDepth: ''
    });
    setConcreteGrade('C25');
    setUnitPrice('');
    setResult(null);
    setErrors({});
  };

  // 导出结果
  const exportResult = () => {
    if (!result) return;

    const projectTypeName = projectTypes[projectType].name;
    const unitLabel = unit === 'metric' ? 'cubic meters' : 'cubic yards';
    const volumeValue = unit === 'metric' ? result.volume : result.volumeImperial;
    
    let dimensionsText = '';
    switch (projectType) {
      case 'column':
        dimensionsText = `Diameter: ${params.diameter}m, Height: ${params.height}m`;
        break;
      case 'stairs':
        dimensionsText = `Steps: ${params.steps}, Width: ${params.width}m, Step Height: ${params.stepHeight}m, Step Depth: ${params.stepDepth}m`;
        break;
      default:
        dimensionsText = `Length: ${params.length}m, Width: ${params.width}m, Height: ${params.height}m`;
        break;
    }

    const data = `Concrete Calculator Results\n\n` +
      `Project Type: ${projectTypeName}\n` +
      `Dimensions: ${dimensionsText}\n` +
      `Concrete Grade: ${concreteGrade}\n` +
      `Unit: ${unit === 'metric' ? 'Metric' : 'Imperial'}\n\n` +
      `Required Materials:\n` +
      `Concrete Volume: ${volumeValue} ${unitLabel}\n` +
      `Concrete Volume (metric): ${result.volume} cubic meters\n` +
      `Concrete Volume (imperial): ${result.volumeImperial} cubic yards\n` +
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
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Concrete Calculator
            </h1>
            <p className="text-lg text-muted-foreground">
              Calculate concrete volume, material quantities, and costs for various construction projects
            </p>
          </div>

          {/* Project Type Selection */}
          <div className="bg-card rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-card-foreground mb-4">
              Select Project Type
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
              {Object.entries(projectTypes).map(([key, config]) => {
                const IconComponent = config.icon;
                return (
                  <button
                    key={key}
                    onClick={() => setProjectType(key as ProjectType)}
                    className={`p-4 rounded-lg border-2 transition-all duration-200 flex flex-col items-center space-y-2 ${
                      projectType === key
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-border hover:border-border/80 text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <IconComponent className="h-6 w-6" />
                    <span className="text-sm font-medium text-center">{config.name}</span>
                  </button>
                );
              })}
            </div>
            <p className="text-sm text-muted-foreground mt-3">
              {projectTypes[projectType].description}
            </p>
          </div>

          {/* Unit Selection */}
          <div className="bg-card rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-card-foreground mb-4">
              Select Units
            </h2>
            <div className="flex gap-4">
              <button
                onClick={() => setUnit('metric')}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  unit === 'metric'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                }`}
              >
                Metric (m³)
              </button>
              <button
                onClick={() => setUnit('imperial')}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  unit === 'imperial'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                }`}
              >
                Imperial (yd³)
              </button>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Form */}
            <div className="bg-card rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-semibold text-card-foreground mb-6 flex items-center">
                <Calculator className="mr-2 h-6 w-6" />
                Project Parameters
              </h2>
              
              <div className="space-y-6">
                {/* Dynamic input fields based on project type */}
                {projectType === 'column' ? (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Diameter ({unit === 'metric' ? 'meters' : 'feet'})
                      </label>
                      <input
                        type="number"
                        value={params.diameter}
                        onChange={(e) => updateParam('diameter', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent bg-background text-foreground ${
                          errors.diameter ? 'border-destructive' : 'border-input'
                        }`}
                        placeholder="0.00"
                        step="0.01"
                        min="0"
                      />
                      {errors.diameter && <p className="text-destructive text-sm mt-1">{errors.diameter}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Height ({unit === 'metric' ? 'meters' : 'feet'})
                      </label>
                      <input
                        type="number"
                        value={params.height}
                        onChange={(e) => updateParam('height', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent bg-background text-foreground ${
                          errors.height ? 'border-destructive' : 'border-input'
                        }`}
                        placeholder="0.00"
                        step="0.01"
                        min="0"
                      />
                      {errors.height && <p className="text-destructive text-sm mt-1">{errors.height}</p>}
                    </div>
                  </div>
                ) : projectType === 'stairs' ? (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Number of Steps
                      </label>
                      <input
                        type="number"
                        value={params.steps}
                        onChange={(e) => updateParam('steps', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent bg-background text-foreground ${
                          errors.steps ? 'border-destructive' : 'border-input'
                        }`}
                        placeholder="0"
                        min="1"
                      />
                      {errors.steps && <p className="text-destructive text-sm mt-1">{errors.steps}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Width ({unit === 'metric' ? 'meters' : 'feet'})
                      </label>
                      <input
                        type="number"
                        value={params.width}
                        onChange={(e) => updateParam('width', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent bg-background text-foreground ${
                          errors.width ? 'border-destructive' : 'border-input'
                        }`}
                        placeholder="0.00"
                        step="0.01"
                        min="0"
                      />
                      {errors.width && <p className="text-destructive text-sm mt-1">{errors.width}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Step Height ({unit === 'metric' ? 'meters' : 'feet'})
                      </label>
                      <input
                        type="number"
                        value={params.stepHeight}
                        onChange={(e) => updateParam('stepHeight', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent bg-background text-foreground ${
                          errors.stepHeight ? 'border-destructive' : 'border-input'
                        }`}
                        placeholder="0.00"
                        step="0.01"
                        min="0"
                      />
                      {errors.stepHeight && <p className="text-destructive text-sm mt-1">{errors.stepHeight}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Step Depth ({unit === 'metric' ? 'meters' : 'feet'})
                      </label>
                      <input
                        type="number"
                        value={params.stepDepth}
                        onChange={(e) => updateParam('stepDepth', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent bg-background text-foreground ${
                          errors.stepDepth ? 'border-destructive' : 'border-input'
                        }`}
                        placeholder="0.00"
                        step="0.01"
                        min="0"
                      />
                      {errors.stepDepth && <p className="text-destructive text-sm mt-1">{errors.stepDepth}</p>}
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Length ({unit === 'metric' ? 'meters' : 'feet'})
                      </label>
                      <input
                        type="number"
                        value={params.length}
                        onChange={(e) => updateParam('length', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent bg-background text-foreground ${
                          errors.length ? 'border-destructive' : 'border-input'
                        }`}
                        placeholder="0.00"
                        step="0.01"
                        min="0"
                      />
                      {errors.length && <p className="text-destructive text-sm mt-1">{errors.length}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Width ({unit === 'metric' ? 'meters' : 'feet'})
                      </label>
                      <input
                        type="number"
                        value={params.width}
                        onChange={(e) => updateParam('width', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent bg-background text-foreground ${
                          errors.width ? 'border-destructive' : 'border-input'
                        }`}
                        placeholder="0.00"
                        step="0.01"
                        min="0"
                      />
                      {errors.width && <p className="text-destructive text-sm mt-1">{errors.width}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        {projectType === 'wall' ? 'Height' : 'Thickness'} ({unit === 'metric' ? 'meters' : 'feet'})
                      </label>
                      <input
                        type="number"
                        value={params.height}
                        onChange={(e) => updateParam('height', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent bg-background text-foreground ${
                          errors.height ? 'border-destructive' : 'border-input'
                        }`}
                        placeholder="0.00"
                        step="0.01"
                        min="0"
                      />
                      {errors.height && <p className="text-destructive text-sm mt-1">{errors.height}</p>}
                    </div>
                  </div>
                )}

                {/* Concrete Grade Selection */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Concrete Grade
                  </label>
                  <select
                    value={concreteGrade}
                    onChange={(e) => setConcreteGrade(e.target.value)}
                    className="w-full px-4 py-3 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent bg-background text-foreground"
                  >
                    <option value="C15">C15 (15 MPa)</option>
                    <option value="C20">C20 (20 MPa)</option>
                    <option value="C25">C25 (25 MPa)</option>
                    <option value="C30">C30 (30 MPa)</option>
                    <option value="C35">C35 (35 MPa)</option>
                    <option value="C40">C40 (40 MPa)</option>
                  </select>
                </div>

                {/* Unit Price */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Unit Price (per cubic {unit === 'metric' ? 'meter' : 'yard'})
                  </label>
                  <input
                    type="number"
                    value={unitPrice}
                    onChange={(e) => setUnitPrice(e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent bg-background text-foreground ${
                      errors.unitPrice ? 'border-destructive' : 'border-input'
                    }`}
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                  />
                  {errors.unitPrice && <p className="text-destructive text-sm mt-1">{errors.unitPrice}</p>}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4">
                  <button
                    onClick={calculateConcrete}
                    className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center"
                  >
                    <Calculator className="mr-2 h-5 w-5" />
                    Calculate
                  </button>
                  <button
                    onClick={resetForm}
                    className="px-6 py-3 border border-border hover:bg-muted text-foreground rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center"
                  >
                    <RotateCcw className="mr-2 h-5 w-5" />
                    Reset
                  </button>
                </div>
              </div>
            </div>

            {/* Results Panel */}
            <div className="bg-card rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-semibold text-card-foreground mb-6">
                Calculation Results
              </h2>
              
              {result ? (
                <div className="space-y-6">
                  {/* Volume Results */}
                  <div className="bg-primary/5 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-card-foreground mb-4">
                      Concrete Volume Required
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-primary">
                          {result.volume}
                        </p>
                        <p className="text-sm text-muted-foreground">cubic meters</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-primary">
                          {result.volumeImperial}
                        </p>
                        <p className="text-sm text-muted-foreground">cubic yards</p>
                      </div>
                    </div>
                  </div>

                  {/* Material Breakdown */}
                  <div className="bg-secondary/5 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-card-foreground mb-4">
                      Material Requirements ({concreteGrade})
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Cement:</span>
                        <span className="font-semibold">{result.cement} kg ({result.cementBags} bags)</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Sand:</span>
                        <span className="font-semibold">{result.sand} kg</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Gravel:</span>
                        <span className="font-semibold">{result.gravel} kg</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Water:</span>
                        <span className="font-semibold">{result.water} kg</span>
                      </div>
                    </div>
                  </div>

                  {/* Cost Estimation */}
                  <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-card-foreground mb-4">
                      Cost Estimation
                    </h3>
                    <div className="text-center">
                      <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                        ${result.totalCost}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Total estimated cost
                      </p>
                    </div>
                  </div>

                  {/* Export Button */}
                  <button
                    onClick={exportResult}
                    className="w-full bg-secondary hover:bg-secondary/80 text-secondary-foreground px-6 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center"
                  >
                    <Download className="mr-2 h-5 w-5" />
                    Export Results
                  </button>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Calculator className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Enter your project parameters and click Calculate to see results
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}