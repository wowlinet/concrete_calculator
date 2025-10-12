'use client'

import React, { useState, useEffect } from 'react';
import { Calculator, RotateCcw, Download, Info } from 'lucide-react';

// 混合物类型
type MixType = 'concrete' | 'mortar' | 'cement-water';

// 体积单位
type VolumeUnit = 'cm3' | 'm3' | 'ft3' | 'yd3' | 'ml' | 'l' | 'us-gal' | 'uk-gal';

// 计算结果接口
interface CalculationResult {
  dryVolume: number; // 干体积 (m³)
  totalVolume: number; // 总体积含浪费 (m³)
  totalDryVolume: number; // 总干体积 (m³)
  cementVolume: number; // 水泥体积 (m³)
  cementWeight: number; // 水泥重量 (kg)
  cementBags: number; // 水泥袋数
  sandVolume?: number; // 砂子体积 (m³) - concrete/mortar
  gravelVolume?: number; // 砾石体积 (m³) - concrete only
  waterVolume?: number; // 水体积 (m³)
  waterWeight?: number; // 水重量 (kg)
}

// 混凝土混合比例
const CONCRETE_RATIOS = {
  '1:5:10': { cement: 1, sand: 5, gravel: 10, strength: '5.0 MPa or 725 psi' },
  '1:4:8': { cement: 1, sand: 4, gravel: 8, strength: '7.5 MPa or 1085 psi' },
  '1:3:6': { cement: 1, sand: 3, gravel: 6, strength: '10.0 MPa or 1450 psi' },
  '1:2:4': { cement: 1, sand: 2, gravel: 4, strength: '15.0 MPa or 2175 psi' },
  '1:1.5:3': { cement: 1, sand: 1.5, gravel: 3, strength: '20.0 MPa or 2900 psi' },
  '1:1:2': { cement: 1, sand: 1, gravel: 2, strength: '25.0 MPa or 3625 psi' },
  '1:2:3': { cement: 1, sand: 2, gravel: 3, strength: '31.0 MPa or 4500 psi' },
  '1:1:1.5': { cement: 1, sand: 1, gravel: 1.5, strength: 'Custom mix' },
};

// 砂浆混合比例
const MORTAR_RATIOS = {
  '1:6': { cement: 1, sand: 6, application: 'for interior plaster' },
  '1:5': { cement: 1, sand: 5, application: 'for brickwork mortar' },
  '1:4': { cement: 1, sand: 4, application: 'for exterior plaster' },
  '1:3': { cement: 1, sand: 3, application: 'rich mortar mix' },
};

// 项目参数接口
interface ProjectParams {
  mixType: MixType;
  wetVolume: string;
  wetVolumeUnit: VolumeUnit;
  dryToWetRatio: string; // 只输入干体积的比例部分
  waste: string; // 百分比
  concreteRatio: string; // concrete 类型的比例
  mortarRatio: string; // mortar 类型的比例
  cementDensity: string; // kg/m³
  bagSize: string; // kg
}

/**
 * 水泥计算器组件
 */
