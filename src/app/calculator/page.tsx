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

export default function CalculatorPage() {
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Concrete Calculator
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Calculate concrete volume, material quantities, and costs for various construction projects
            </p>
          </div>

          {/* Project Type Selection */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
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
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                        : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    <IconComponent className="h-6 w-6" />
                    <span className="text-sm font-medium text-center">{config.name}</span>
                  </button>
                );
              })}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-3">
              {projectTypes[projectType].description}
            </p>
          </div>

          {/* Unit Selection */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Select Units
            </h2>
            <div className="flex gap-4">
              <button
                onClick={() => setUnit('metric')}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  unit === 'metric'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                Metric (m³)
              </button>
              <button
                onClick={() => setUnit('imperial')}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  unit === 'imperial'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                Imperial (yd³)
              </button>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Form */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                <Calculator className="mr-2 h-6 w-6" />
                Project Parameters
              </h2>
              
              <div className="space-y-6">
                {/* Dynamic input fields based on project type */}
                {projectType === 'column' ? (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Diameter ({unit === 'metric' ? 'meters' : 'feet'})
                      </label>
                      <input
                        type="number"
                        value={params.diameter}
                        onChange={(e) => updateParam('diameter', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
                          errors.diameter ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-600'
                        }`}
                        placeholder="0.00"
                        step="0.01"
                        min="0"
                      />
                      {errors.diameter && <p className="text-red-500 text-sm mt-1">{errors.diameter}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Height ({unit === 'metric' ? 'meters' : 'feet'})
                      </label>
                      <input
                        type="number"
                        value={params.height}
                        onChange={(e) => updateParam('height', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
                          errors.height ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-600'
                        }`}
                        placeholder="0.00"
                        step="0.01"
                        min="0"
                      />
                      {errors.height && <p className="text-red-500 text-sm mt-1">{errors.height}</p>}
                    </div>
                  </div>
                ) : projectType === 'stairs' ? (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Number of Steps
                      </label>
                      <input
                        type="number"
                        value={params.steps}
                        onChange={(e) => updateParam('steps', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
                          errors.steps ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-600'
                        }`}
                        placeholder="0"
                        min="1"
                      />
                      {errors.steps && <p className="text-red-500 text-sm mt-1">{errors.steps}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Width ({unit === 'metric' ? 'meters' : 'feet'})
                      </label>
                      <input
                        type="number"
                        value={params.width}
                        onChange={(e) => updateParam('width', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
                          errors.width ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-600'
                        }`}
                        placeholder="0.00"
                        step="0.01"
                        min="0"
                      />
                      {errors.width && <p className="text-red-500 text-sm mt-1">{errors.width}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Step Height ({unit === 'metric' ? 'meters' : 'feet'})
                      </label>
                      <input
                        type="number"
                        value={params.stepHeight}
                        onChange={(e) => updateParam('stepHeight', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
                          errors.stepHeight ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-600'
                        }`}
                        placeholder="0.00"
                        step="0.01"
                        min="0"
                      />
                      {errors.stepHeight && <p className="text-red-500 text-sm mt-1">{errors.stepHeight}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Step Depth ({unit === 'metric' ? 'meters' : 'feet'})
                      </label>
                      <input
                        type="number"
                        value={params.stepDepth}
                        onChange={(e) => updateParam('stepDepth', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
                          errors.stepDepth ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-600'
                        }`}
                        placeholder="0.00"
                        step="0.01"
                        min="0"
                      />
                      {errors.stepDepth && <p className="text-red-500 text-sm mt-1">{errors.stepDepth}</p>}
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Length ({unit === 'metric' ? 'meters' : 'feet'})
                      </label>
                      <input
                        type="number"
                        value={params.length}
                        onChange={(e) => updateParam('length', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
                          errors.length ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-600'
                        }`}
                        placeholder="0.00"
                        step="0.01"
                        min="0"
                      />
                      {errors.length && <p className="text-red-500 text-sm mt-1">{errors.length}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Width ({unit === 'metric' ? 'meters' : 'feet'})
                      </label>
                      <input
                        type="number"
                        value={params.width}
                        onChange={(e) => updateParam('width', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
                          errors.width ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-600'
                        }`}
                        placeholder="0.00"
                        step="0.01"
                        min="0"
                      />
                      {errors.width && <p className="text-red-500 text-sm mt-1">{errors.width}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {projectType === 'wall' ? 'Height' : 'Thickness'} ({unit === 'metric' ? 'meters' : 'feet'})
                      </label>
                      <input
                        type="number"
                        value={params.height}
                        onChange={(e) => updateParam('height', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
                          errors.height ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-600'
                        }`}
                        placeholder="0.00"
                        step="0.01"
                        min="0"
                      />
                      {errors.height && <p className="text-red-500 text-sm mt-1">{errors.height}</p>}
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Concrete Grade
                    </label>
                    <select
                      value={concreteGrade}
                      onChange={(e) => setConcreteGrade(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      <option value="C15">C15 (Light Load Structures)</option>
                      <option value="C20">C20 (General Structures)</option>
                      <option value="C25">C25 (Residential Buildings)</option>
                      <option value="C30">C30 (Commercial Buildings)</option>
                      <option value="C35">C35 (High-rise Buildings)</option>
                      <option value="C40">C40 (Heavy Load Structures)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Unit Price ({unit === 'metric' ? '$/m³' : '$/yd³'})
                    </label>
                    <input
                      type="number"
                      value={unitPrice}
                      onChange={(e) => setUnitPrice(e.target.value)}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
                        errors.unitPrice ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-600'
                      }`}
                      placeholder="0.00"
                      step="0.01"
                      min="0"
                    />
                    {errors.unitPrice && <p className="text-red-500 text-sm mt-1">{errors.unitPrice}</p>}
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={calculateConcrete}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center"
                  >
                    <Calculator className="mr-2 h-5 w-5" />
                    Calculate
                  </button>
                  <button
                    onClick={resetForm}
                    className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center"
                  >
                    <RotateCcw className="mr-2 h-5 w-5" />
                    Reset
                  </button>
                </div>
              </div>
            </div>

            {/* Calculation Results */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                Calculation Results
              </h2>
              
              {result ? (
                <div className="space-y-6">
                  {/* Volume and Cost Summary */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                      <div className="text-sm text-blue-600 dark:text-blue-400 font-medium">Concrete Volume</div>
                      <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">
                        {unit === 'metric' ? result.volume : result.volumeImperial} {unit === 'metric' ? 'm³' : 'yd³'}
                      </div>
                    </div>
                    <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                      <div className="text-sm text-green-600 dark:text-green-400 font-medium">Total Cost</div>
                      <div className="text-2xl font-bold text-green-700 dark:text-green-300">
                        ${result.totalCost}
                      </div>
                    </div>
                  </div>
                  
                  {/* Material Quantities */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
                      <div className="text-sm text-orange-600 dark:text-orange-400 font-medium">Cement</div>
                      <div className="text-xl font-bold text-orange-700 dark:text-orange-300">
                        {result.cement} kg
                      </div>
                      <div className="text-sm text-orange-600 dark:text-orange-400">
                        ({result.cementBags} bags)
                      </div>
                    </div>
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
                      <div className="text-sm text-yellow-600 dark:text-yellow-400 font-medium">Sand</div>
                      <div className="text-xl font-bold text-yellow-700 dark:text-yellow-300">
                        {result.sand} kg
                      </div>
                    </div>
                    <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                      <div className="text-sm text-purple-600 dark:text-purple-400 font-medium">Gravel</div>
                      <div className="text-xl font-bold text-purple-700 dark:text-purple-300">
                        {result.gravel} kg
                      </div>
                    </div>
                    <div className="bg-cyan-50 dark:bg-cyan-900/20 p-4 rounded-lg">
                      <div className="text-sm text-cyan-600 dark:text-cyan-400 font-medium">Water</div>
                      <div className="text-xl font-bold text-cyan-700 dark:text-cyan-300">
                        {result.water} kg
                      </div>
                    </div>
                  </div>
                  
                  <button
                    onClick={exportResult}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center"
                  >
                    <Download className="mr-2 h-5 w-5" />
                    Export Results
                  </button>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Calculator className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 dark:text-gray-400">
                    Enter project parameters and click Calculate
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Usage Instructions */}
          <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              Usage Instructions
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Concrete Grade Guide
                </h3>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <li><strong>C15:</strong> Suitable for foundations and light load structures</li>
                  <li><strong>C20:</strong> Suitable for general structural engineering</li>
                  <li><strong>C25:</strong> Suitable for residential buildings and small components</li>
                  <li><strong>C30:</strong> Suitable for commercial buildings and beam-column structures</li>
                  <li><strong>C35:</strong> Suitable for high-rise buildings and important structures</li>
                  <li><strong>C40:</strong> Suitable for special structures and heavy load components</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Important Notes
                </h3>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <li>• Calculation results are for reference only, actual usage may vary due to construction conditions</li>
                  <li>• It is recommended to reserve 5-10% extra materials</li>
                  <li>• Material specifications may vary in different regions</li>
                  <li>• Special engineering conditions may require ratio adjustments</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Related Links */}
          <div className="mt-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl shadow-lg p-8 text-white text-center">
            <h2 className="text-2xl font-bold mb-4">
              Need More Information?
            </h2>
            <p className="text-blue-100 mb-6">
              Learn more about our concrete calculator and professional construction solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/about"
                className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                About Our Tool
              </Link>
              <Link
                href="/"
                className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}