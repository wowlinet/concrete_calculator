'use client'

import React, { useState, useEffect } from 'react';
import { Calculator, RotateCcw, Download, Share2, ChevronDown, Scale, Package, Percent } from 'lucide-react';

// 项目类型枚举
type ProjectType = 'slabs' | 'footings' | 'tube' | 'curb' | 'stairs';

// 单位类型
type UnitType = 'feet' | 'inches' | 'yards' | 'meters' | 'centimeters';

// 计算结果接口
interface CalculationResult {
  volumeCubicFeet: number; // 立方英尺
  volumeCubicYards: number; // 立方码
  volumeCubicMeters: number; // 立方米
  weightLbs: number; // 重量（磅）
  weightKg: number; // 重量（千克）
  bags60lb: number; // 60磅袋数
  bags80lb: number; // 80磅袋数
  cement: number; // 水泥重量(kg)
  cementBags: number; // 水泥袋数
  sand: number; // 砂子重量(kg)
  gravel: number; // 石子重量(kg)
  water: number; // 水重量(kg)
  totalCost: number; // 总成本
}

// 项目参数接口
interface ProjectParams {
  // Slabs, Square Footings, or Walls
  length: string;
  lengthUnit: UnitType;
  width: string;
  widthUnit: UnitType;
  height: string;
  heightUnit: UnitType;
  quantity: string;

  // Hole, Column, or Round Footings
  diameter?: string;
  diameterUnit?: UnitType;
  depth?: string;
  depthUnit?: UnitType;

  // Circular Slab or Tube
  outerDiameter?: string;
  outerDiameterUnit?: UnitType;
  innerDiameter?: string;
  innerDiameterUnit?: UnitType;

  // Curb and Gutter Barrier
  curbDepth?: string;
  curbDepthUnit?: UnitType;
  gutterWidth?: string;
  gutterWidthUnit?: UnitType;
  curbHeight?: string;
  curbHeightUnit?: UnitType;
  flagThickness?: string;
  flagThicknessUnit?: UnitType;

  // Stairs
  run?: string;
  runUnit?: UnitType;
  rise?: string;
  riseUnit?: UnitType;
  stairWidth?: string;
  stairWidthUnit?: UnitType;
  platformDepth?: string;
  platformDepthUnit?: UnitType;
  numberOfSteps?: string;
}

// 默认参数（用于初始化与重置）
const DEFAULT_PARAMS: ProjectParams = {
  // Slabs, Square Footings, or Walls defaults
  length: '5',
  lengthUnit: 'feet',
  width: '2.5',
  widthUnit: 'feet',
  height: '5',
  heightUnit: 'inches',
  quantity: '1',

  // Hole, Column, or Round Footings defaults
  diameter: '2.5',
  diameterUnit: 'feet',
  depth: '6',
  depthUnit: 'feet',

  // Circular Slab or Tube defaults
  outerDiameter: '5',
  outerDiameterUnit: 'feet',
  innerDiameter: '4',
  innerDiameterUnit: 'feet',

  // Curb and Gutter Barrier defaults
  curbDepth: '4',
  curbDepthUnit: 'inches',
  gutterWidth: '10',
  gutterWidthUnit: 'inches',
  curbHeight: '4',
  curbHeightUnit: 'inches',
  flagThickness: '5',
  flagThicknessUnit: 'inches',

  // Stairs defaults
  run: '4',
  runUnit: 'inches',
  rise: '6',
  riseUnit: 'inches',
  stairWidth: '50',
  stairWidthUnit: 'inches',
  platformDepth: '5',
  platformDepthUnit: 'inches',
  numberOfSteps: '5'
};

/**
 * 混凝土计算器组件
 * 提供完整的混凝土体积、材料用量和成本计算功能
 * 输入即时自动计算，结果展示在右侧的实时结果卡（sticky）中
 */