export default function CementCalculator() {
  const [params, setParams] = useState<ProjectParams>({
    mixType: 'concrete',
    wetVolume: '1',
    wetVolumeUnit: 'm3',
    dryToWetRatio: '1.54',
    waste: '10',
    concreteRatio: '1:1.5:3',
    mortarRatio: '1:4',
    cementDensity: '1440',
    bagSize: '50',
  });

  const [result, setResult] = useState<CalculationResult | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showDryVolumeInfo, setShowDryVolumeInfo] = useState(false);
  const [showTotalVolumeInfo, setShowTotalVolumeInfo] = useState(false);

  // 计算干体积
  const calculateDryVolume = (): string => {
    const wetVol = parseFloat(params.wetVolume || '0');
    const ratio = parseFloat(params.dryToWetRatio || '1');
    const dryVol = wetVol * ratio;
    return parseFloat(dryVol.toFixed(2)).toString();
  };

  // 计算总体积（含浪费）- 基于干体积
  const calculateTotalVolume = (): string => {
    const wetVol = parseFloat(params.wetVolume || '0');
    const ratio = parseFloat(params.dryToWetRatio || '1');
    const dryVol = wetVol * ratio;
    const waste = parseFloat(params.waste || '0');
    const totalVol = dryVol * (1 + waste / 100);
    return parseFloat(totalVol.toFixed(2)).toString();
  };

  // 体积单位转换到立方米
  const volumeToM3 = (value: number, unit: VolumeUnit): number => {
    const conversions: Record<VolumeUnit, number> = {
      'cm3': 0.000001,
      'm3': 1,
      'ft3': 0.0283168,
      'yd3': 0.764555,
      'ml': 0.000001,
      'l': 0.001,
      'us-gal': 0.00378541,
      'uk-gal': 0.00454609,
    };
    return value * conversions[unit];
  };

  // 获取体积单位符号
  const getVolumeUnitSymbol = (unit: VolumeUnit): string => {
    const symbols: Record<VolumeUnit, string> = {
      'cm3': 'cm³',
      'm3': 'm³',
      'ft3': 'ft³',
      'yd3': 'yd³',
      'ml': 'ml',
      'l': 'L',
      'us-gal': 'US gal',
      'uk-gal': 'UK gal',
    };
    return symbols[unit];
  };

  /**
   * 更新混合类型时自动设置默认干湿比
   */
  useEffect(() => {
    const defaultRatios: Record<MixType, string> = {
      'concrete': '1.54',
      'mortar': '1.22',
      'cement-water': '1',
    };

    setParams(prev => ({
      ...prev,
      dryToWetRatio: defaultRatios[prev.mixType],
    }));
  }, [params.mixType]);

  /**
   * 验证输入参数
   */
  const validateInputs = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!params.wetVolume || parseFloat(params.wetVolume) <= 0) {
      newErrors.wetVolume = 'Please enter a valid wet volume';
    }
    if (!params.dryToWetRatio || parseFloat(params.dryToWetRatio) <= 0) {
      newErrors.dryToWetRatio = 'Please enter a valid ratio';
    }
    if (params.waste === '' || parseFloat(params.waste) < 0 || parseFloat(params.waste) > 100) {
      newErrors.waste = 'Waste must be between 0 and 100';
    }
    if (!params.cementDensity || parseFloat(params.cementDensity) <= 0) {
      newErrors.cementDensity = 'Please enter a valid density';
    }
    if (!params.bagSize || parseFloat(params.bagSize) <= 0) {
      newErrors.bagSize = 'Please enter a valid bag size';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * 主计算函数
   */
  const calculateCement = () => {
    if (!validateInputs()) {
      return;
    }

    // 转换湿体积到立方米
    const wetVolumeM3 = volumeToM3(parseFloat(params.wetVolume), params.wetVolumeUnit);
    const dryToWetRatio = parseFloat(params.dryToWetRatio);
    const wastePercent = parseFloat(params.waste);

    // 计算干体积
    const dryVolume = wetVolumeM3 * dryToWetRatio;

    // 计算总体积（含浪费）
    const totalVolume = wetVolumeM3 * (1 + wastePercent / 100);

    // 计算总干体积
    const totalDryVolume = totalVolume * dryToWetRatio;

    let cementVolume = 0;
    let sandVolume: number | undefined = undefined;
    let gravelVolume: number | undefined = undefined;
    let waterVolume: number | undefined = undefined;
    let waterWeight: number | undefined = undefined;

    // 根据混合类型和比例计算各组分
    if (params.mixType === 'concrete') {
      const ratio = CONCRETE_RATIOS[params.concreteRatio as keyof typeof CONCRETE_RATIOS];
      const totalParts = ratio.cement + ratio.sand + ratio.gravel;
      cementVolume = totalDryVolume * (ratio.cement / totalParts);
      sandVolume = totalDryVolume * (ratio.sand / totalParts);
      gravelVolume = totalDryVolume * (ratio.gravel / totalParts);
    } else if (params.mixType === 'mortar') {
      const ratio = MORTAR_RATIOS[params.mortarRatio as keyof typeof MORTAR_RATIOS];
      const totalParts = ratio.cement + ratio.sand;
      cementVolume = totalDryVolume * (ratio.cement / totalParts);
      sandVolume = totalDryVolume * (ratio.sand / totalParts);
    } else {
      // cement and water only
      cementVolume = totalDryVolume;
    }

    // 计算水泥重量和袋数
    const cementDensity = parseFloat(params.cementDensity);
    const cementWeight = cementVolume * cementDensity;
    const bagSize = parseFloat(params.bagSize);
    const cementBags = Math.ceil(cementWeight / bagSize);

    // 计算水的重量和体积（基于水灰比 0.4）
    waterWeight = cementWeight * 0.4; // Water-Cement ratio = 0.4
    waterVolume = waterWeight / 1000; // 水的密度 1000 kg/m³

    const calculatedResult: CalculationResult = {
      dryVolume: parseFloat(dryVolume.toFixed(2)),
      totalVolume: parseFloat(totalVolume.toFixed(2)),
      totalDryVolume: parseFloat(totalDryVolume.toFixed(2)),
      cementVolume: parseFloat(cementVolume.toFixed(2)),
      cementWeight: parseFloat(cementWeight.toFixed(2)),
      cementBags: cementBags,
      sandVolume: sandVolume !== undefined ? parseFloat(sandVolume.toFixed(2)) : undefined,
      gravelVolume: gravelVolume !== undefined ? parseFloat(gravelVolume.toFixed(2)) : undefined,
      waterVolume: waterVolume !== undefined ? parseFloat(waterVolume.toFixed(2)) : undefined,
      waterWeight: waterWeight !== undefined ? parseFloat(waterWeight.toFixed(2)) : undefined,
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
      mixType: 'concrete',
      wetVolume: '1',
      wetVolumeUnit: 'm3',
      dryToWetRatio: '1.54',
      waste: '10',
      concreteRatio: '1:1.5:3',
      mortarRatio: '1:4',
      cementDensity: '1440',
      bagSize: '50',
    });
    setResult(null);
    setErrors({});
  };

  /**
   * 导出结果
   */
  const exportResult = () => {
    if (!result) return;

    let ratioInfo = '';
    if (params.mixType === 'concrete') {
      const ratio = CONCRETE_RATIOS[params.concreteRatio as keyof typeof CONCRETE_RATIOS];
      ratioInfo = `Concrete Mix Ratio: ${params.concreteRatio} (${ratio.strength})\n`;
    } else if (params.mixType === 'mortar') {
      const ratio = MORTAR_RATIOS[params.mortarRatio as keyof typeof MORTAR_RATIOS];
      ratioInfo = `Mortar Mix Ratio: ${params.mortarRatio} (${ratio.application})\n`;
    }

    const data = `Cement Calculator Results\n\n` +
      `Mix Type: ${params.mixType}\n` +
      `Wet Volume: ${params.wetVolume} ${getVolumeUnitSymbol(params.wetVolumeUnit)}\n` +
      `Dry to Wet Ratio: ${params.dryToWetRatio}:1\n` +
      `Waste: ${params.waste}%\n` +
      ratioInfo +
      `\nVolumes:\n` +
      `  Dry Volume: ${result.dryVolume} m³\n` +
      `  Total Dry Volume: ${result.totalDryVolume} m³\n\n` +
      `Cement:\n` +
      `  Volume: ${result.cementVolume} m³\n` +
      `  Weight: ${result.cementWeight} kg\n` +
      `  Bags Needed: ${result.cementBags} bags (${params.bagSize} kg each)\n\n` +
      `Other Materials:\n` +
      (result.sandVolume !== undefined ? `  Sand Volume: ${result.sandVolume} m³\n` : '') +
      (result.gravelVolume !== undefined ? `  Gravel Volume: ${result.gravelVolume} m³\n` : '') +
      (result.waterWeight !== undefined ? `  Water Weight: ${result.waterWeight} kg\n` : '') +
      (result.waterVolume !== undefined ? `  Water Volume: ${result.waterVolume} m³\n` : '');

    const blob = new Blob([data], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'cement-calculator-results.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // 自动计算
  useEffect(() => {
    if (result) {
      calculateCement();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  return (
    <div className="bg-card rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-semibold text-card-foreground mb-6 flex items-center">
        <Calculator className="mr-2 h-6 w-6" />
        Cement Calculator
      </h2>

      {/* Mix Type Selection */}
      <div className="mb-6">
        <h3 className="text-lg font-medium text-card-foreground mb-3">
          Mix Type
        </h3>
        <select
          value={params.mixType}
          onChange={(e) => updateParam('mixType', e.target.value)}
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground border-border"
        >
          <option value="concrete">Concrete</option>
          <option value="mortar">Mortar</option>
          <option value="cement-water">Cement and Water Only</option>
        </select>
      </div>

      {/* Volume Inputs */}
      <div className="mb-6">
        <h3 className="text-lg font-medium text-card-foreground mb-3">
          Volume Parameters
        </h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              Wet Volume
            </label>
            <div className="flex gap-1">
              <input
                type="number"
                value={params.wetVolume}
                onChange={(e) => updateParam('wetVolume', e.target.value)}
                className={`flex-1 px-2 py-1.5 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground ${
                  errors.wetVolume ? 'border-destructive' : 'border-border'
                }`}
                placeholder="1"
                step="0.01"
                min="0"
              />
              <select
                value={params.wetVolumeUnit}
                onChange={(e) => updateParam('wetVolumeUnit', e.target.value)}
                className="flex-1 px-2 py-1.5 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground border-border w-32"
              >
                <option value="m3">m³</option>
                <option value="cm3">cm³</option>
                <option value="ft3">ft³</option>
                <option value="yd3">yd³</option>
                <option value="ml">ml</option>
                <option value="l">L</option>
                <option value="us-gal">US gal</option>
                <option value="uk-gal">UK gal</option>
              </select>
            </div>
            {errors.wetVolume && <p className="text-destructive text-sm mt-1">{errors.wetVolume}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              Dry to Wet Volume Ratio (Dry : 1)
            </label>
            <input
              type="number"
              value={params.dryToWetRatio}
              onChange={(e) => updateParam('dryToWetRatio', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground ${
                errors.dryToWetRatio ? 'border-destructive' : 'border-border'
              }`}
              placeholder="1.54"
              step="0.01"
              min="0"
            />
            {errors.dryToWetRatio && <p className="text-destructive text-sm mt-1">{errors.dryToWetRatio}</p>}
            <div className="mt-2 p-3 rounded-lg border border-border">
              <div className="flex items-start space-x-2">
                <Info className="h-4 w-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-blue-600 dark:text-blue-400">
                  <div className="font-medium mb-1">Default Ratios:</div>
                  <div>• Concrete: 1.54:1</div>
                  <div>• Mortar: 1.22:1</div>
                  <div>• Cement & Water: 1:1</div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-2">
              <label className="text-sm font-medium text-muted-foreground">
                Dry Volume
              </label>
              <button
                type="button"
                onClick={() => setShowDryVolumeInfo(!showDryVolumeInfo)}
                className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                aria-label="Toggle dry volume information"
              >
                <Info className="h-4 w-4" />
              </button>
            </div>
            <div className="flex gap-1">
              <input
                type="text"
                value={calculateDryVolume()}
                readOnly
                className="flex-1 px-2 py-1.5 border rounded-lg bg-muted text-foreground border-border cursor-not-allowed"
              />
              <select
                value={params.wetVolumeUnit}
                disabled
                className="flex-1 px-2 py-1.5 border rounded-lg bg-muted text-foreground border-border w-32 cursor-not-allowed"
              >
                <option value="m3">m³</option>
                <option value="cm3">cm³</option>
                <option value="ft3">ft³</option>
                <option value="yd3">yd³</option>
                <option value="ml">ml</option>
                <option value="l">L</option>
                <option value="us-gal">US gal</option>
                <option value="uk-gal">UK gal</option>
              </select>
            </div>
            {showDryVolumeInfo && (
              <div className="mt-2 p-3 rounded-lg border border-blue-500">
                <p className="text-sm text-blue-800 dark:text-blue-400">
                  This is the volume of your dry mix before adding water. Water makes the fine particles glide into the void spaces of the mix, making the wet volume smaller than dry volume. We&apos;ve set this as 1.54 times the wet volume for concrete, 1.22 times the wet volume for mortar, and 1 times the wet volume for cement only mixes. You can change these values by custom the Dry volume to wet volume ratio.
                </p>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              Waste (%)
            </label>
            <input
              type="number"
              value={params.waste}
              onChange={(e) => updateParam('waste', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground ${
                errors.waste ? 'border-destructive' : 'border-border'
              }`}
              placeholder="10"
              step="1"
              min="0"
              max="100"
            />
            {errors.waste && <p className="text-destructive text-sm mt-1">{errors.waste}</p>}
          </div>

          <div>
            <div className="flex items-center gap-2 mb-2">
              <label className="text-sm font-medium text-muted-foreground">
                Total Volume
              </label>
              <button
                type="button"
                onClick={() => setShowTotalVolumeInfo(!showTotalVolumeInfo)}
                className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                aria-label="Toggle total volume information"
              >
                <Info className="h-4 w-4" />
              </button>
            </div>
            <div className="flex gap-1">
              <input
                type="text"
                value={calculateTotalVolume()}
                readOnly
                className="flex-1 px-2 py-1.5 border rounded-lg bg-muted text-foreground border-border cursor-not-allowed"
              />
              <select
                value={params.wetVolumeUnit}
                disabled
                className="flex-1 px-2 py-1.5 border rounded-lg bg-muted text-foreground border-border w-32 cursor-not-allowed"
              >
                <option value="m3">m³</option>
                <option value="cm3">cm³</option>
                <option value="ft3">ft³</option>
                <option value="yd3">yd³</option>
                <option value="ml">ml</option>
                <option value="l">L</option>
                <option value="us-gal">US gal</option>
                <option value="uk-gal">UK gal</option>
              </select>
            </div>
            {showTotalVolumeInfo && (
              <div className="mt-2 p-3 rounded-lg border border-blue-500">
                <p className="text-sm text-blue-800 dark:text-blue-400">
                  Total Dry volume needed including waste.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mix Ratio Selection */}
      {params.mixType === 'concrete' && (
        <div className="mb-6">
          <h3 className="text-lg font-medium text-card-foreground mb-3">
            Concrete Mix Ratio
          </h3>
          <select
            value={params.concreteRatio}
            onChange={(e) => updateParam('concreteRatio', e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground border-border"
          >
            {Object.entries(CONCRETE_RATIOS).map(([key, value]) => (
              <option key={key} value={key}>
                {key} ({value.strength})
              </option>
            ))}
          </select>
          <p className="text-xs text-muted-foreground mt-1">
            Ratio of cement to sand to gravel with estimated compressive strength
          </p>
        </div>
      )}

      {params.mixType === 'mortar' && (
        <div className="mb-6">
          <h3 className="text-lg font-medium text-card-foreground mb-3">
            Mortar Mix Ratio
          </h3>
          <select
            value={params.mortarRatio}
            onChange={(e) => updateParam('mortarRatio', e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground border-border"
          >
            {Object.entries(MORTAR_RATIOS).map(([key, value]) => (
              <option key={key} value={key}>
                {key} ({value.application})
              </option>
            ))}
          </select>
          <p className="text-xs text-muted-foreground mt-1">
            Ratio of cement to sand with typical application
          </p>
        </div>
      )}

      {/* Cement Properties */}
      <div className="mb-6">
        <h3 className="text-lg font-medium text-card-foreground mb-3">
          Cement Properties
        </h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              Cement Density (kg/m³)
            </label>
            <input
              type="number"
              value={params.cementDensity}
              onChange={(e) => updateParam('cementDensity', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground ${
                errors.cementDensity ? 'border-destructive' : 'border-border'
              }`}
              placeholder="1440"
              step="1"
              min="0"
            />
            {errors.cementDensity && <p className="text-destructive text-sm mt-1">{errors.cementDensity}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              Bag Size (kg)
            </label>
            <input
              type="number"
              value={params.bagSize}
              onChange={(e) => updateParam('bagSize', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground ${
                errors.bagSize ? 'border-destructive' : 'border-border'
              }`}
              placeholder="50"
              step="1"
              min="0"
            />
            {errors.bagSize && <p className="text-destructive text-sm mt-1">{errors.bagSize}</p>}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 mb-6">
        <button
          onClick={calculateCement}
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
          <div className="bg-primary/10 p-4 rounded-lg border border-border">
            <div className="text-sm text-primary font-medium mb-3">Volumes</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <div className="text-xs text-muted-foreground">Dry Volume</div>
                <div className="text-lg font-bold text-primary">
                  {result.dryVolume} m³
                </div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Total Dry Volume</div>
                <div className="text-lg font-bold text-primary">
                  {result.totalDryVolume} m³
                </div>
              </div>
            </div>
          </div>

          {/* Cement Summary */}
          <div className="bg-primary/10 p-4 rounded-lg border border-border">
            <div className="text-sm text-primary font-medium mb-3">Cement Required</div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <div className="text-xs text-muted-foreground">Volume</div>
                <div className="text-lg font-bold text-primary">
                  {result.cementVolume} m³
                </div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Weight</div>
                <div className="text-lg font-bold text-primary">
                  {result.cementWeight} kg
                </div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Bags Needed</div>
                <div className="text-lg font-bold text-primary">
                  {result.cementBags} bags
                </div>
                <div className="text-xs text-muted-foreground">
                  ({params.bagSize} kg each)
                </div>
              </div>
            </div>
          </div>

          {/* Other Materials */}
          {(result.sandVolume !== undefined || result.gravelVolume !== undefined || result.waterVolume !== undefined) && (
            <div className="bg-primary/10 p-4 rounded-lg border border-border">
              <div className="text-sm text-primary font-medium mb-3">
                Other Materials Required
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {result.sandVolume !== undefined && (
                  <div>
                    <div className="text-xs text-muted-foreground">Sand Volume</div>
                    <div className="text-lg font-bold text-primary">
                      {result.sandVolume} m³
                    </div>
                  </div>
                )}
                {result.gravelVolume !== undefined && (
                  <div>
                    <div className="text-xs text-muted-foreground">Gravel Volume</div>
                    <div className="text-lg font-bold text-primary">
                      {result.gravelVolume} m³
                    </div>
                  </div>
                )}
                {result.waterWeight !== undefined && (
                  <div>
                    <div className="text-xs text-muted-foreground">Water Weight</div>
                    <div className="text-lg font-bold text-primary">
                      {result.waterWeight} kg
                    </div>
                  </div>
                )}
                {result.waterVolume !== undefined && (
                  <div>
                    <div className="text-xs text-muted-foreground">Water Volume</div>
                    <div className="text-lg font-bold text-primary">
                      {result.waterVolume} m³
                    </div>
                  </div>
                )}
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
            Select mix type and enter parameters, then click Calculate
          </p>
        </div>
      )}
    </div>
  );
}
