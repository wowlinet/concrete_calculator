'use client'

import React, { useState, useCallback } from 'react';
import { Calculator, RotateCcw, Download, Square, Info, AlertCircle } from 'lucide-react';

// 单位类型
type UnitType = 'metric' | 'imperial';

// 计算结果接口
interface SlabCalculationResult {
  volume: number; // 混凝土体积 (立方米)
  volumeImperial: number; // 立方码
  area: number; // 面积
  cement: number; // 水泥重量(kg)
  cementBags: number; // 水泥袋数
  sand: number; // 砂子重量(kg)
  gravel: number; // 石子重量(kg)
  water: number; // 水重量(kg)
  totalCost: number; // 总成本
  thicknessRecommendation: string; // 厚度建议
}

// 板块参数接口
interface SlabParams {
  length: string;
  width: string;
  thickness: string;
}

/**
 * 专门的板块混凝土计算器组件
 * 针对板块计算进行优化，提供更精确的计算和建议
 */
export default function SlabCalculator() {
  const [unit, setUnit] = useState<UnitType>('metric');
  const [params, setParams] = useState<SlabParams>({
    length: '',
    width: '',
    thickness: ''
  });
  const [concreteGrade, setConcreteGrade] = useState<string>('C25');
  const [unitPrice, setUnitPrice] = useState<string>('300'); // 每立方米价格
  const [result, setResult] = useState<SlabCalculationResult | null>(null);
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

  // 单位转换常数
  const CUBIC_METERS_TO_CUBIC_YARDS = 1.30795;
  const CEMENT_BAG_WEIGHT = 50; // kg per bag
  const METERS_TO_FEET = 3.28084;
  const CM_TO_INCHES = 0.393701;

  /**
   * 获取厚度建议
   * @param area 面积 (平方米)
   * @param thickness 厚度 (米)
   * @returns 厚度建议文本
   */
  const getThicknessRecommendation = (area: number, thickness: number): string => {
    const thicknessCm = thickness * 100;
    
    if (thicknessCm < 10) {
      return "Too thin - Consider at least 10cm (4 inches) for structural integrity";
    } else if (thicknessCm >= 10 && thicknessCm <= 15) {
      return "Good for residential floors and light-duty applications";
    } else if (thicknessCm > 15 && thicknessCm <= 20) {
      return "Suitable for garages, driveways, and heavy-duty applications";
    } else if (thicknessCm > 20) {
      return "Very thick - Consider if this thickness is necessary for your application";
    }
    
    return "Standard thickness for most slab applications";
  };

  /**
   * 验证输入参数
   * @returns 是否验证通过
   */
  const validateInputs = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!params.length || parseFloat(params.length) <= 0) {
      newErrors.length = 'Please enter a valid length';
    }
    if (!params.width || parseFloat(params.width) <= 0) {
      newErrors.width = 'Please enter a valid width';
    }
    if (!params.thickness || parseFloat(params.thickness) <= 0) {
      newErrors.thickness = 'Please enter a valid thickness';
    }
    if (!unitPrice || parseFloat(unitPrice) <= 0) {
      newErrors.unitPrice = 'Please enter a valid unit price';
    }
    
    // 厚度合理性检查
    if (params.thickness && parseFloat(params.thickness) > 0) {
      const thickness = parseFloat(params.thickness);
      const thicknessInCm = unit === 'metric' ? thickness * 100 : thickness * 2.54;
      
      if (thicknessInCm < 5) {
        newErrors.thickness = 'Thickness too small - minimum 5cm (2 inches) recommended';
      } else if (thicknessInCm > 50) {
        newErrors.thickness = 'Thickness seems too large - please verify your input';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * 计算板块体积和相关参数
   * @returns 计算结果
   */
  const calculateSlabConcrete = () => {
    if (!validateInputs()) {
      return;
    }

    let length = parseFloat(params.length);
    let width = parseFloat(params.width);
    let thickness = parseFloat(params.thickness);

    // 单位转换为米
    if (unit === 'imperial') {
      length = length / METERS_TO_FEET;
      width = width / METERS_TO_FEET;
      thickness = thickness / METERS_TO_FEET;
    }

    const area = length * width;
    const volume = area * thickness;
    const ratio = concreteRatios[concreteGrade];
    const price = parseFloat(unitPrice);

    // 单位转换
    const volumeImperial = volume * CUBIC_METERS_TO_CUBIC_YARDS;

    const calculatedResult: SlabCalculationResult = {
      volume: Math.round(volume * 100) / 100,
      volumeImperial: Math.round(volumeImperial * 100) / 100,
      area: Math.round(area * 100) / 100,
      cement: Math.round(volume * ratio.cement * 100) / 100,
      cementBags: Math.ceil(volume * ratio.cement / CEMENT_BAG_WEIGHT),
      sand: Math.round(volume * ratio.sand * 100) / 100,
      gravel: Math.round(volume * ratio.gravel * 100) / 100,
      water: Math.round(volume * ratio.water * 100) / 100,
      totalCost: Math.round(volume * price * 100) / 100,
      thicknessRecommendation: getThicknessRecommendation(area, thickness)
    };

    setResult(calculatedResult);
  };

  /**
   * 更新参数
   * @param key 参数键名
   * @param value 参数值
   */
  const updateParam = (key: keyof SlabParams, value: string) => {
    setParams(prev => ({ ...prev, [key]: value }));
    // 清除对应的错误信息
    if (errors[key]) {
      setErrors(prev => ({ ...prev, [key]: '' }));
    }
  };

  /**
   * 重置所有参数
   */
  const resetCalculator = () => {
    setParams({ length: '', width: '', thickness: '' });
    setUnitPrice('300');
    setConcreteGrade('C25');
    setResult(null);
    setErrors({});
  };

  /**
   * 导出计算结果
   */
  const exportResults = () => {
    if (!result) return;
    
    const exportData = {
      slabDimensions: {
        length: `${params.length} ${unit === 'metric' ? 'm' : 'ft'}`,
        width: `${params.width} ${unit === 'metric' ? 'm' : 'ft'}`,
        thickness: `${params.thickness} ${unit === 'metric' ? 'm' : 'ft'}`,
        area: `${result.area} m²`
      },
      concreteVolume: {
        metric: `${result.volume} m³`,
        imperial: `${result.volumeImperial} yd³`
      },
      materials: {
        cement: `${result.cement} kg (${result.cementBags} bags)`,
        sand: `${result.sand} kg`,
        gravel: `${result.gravel} kg`,
        water: `${result.water} kg`
      },
      cost: `$${result.totalCost}`,
      recommendation: result.thicknessRecommendation,
      concreteGrade: concreteGrade
    };

    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'slab-concrete-calculation.json';
    link.click();
  };

  return (
    <div className="bg-card rounded-2xl shadow-xl p-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg">
            <Square className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-card-foreground">Slab Calculator</h2>
            <p className="text-muted-foreground">Calculate concrete for rectangular slabs</p>
          </div>
        </div>
        <button
          onClick={resetCalculator}
          className="flex items-center space-x-2 px-4 py-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <RotateCcw className="h-4 w-4" />
          <span>Reset</span>
        </button>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-6">
          {/* Unit Selection */}
          <div>
            <label className="block text-sm font-medium text-card-foreground mb-3">
              Measurement Units
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setUnit('metric')}
                className={`p-3 rounded-lg border-2 transition-all ${
                  unit === 'metric'
                    ? 'border-primary bg-primary/5 text-primary'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <div className="text-sm font-medium">Metric</div>
                <div className="text-xs text-muted-foreground">meters (m)</div>
              </button>
              <button
                onClick={() => setUnit('imperial')}
                className={`p-3 rounded-lg border-2 transition-all ${
                  unit === 'imperial'
                    ? 'border-primary bg-primary/5 text-primary'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <div className="text-sm font-medium">Imperial</div>
                <div className="text-xs text-muted-foreground">feet (ft)</div>
              </button>
            </div>
          </div>

          {/* Slab Dimensions */}
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-card-foreground mb-2">
                Length ({unit === 'metric' ? 'm' : 'ft'})
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={params.length}
                onChange={(e) => updateParam('length', e.target.value)}
                className={`w-full px-4 py-3 rounded-lg border-2 bg-background transition-colors ${
                  errors.length ? 'border-red-500' : 'border-border focus:border-primary'
                }`}
                placeholder={`Enter slab length in ${unit === 'metric' ? 'meters' : 'feet'}`}
              />
              {errors.length && (
                <p className="mt-1 text-sm text-red-500 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.length}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-card-foreground mb-2">
                Width ({unit === 'metric' ? 'm' : 'ft'})
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={params.width}
                onChange={(e) => updateParam('width', e.target.value)}
                className={`w-full px-4 py-3 rounded-lg border-2 bg-background transition-colors ${
                  errors.width ? 'border-red-500' : 'border-border focus:border-primary'
                }`}
                placeholder={`Enter slab width in ${unit === 'metric' ? 'meters' : 'feet'}`}
              />
              {errors.width && (
                <p className="mt-1 text-sm text-red-500 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.width}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-card-foreground mb-2">
                Thickness ({unit === 'metric' ? 'm' : 'ft'})
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={params.thickness}
                onChange={(e) => updateParam('thickness', e.target.value)}
                className={`w-full px-4 py-3 rounded-lg border-2 bg-background transition-colors ${
                  errors.thickness ? 'border-red-500' : 'border-border focus:border-primary'
                }`}
                placeholder={`Enter slab thickness in ${unit === 'metric' ? 'meters' : 'feet'}`}
              />
              {errors.thickness && (
                <p className="mt-1 text-sm text-red-500 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.thickness}
                </p>
              )}
              <div className="mt-2 p-3 rounded-lg border border-border">
                <div className="flex items-start space-x-2">
                  <Info className="h-4 w-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                  <div className="text-sm dark:text-blue-500">
                    <div className="font-medium mb-1">Thickness Guidelines:</div>
                    <div>• Residential floors: 10-15cm (4-6 inches)</div>
                    <div>• Garages/driveways: 15-20cm (6-8 inches)</div>
                    <div>• Basement slabs: 10-15cm (4-6 inches)</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Concrete Grade */}
          <div>
            <label className="block text-sm font-medium text-card-foreground mb-2">
              Concrete Grade
            </label>
            <select
              value={concreteGrade}
              onChange={(e) => setConcreteGrade(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border-2 border-border focus:border-primary bg-background"
            >
              <option value="C15">C15 (15 MPa) - Light duty</option>
              <option value="C20">C20 (20 MPa) - General purpose</option>
              <option value="C25">C25 (25 MPa) - Residential slabs</option>
              <option value="C30">C30 (30 MPa) - Heavy duty</option>
              <option value="C35">C35 (35 MPa) - Commercial</option>
              <option value="C40">C40 (40 MPa) - High strength</option>
            </select>
          </div>

          {/* Unit Price */}
          <div>
            <label className="block text-sm font-medium text-card-foreground mb-2">
              Price per Cubic Meter ($)
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              value={unitPrice}
              onChange={(e) => setUnitPrice(e.target.value)}
              className={`w-full px-4 py-3 rounded-lg border-2 bg-background transition-colors ${
                errors.unitPrice ? 'border-red-500' : 'border-border focus:border-primary'
              }`}
              placeholder="Enter price per cubic meter"
            />
            {errors.unitPrice && (
              <p className="mt-1 text-sm text-red-500 flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" />
                {errors.unitPrice}
              </p>
            )}
          </div>

          {/* Calculate Button */}
          <button
            onClick={calculateSlabConcrete}
            className="w-full flex items-center justify-center space-x-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-4 px-6 rounded-lg transition-colors shadow-lg hover:shadow-xl"
          >
            <Calculator className="h-5 w-5" />
            <span>Calculate Slab Concrete</span>
          </button>
        </div>

        {/* Results Section */}
        <div className="space-y-6">
          {result ? (
            <>
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-card-foreground">Calculation Results</h3>
                <button
                  onClick={exportResults}
                  className="flex items-center space-x-2 px-3 py-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Download className="h-4 w-4" />
                  <span>Export</span>
                </button>
              </div>

              {/* Thickness Recommendation */}
              <div className="p-4 rounded-lg border border-border">
                <div className="flex items-start space-x-2">
                  <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-blue-500 mb-1">
                      Thickness Assessment
                    </div>
                    <div className="text-sm text-blue-500">
                      {result.thicknessRecommendation}
                    </div>
                  </div>
                </div>
              </div>

              {/* Volume Results */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-primary/5 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-primary">{result.volume}</div>
                  <div className="text-sm text-muted-foreground">Cubic Meters (m³)</div>
                </div>
                <div className="bg-primary/5 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-primary">{result.volumeImperial}</div>
                  <div className="text-sm text-muted-foreground">Cubic Yards (yd³)</div>
                </div>
              </div>

              {/* Area */}
              <div className="dark:bg-green-900/5 p-4 rounded-lg">
                <div className="text-lg font-semibold text-green-500">
                  Slab Area: {result.area} m²
                </div>
                <div className="text-sm text-green-500">
                  ({Math.round(result.area * 10.764 * 100) / 100} sq ft)
                </div>
              </div>

              {/* Material Breakdown */}
              <div className="space-y-3">
                <h4 className="font-semibold text-card-foreground">Material Requirements</h4>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex justify-between p-3 bg-muted/50 rounded">
                    <span>Cement:</span>
                    <span className="font-medium">{result.cement} kg</span>
                  </div>
                  <div className="flex justify-between p-3 bg-muted/50 rounded">
                    <span>Cement Bags:</span>
                    <span className="font-medium">{result.cementBags} bags</span>
                  </div>
                  <div className="flex justify-between p-3 bg-muted/50 rounded">
                    <span>Sand:</span>
                    <span className="font-medium">{result.sand} kg</span>
                  </div>
                  <div className="flex justify-between p-3 bg-muted/50 rounded">
                    <span>Gravel:</span>
                    <span className="font-medium">{result.gravel} kg</span>
                  </div>
                  <div className="flex justify-between p-3 bg-muted/50 rounded">
                    <span>Water:</span>
                    <span className="font-medium">{result.water} kg</span>
                  </div>
                </div>
              </div>

              {/* Cost Estimate */}
              <div className="dark:bg-green-900/5 p-4 rounded-lg">
                <div className="text-xl font-bold text-green-500">
                  Total Cost: ${result.totalCost}
                </div>
                <div className="text-sm text-green-500">
                  Based on ${unitPrice}/m³ ({concreteGrade} grade)
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <Square className="h-16 w-16 text-muted-foreground/50 mb-4" />
              <h3 className="text-lg font-medium text-muted-foreground mb-2">
                Ready to Calculate
              </h3>
              <p className="text-muted-foreground">
                Enter your slab dimensions and click calculate to get detailed results
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}