export default function WeightCalculator() {
  const [projectType, setProjectType] = useState<ProjectType>('slabs');
  const [params, setParams] = useState<ProjectParams>(DEFAULT_PARAMS);
  const [concreteGrade] = useState<string>('C25');
  const [reserveVolume, setReserveVolume] = useState<string>('0'); // 预留体积百分比
  const [unitPrice, setUnitPrice] = useState<string>('160'); // 单位价格
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [shared, setShared] = useState<boolean>(false); // Share 复制反馈

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
  const CUBIC_METERS_TO_CUBIC_FEET = 35.3147;
  const CUBIC_METERS_TO_CUBIC_YARDS = 1.30795;
  const CEMENT_BAG_WEIGHT = 50; // kg per bag

  // 预混凝土密度
  const CONCRETE_DENSITY_KG_PER_M3 = 2130; // kg/m³
  const CONCRETE_DENSITY_LBS_PER_FT3 = 133; // lbs/ft³

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

  // 单位选择项（在合并控件中以缩写展示）
  const unitOptions: { value: UnitType; label: string }[] = [
    { value: 'feet', label: 'ft' },
    { value: 'inches', label: 'in' },
    { value: 'yards', label: 'yd' },
    { value: 'meters', label: 'm' },
    { value: 'centimeters', label: 'cm' },
  ];

  /**
   * 判断当前使用的单位系统
   * @returns true 表示 metric，false 表示 imperial
   */
  const isMetricSystem = (): boolean => {
    // 根据主要输入字段的单位判断系统
    let primaryUnit: UnitType;

    switch (projectType) {
      case 'slabs':
      case 'curb':
        primaryUnit = params.lengthUnit;
        break;
      case 'footings':
        primaryUnit = params.diameterUnit || 'feet';
        break;
      case 'tube':
        primaryUnit = params.outerDiameterUnit || 'feet';
        break;
      case 'stairs':
        primaryUnit = params.runUnit || 'inches';
        break;
      default:
        primaryUnit = params.lengthUnit;
    }

    return getUnitInfo(primaryUnit).isMetric;
  };

  const getPriceUnit = () => (isMetricSystem() ? '$/m³' : '$/yd³');
  const priceUnitShort = isMetricSystem() ? 'm³' : 'yd³';

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
   * 计算不同项目类型的体积
   * @returns 计算得出的体积（立方米）
   */
  const calculateVolume = (): number => {
    const quantity = parseInt(params.quantity || '1');

    switch (projectType) {
      case 'slabs': {
        // 矩形体积 = 长 × 宽 × 高 × 数量
        const l = parseFloat(params.length || '0') * getUnitInfo(params.lengthUnit).toMeters;
        const w = parseFloat(params.width || '0') * getUnitInfo(params.widthUnit).toMeters;
        const h = parseFloat(params.height || '0') * getUnitInfo(params.heightUnit).toMeters;
        return l * w * h * quantity;
      }

      case 'footings': {
        // 圆柱体积 = π × r² × h × 数量
        const d = parseFloat(params.diameter || '0') * getUnitInfo(params.diameterUnit || 'feet').toMeters;
        const h = parseFloat(params.depth || '0') * getUnitInfo(params.depthUnit || 'feet').toMeters;
        return Math.PI * Math.pow(d / 2, 2) * h * quantity;
      }

      case 'tube': {
        // 空心圆柱体积 = π × (r1² - r2²) × h × 数量
        const d1 = parseFloat(params.outerDiameter || '0') * getUnitInfo(params.outerDiameterUnit || 'feet').toMeters;
        const d2 = parseFloat(params.innerDiameter || '0') * getUnitInfo(params.innerDiameterUnit || 'feet').toMeters;
        const h = parseFloat(params.height || '0') * getUnitInfo(params.heightUnit).toMeters;
        return Math.PI * (Math.pow(d1 / 2, 2) - Math.pow(d2 / 2, 2)) * h * quantity;
      }

      case 'curb': {
        // 路缘石体积计算（L形横截面）
        const curbDepth = parseFloat(params.curbDepth || '0') * getUnitInfo(params.curbDepthUnit || 'inches').toMeters;
        const gutterWidth = parseFloat(params.gutterWidth || '0') * getUnitInfo(params.gutterWidthUnit || 'inches').toMeters;
        const curbHeight = parseFloat(params.curbHeight || '0') * getUnitInfo(params.curbHeightUnit || 'inches').toMeters;
        const flagThickness = parseFloat(params.flagThickness || '0') * getUnitInfo(params.flagThicknessUnit || 'inches').toMeters;
        const length = parseFloat(params.length || '0') * getUnitInfo(params.lengthUnit).toMeters;

        // L形横截面积计算：
        // 1. Curb垂直部分: curb_depth × curb_height
        // 2. Gutter水平部分: (gutter_width + curb_depth) × flag_thickness
        const curbVerticalVolume = curbDepth * curbHeight * length;
        const gutterHorizontalVolume = (gutterWidth + curbDepth) * flagThickness * length;
        return (curbVerticalVolume + gutterHorizontalVolume) * quantity;
      }

      case 'stairs': {
        // 楼梯体积计算
        const run = parseFloat(params.run || '0') * getUnitInfo(params.runUnit || 'inches').toMeters;
        const rise = parseFloat(params.rise || '0') * getUnitInfo(params.riseUnit || 'inches').toMeters;
        const width = parseFloat(params.stairWidth || '0') * getUnitInfo(params.stairWidthUnit || 'inches').toMeters;
        const platformDepth = parseFloat(params.platformDepth || '0') * getUnitInfo(params.platformDepthUnit || 'inches').toMeters;
        const numSteps = parseInt(params.numberOfSteps || '0');

        // 楼梯体积计算：累加每一级台阶的体积
        // 每一级台阶的高度是累加的（第1级高度为1×rise，第2级高度为2×rise，等等）
        // 最后一级使用 platform depth 作为深度，其他级使用 run 作为深度
        let volume = 0;
        for (let step_count = 0; step_count < numSteps; step_count++) {
          if (step_count === numSteps - 1) {
            // 最后一级（顶部平台）使用 platform depth
            volume += width * rise * (step_count + 1) * platformDepth;
          } else {
            // 其他级使用 run
            volume += width * rise * (step_count + 1) * run;
          }
        }

        return volume;
      }

      default:
        return 0;
    }
  };

  /**
   * 计算混凝土体积、材料用量和成本（纯函数，输入无效时返回 null）
   * 供实时自动计算使用
   */
  const computeResult = (): CalculationResult | null => {
    const price = parseFloat(unitPrice);
    if (!unitPrice || isNaN(price) || price <= 0) return null;

    const reservePercent = parseFloat(reserveVolume || '0');
    if (isNaN(reservePercent) || reservePercent < 0 || reservePercent > 100) return null;

    const baseVolumeInMeters = calculateVolume();
    if (!baseVolumeInMeters || isNaN(baseVolumeInMeters) || baseVolumeInMeters <= 0) return null;

    const ratio = concreteRatios[concreteGrade];

    // 应用预留体积百分比
    const volumeInMeters = baseVolumeInMeters * (1 + reservePercent / 100);

    // 单位转换
    const volumeInCubicFeet = volumeInMeters * CUBIC_METERS_TO_CUBIC_FEET;
    const volumeInCubicYards = volumeInMeters * CUBIC_METERS_TO_CUBIC_YARDS;

    // 计算重量（使用预混凝土密度）
    const weightInKg = volumeInMeters * CONCRETE_DENSITY_KG_PER_M3;
    const weightInLbs = volumeInCubicFeet * CONCRETE_DENSITY_LBS_PER_FT3;

    // 计算袋数
    const bags60lb = Math.ceil(weightInLbs / 60);
    const bags80lb = Math.ceil(weightInLbs / 80);

    // 计算总成本 - 根据单位系统使用相应的体积
    const useMetric = isMetricSystem();
    const totalCost = useMetric
      ? Math.round(volumeInMeters * price * 100) / 100
      : Math.round(volumeInCubicYards * price * 100) / 100;

    return {
      volumeCubicFeet: Math.round(volumeInCubicFeet * 100) / 100,
      volumeCubicYards: Math.round(volumeInCubicYards * 100) / 100,
      volumeCubicMeters: Math.round(volumeInMeters * 100) / 100,
      weightLbs: Math.round(weightInLbs * 100) / 100,
      weightKg: Math.round(weightInKg * 100) / 100,
      bags60lb,
      bags80lb,
      cement: Math.round(volumeInMeters * ratio.cement * 100) / 100,
      cementBags: Math.ceil(volumeInMeters * ratio.cement / CEMENT_BAG_WEIGHT),
      sand: Math.round(volumeInMeters * ratio.sand * 100) / 100,
      gravel: Math.round(volumeInMeters * ratio.gravel * 100) / 100,
      water: Math.round(volumeInMeters * ratio.water * 100) / 100,
      totalCost,
    };
  };

  // 实时自动计算：任意输入变化即重新计算
  useEffect(() => {
    setResult(computeResult());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params, projectType, concreteGrade, reserveVolume, unitPrice]);

  // 挂载时从 URL 还原分享的输入状态
  useEffect(() => {
    const data = new URLSearchParams(window.location.search).get('data');
    if (!data) return;
    try {
      const parsed = JSON.parse(decodeURIComponent(data));
      if (parsed.projectType) setProjectType(parsed.projectType as ProjectType);
      if (parsed.params) setParams({ ...DEFAULT_PARAMS, ...parsed.params });
      if (parsed.reserveVolume !== undefined) setReserveVolume(String(parsed.reserveVolume));
      if (parsed.unitPrice !== undefined) setUnitPrice(String(parsed.unitPrice));
    } catch {
      // 忽略无效的分享数据
    }
  }, []);

  /**
   * 更新参数
   */
  const updateParam = (key: keyof ProjectParams, value: string) => {
    setParams(prev => ({ ...prev, [key]: value }));
  };

  /**
   * 重置表单
   */
  const resetForm = () => {
    setParams(DEFAULT_PARAMS);
    setReserveVolume('0');
    setUnitPrice('160');
  };

  /**
   * Share：把当前输入编码进 URL 并复制到剪贴板
   */
  const handleShare = async () => {
    const payload = { projectType, params, reserveVolume, unitPrice };
    const url = `${window.location.origin}${window.location.pathname}?data=${encodeURIComponent(JSON.stringify(payload))}`;
    try {
      await navigator.clipboard.writeText(url);
      setShared(true);
      setTimeout(() => setShared(false), 2000);
    } catch {
      // 剪贴板不可用时静默失败
    }
  };

  /**
   * 导出结果（Save）
   */
  const exportResult = () => {
    if (!result) return;

    const projectTypeName = projectTypes[projectType].name;

    let dimensionsText = '';
    switch (projectType) {
      case 'slabs':
        dimensionsText = `Length: ${params.length}${getUnitInfo(params.lengthUnit).symbol}, Width: ${params.width}${getUnitInfo(params.widthUnit).symbol}, Height: ${params.height}${getUnitInfo(params.heightUnit).symbol}, Quantity: ${params.quantity}`;
        break;
      case 'footings':
        dimensionsText = `Diameter: ${params.diameter}${getUnitInfo(params.diameterUnit || 'feet').symbol}, Depth: ${params.depth}${getUnitInfo(params.depthUnit || 'feet').symbol}, Quantity: ${params.quantity}`;
        break;
      case 'tube':
        dimensionsText = `Outer Diameter: ${params.outerDiameter}${getUnitInfo(params.outerDiameterUnit || 'feet').symbol}, Inner Diameter: ${params.innerDiameter}${getUnitInfo(params.innerDiameterUnit || 'feet').symbol}, Height: ${params.height}${getUnitInfo(params.heightUnit).symbol}, Quantity: ${params.quantity}`;
        break;
      case 'curb':
        dimensionsText = `Length: ${params.length}${getUnitInfo(params.lengthUnit).symbol}, Curb Depth: ${params.curbDepth}${getUnitInfo(params.curbDepthUnit || 'inches').symbol}, Gutter Width: ${params.gutterWidth}${getUnitInfo(params.gutterWidthUnit || 'inches').symbol}, Curb Height: ${params.curbHeight}${getUnitInfo(params.curbHeightUnit || 'inches').symbol}, Flag Thickness: ${params.flagThickness}${getUnitInfo(params.flagThicknessUnit || 'inches').symbol}, Quantity: ${params.quantity}`;
        break;
      case 'stairs':
        dimensionsText = `Run: ${params.run}${getUnitInfo(params.runUnit || 'inches').symbol}, Rise: ${params.rise}${getUnitInfo(params.riseUnit || 'inches').symbol}, Width: ${params.stairWidth}${getUnitInfo(params.stairWidthUnit || 'inches').symbol}, Platform Depth: ${params.platformDepth}${getUnitInfo(params.platformDepthUnit || 'inches').symbol}, Steps: ${params.numberOfSteps}`;
        break;
    }

    const data = `Concrete Weight Calculator Results\n\n` +
      `Project Type: ${projectTypeName}\n` +
      `Dimensions: ${dimensionsText}\n` +
      `Concrete Grade: ${concreteGrade}\n` +
      `Reserve Volume: ${reserveVolume}%\n\n` +
      `Concrete Volume (including reserve):\n` +
      `  ${result.volumeCubicFeet} cubic feet (ft³)\n` +
      `  ${result.volumeCubicYards} cubic yards (yd³)\n` +
      `  ${result.volumeCubicMeters} cubic meters (m³)\n\n` +
      `Weight Needed (pre-mixed concrete with density of 2,130 kg/m³ or 133 lbs/ft³):\n` +
      `  ${result.weightLbs} lbs\n` +
      `  ${result.weightKg} kg\n` +
      `  Using 60-lb bags: ${result.bags60lb} bags\n` +
      `  Using 80-lb bags: ${result.bags80lb} bags\n\n` +
      `Required Materials:\n` +
      `Cement: ${result.cement} kg (${result.cementBags} bags)\n` +
      `Sand: ${result.sand} kg\n` +
      `Gravel: ${result.gravel} kg\n` +
      `Water: ${result.water} kg\n\n` +
      `Total Cost: $${result.totalCost}`;

    const blob = new Blob([data], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'weight-calculator-results.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // 公制等价提示（仅对英制单位显示），例如 "= 1.524 m"
  const metricHint = (value: string, unit?: UnitType): string | null => {
    if (!unit) return null;
    const info = getUnitInfo(unit);
    if (info.isMetric) return null;
    const v = parseFloat(value);
    if (isNaN(v) || v <= 0) return null;
    return `= ${(v * info.toMeters).toFixed(3)} m`;
  };

  /**
   * 合并的「数字 + 单位」输入控件： | 5 | ft ▼ |
   */
  const renderField = (
    label: string,
    valueKey: keyof ProjectParams,
    opts: { unitKey?: keyof ProjectParams; placeholder?: string; integer?: boolean; suffix?: string } = {}
  ) => {
    const value = (params[valueKey] as string) ?? '';
    const unit = opts.unitKey ? (params[opts.unitKey] as UnitType) : undefined;
    const hint = unit ? metricHint(value, unit) : null;

    return (
      <div>
        <label className="block text-sm font-medium text-muted-foreground mb-2">{label}</label>
        <div className="flex items-center gap-3">
          <div className="flex items-stretch flex-1 min-w-0 rounded-lg border border-border bg-background transition-shadow focus-within:ring-2 focus-within:ring-primary focus-within:border-transparent">
            <input
              type="number"
              value={value}
              onChange={(e) => updateParam(valueKey, e.target.value)}
              placeholder={opts.placeholder}
              step={opts.integer ? '1' : '0.01'}
              min={opts.integer ? '1' : '0'}
              className="w-full min-w-0 flex-1 bg-transparent px-3 py-2.5 text-foreground outline-none rounded-lg"
            />
            {/* Fixed-width unit/suffix addon so the input never resizes when the
                selected unit changes (e.g. ft → cm). */}
            {opts.unitKey ? (
              <div className="relative flex w-20 shrink-0 items-center border-l border-border">
                <select
                  value={unit}
                  onChange={(e) => updateParam(opts.unitKey!, e.target.value)}
                  className="h-full w-full appearance-none bg-transparent pl-3 pr-8 py-2.5 text-sm text-foreground outline-none cursor-pointer"
                  aria-label={`${label} unit`}
                >
                  {unitOptions.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-2.5 h-4 w-4 text-muted-foreground" />
              </div>
            ) : opts.suffix ? (
              <span className="flex w-20 shrink-0 items-center justify-center border-l border-border px-3 text-sm text-muted-foreground">{opts.suffix}</span>
            ) : null}
          </div>
          {/* Reserved-width hint column: kept even when empty so the input width
              stays constant whether or not a metric conversion is shown. */}
          <span className="w-24 shrink-0 text-sm text-muted-foreground whitespace-nowrap">{hint ?? ''}</span>
        </div>
      </div>
    );
  };

  // 当前项目类型的尺寸输入字段
  const renderDimensionFields = () => {
    switch (projectType) {
      case 'slabs':
        return (
          <div className="space-y-4">
            {renderField('Length (L)', 'length', { unitKey: 'lengthUnit', placeholder: '5' })}
            {renderField('Width (W)', 'width', { unitKey: 'widthUnit', placeholder: '2.5' })}
            {renderField('Thickness or Height (H)', 'height', { unitKey: 'heightUnit', placeholder: '5' })}
            {renderField('Quantity', 'quantity', { integer: true, suffix: 'pcs', placeholder: '1' })}
          </div>
        );
      case 'footings':
        return (
          <div className="space-y-4">
            {renderField('Diameter (D)', 'diameter', { unitKey: 'diameterUnit', placeholder: '2.5' })}
            {renderField('Depth or Height (H)', 'depth', { unitKey: 'depthUnit', placeholder: '6' })}
            {renderField('Quantity', 'quantity', { integer: true, suffix: 'pcs', placeholder: '1' })}
          </div>
        );
      case 'tube':
        return (
          <div className="space-y-4">
            {renderField('Outer Diameter (D1)', 'outerDiameter', { unitKey: 'outerDiameterUnit', placeholder: '5' })}
            {renderField('Inner Diameter (D2)', 'innerDiameter', { unitKey: 'innerDiameterUnit', placeholder: '4' })}
            {renderField('Length or Height (H)', 'height', { unitKey: 'heightUnit', placeholder: '6' })}
            {renderField('Quantity', 'quantity', { integer: true, suffix: 'pcs', placeholder: '1' })}
          </div>
        );
      case 'curb':
        return (
          <div className="space-y-4">
            {renderField('Curb Depth', 'curbDepth', { unitKey: 'curbDepthUnit', placeholder: '4' })}
            {renderField('Gutter Width', 'gutterWidth', { unitKey: 'gutterWidthUnit', placeholder: '10' })}
            {renderField('Curb Height', 'curbHeight', { unitKey: 'curbHeightUnit', placeholder: '4' })}
            {renderField('Flag Thickness', 'flagThickness', { unitKey: 'flagThicknessUnit', placeholder: '5' })}
            {renderField('Length', 'length', { unitKey: 'lengthUnit', placeholder: '10' })}
            {renderField('Quantity', 'quantity', { integer: true, suffix: 'pcs', placeholder: '1' })}
          </div>
        );
      case 'stairs':
        return (
          <div className="space-y-4">
            {renderField('Run', 'run', { unitKey: 'runUnit', placeholder: '4' })}
            {renderField('Rise', 'rise', { unitKey: 'riseUnit', placeholder: '6' })}
            {renderField('Width', 'stairWidth', { unitKey: 'stairWidthUnit', placeholder: '50' })}
            {renderField('Platform Depth', 'platformDepth', { unitKey: 'platformDepthUnit', placeholder: '5' })}
            {renderField('Number of Steps', 'numberOfSteps', { integer: true, placeholder: '5' })}
          </div>
        );
      default:
        return null;
    }
  };

  // 实时结果卡中的一行（图标 + 标签 + 数值）
  const ResultRow = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) => (
    <div className="flex items-center justify-between py-3">
      <div className="flex items-center gap-2.5 text-sm text-foreground">
        <span className="text-primary">{icon}</span>
        {label}
      </div>
      <span className="text-sm font-semibold text-foreground">{value}</span>
    </div>
  );

  const useMetric = isMetricSystem();
  const primaryWeight = result ? (useMetric ? result.weightKg : result.weightLbs) : 0;
  const primaryWeightUnit = useMetric ? 'kg' : 'lbs';
  const primaryWeightLabel = useMetric ? 'Total Weight in Kilograms' : 'Total Weight in Pounds';
  const secondaryWeight = result ? (useMetric ? result.weightLbs : result.weightKg) : 0;
  const secondaryWeightUnit = useMetric ? 'lbs' : 'kg';
  const primaryVolume = result ? (useMetric ? result.volumeCubicMeters : result.volumeCubicYards) : 0;
  const primaryVolumeUnit = useMetric ? 'm³' : 'yd³';
  const primaryVolumeLabel = useMetric ? 'Total Volume in Cubic Meters' : 'Total Volume in Cubic Yards';

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <h2 className="text-2xl font-semibold text-foreground flex items-center">
          <Calculator className="mr-2 h-6 w-6" />
          Concrete Weight Calculator
        </h2>
        <div className="flex items-center gap-2">
          <button
            onClick={exportResult}
            disabled={!result}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-muted-foreground rounded-lg hover:bg-muted/60 hover:text-foreground transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            title="Save results as a text file"
          >
            <Download className="h-4 w-4" />
            Save
          </button>
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-muted-foreground rounded-lg hover:bg-muted/60 hover:text-foreground transition-colors cursor-pointer"
            title="Copy a shareable link"
          >
            <Share2 className="h-4 w-4" />
            {shared ? 'Copied!' : 'Share'}
          </button>
          <button
            onClick={resetForm}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-primary border border-primary rounded-lg hover:bg-primary/10 transition-colors cursor-pointer"
          >
            <RotateCcw className="h-4 w-4" />
            Reset
          </button>
        </div>
      </div>

      {/* Two-column: form (left) + live results (right) */}
      {/* NOTE: no `items-start` here — the right cell must stretch to full row
          height so its sticky child has room to travel as the page scrolls. */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6">
        {/* Left: form */}
        <div className="space-y-6">
          {/* Project Type */}
          <div className="bg-card rounded-xl shadow-sm border border-border p-6">
            <h3 className="text-lg font-medium text-card-foreground mb-3">Project Type</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {Object.entries(projectTypes).map(([key, config]) => (
                <button
                  key={key}
                  onClick={() => setProjectType(key as ProjectType)}
                  className={`p-3 rounded-lg border-2 transition-all duration-200 flex flex-col items-center gap-2 text-center cursor-pointer ${
                    projectType === key
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-border hover:border-border/80 text-muted-foreground'
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={config.icon} alt={config.name} className="h-12 w-12 object-contain" />
                  <span className="text-xs font-medium leading-tight">{config.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Dimensions */}
          <div className="bg-card rounded-xl shadow-sm border border-border p-6">
            <h3 className="text-lg font-medium text-card-foreground mb-4">Dimensions</h3>
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="flex-1">{renderDimensionFields()}</div>
              <div className="flex-1 flex items-center justify-center">
                <div className="w-full">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={getProjectTypeImage(projectType)}
                    alt={`${projectTypes[projectType].name} diagram`}
                    className="w-full h-auto object-contain rounded-lg border border-border bg-muted/20 dark:bg-white/20 p-4"
                  />
                  <p className="text-center text-sm text-muted-foreground mt-2">
                    {projectTypes[projectType].name} Shape
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Materials & Pricing */}
          <div className="bg-card rounded-xl shadow-sm border border-border p-6">
            <h3 className="text-lg font-medium text-card-foreground mb-4">Materials &amp; Pricing</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">Reserve Volume (%)</label>
                <input
                  type="number"
                  value={reserveVolume}
                  onChange={(e) => setReserveVolume(e.target.value)}
                  className="w-full px-3 py-2.5 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground"
                  placeholder="0"
                  step="1"
                  min="0"
                  max="100"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Add extra volume for waste, spills, and measurement variations
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">Unit Price ({getPriceUnit()})</label>
                <input
                  type="number"
                  value={unitPrice}
                  onChange={(e) => setUnitPrice(e.target.value)}
                  className="w-full px-3 py-2.5 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground"
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  For current local pricing, contact suppliers or the{" "}
                  <a
                    href="https://americanconcrete.org/pricing/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    American Concrete Institute
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>

          {/* Tip */}
          <div className="flex items-center gap-2 rounded-lg border border-primary/30 bg-primary/5 px-4 py-3 text-sm text-muted-foreground">
            <span className="text-primary">💡</span>
            <span><span className="font-medium text-foreground">Tip:</span> Results update automatically as you input values.</span>
          </div>
        </div>

        {/* Right: live results card (sticky).
            Outer div is the stretched grid cell; the inner div sticks. */}
        <div>
          <div className="lg:sticky lg:top-24">
            <div className="bg-card rounded-xl shadow-sm border border-border overflow-hidden">
            {/* Card header */}
            <div className="bg-primary px-5 py-4 flex items-center justify-between">
              <h3 className="text-primary-foreground font-semibold">Estimated Results</h3>
              <span className="flex items-center gap-1.5 text-sm text-primary-foreground/90">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-primary-foreground/70 animate-ping"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-primary-foreground"></span>
                </span>
                Live
              </span>
            </div>

            {result ? (
              <div>
                {/* Total Weight */}
                <div className="px-5 py-4">
                  <div className="text-sm text-muted-foreground mb-1">Total Weight</div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-4xl font-bold text-primary">{primaryWeight.toLocaleString()}</span>
                    <span className="text-xl font-semibold text-primary">{primaryWeightUnit}</span>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">{primaryWeightLabel}</div>
                </div>

                {/* Estimated Cost */}
                <div className="px-5 py-4 border-t border-border bg-primary/5">
                  <div className="text-sm text-muted-foreground mb-1">Estimated Cost</div>
                  <div className="text-3xl font-bold text-primary">
                    ${result.totalCost.toLocaleString()}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">Based on ${unitPrice} / {priceUnitShort}</div>
                </div>

                {/* Key metrics */}
                <div className="px-5 border-t border-border divide-y divide-border">
                  <ResultRow icon={<Scale className="h-4 w-4" />} label={`Weight (${secondaryWeightUnit})`} value={`${secondaryWeight.toLocaleString()} ${secondaryWeightUnit}`} />
                  <ResultRow icon={<Package className="h-4 w-4" />} label="Concrete Bags (80lb)" value={`${result.bags80lb} Bags`} />
                  <ResultRow icon={<Package className="h-4 w-4" />} label="Concrete Bags (60lb)" value={`${result.bags60lb} Bags`} />
                  <ResultRow icon={<Percent className="h-4 w-4" />} label="Reserve Included" value={`${reserveVolume || '0'}%`} />
                </div>

                {/* Volume breakdown */}
                <div className="px-5 py-4 border-t border-border">
                  <div className="text-sm font-medium text-foreground mb-2">Volume Breakdown</div>
                  <ul className="space-y-1.5 text-sm text-muted-foreground">
                    <li className="flex justify-between"><span>• Cubic Feet</span><span className="font-medium text-foreground">{result.volumeCubicFeet.toLocaleString()} ft³</span></li>
                    <li className="flex justify-between"><span>• Cubic Yards</span><span className="font-medium text-foreground">{result.volumeCubicYards.toLocaleString()} yd³</span></li>
                    <li className="flex justify-between"><span>• Cubic Meters</span><span className="font-medium text-foreground">{result.volumeCubicMeters.toLocaleString()} m³</span></li>
                  </ul>
                </div>

                {/* Materials */}
                <div className="px-5 py-4 border-t border-border">
                  <div className="text-sm font-medium text-foreground mb-2">Required Materials</div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-lg bg-primary/5 p-3">
                      <div className="text-xs text-muted-foreground">Cement</div>
                      <div className="text-base font-bold text-primary">{result.cement.toLocaleString()} kg</div>
                      <div className="text-xs text-muted-foreground">({result.cementBags} bags)</div>
                    </div>
                    <div className="rounded-lg bg-primary/5 p-3">
                      <div className="text-xs text-muted-foreground">Sand</div>
                      <div className="text-base font-bold text-primary">{result.sand.toLocaleString()} kg</div>
                    </div>
                    <div className="rounded-lg bg-primary/5 p-3">
                      <div className="text-xs text-muted-foreground">Gravel</div>
                      <div className="text-base font-bold text-primary">{result.gravel.toLocaleString()} kg</div>
                    </div>
                    <div className="rounded-lg bg-primary/5 p-3">
                      <div className="text-xs text-muted-foreground">Water</div>
                      <div className="text-base font-bold text-primary">{result.water.toLocaleString()} kg</div>
                    </div>
                  </div>
                </div>

                {/* Export */}
                <div className="p-5 border-t border-border">
                  <button
                    onClick={exportResult}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-2.5 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center cursor-pointer"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Export Results
                  </button>
                </div>
              </div>
            ) : (
              <div className="px-5 py-12 text-center">
                <Calculator className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground text-sm">
                  Enter valid dimensions and a unit price to see your live estimate.
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
