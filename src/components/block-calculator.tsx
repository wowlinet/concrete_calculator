'use client'

import React, { useEffect, useState } from 'react';
import {
  Calculator,
  ChevronDown,
  Download,
  Info,
  Package,
  Percent,
  RotateCcw,
  Scale,
} from 'lucide-react';

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

  const unitOptions: { value: UnitType; label: string }[] = [
    { value: 'feet', label: 'ft' },
    { value: 'inches', label: 'in' },
    { value: 'yards', label: 'yd' },
    { value: 'meters', label: 'm' },
    { value: 'centimeters', label: 'cm' },
    { value: 'millimeters', label: 'mm' },
  ];

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

  const getValidationErrors = (): Record<string, string> => {
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

    return newErrors;
  };

  /**
   * 主计算函数
   */
  const buildCalculationResult = (): CalculationResult => {
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

    return {
      blocksNeeded,
      mortarVolumeCubicFeet: Math.round(mortarVolumeFt3 * 100) / 100,
      mortarVolumeCubicMeters: Math.round(mortarVolumeM3 * 1000) / 1000,
      mortarBags,
      cementKg: Math.round(cementKg * 10) / 10,
      cementBags,
      sandKg: Math.round(sandKg * 10) / 10,
      waterLiters: Math.round(waterLiters * 10) / 10,
      totalCost: Math.round(totalCost * 100) / 100,
      wallArea: Math.round(wallArea * 100) / 100,
    };
  };

  useEffect(() => {
    const nextErrors = getValidationErrors();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setResult(null);
      return;
    }

    setResult(buildCalculationResult());
  }, [params, wastePercentage]);

  /**
   * 更新参数
   */
  const updateParam = (key: keyof ProjectParams, value: string) => {
    setParams((prev) => ({ ...prev, [key]: value }));
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

  const renderField = (
    label: string,
    valueKey: keyof ProjectParams | 'wastePercentage',
    opts: {
      unitKey?: keyof ProjectParams;
      placeholder?: string;
      step?: string;
      min?: string;
      max?: string;
      suffix?: string;
      helperText?: string;
      errorKey?: string;
      allowMillimeters?: boolean;
      onValueChange?: (value: string) => void;
    } = {}
  ) => {
    const isWasteField = valueKey === 'wastePercentage';
    const value = isWasteField ? wastePercentage : ((params[valueKey as keyof ProjectParams] as string) ?? '');
    const error = opts.errorKey ? errors[opts.errorKey] : undefined;
    const unit = opts.unitKey ? (params[opts.unitKey] as UnitType) : undefined;
    const unitItems = opts.allowMillimeters
      ? unitOptions
      : unitOptions.filter((option) => option.value !== 'millimeters');

    return (
      <div>
        <label className="mb-2 block text-sm font-medium text-muted-foreground">{label}</label>
        <div
          className={`flex items-stretch overflow-hidden rounded-lg border bg-background transition-shadow focus-within:ring-2 focus-within:ring-primary focus-within:border-transparent ${
            error ? 'border-destructive' : 'border-border'
          }`}
        >
          <input
            type="number"
            value={value}
            onChange={(e) =>
              opts.onValueChange
                ? opts.onValueChange(e.target.value)
                : updateParam(valueKey as keyof ProjectParams, e.target.value)
            }
            placeholder={opts.placeholder}
            step={opts.step ?? '0.01'}
            min={opts.min ?? '0'}
            max={opts.max}
            className="min-w-0 flex-1 bg-transparent px-3 py-2.5 text-sm text-foreground outline-none"
          />
          {opts.unitKey ? (
            <div className="relative flex w-24 shrink-0 items-center border-l border-border">
              <select
                value={unit}
                onChange={(e) => updateParam(opts.unitKey!, e.target.value)}
                className="h-full w-full cursor-pointer appearance-none bg-transparent py-2.5 pl-3 pr-8 text-sm text-foreground outline-none"
                aria-label={`${label} unit`}
              >
                {unitItems.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-2.5 h-4 w-4 text-muted-foreground" />
            </div>
          ) : opts.suffix ? (
            <span className="flex w-20 shrink-0 items-center justify-center border-l border-border px-3 text-sm text-muted-foreground">
              {opts.suffix}
            </span>
          ) : null}
        </div>
        {error ? <p className="mt-1 text-sm text-destructive">{error}</p> : null}
        {!error && opts.helperText ? (
          <p className="mt-1 text-xs text-muted-foreground">{opts.helperText}</p>
        ) : null}
      </div>
    );
  };

  const ResultRow = ({
    icon,
    label,
    value,
  }: {
    icon: React.ReactNode;
    label: string;
    value: string;
  }) => (
    <div className="flex items-center justify-between py-3">
      <div className="flex items-center gap-2.5 text-sm text-foreground">
        <span className="text-primary">{icon}</span>
        {label}
      </div>
      <span className="text-sm font-semibold text-foreground">{value}</span>
    </div>
  );

  return (
    <div>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="flex items-center text-2xl font-semibold text-foreground">
          <Calculator className="mr-2 h-6 w-6" />
          Concrete Block Calculator
        </h2>
        <div className="flex items-center gap-2">
          <button
            onClick={exportResult}
            disabled={!result}
            className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted/60 hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40"
            title="Save results as a text file"
          >
            <Download className="h-4 w-4" />
            Save
          </button>
          <button
            onClick={resetForm}
            className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-primary px-3 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary/10"
          >
            <RotateCcw className="h-4 w-4" />
            Reset
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_360px]">
        <div className="space-y-6">
          <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-medium text-card-foreground">Wall Dimensions</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {renderField('Wall Length', 'wallLength', {
                unitKey: 'wallLengthUnit',
                placeholder: '10',
                errorKey: 'wallLength',
              })}
              {renderField('Wall Height', 'wallHeight', {
                unitKey: 'wallHeightUnit',
                placeholder: '8',
                errorKey: 'wallHeight',
              })}
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-medium text-card-foreground">Block Specifications</h3>
            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-muted-foreground">Block Size</label>
                <div className="relative">
                  <select
                    value={blockPreset}
                    onChange={(e) => handlePresetChange(e.target.value)}
                    className="h-11 w-full cursor-pointer appearance-none rounded-lg border border-border bg-background px-3 pr-10 text-sm text-foreground outline-none transition-shadow focus:border-transparent focus:ring-2 focus:ring-primary"
                  >
                    <option value="8x8">8&quot; × 8&quot;</option>
                    <option value="12x8">12&quot; × 8&quot;</option>
                    <option value="16x8">16&quot; × 8&quot; (Standard)</option>
                    <option value="8x4">8&quot; × 4&quot;</option>
                    <option value="12x4">12&quot; × 4&quot;</option>
                    <option value="16x4">16&quot; × 4&quot;</option>
                    <option value="custom">Custom Size</option>
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {renderField(`Block Length${blockPreset === 'custom' ? ' (Custom)' : ''}`, 'blockLength', {
                  unitKey: 'blockLengthUnit',
                  placeholder: '16',
                  errorKey: 'blockLength',
                  onValueChange: (value) => updateBlockParam('blockLength', value),
                })}
                {renderField(`Block Height${blockPreset === 'custom' ? ' (Custom)' : ''}`, 'blockHeight', {
                  unitKey: 'blockHeightUnit',
                  placeholder: '8',
                  errorKey: 'blockHeight',
                  onValueChange: (value) => updateBlockParam('blockHeight', value),
                })}
              </div>

              {renderField('Mortar Joint Thickness', 'mortarJointThickness', {
                unitKey: 'mortarJointUnit',
                placeholder: '10',
                step: '0.1',
                errorKey: 'mortarJointThickness',
                allowMillimeters: true,
                helperText: 'Standard joint thickness: 10 mm (3/8 in). Set to 0 for dry-stacked blocks.',
              })}

              <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
                <div className="flex items-start gap-2">
                  <Info className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <div className="text-sm text-muted-foreground">
                    <div className="mb-1 font-medium text-foreground">Common Block Sizes</div>
                    <div>Standard: 40×20×20 cm (16×8×8 in)</div>
                    <div>Half: 20×20×20 cm (8×8×8 in)</div>
                    <div>Jumbo: 50×25×20 cm (20×10×8 in)</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-medium text-card-foreground">Pricing &amp; Waste</h3>
            <div className="space-y-4">
              {renderField('Waste Percentage', 'wastePercentage', {
                suffix: '%',
                placeholder: '5',
                step: '1',
                min: '0',
                max: '100',
                errorKey: 'wastePercentage',
                helperText: 'Add extra blocks for cutting and breakage, usually 5% to 10%.',
                onValueChange: setWastePercentage,
              })}

              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {renderField('Block Price ($)', 'blockPrice', {
                  placeholder: '2.50',
                  errorKey: 'blockPrice',
                })}
                {renderField('Cement Price ($/bag)', 'cementPrice', {
                  placeholder: '12',
                })}
                {renderField('Sand Price ($/kg)', 'sandPrice', {
                  placeholder: '0.05',
                })}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-lg border border-primary/30 bg-primary/5 px-4 py-3 text-sm text-muted-foreground">
            <span className="text-primary">💡</span>
            <span>
              <span className="font-medium text-foreground">Tip:</span> Results update automatically as you adjust dimensions, block size, and pricing.
            </span>
          </div>
        </div>

        <div>
          <div className="lg:sticky lg:top-24">
            <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
              <div className="flex items-center justify-between bg-primary px-5 py-4">
                <h3 className="font-semibold text-primary-foreground">Estimated Results</h3>
                <span className="flex items-center gap-1.5 text-sm text-primary-foreground/90">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary-foreground/70"></span>
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-primary-foreground"></span>
                  </span>
                  Live
                </span>
              </div>

              {result ? (
                <div>
                  <div className="px-5 py-4">
                    <div className="mb-1 text-sm text-muted-foreground">Blocks Needed</div>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-4xl font-bold text-primary">{result.blocksNeeded.toLocaleString()}</span>
                      <span className="text-xl font-semibold text-primary">pcs</span>
                    </div>
                    <div className="mt-1 text-xs text-muted-foreground">Including {wastePercentage || '0'}% waste allowance</div>
                  </div>

                  <div className="border-t border-border bg-primary/5 px-5 py-4">
                    <div className="mb-1 text-sm text-muted-foreground">Estimated Cost</div>
                    <div className="text-3xl font-bold text-primary">${result.totalCost.toLocaleString()}</div>
                    <div className="mt-1 text-xs text-muted-foreground">Blocks, cement, and sand included</div>
                  </div>

                  <div className="divide-y divide-border border-t border-border px-5">
                    <ResultRow icon={<Scale className="h-4 w-4" />} label="Wall Area" value={`${result.wallArea.toLocaleString()} m²`} />
                    <ResultRow icon={<Package className="h-4 w-4" />} label="Mortar Bags" value={`${result.mortarBags} bags`} />
                    <ResultRow icon={<Package className="h-4 w-4" />} label="Cement Bags" value={`${result.cementBags} bags`} />
                    <ResultRow icon={<Percent className="h-4 w-4" />} label="Waste Included" value={`${wastePercentage || '0'}%`} />
                  </div>

                  <div className="border-t border-border px-5 py-4">
                    <div className="mb-2 text-sm font-medium text-foreground">Mortar Volume</div>
                    <ul className="space-y-1.5 text-sm text-muted-foreground">
                      <li className="flex justify-between">
                        <span>• Cubic Feet</span>
                        <span className="font-medium text-foreground">{result.mortarVolumeCubicFeet.toLocaleString()} ft³</span>
                      </li>
                      <li className="flex justify-between">
                        <span>• Cubic Meters</span>
                        <span className="font-medium text-foreground">{result.mortarVolumeCubicMeters.toLocaleString()} m³</span>
                      </li>
                    </ul>
                  </div>

                  <div className="border-t border-border px-5 py-4">
                    <div className="mb-2 text-sm font-medium text-foreground">Required Materials</div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="rounded-lg bg-primary/5 p-3">
                        <div className="text-xs text-muted-foreground">Cement</div>
                        <div className="text-base font-bold text-primary">{result.cementKg.toLocaleString()} kg</div>
                        <div className="text-xs text-muted-foreground">({result.cementBags} bags)</div>
                      </div>
                      <div className="rounded-lg bg-primary/5 p-3">
                        <div className="text-xs text-muted-foreground">Sand</div>
                        <div className="text-base font-bold text-primary">{result.sandKg.toLocaleString()} kg</div>
                      </div>
                      <div className="rounded-lg bg-primary/5 p-3">
                        <div className="text-xs text-muted-foreground">Water</div>
                        <div className="text-base font-bold text-primary">{result.waterLiters.toLocaleString()} L</div>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-border p-5">
                    <button
                      onClick={exportResult}
                      className="flex w-full cursor-pointer items-center justify-center rounded-lg bg-primary px-4 py-2.5 font-semibold text-primary-foreground transition-colors duration-200 hover:bg-primary/90"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Export Results
                    </button>
                  </div>
                </div>
              ) : (
                <div className="px-5 py-12 text-center">
                  <Calculator className="mx-auto mb-3 h-12 w-12 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    Enter valid wall size, block dimensions, and pricing to see a live estimate.
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
