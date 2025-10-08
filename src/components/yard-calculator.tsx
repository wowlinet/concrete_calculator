'use client'

import React, { useState, useCallback } from 'react';
import { Calculator, RotateCcw, Download } from 'lucide-react';

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

/**
 * 混凝土计算器组件
 * 提供完整的混凝土体积、材料用量和成本计算功能
 */
export default function ConcreteCalculator() {
  const [projectType, setProjectType] = useState<ProjectType>('slabs');
  const [unit, setUnit] = useState<UnitType>('feet');
  const [params, setParams] = useState<ProjectParams>({
    // Slabs, Square Footings, or Walls defaults
    length: '5',
    lengthUnit: 'yards',
    width: '2.5',
    widthUnit: 'yards',
    height: '5',
    heightUnit: 'inches',
    quantity: '1',

    // Hole, Column, or Round Footings defaults
    diameter: '2.5',
    diameterUnit: 'yards',
    depth: '6',
    depthUnit: 'yards',

    // Circular Slab or Tube defaults
    outerDiameter: '5',
    outerDiameterUnit: 'yards',
    innerDiameter: '4',
    innerDiameterUnit: 'yards',

    // Curb and Gutter Barrier defaults
    curbDepth: '4',
    curbDepthUnit: 'yards',
    gutterWidth: '10',
    gutterWidthUnit: 'yards',
    curbHeight: '4',
    curbHeightUnit: 'yards',
    flagThickness: '5',
    flagThicknessUnit: 'yards',

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
  });
  const [concreteGrade, setConcreteGrade] = useState<string>('C25');
  const [reserveVolume, setReserveVolume] = useState<string>('0'); // 预留体积百分比
  const [unitPrice, setUnitPrice] = useState<string>('160'); // 单位价格
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
  const CUBIC_METERS_TO_CUBIC_FEET = 35.3147;
  const CUBIC_METERS_TO_CUBIC_YARDS = 1.30795;
  const CUBIC_FEET_TO_CUBIC_YARDS = 0.037037;
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

  const getVolumeUnit = (unit: UnitType) => {
    const unitInfo = getUnitInfo(unit);
    if (unitInfo.isMetric) {
      return 'm³';
    } else {
      return 'yd³';
    }
  };

  const getPriceUnit = () => {
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

    const unitInfo = getUnitInfo(primaryUnit);
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
      <option value="feet">feet</option>
      <option value="inches">inches</option>
      <option value="yards">yards</option>
      <option value="meters">meters</option>
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
      case 'slabs':
      case 'curb':
        if (!params.length || parseFloat(params.length) <= 0) {
          newErrors.length = 'Please enter a valid length';
        }
        if (!params.width || parseFloat(params.width) <= 0) {
          newErrors.width = 'Please enter a valid width';
        }
        if (!params.height || parseFloat(params.height) <= 0) {
          newErrors.height = 'Please enter a valid height';
        }
        if (!params.quantity || parseInt(params.quantity) <= 0) {
          newErrors.quantity = 'Please enter a valid quantity';
        }

        // Additional validation for curb
        if (projectType === 'curb') {
          if (!params.curbDepth || parseFloat(params.curbDepth) <= 0) {
            newErrors.curbDepth = 'Please enter a valid curb depth';
          }
          if (!params.gutterWidth || parseFloat(params.gutterWidth) <= 0) {
            newErrors.gutterWidth = 'Please enter a valid gutter width';
          }
          if (!params.curbHeight || parseFloat(params.curbHeight) <= 0) {
            newErrors.curbHeight = 'Please enter a valid curb height';
          }
          if (!params.flagThickness || parseFloat(params.flagThickness) <= 0) {
            newErrors.flagThickness = 'Please enter a valid flag thickness';
          }
        }
        break;

      case 'footings':
        if (!params.diameter || parseFloat(params.diameter) <= 0) {
          newErrors.diameter = 'Please enter a valid diameter';
        }
        if (!params.depth || parseFloat(params.depth) <= 0) {
          newErrors.depth = 'Please enter a valid depth';
        }
        if (!params.quantity || parseInt(params.quantity) <= 0) {
          newErrors.quantity = 'Please enter a valid quantity';
        }
        break;

      case 'tube':
        if (!params.outerDiameter || parseFloat(params.outerDiameter) <= 0) {
          newErrors.outerDiameter = 'Please enter a valid outer diameter';
        }
        if (!params.innerDiameter || parseFloat(params.innerDiameter) <= 0) {
          newErrors.innerDiameter = 'Please enter a valid inner diameter';
        }
        if (params.outerDiameter && params.innerDiameter && parseFloat(params.innerDiameter) >= parseFloat(params.outerDiameter)) {
          newErrors.innerDiameter = 'Inner diameter must be less than outer diameter';
        }
        if (!params.height || parseFloat(params.height) <= 0) {
          newErrors.height = 'Please enter a valid height';
        }
        if (!params.quantity || parseInt(params.quantity) <= 0) {
          newErrors.quantity = 'Please enter a valid quantity';
        }
        break;

      case 'stairs':
        if (!params.run || parseFloat(params.run) <= 0) {
          newErrors.run = 'Please enter a valid run';
        }
        if (!params.rise || parseFloat(params.rise) <= 0) {
          newErrors.rise = 'Please enter a valid rise';
        }
        if (!params.stairWidth || parseFloat(params.stairWidth) <= 0) {
          newErrors.stairWidth = 'Please enter a valid width';
        }
        if (!params.platformDepth || parseFloat(params.platformDepth) <= 0) {
          newErrors.platformDepth = 'Please enter a valid platform depth';
        }
        if (!params.numberOfSteps || parseInt(params.numberOfSteps) <= 0) {
          newErrors.numberOfSteps = 'Please enter a valid number of steps';
        }
        break;
    }

    if (reserveVolume && (parseFloat(reserveVolume) < 0 || parseFloat(reserveVolume) > 100)) {
      newErrors.reserveVolume = 'Reserve volume must be between 0 and 100';
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

    const unitInfo = getUnitInfo(primaryUnit);
    return unitInfo.isMetric;
  };

  /**
   * 主计算函数
   * 计算混凝土体积、材料用量和成本
   */
  const calculateConcrete = () => {
    if (!validateInputs()) {
      return;
    }

    const baseVolumeInMeters = calculateVolume();
    const ratio = concreteRatios[concreteGrade];
    const price = parseFloat(unitPrice);
    const reservePercent = parseFloat(reserveVolume || '0');

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

    const calculatedResult: CalculationResult = {
      volumeCubicFeet: Math.round(volumeInCubicFeet * 100) / 100,
      volumeCubicYards: Math.round(volumeInCubicYards * 100) / 100,
      volumeCubicMeters: Math.round(volumeInMeters * 100) / 100,
      weightLbs: Math.round(weightInLbs * 100) / 100,
      weightKg: Math.round(weightInKg * 100) / 100,
      bags60lb: bags60lb,
      bags80lb: bags80lb,
      cement: Math.round(volumeInMeters * ratio.cement * 100) / 100,
      cementBags: Math.ceil(volumeInMeters * ratio.cement / CEMENT_BAG_WEIGHT),
      sand: Math.round(volumeInMeters * ratio.sand * 100) / 100,
      gravel: Math.round(volumeInMeters * ratio.gravel * 100) / 100,
      water: Math.round(volumeInMeters * ratio.water * 100) / 100,
      totalCost: totalCost
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
    });
    setConcreteGrade('C25');
    setReserveVolume('0');
    setUnitPrice('160');
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

    const data = `Concrete Calculator Results\n\n` +
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
        Concrete Yard Calculator
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
            {projectType === 'slabs' ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">
                    Length (L)
                  </label>
                  <div className="flex gap-1">
                    <input
                      type="number"
                      value={params.length}
                      onChange={(e) => updateParam('length', e.target.value)}
                      className={`flex-1 px-2 py-1.5 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground ${
                        errors.length ? 'border-destructive' : 'border-border'
                      }`}
                      placeholder="5"
                      step="0.01"
                      min="0"
                    />
                    {createUnitSelector(params.lengthUnit, (unit) => updateParam('lengthUnit', unit), "w-24")}
                  </div>
                  {errors.length && <p className="text-destructive text-sm mt-1">{errors.length}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">
                    Width (W)
                  </label>
                  <div className="flex gap-1">
                    <input
                      type="number"
                      value={params.width}
                      onChange={(e) => updateParam('width', e.target.value)}
                      className={`flex-1 px-2 py-1.5 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground ${
                        errors.width ? 'border-destructive' : 'border-border'
                      }`}
                      placeholder="2.5"
                      step="0.01"
                      min="0"
                    />
                    {createUnitSelector(params.widthUnit, (unit) => updateParam('widthUnit', unit), "w-24")}
                  </div>
                  {errors.width && <p className="text-destructive text-sm mt-1">{errors.width}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">
                    Thickness or Height (H)
                  </label>
                  <div className="flex gap-1">
                    <input
                      type="number"
                      value={params.height}
                      onChange={(e) => updateParam('height', e.target.value)}
                      className={`flex-1 px-2 py-1.5 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground ${
                        errors.height ? 'border-destructive' : 'border-border'
                      }`}
                      placeholder="5"
                      step="0.01"
                      min="0"
                    />
                    {createUnitSelector(params.heightUnit, (unit) => updateParam('heightUnit', unit), "w-24")}
                  </div>
                  {errors.height && <p className="text-destructive text-sm mt-1">{errors.height}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">
                    Quantity
                  </label>
                  <input
                    type="number"
                    value={params.quantity}
                    onChange={(e) => updateParam('quantity', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground ${
                      errors.quantity ? 'border-destructive' : 'border-border'
                    }`}
                    placeholder="1"
                    min="1"
                  />
                  {errors.quantity && <p className="text-destructive text-sm mt-1">{errors.quantity}</p>}
                </div>
              </div>
            ) : projectType === 'footings' ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">
                    Diameter (D)
                  </label>
                  <div className="flex gap-1">
                    <input
                      type="number"
                      value={params.diameter}
                      onChange={(e) => updateParam('diameter', e.target.value)}
                      className={`flex-1 px-2 py-1.5 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground ${
                        errors.diameter ? 'border-destructive' : 'border-border'
                      }`}
                      placeholder="2.5"
                      step="0.01"
                      min="0"
                    />
                    {createUnitSelector(params.diameterUnit || 'feet', (unit) => updateParam('diameterUnit', unit), "w-24")}
                  </div>
                  {errors.diameter && <p className="text-destructive text-sm mt-1">{errors.diameter}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">
                    Depth or Height (H)
                  </label>
                  <div className="flex gap-1">
                    <input
                      type="number"
                      value={params.depth}
                      onChange={(e) => updateParam('depth', e.target.value)}
                      className={`flex-1 px-2 py-1.5 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground ${
                        errors.depth ? 'border-destructive' : 'border-border'
                      }`}
                      placeholder="6"
                      step="0.01"
                      min="0"
                    />
                    {createUnitSelector(params.depthUnit || 'feet', (unit) => updateParam('depthUnit', unit), "w-24")}
                  </div>
                  {errors.depth && <p className="text-destructive text-sm mt-1">{errors.depth}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">
                    Quantity
                  </label>
                  <input
                    type="number"
                    value={params.quantity}
                    onChange={(e) => updateParam('quantity', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground ${
                      errors.quantity ? 'border-destructive' : 'border-border'
                    }`}
                    placeholder="1"
                    min="1"
                  />
                  {errors.quantity && <p className="text-destructive text-sm mt-1">{errors.quantity}</p>}
                </div>
              </div>
            ) : projectType === 'tube' ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">
                    Outer Diameter (D1)
                  </label>
                  <div className="flex gap-1">
                    <input
                      type="number"
                      value={params.outerDiameter}
                      onChange={(e) => updateParam('outerDiameter', e.target.value)}
                      className={`flex-1 px-2 py-1.5 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground ${
                        errors.outerDiameter ? 'border-destructive' : 'border-border'
                      }`}
                      placeholder="5"
                      step="0.01"
                      min="0"
                    />
                    {createUnitSelector(params.outerDiameterUnit || 'feet', (unit) => updateParam('outerDiameterUnit', unit), "w-24")}
                  </div>
                  {errors.outerDiameter && <p className="text-destructive text-sm mt-1">{errors.outerDiameter}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">
                    Inner Diameter (D2)
                  </label>
                  <div className="flex gap-1">
                    <input
                      type="number"
                      value={params.innerDiameter}
                      onChange={(e) => updateParam('innerDiameter', e.target.value)}
                      className={`flex-1 px-2 py-1.5 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground ${
                        errors.innerDiameter ? 'border-destructive' : 'border-border'
                      }`}
                      placeholder="4"
                      step="0.01"
                      min="0"
                    />
                    {createUnitSelector(params.innerDiameterUnit || 'feet', (unit) => updateParam('innerDiameterUnit', unit), "w-24")}
                  </div>
                  {errors.innerDiameter && <p className="text-destructive text-sm mt-1">{errors.innerDiameter}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">
                    Length or Height (H)
                  </label>
                  <div className="flex gap-1">
                    <input
                      type="number"
                      value={params.height}
                      onChange={(e) => updateParam('height', e.target.value)}
                      className={`flex-1 px-2 py-1.5 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground ${
                        errors.height ? 'border-destructive' : 'border-border'
                      }`}
                      placeholder="6"
                      step="0.01"
                      min="0"
                    />
                    {createUnitSelector(params.heightUnit, (unit) => updateParam('heightUnit', unit), "w-24")}
                  </div>
                  {errors.height && <p className="text-destructive text-sm mt-1">{errors.height}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">
                    Quantity
                  </label>
                  <input
                    type="number"
                    value={params.quantity}
                    onChange={(e) => updateParam('quantity', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground ${
                      errors.quantity ? 'border-destructive' : 'border-border'
                    }`}
                    placeholder="1"
                    min="1"
                  />
                  {errors.quantity && <p className="text-destructive text-sm mt-1">{errors.quantity}</p>}
                </div>
              </div>
            ) : projectType === 'curb' ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">
                    Curb Depth
                  </label>
                  <div className="flex gap-1">
                    <input
                      type="number"
                      value={params.curbDepth}
                      onChange={(e) => updateParam('curbDepth', e.target.value)}
                      className={`flex-1 px-2 py-1.5 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground ${
                        errors.curbDepth ? 'border-destructive' : 'border-border'
                      }`}
                      placeholder="4"
                      step="0.01"
                      min="0"
                    />
                    {createUnitSelector(params.curbDepthUnit || 'inches', (unit) => updateParam('curbDepthUnit', unit), "w-24")}
                  </div>
                  {errors.curbDepth && <p className="text-destructive text-sm mt-1">{errors.curbDepth}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">
                    Gutter Width
                  </label>
                  <div className="flex gap-1">
                    <input
                      type="number"
                      value={params.gutterWidth}
                      onChange={(e) => updateParam('gutterWidth', e.target.value)}
                      className={`flex-1 px-2 py-1.5 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground ${
                        errors.gutterWidth ? 'border-destructive' : 'border-border'
                      }`}
                      placeholder="10"
                      step="0.01"
                      min="0"
                    />
                    {createUnitSelector(params.gutterWidthUnit || 'inches', (unit) => updateParam('gutterWidthUnit', unit), "w-24")}
                  </div>
                  {errors.gutterWidth && <p className="text-destructive text-sm mt-1">{errors.gutterWidth}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">
                    Curb Height
                  </label>
                  <div className="flex gap-1">
                    <input
                      type="number"
                      value={params.curbHeight}
                      onChange={(e) => updateParam('curbHeight', e.target.value)}
                      className={`flex-1 px-2 py-1.5 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground ${
                        errors.curbHeight ? 'border-destructive' : 'border-border'
                      }`}
                      placeholder="4"
                      step="0.01"
                      min="0"
                    />
                    {createUnitSelector(params.curbHeightUnit || 'inches', (unit) => updateParam('curbHeightUnit', unit), "w-24")}
                  </div>
                  {errors.curbHeight && <p className="text-destructive text-sm mt-1">{errors.curbHeight}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">
                    Flag Thickness
                  </label>
                  <div className="flex gap-1">
                    <input
                      type="number"
                      value={params.flagThickness}
                      onChange={(e) => updateParam('flagThickness', e.target.value)}
                      className={`flex-1 px-2 py-1.5 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground ${
                        errors.flagThickness ? 'border-destructive' : 'border-border'
                      }`}
                      placeholder="5"
                      step="0.01"
                      min="0"
                    />
                    {createUnitSelector(params.flagThicknessUnit || 'inches', (unit) => updateParam('flagThicknessUnit', unit), "w-24")}
                  </div>
                  {errors.flagThickness && <p className="text-destructive text-sm mt-1">{errors.flagThickness}</p>}
                </div>
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
                    Quantity
                  </label>
                  <input
                    type="number"
                    value={params.quantity}
                    onChange={(e) => updateParam('quantity', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground ${
                      errors.quantity ? 'border-destructive' : 'border-border'
                    }`}
                    placeholder="1"
                    min="1"
                  />
                  {errors.quantity && <p className="text-destructive text-sm mt-1">{errors.quantity}</p>}
                </div>
              </div>
            ) : projectType === 'stairs' ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">
                    Run
                  </label>
                  <div className="flex gap-1">
                    <input
                      type="number"
                      value={params.run}
                      onChange={(e) => updateParam('run', e.target.value)}
                      className={`flex-1 px-2 py-1.5 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground ${
                        errors.run ? 'border-destructive' : 'border-border'
                      }`}
                      placeholder="4"
                      step="0.01"
                      min="0"
                    />
                    {createUnitSelector(params.runUnit || 'inches', (unit) => updateParam('runUnit', unit), "w-24")}
                  </div>
                  {errors.run && <p className="text-destructive text-sm mt-1">{errors.run}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">
                    Rise
                  </label>
                  <div className="flex gap-1">
                    <input
                      type="number"
                      value={params.rise}
                      onChange={(e) => updateParam('rise', e.target.value)}
                      className={`flex-1 px-2 py-1.5 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground ${
                        errors.rise ? 'border-destructive' : 'border-border'
                      }`}
                      placeholder="6"
                      step="0.01"
                      min="0"
                    />
                    {createUnitSelector(params.riseUnit || 'inches', (unit) => updateParam('riseUnit', unit), "w-24")}
                  </div>
                  {errors.rise && <p className="text-destructive text-sm mt-1">{errors.rise}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">
                    Width
                  </label>
                  <div className="flex gap-1">
                    <input
                      type="number"
                      value={params.stairWidth}
                      onChange={(e) => updateParam('stairWidth', e.target.value)}
                      className={`flex-1 px-2 py-1.5 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground ${
                        errors.stairWidth ? 'border-destructive' : 'border-border'
                      }`}
                      placeholder="50"
                      step="0.01"
                      min="0"
                    />
                    {createUnitSelector(params.stairWidthUnit || 'inches', (unit) => updateParam('stairWidthUnit', unit), "w-24")}
                  </div>
                  {errors.stairWidth && <p className="text-destructive text-sm mt-1">{errors.stairWidth}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">
                    Platform Depth
                  </label>
                  <div className="flex gap-1">
                    <input
                      type="number"
                      value={params.platformDepth}
                      onChange={(e) => updateParam('platformDepth', e.target.value)}
                      className={`flex-1 px-2 py-1.5 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground ${
                        errors.platformDepth ? 'border-destructive' : 'border-border'
                      }`}
                      placeholder="5"
                      step="0.01"
                      min="0"
                    />
                    {createUnitSelector(params.platformDepthUnit || 'inches', (unit) => updateParam('platformDepthUnit', unit), "w-24")}
                  </div>
                  {errors.platformDepth && <p className="text-destructive text-sm mt-1">{errors.platformDepth}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">
                    Number of Steps
                  </label>
                  <input
                    type="number"
                    value={params.numberOfSteps}
                    onChange={(e) => updateParam('numberOfSteps', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground ${
                      errors.numberOfSteps ? 'border-destructive' : 'border-border'
                    }`}
                    placeholder="5"
                    min="1"
                  />
                  {errors.numberOfSteps && <p className="text-destructive text-sm mt-1">{errors.numberOfSteps}</p>}
                </div>
              </div>
            ) : null}
          </div>

          {/* Diagram section - right half */}
          <div className="flex-1 flex items-center justify-center">
            <div className="w-full">
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

      {/* Concrete Grade and Unit Price */}
      <div className="flex flex-col lg:flex-row gap-6 mb-6">
        {/* Options section - left half */}
        <div className="flex-1 space-y-4">
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              Reserve Volume (%)
            </label>
            <input
              type="number"
              value={reserveVolume}
              onChange={(e) => setReserveVolume(e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground ${
                errors.reserveVolume ? 'border-destructive' : 'border-border'
              }`}
              placeholder="0"
              step="1"
              min="0"
              max="100"
            />
            {errors.reserveVolume && <p className="text-destructive text-sm mt-1">{errors.reserveVolume}</p>}
            <p className="text-xs text-muted-foreground mt-1">
              Add extra volume for waste, spills, and measurement variations
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              Unit Price ({getPriceUnit()})
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
              Concrete prices vary based on strength requirements. Different PSI ratings (3000, 4000, 5000+) come with different costs to reflect material composition and performance characteristics.
            </p>
            <div className="mt-3">
              <p className="font-medium text-foreground mb-2">Pricing Factors:</p>
              <ul className="space-y-1">
                <li>• Concrete strength and mix specifications</li>
                <li>• Delivery distance and transportation fees</li>
                <li>• Minimum order quantities and service charges</li>
              </ul>
            </div>
            <p className="mt-3">
              For current pricing in your area, contact local suppliers or visit{" "}
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

      {/* Action Buttons */}
      <div className="flex gap-3 mb-6">
        <button
          onClick={calculateConcrete}
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
          
          {/* Volume Summary */}
          <div className="bg-primary/10 p-4 rounded-lg">
            <div className="text-sm text-primary font-medium mb-3">Concrete Volume</div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <div className="text-xs text-muted-foreground">Cubic Feet</div>
                <div className="text-lg font-bold text-primary">
                  {result.volumeCubicFeet} ft³
                </div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Cubic Yards</div>
                <div className="text-lg font-bold text-primary">
                  {result.volumeCubicYards} yd³
                </div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Cubic Meters</div>
                <div className="text-lg font-bold text-primary">
                  {result.volumeCubicMeters} m³
                </div>
              </div>
            </div>
          </div>

          {/* Weight Summary */}
          <div className="bg-secondary/10 p-4 rounded-lg border border-border">
            <div className="text-sm font-medium text-foreground mb-2">
              Weight Needed
            </div>
            <div className="text-xs text-muted-foreground mb-3">
              Pre-mixed concrete with density of 2,130 kg/m³ or 133 lbs/ft³
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div>
                <div className="text-xs text-muted-foreground">Weight (lbs)</div>
                <div className="text-lg font-bold text-foreground">
                  {result.weightLbs.toLocaleString()} lbs
                </div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Weight (kg)</div>
                <div className="text-lg font-bold text-foreground">
                  {result.weightKg.toLocaleString()} kg
                </div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Using 60-lb bags</div>
                <div className="text-lg font-bold text-foreground">
                  {result.bags60lb} bags
                </div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Using 80-lb bags</div>
                <div className="text-lg font-bold text-foreground">
                  {result.bags80lb} bags
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