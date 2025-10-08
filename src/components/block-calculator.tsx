'use client'

import React, { useState } from 'react';
import { Calculator, RotateCcw, Download, Info } from 'lucide-react';

// 单位类型
type UnitType = 'feet' | 'inches' | 'yards' | 'meters' | 'centimeters' | 'millimeters';

// 计算结果接口
interface CalculationResult {
  blocksNeeded: number; // 所需砖块数量
  mortarVolumeCubicFeet: number; // 砂浆体积（立方英尺）
  mortarVolumeCubicMeters: number; // 砂浆体积（立方米）
  mortarBags: number; // 标准砂浆袋数（100块砖需要3袋）
  cementKg: number; // 水泥重量(kg)
  cementBags: number; // 水泥袋数
  sandKg: number; // 砂子重量(kg)
  waterLiters: number; // 水重量(升)
  totalCost: number; // 总成本
  wallArea: number; // 墙体面积
}

// 预设砖块尺寸
interface BlockPreset {
  label: string;
  length: string;
  height: string;
  unit: UnitType;
}

const BLOCK_PRESETS: BlockPreset[] = [
  { label: '8" × 8"', length: '8', height: '8', unit: 'inches' },
  { label: '12" × 8"', length: '12', height: '8', unit: 'inches' },
  { label: '16" × 8"', length: '16', height: '8', unit: 'inches' },
  { label: '8" × 4"', length: '8', height: '4', unit: 'inches' },
  { label: '12" × 4"', length: '12', height: '4', unit: 'inches' },
  { label: '16" × 4"', length: '16', height: '4', unit: 'inches' },
];

// 项目参数接口
interface ProjectParams {
  wallLength: string;
  wallLengthUnit: UnitType;
  wallHeight: string;
  wallHeightUnit: UnitType;

  blockLength: string;
  blockLengthUnit: UnitType;
  blockHeight: string;
  blockHeightUnit: UnitType;

  mortarJointThickness: string;
  mortarJointUnit: UnitType;

  blockPrice: string; // 单块砖价格
  cementPrice: string; // 水泥价格 ($/bag)
  sandPrice: string; // 砂子价格 ($/kg or $/ton)
}

/**
 * 砌块计算器组件
 * 提供完整的砌块数量、砂浆用量和成本计算功能
 */
