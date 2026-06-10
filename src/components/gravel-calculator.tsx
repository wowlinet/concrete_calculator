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

    return newErrors;
  };

  /**
   * 主计算函数
   */
  const buildCalculationResult = (): CalculationResult => {
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

    return {
      volume: Math.round(volume * 1000) / 1000,
      volumeYards: Math.round(volumeYards * 100) / 100,
      volumeFeet: Math.round(volumeFeet * 100) / 100,
      gravelWeight: Math.round(gravelWeight * 1000) / 1000,
      gravelWeightKg: Math.round(gravelWeightKg * 10) / 10,
      totalCost: Math.round(totalCost * 100) / 100,
      area: Math.round(area * 100) / 100,
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
  }, [params]);

  /**
   * 更新参数
   */
  const updateParam = (key: keyof ProjectParams, value: string) => {
    setParams((prev) => ({ ...prev, [key]: value }));
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
    setParams((prev) => ({ ...prev, wasteFactor: factor }));
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

  const isMetricSystem = () => getUnitInfo(params.lengthUnit).isMetric;

  const metricHint = (value: string, unit?: UnitType): string | null => {
    if (!unit) return null;
    const info = getUnitInfo(unit);
    if (info.isMetric) return null;
    const numericValue = parseFloat(value);
    if (isNaN(numericValue) || numericValue <= 0) return null;
    return `= ${(numericValue * info.toMeters).toFixed(3)} m`;
  };

  const renderField = (
    label: string,
    valueKey: keyof ProjectParams,
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
    } = {}
  ) => {
    const value = (params[valueKey] as string) ?? '';
    const unit = opts.unitKey ? (params[opts.unitKey] as UnitType) : undefined;
    const hint = unit ? metricHint(value, unit) : null;
    const error = opts.errorKey ? errors[opts.errorKey] : undefined;
    const unitItems = opts.allowMillimeters
      ? unitOptions
      : unitOptions.filter((option) => option.value !== 'millimeters');

    return (
      <div>
        <label className="mb-2 block text-sm font-medium text-muted-foreground">{label}</label>
        <div className="flex items-center gap-3">
          <div
            className={`flex min-w-0 flex-1 items-stretch overflow-hidden rounded-lg border bg-background transition-shadow focus-within:border-transparent focus-within:ring-2 focus-within:ring-primary ${
              error ? 'border-destructive' : 'border-border'
            }`}
          >
            <input
              type="number"
              value={value}
              onChange={(e) => updateParam(valueKey, e.target.value)}
              placeholder={opts.placeholder}
              step={opts.step ?? '0.01'}
              min={opts.min ?? '0'}
              max={opts.max}
              className="min-w-0 flex-1 bg-transparent px-3 py-2.5 text-sm text-foreground outline-none"
            />
            {opts.unitKey ? (
              <div className="relative flex w-20 shrink-0 items-center border-l border-border">
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
          {opts.unitKey ? (
            <span className="w-24 shrink-0 whitespace-nowrap text-sm text-muted-foreground">{hint ?? ''}</span>
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

  const useMetric = isMetricSystem();
  const primaryVolume = result ? (useMetric ? result.volume : result.volumeYards) : 0;
  const primaryVolumeUnit = useMetric ? 'm³' : 'yd³';
  const primaryVolumeLabel = useMetric ? 'Cubic Meters' : 'Cubic Yards';
  const pricePerTonValue = parseFloat(params.pricePerTon || '0');
  const wastePresetOptions = ['0', '5', '10', '15'] as const;
  const activeWastePreset = (() => {
    const numericValue = parseFloat(params.wasteFactor);
    if (isNaN(numericValue)) return null;

    const matchedPreset = wastePresetOptions.find((preset) => parseFloat(preset) === numericValue);
    return matchedPreset ?? null;
  })();

  return (
    <div>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="flex items-center text-2xl font-semibold text-foreground">
          <Calculator className="mr-2 h-6 w-6" />
          Gravel Calculator
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
            <h3 className="mb-4 text-lg font-medium text-card-foreground">Area Dimensions</h3>
            <div className="space-y-4">
              {renderField('Length', 'length', {
                unitKey: 'lengthUnit',
                placeholder: '10',
                errorKey: 'length',
              })}
              {renderField('Width', 'width', {
                unitKey: 'widthUnit',
                placeholder: '8',
                errorKey: 'width',
              })}
              {renderField('Depth', 'depth', {
                unitKey: 'depthUnit',
                placeholder: '4',
                errorKey: 'depth',
                allowMillimeters: true,
                helperText: 'Typical gravel depths: driveways 4-6 in, walkways 2-4 in, drainage 6-12 in.',
              })}

              <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
                <div className="flex items-start gap-2">
                  <Info className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <div className="text-sm text-muted-foreground">
                    <div className="mb-1 font-medium text-foreground">Typical Gravel Depths</div>
                    <div>Driveways: 4-6 inches (10-15 cm)</div>
                    <div>Walkways: 2-4 inches (5-10 cm)</div>
                    <div>Drainage: 6-12 inches (15-30 cm)</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-medium text-card-foreground">Gravel Specifications</h3>
            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-muted-foreground">Gravel Type</label>
                <div className="relative">
                  <select
                    value={params.gravelType}
                    onChange={(e) => handleGravelTypeChange(e.target.value)}
                    className="h-11 w-full cursor-pointer appearance-none rounded-lg border border-border bg-background px-3 pr-10 text-sm text-foreground outline-none transition-shadow focus:border-transparent focus:ring-2 focus:ring-primary"
                  >
                    {Object.entries(GRAVEL_PRESETS).map(([key, preset]) => (
                      <option key={key} value={key}>
                        {preset.label} ({preset.density} kg/m³)
                      </option>
                    ))}
                    <option value="custom">Custom Density</option>
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                </div>
              </div>

              {params.gravelType === 'custom' && (
                <div>
                  <label className="mb-2 block text-sm font-medium text-muted-foreground">Custom Density (kg/m³)</label>
                  <div
                    className={`overflow-hidden rounded-lg border bg-background transition-shadow focus-within:border-transparent focus-within:ring-2 focus-within:ring-primary ${
                      errors.customDensity ? 'border-destructive' : 'border-border'
                    }`}
                  >
                    <input
                      type="number"
                      value={params.customDensity}
                      onChange={(e) => updateParam('customDensity', e.target.value)}
                      placeholder="1680"
                      step="1"
                      min="0"
                      className="w-full bg-transparent px-3 py-2.5 text-sm text-foreground outline-none"
                    />
                  </div>
                  {errors.customDensity ? <p className="mt-1 text-sm text-destructive">{errors.customDensity}</p> : null}
                  {!errors.customDensity ? (
                    <p className="mt-1 text-xs text-muted-foreground">Typical range: 1200-2000 kg/m³.</p>
                  ) : null}
                </div>
              )}
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-medium text-card-foreground">Waste Factor &amp; Pricing</h3>
            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-muted-foreground">Waste Factor</label>
                <div className="flex flex-col gap-3 md:flex-row md:items-center">
                  <div className="w-full md:max-w-[140px]">
                    <div
                      className={`flex items-stretch overflow-hidden rounded-lg border bg-background transition-shadow focus-within:border-transparent focus-within:ring-2 focus-within:ring-primary ${
                        errors.wasteFactor ? 'border-destructive' : 'border-border'
                      }`}
                    >
                      <input
                        type="number"
                        value={params.wasteFactor}
                        onChange={(e) => updateParam('wasteFactor', e.target.value)}
                        placeholder="5"
                        step="1"
                        min="0"
                        max="100"
                        className="min-w-0 flex-1 bg-transparent px-3 py-2.5 text-sm text-foreground outline-none"
                      />
                      <span className="flex w-12 shrink-0 items-center justify-center border-l border-border px-2 text-sm text-muted-foreground">
                        %
                      </span>
                    </div>
                  </div>
                  <div className="min-w-0 flex-1 md:flex md:items-center md:gap-3">
                    <div className="mb-2 text-sm font-medium text-muted-foreground md:mb-0 md:shrink-0">Quick Select</div>
                    <div className="flex flex-wrap gap-1">
                      {wastePresetOptions.map((factor) => (
                        <button
                          key={factor}
                          type="button"
                          onClick={() => setPresetWasteFactor(factor)}
                          className={`cursor-pointer rounded-lg border px-2 py-1.5 text-sm transition-colors ${
                            activeWastePreset === factor
                              ? 'border-primary bg-primary text-primary-foreground'
                              : 'border-border bg-background text-foreground hover:bg-muted'
                          }`}
                        >
                          {factor}%
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                {errors.wasteFactor ? <p className="mt-1 text-sm text-destructive">{errors.wasteFactor}</p> : null}
                {!errors.wasteFactor ? (
                  <p className="mt-1 text-xs text-muted-foreground">
                    Add extra material for spillage and compaction, typically 5% to 10%.
                  </p>
                ) : null}
              </div>

              {renderField('Price per Ton ($) Optional', 'pricePerTon', {
                placeholder: '50.00',
                errorKey: 'pricePerTon',
              })}
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-lg border border-primary/30 bg-primary/5 px-4 py-3 text-sm text-muted-foreground">
            <span className="text-primary">💡</span>
            <span>
              <span className="font-medium text-foreground">Tip:</span> Results update automatically as you change size, gravel type, waste factor, or pricing.
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
                    <div className="mb-1 text-sm text-muted-foreground">Total Volume</div>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-4xl font-bold text-primary">{primaryVolume.toLocaleString()}</span>
                      <span className="text-xl font-semibold text-primary">{primaryVolumeUnit}</span>
                    </div>
                    <div className="mt-1 text-xs text-muted-foreground">{primaryVolumeLabel}</div>
                  </div>

                  <div className="border-t border-border bg-primary/5 px-5 py-4">
                    <div className="mb-1 text-sm text-muted-foreground">Estimated Cost</div>
                    <div className="text-3xl font-bold text-primary">
                      {pricePerTonValue > 0 ? `$${result.totalCost.toLocaleString()}` : '--'}
                    </div>
                    <div className="mt-1 text-xs text-muted-foreground">
                      {pricePerTonValue > 0 ? `Based on $${params.pricePerTon} per ton` : 'Add price per ton to estimate cost'}
                    </div>
                  </div>

                  <div className="divide-y divide-border border-t border-border px-5">
                    <ResultRow icon={<Scale className="h-4 w-4" />} label="Coverage Area" value={`${result.area.toLocaleString()} m²`} />
                    <ResultRow icon={<Package className="h-4 w-4" />} label="Gravel Weight" value={`${Number(result.gravelWeight.toFixed(3))} tons`} />
                    <ResultRow icon={<Package className="h-4 w-4" />} label="Weight (kg)" value={`${result.gravelWeightKg.toLocaleString()} kg`} />
                    <ResultRow icon={<Percent className="h-4 w-4" />} label="Waste Included" value={`${params.wasteFactor || '0'}%`} />
                  </div>

                  <div className="border-t border-border px-5 py-4">
                    <div className="mb-2 text-sm font-medium text-foreground">Volume Breakdown</div>
                    <ul className="space-y-1.5 text-sm text-muted-foreground">
                      <li className="flex justify-between">
                        <span>• Cubic Meters</span>
                        <span className="font-medium text-foreground">{result.volume.toLocaleString()} m³</span>
                      </li>
                      <li className="flex justify-between">
                        <span>• Cubic Yards</span>
                        <span className="font-medium text-foreground">{result.volumeYards.toLocaleString()} yd³</span>
                      </li>
                      <li className="flex justify-between">
                        <span>• Cubic Feet</span>
                        <span className="font-medium text-foreground">{result.volumeFeet.toLocaleString()} ft³</span>
                      </li>
                    </ul>
                  </div>

                  <div className="border-t border-border px-5 py-4">
                    <div className="mb-2 text-sm font-medium text-foreground">Material Profile</div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="rounded-lg bg-primary/5 p-3">
                        <div className="text-xs text-muted-foreground">Gravel Type</div>
                        <div className="text-sm font-bold text-primary">
                          {params.gravelType === 'custom' ? 'Custom Density' : GRAVEL_PRESETS[params.gravelType]?.label}
                        </div>
                      </div>
                      <div className="rounded-lg bg-primary/5 p-3">
                        <div className="text-xs text-muted-foreground">Density</div>
                        <div className="text-sm font-bold text-primary">
                          {params.gravelType === 'custom' ? params.customDensity : GRAVEL_PRESETS[params.gravelType]?.density} kg/m³
                        </div>
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
                    Enter valid dimensions and gravel details to see a live estimate.
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