export default function BlockCalculator() {
  const [blockPreset, setBlockPreset] = useState<string>('16x8'); // 预设选择
  const [params, setParams] = useState<ProjectParams>({
    wallLength: '10',
    wallLengthUnit: 'feet',
    wallHeight: '8',
    wallHeightUnit: 'feet',

    blockLength: '16',
    blockLengthUnit: 'inches',
    blockHeight: '8',
    blockHeightUnit: 'inches',

    mortarJointThickness: '10',
    mortarJointUnit: 'millimeters',

    blockPrice: '2.50',
    cementPrice: '12',
    sandPrice: '0.05'
  });

  const [wastePercentage, setWastePercentage] = useState<string>('5'); // 损耗百分比
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // 砂浆配比 (1:6 水泥:砂子配比)
  const MORTAR_CEMENT_RATIO = 1;
  const MORTAR_SAND_RATIO = 6;
  const CEMENT_BAG_WEIGHT = 50; // kg per bag
  const WATER_CEMENT_RATIO = 0.5; // 水灰比

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

    if (!params.wallLength || parseFloat(params.wallLength) <= 0) {
      newErrors.wallLength = 'Please enter a valid wall length';
    }
    if (!params.wallHeight || parseFloat(params.wallHeight) <= 0) {
      newErrors.wallHeight = 'Please enter a valid wall height';
    }
    if (!params.blockLength || parseFloat(params.blockLength) <= 0) {
      newErrors.blockLength = 'Please enter a valid block length';
    }
    if (!params.blockHeight || parseFloat(params.blockHeight) <= 0) {
      newErrors.blockHeight = 'Please enter a valid block height';
    }
    if (params.mortarJointThickness === '' || parseFloat(params.mortarJointThickness) < 0) {
      newErrors.mortarJointThickness = 'Please enter a valid joint thickness (0 or greater)';
    }
    if (wastePercentage && (parseFloat(wastePercentage) < 0 || parseFloat(wastePercentage) > 100)) {
      newErrors.wastePercentage = 'Waste percentage must be between 0 and 100';
    }
    if (!params.blockPrice || parseFloat(params.blockPrice) < 0) {
      newErrors.blockPrice = 'Please enter a valid block price';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * 主计算函数
   */
  const calculateBlocks = () => {
    if (!validateInputs()) {
      return;
    }

    // 转换所有尺寸到米
    const wallLengthM = parseFloat(params.wallLength) * getUnitInfo(params.wallLengthUnit).toMeters;
    const wallHeightM = parseFloat(params.wallHeight) * getUnitInfo(params.wallHeightUnit).toMeters;
    const blockLengthM = parseFloat(params.blockLength) * getUnitInfo(params.blockLengthUnit).toMeters;
    const blockHeightM = parseFloat(params.blockHeight) * getUnitInfo(params.blockHeightUnit).toMeters;
    const jointThicknessM = parseFloat(params.mortarJointThickness) * getUnitInfo(params.mortarJointUnit).toMeters;

    // 计算墙体面积
    const wallArea = wallLengthM * wallHeightM;

    // 计算单块砖的覆盖面积（包括砂浆接缝）
    const blockWithJointLength = blockLengthM + jointThicknessM;
    const blockWithJointHeight = blockHeightM + jointThicknessM;
    const blockCoverageArea = blockWithJointLength * blockWithJointHeight;

    // 计算所需砖块数量（向上取整）
    const baseBlocksNeeded = Math.ceil(wallArea / blockCoverageArea);

    // 应用损耗百分比
    const wastePercent = parseFloat(wastePercentage || '0');
    const blocksNeeded = Math.ceil(baseBlocksNeeded * (1 + wastePercent / 100));

    // 初始化砂浆和材料变量
    let mortarVolumeM3 = 0;
    let mortarVolumeFt3 = 0;
    let cementKg = 0;
    let cementBags = 0;
    let sandKg = 0;
    let waterLiters = 0;

    // 只有当接缝厚度大于0时才计算砂浆
    if (jointThicknessM > 0) {
      // 计算砂浆体积
      // 水平接缝体积 + 垂直接缝体积
      const blocksPerRow = Math.ceil(wallLengthM / blockWithJointLength);
      const numberOfRows = Math.ceil(wallHeightM / blockWithJointHeight);

      // 假设砌块厚度为20cm (标准)
      const blockThicknessM = 0.20;

      // 水平接缝总长度 × 墙体长度 × 砌块厚度 × 接缝厚度
      const horizontalJointsVolume = numberOfRows * wallLengthM * blockThicknessM * jointThicknessM;

      // 垂直接缝总数 × 砌块高度 × 砌块厚度 × 接缝厚度
      const verticalJointsVolume = blocksPerRow * numberOfRows * blockHeightM * blockThicknessM * jointThicknessM;

      mortarVolumeM3 = horizontalJointsVolume + verticalJointsVolume;
      mortarVolumeFt3 = mortarVolumeM3 * 35.3147;

      // 计算砂浆材料用量 (基于1:6配比)
      // 砂浆密度约2000 kg/m³
      const mortarDensity = 2000;
      const totalMortarWeight = mortarVolumeM3 * mortarDensity;

      // 水泥重量 = 总重量 × (1/(1+6))
      cementKg = (totalMortarWeight * MORTAR_CEMENT_RATIO) / (MORTAR_CEMENT_RATIO + MORTAR_SAND_RATIO);
      cementBags = Math.ceil(cementKg / CEMENT_BAG_WEIGHT);

      // 砂子重量 = 总重量 × (6/(1+6))
      sandKg = (totalMortarWeight * MORTAR_SAND_RATIO) / (MORTAR_CEMENT_RATIO + MORTAR_SAND_RATIO);

      // 水量 = 水泥重量 × 水灰比
      waterLiters = cementKg * WATER_CEMENT_RATIO;
    }

    // 计算成本
    const blockCost = blocksNeeded * parseFloat(params.blockPrice || '0');
    const cementCost = cementBags * parseFloat(params.cementPrice || '0');
    const sandCost = sandKg * parseFloat(params.sandPrice || '0');
    const totalCost = blockCost + cementCost + sandCost;

    // 计算标准砂浆袋数（100块砖需要3袋）
    const mortarBags = Math.ceil((blocksNeeded / 100) * 3);

    const calculatedResult: CalculationResult = {
      blocksNeeded: blocksNeeded,
      mortarVolumeCubicFeet: Math.round(mortarVolumeFt3 * 100) / 100,
      mortarVolumeCubicMeters: Math.round(mortarVolumeM3 * 1000) / 1000,
      mortarBags: mortarBags,
      cementKg: Math.round(cementKg * 10) / 10,
      cementBags: cementBags,
      sandKg: Math.round(sandKg * 10) / 10,
      waterLiters: Math.round(waterLiters * 10) / 10,
      totalCost: Math.round(totalCost * 100) / 100,
      wallArea: Math.round(wallArea * 100) / 100
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
   * 处理预设砖块尺寸选择
   */
  const handlePresetChange = (presetValue: string) => {
    setBlockPreset(presetValue);

    if (presetValue === 'custom') {
      // 自定义模式，不改变现有值
      return;
    }

    // 查找对应的预设
    const preset = BLOCK_PRESETS.find((p) => {
      const key = `${p.length}x${p.height}`;
      return key === presetValue;
    });

    if (preset) {
      setParams(prev => ({
        ...prev,
        blockLength: preset.length,
        blockLengthUnit: preset.unit,
        blockHeight: preset.height,
        blockHeightUnit: preset.unit,
      }));

      // 清除相关错误
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.blockLength;
        delete newErrors.blockHeight;
        return newErrors;
      });
    }
  };

  /**
   * 重置表单
   */
  const resetForm = () => {
    setBlockPreset('16x8'); // 重置为默认预设
    setParams({
      wallLength: '10',
      wallLengthUnit: 'feet',
      wallHeight: '8',
      wallHeightUnit: 'feet',

      blockLength: '16',
      blockLengthUnit: 'inches',
      blockHeight: '8',
      blockHeightUnit: 'inches',

      mortarJointThickness: '10',
      mortarJointUnit: 'millimeters',

      blockPrice: '2.50',
      cementPrice: '12',
      sandPrice: '0.05'
    });
    setWastePercentage('5');
    setResult(null);
    setErrors({});
  };

  /**
   * 更新砖块尺寸参数（自动切换到自定义模式）
   */
  const updateBlockParam = (key: keyof ProjectParams, value: string) => {
    // 当用户手动修改砖块尺寸时，切换到自定义模式
    if (blockPreset !== 'custom') {
      setBlockPreset('custom');
    }
    updateParam(key, value);
  };

  /**
   * 导出结果
   */
  const exportResult = () => {
    if (!result) return;

    const presetLabel = blockPreset === 'custom' ? 'Custom' : BLOCK_PRESETS.find(p => `${p.length}x${p.height}` === blockPreset)?.label || 'Custom';

    const data = `Block Calculator Results\n\n` +
      `Wall Dimensions: ${params.wallLength}${getUnitInfo(params.wallLengthUnit).symbol} × ${params.wallHeight}${getUnitInfo(params.wallHeightUnit).symbol}\n` +
      `Block Size: ${presetLabel} - ${params.blockLength}${getUnitInfo(params.blockLengthUnit).symbol} × ${params.blockHeight}${getUnitInfo(params.blockHeightUnit).symbol}\n` +
      `Mortar Joint Thickness: ${params.mortarJointThickness}${getUnitInfo(params.mortarJointUnit).symbol}\n` +
      `Waste Percentage: ${wastePercentage}%\n\n` +
      `Wall Area: ${result.wallArea} m²\n` +
      `Blocks Needed (including ${wastePercentage}% waste): ${result.blocksNeeded} blocks\n\n` +
      `Mortar Volume:\n` +
      `  ${result.mortarVolumeCubicFeet} cubic feet (ft³)\n` +
      `  ${result.mortarVolumeCubicMeters} cubic meters (m³)\n` +
      `  ${result.mortarBags} standard bags (100 blocks = 3 bags)\n\n` +
      `Required Materials (1:6 cement:sand ratio):\n` +
      `  Cement: ${result.cementKg} kg (${result.cementBags} bags)\n` +
      `  Sand: ${result.sandKg} kg\n` +
      `  Water: ${result.waterLiters} liters\n\n` +
      `Total Cost: $${result.totalCost}`;

    const blob = new Blob([data], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'block-calculator-results.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-card rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-semibold text-card-foreground mb-6 flex items-center">
        <Calculator className="mr-2 h-6 w-6" />
        Concrete Block Calculator
      </h2>

      {/* Input Fields */}
      <div className="mb-6">
        <h3 className="text-lg font-medium text-card-foreground mb-3">
          Wall Dimensions
        </h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              Wall Length
            </label>
            <div className="flex gap-1">
              <input
                type="number"
                value={params.wallLength}
                onChange={(e) => updateParam('wallLength', e.target.value)}
                className={`flex-1 px-2 py-1.5 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground ${
                  errors.wallLength ? 'border-destructive' : 'border-border'
                }`}
                placeholder="10"
                step="0.01"
                min="0"
              />
              {createUnitSelector(params.wallLengthUnit, (unit) => updateParam('wallLengthUnit', unit), "w-24")}
            </div>
            {errors.wallLength && <p className="text-destructive text-sm mt-1">{errors.wallLength}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              Wall Height
            </label>
            <div className="flex gap-1">
              <input
                type="number"
                value={params.wallHeight}
                onChange={(e) => updateParam('wallHeight', e.target.value)}
                className={`flex-1 px-2 py-1.5 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground ${
                  errors.wallHeight ? 'border-destructive' : 'border-border'
                }`}
                placeholder="8"
                step="0.01"
                min="0"
              />
              {createUnitSelector(params.wallHeightUnit, (unit) => updateParam('wallHeightUnit', unit), "w-24")}
            </div>
            {errors.wallHeight && <p className="text-destructive text-sm mt-1">{errors.wallHeight}</p>}
          </div>
        </div>
      </div>

      {/* Block Specifications */}
      <div className="mb-6">
        <h3 className="text-lg font-medium text-card-foreground mb-3">
          Block Specifications
        </h3>

        <div className="space-y-4">
          {/* 预设尺寸选择器 */}
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              Block Size
            </label>
            <select
              value={blockPreset}
              onChange={(e) => handlePresetChange(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground border-border"
            >
              <option value="8x8">8&quot; × 8&quot;</option>
              <option value="12x8">12&quot; × 8&quot;</option>
              <option value="16x8">16&quot; × 8&quot; (Standard)</option>
              <option value="8x4">8&quot; × 4&quot;</option>
              <option value="12x4">12&quot; × 4&quot;</option>
              <option value="16x4">16&quot; × 4&quot;</option>
              <option value="custom">Custom Size</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              Block Length {blockPreset === 'custom' && '(Custom)'}
            </label>
            <div className="flex gap-1">
              <input
                type="number"
                value={params.blockLength}
                onChange={(e) => updateBlockParam('blockLength', e.target.value)}
                className={`flex-1 px-2 py-1.5 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground ${
                  errors.blockLength ? 'border-destructive' : 'border-border'
                }`}
                placeholder="16"
                step="0.01"
                min="0"
              />
              {createUnitSelector(params.blockLengthUnit, (unit) => updateBlockParam('blockLengthUnit', unit), "w-24")}
            </div>
            {errors.blockLength && <p className="text-destructive text-sm mt-1">{errors.blockLength}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              Block Height {blockPreset === 'custom' && '(Custom)'}
            </label>
            <div className="flex gap-1">
              <input
                type="number"
                value={params.blockHeight}
                onChange={(e) => updateBlockParam('blockHeight', e.target.value)}
                className={`flex-1 px-2 py-1.5 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground ${
                  errors.blockHeight ? 'border-destructive' : 'border-border'
                }`}
                placeholder="8"
                step="0.01"
                min="0"
              />
              {createUnitSelector(params.blockHeightUnit, (unit) => updateBlockParam('blockHeightUnit', unit), "w-24")}
            </div>
            {errors.blockHeight && <p className="text-destructive text-sm mt-1">{errors.blockHeight}</p>}
            <div className="mt-2 p-3 rounded-lg border border-border">
              <div className="flex items-start space-x-2">
                <Info className="h-4 w-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-blue-600 dark:text-blue-400">
                  <div className="font-medium mb-1">Standard Block Sizes:</div>
                  <div>• Standard: 40×20×20cm (16×8×8 inches)</div>
                  <div>• Half: 20×20×20cm (8×8×8 inches)</div>
                  <div>• Jumbo: 50×25×20cm (20×10×8 inches)</div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              Mortar Joint Thickness
            </label>
            <div className="flex gap-1">
              <input
                type="number"
                value={params.mortarJointThickness}
                onChange={(e) => updateParam('mortarJointThickness', e.target.value)}
                className={`flex-1 px-2 py-1.5 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground ${
                  errors.mortarJointThickness ? 'border-destructive' : 'border-border'
                }`}
                placeholder="10"
                step="0.1"
                min="0"
              />
              {createUnitSelector(params.mortarJointUnit, (unit) => updateParam('mortarJointUnit', unit), "w-24", true)}
            </div>
            {errors.mortarJointThickness && <p className="text-destructive text-sm mt-1">{errors.mortarJointThickness}</p>}
            <p className="text-xs text-muted-foreground mt-1">
              Standard joint thickness: 10mm (3/8 inch). Set to 0 for dry-stacked blocks.
            </p>
          </div>
        </div>
      </div>

      {/* Pricing and Waste */}
      <div className="mb-6">
        <h3 className="text-lg font-medium text-card-foreground mb-3">
          Pricing & Waste
        </h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              Waste Percentage (%)
            </label>
            <input
              type="number"
              value={wastePercentage}
              onChange={(e) => setWastePercentage(e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground ${
                errors.wastePercentage ? 'border-destructive' : 'border-border'
              }`}
              placeholder="5"
              step="1"
              min="0"
              max="100"
            />
            {errors.wastePercentage && <p className="text-destructive text-sm mt-1">{errors.wastePercentage}</p>}
            <p className="text-xs text-muted-foreground mt-1">
              Add extra blocks for breakage and cutting (typically 5-10%)
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">
                Block Price ($)
              </label>
              <input
                type="number"
                value={params.blockPrice}
                onChange={(e) => updateParam('blockPrice', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground ${
                  errors.blockPrice ? 'border-destructive' : 'border-border'
                }`}
                placeholder="2.50"
                step="0.01"
                min="0"
              />
              {errors.blockPrice && <p className="text-destructive text-sm mt-1">{errors.blockPrice}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">
                Cement Price ($/bag)
              </label>
              <input
                type="number"
                value={params.cementPrice}
                onChange={(e) => updateParam('cementPrice', e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground border-border"
                placeholder="12"
                step="0.01"
                min="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">
                Sand Price ($/kg)
              </label>
              <input
                type="number"
                value={params.sandPrice}
                onChange={(e) => updateParam('sandPrice', e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground border-border"
                placeholder="0.05"
                step="0.01"
                min="0"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 mb-6">
        <button
          onClick={calculateBlocks}
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

          {/* Block Count Summary */}
          <div className="bg-primary/10 p-4 rounded-lg border border-border">
            <div className="text-sm text-primary font-medium mb-3">Blocks Needed</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <div className="text-xs text-muted-foreground">Wall Area</div>
                <div className="text-lg font-bold text-primary">
                  {result.wallArea} m²
                </div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Total Blocks (with {wastePercentage}% waste)</div>
                <div className="text-lg font-bold text-primary">
                  {result.blocksNeeded} blocks
                </div>
              </div>
            </div>
          </div>

          {/* Mortar Volume Summary */}
          <div className="bg-primary/10 p-4 rounded-lg border border-border">
            <div className="text-sm text-primary font-medium mb-3">Mortar Volume</div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <div className="text-xs text-muted-foreground">Cubic Feet</div>
                <div className="text-lg font-bold text-primary">
                  {result.mortarVolumeCubicFeet} ft³
                </div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Cubic Meters</div>
                <div className="text-lg font-bold text-primary">
                  {result.mortarVolumeCubicMeters} m³
                </div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Standard Bags</div>
                <div className="text-lg font-bold text-primary">
                  {result.mortarBags} bags
                </div>
              </div>
            </div>
          </div>

          {/* Material Quantities */}
          <div className="bg-muted/20 p-4 rounded-lg border border-border">
            <div className="text-sm font-medium text-card-foreground mb-3">
              Required Materials (1:6 cement:sand ratio)
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <div className="bg-primary/10 p-3 rounded-lg">
                <div className="text-sm text-primary font-medium">Cement</div>
                <div className="text-lg font-bold text-primary">
                  {result.cementKg} kg
                </div>
                <div className="text-xs text-muted-foreground">
                  ({result.cementBags} bags)
                </div>
              </div>
              <div className="bg-primary/10 p-3 rounded-lg">
                <div className="text-sm text-primary font-medium">Sand</div>
                <div className="text-lg font-bold text-primary">
                  {result.sandKg} kg
                </div>
              </div>
              <div className="bg-primary/10 p-3 rounded-lg">
                <div className="text-sm text-primary font-medium">Water</div>
                <div className="text-lg font-bold text-primary">
                  {result.waterLiters} L
                </div>
              </div>
            </div>
          </div>

          {/* Cost Summary */}
          <div className="bg-primary/10 p-3 rounded-lg">
            <div className="text-sm text-primary font-medium">Total Cost</div>
            <div className="text-xl font-bold text-primary">
              ${result.totalCost}
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
            Enter wall and block dimensions, then click Calculate
          </p>
        </div>
      )}
    </div>
  );
}
