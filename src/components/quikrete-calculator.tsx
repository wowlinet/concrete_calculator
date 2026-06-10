'use client'

import React, { useEffect, useState } from 'react';
import { Calculator, ChevronDown, Download, Package, Percent, RotateCcw, Scale } from 'lucide-react';

type ProjectType = 'slabs' | 'footings' | 'tube' | 'curb' | 'stairs';
type UnitType = 'feet' | 'inches' | 'yards' | 'meters' | 'centimeters';

interface CalculationResult {
  volumeCubicFeet: number;
  volumeCubicYards: number;
  volumeCubicMeters: number;
  weightLbs: number;
  weightKg: number;
  bags60lb: number;
  bags80lb: number;
  cement: number;
  cementBags: number;
  sand: number;
  gravel: number;
  water: number;
  totalCost: number;
}

interface ProjectParams {
  length: string;
  lengthUnit: UnitType;
  width: string;
  widthUnit: UnitType;
  height: string;
  heightUnit: UnitType;
  quantity: string;
  diameter?: string;
  diameterUnit?: UnitType;
  depth?: string;
  depthUnit?: UnitType;
  outerDiameter?: string;
  outerDiameterUnit?: UnitType;
  innerDiameter?: string;
  innerDiameterUnit?: UnitType;
  curbDepth?: string;
  curbDepthUnit?: UnitType;
  gutterWidth?: string;
  gutterWidthUnit?: UnitType;
  curbHeight?: string;
  curbHeightUnit?: UnitType;
  flagThickness?: string;
  flagThicknessUnit?: UnitType;
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

const DEFAULT_PARAMS: ProjectParams = {
  length: '5',
  lengthUnit: 'feet',
  width: '2.5',
  widthUnit: 'feet',
  height: '5',
  heightUnit: 'inches',
  quantity: '1',
  diameter: '2.5',
  diameterUnit: 'feet',
  depth: '6',
  depthUnit: 'feet',
  outerDiameter: '5',
  outerDiameterUnit: 'feet',
  innerDiameter: '4',
  innerDiameterUnit: 'feet',
  curbDepth: '4',
  curbDepthUnit: 'inches',
  gutterWidth: '10',
  gutterWidthUnit: 'inches',
  curbHeight: '4',
  curbHeightUnit: 'inches',
  flagThickness: '5',
  flagThicknessUnit: 'inches',
  run: '4',
  runUnit: 'inches',
  rise: '6',
  riseUnit: 'inches',
  stairWidth: '50',
  stairWidthUnit: 'inches',
  platformDepth: '5',
  platformDepthUnit: 'inches',
  numberOfSteps: '5',
};

export default function QuikreteCalculator() {
  const [projectType, setProjectType] = useState<ProjectType>('slabs');
  const [params, setParams] = useState<ProjectParams>(DEFAULT_PARAMS);
  const [concreteGrade] = useState<string>('C25');
  const [reserveVolume, setReserveVolume] = useState<string>('0');
  const [unitPrice, setUnitPrice] = useState<string>('160');
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const concreteRatios: Record<string, { cement: number; sand: number; gravel: number; water: number }> = {
    C15: { cement: 284, sand: 702, gravel: 1351, water: 185 },
    C20: { cement: 343, sand: 637, gravel: 1301, water: 175 },
    C25: { cement: 372, sand: 576, gravel: 1282, water: 175 },
    C30: { cement: 461, sand: 512, gravel: 1252, water: 175 },
    C35: { cement: 500, sand: 479, gravel: 1231, water: 175 },
    C40: { cement: 539, sand: 447, gravel: 1210, water: 175 },
  };

  const projectTypes = {
    slabs: { name: 'Slabs, Square Footings, or Walls', icon: '/tab-square-01.svg' },
    footings: { name: 'Hole, Column, or Round Footings', icon: '/tab-hole-01.svg' },
    tube: { name: 'Circular Slab or Tube', icon: '/tab-tube-01.svg' },
    curb: { name: 'Curb and Gutter Barrier', icon: '/tab-curb-01.svg' },
    stairs: { name: 'Stairs', icon: '/tab-stair-01.svg' },
  };

  const CUBIC_METERS_TO_CUBIC_FEET = 35.3147;
  const CUBIC_METERS_TO_CUBIC_YARDS = 1.30795;
  const CEMENT_BAG_WEIGHT = 50;
  const CONCRETE_DENSITY_KG_PER_M3 = 2130;
  const CONCRETE_DENSITY_LBS_PER_FT3 = 133;

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

  const unitOptions: { value: UnitType; label: string }[] = [
    { value: 'feet', label: 'ft' },
    { value: 'inches', label: 'in' },
    { value: 'yards', label: 'yd' },
    { value: 'meters', label: 'm' },
    { value: 'centimeters', label: 'cm' },
  ];

  const isMetricSystem = (): boolean => {
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

  const getProjectTypeImage = (type: ProjectType): string => {
    switch (type) {
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

  const getValidationErrors = (): Record<string, string> => {
    const nextErrors: Record<string, string> = {};

    switch (projectType) {
      case 'slabs':
        if (!params.length || parseFloat(params.length) <= 0) nextErrors.length = 'Please enter a valid length';
        if (!params.width || parseFloat(params.width) <= 0) nextErrors.width = 'Please enter a valid width';
        if (!params.height || parseFloat(params.height) <= 0) nextErrors.height = 'Please enter a valid height';
        if (!params.quantity || parseInt(params.quantity) <= 0) nextErrors.quantity = 'Please enter a valid quantity';
        break;
      case 'footings':
        if (!params.diameter || parseFloat(params.diameter) <= 0) nextErrors.diameter = 'Please enter a valid diameter';
        if (!params.depth || parseFloat(params.depth) <= 0) nextErrors.depth = 'Please enter a valid depth';
        if (!params.quantity || parseInt(params.quantity) <= 0) nextErrors.quantity = 'Please enter a valid quantity';
        break;
      case 'tube':
        if (!params.outerDiameter || parseFloat(params.outerDiameter) <= 0) nextErrors.outerDiameter = 'Please enter a valid outer diameter';
        if (!params.innerDiameter || parseFloat(params.innerDiameter) <= 0) nextErrors.innerDiameter = 'Please enter a valid inner diameter';
        if (
          params.outerDiameter &&
          params.innerDiameter &&
          parseFloat(params.innerDiameter) >= parseFloat(params.outerDiameter)
        ) {
          nextErrors.innerDiameter = 'Inner diameter must be less than outer diameter';
        }
        if (!params.height || parseFloat(params.height) <= 0) nextErrors.height = 'Please enter a valid height';
        if (!params.quantity || parseInt(params.quantity) <= 0) nextErrors.quantity = 'Please enter a valid quantity';
        break;
      case 'curb':
        if (!params.curbDepth || parseFloat(params.curbDepth) <= 0) nextErrors.curbDepth = 'Please enter a valid curb depth';
        if (!params.gutterWidth || parseFloat(params.gutterWidth) <= 0) nextErrors.gutterWidth = 'Please enter a valid gutter width';
        if (!params.curbHeight || parseFloat(params.curbHeight) <= 0) nextErrors.curbHeight = 'Please enter a valid curb height';
        if (!params.flagThickness || parseFloat(params.flagThickness) <= 0) nextErrors.flagThickness = 'Please enter a valid flag thickness';
        if (!params.length || parseFloat(params.length) <= 0) nextErrors.length = 'Please enter a valid length';
        if (!params.quantity || parseInt(params.quantity) <= 0) nextErrors.quantity = 'Please enter a valid quantity';
        break;
      case 'stairs':
        if (!params.run || parseFloat(params.run) <= 0) nextErrors.run = 'Please enter a valid run';
        if (!params.rise || parseFloat(params.rise) <= 0) nextErrors.rise = 'Please enter a valid rise';
        if (!params.stairWidth || parseFloat(params.stairWidth) <= 0) nextErrors.stairWidth = 'Please enter a valid width';
        if (!params.platformDepth || parseFloat(params.platformDepth) <= 0) nextErrors.platformDepth = 'Please enter a valid platform depth';
        if (!params.numberOfSteps || parseInt(params.numberOfSteps) <= 0) {
          nextErrors.numberOfSteps = 'Please enter a valid number of steps';
        }
        break;
    }

    if (reserveVolume && (parseFloat(reserveVolume) < 0 || parseFloat(reserveVolume) > 100)) {
      nextErrors.reserveVolume = 'Reserve volume must be between 0 and 100';
    }

    if (!unitPrice || parseFloat(unitPrice) <= 0) {
      nextErrors.unitPrice = 'Please enter a valid unit price';
    }

    return nextErrors;
  };

  const calculateVolume = (): number => {
    const quantity = parseInt(params.quantity || '1');

    switch (projectType) {
      case 'slabs': {
        const l = parseFloat(params.length || '0') * getUnitInfo(params.lengthUnit).toMeters;
        const w = parseFloat(params.width || '0') * getUnitInfo(params.widthUnit).toMeters;
        const h = parseFloat(params.height || '0') * getUnitInfo(params.heightUnit).toMeters;
        return l * w * h * quantity;
      }
      case 'footings': {
        const d = parseFloat(params.diameter || '0') * getUnitInfo(params.diameterUnit || 'feet').toMeters;
        const h = parseFloat(params.depth || '0') * getUnitInfo(params.depthUnit || 'feet').toMeters;
        return Math.PI * Math.pow(d / 2, 2) * h * quantity;
      }
      case 'tube': {
        const d1 = parseFloat(params.outerDiameter || '0') * getUnitInfo(params.outerDiameterUnit || 'feet').toMeters;
        const d2 = parseFloat(params.innerDiameter || '0') * getUnitInfo(params.innerDiameterUnit || 'feet').toMeters;
        const h = parseFloat(params.height || '0') * getUnitInfo(params.heightUnit).toMeters;
        return Math.PI * (Math.pow(d1 / 2, 2) - Math.pow(d2 / 2, 2)) * h * quantity;
      }
      case 'curb': {
        const curbDepth = parseFloat(params.curbDepth || '0') * getUnitInfo(params.curbDepthUnit || 'inches').toMeters;
        const gutterWidth = parseFloat(params.gutterWidth || '0') * getUnitInfo(params.gutterWidthUnit || 'inches').toMeters;
        const curbHeight = parseFloat(params.curbHeight || '0') * getUnitInfo(params.curbHeightUnit || 'inches').toMeters;
        const flagThickness = parseFloat(params.flagThickness || '0') * getUnitInfo(params.flagThicknessUnit || 'inches').toMeters;
        const length = parseFloat(params.length || '0') * getUnitInfo(params.lengthUnit).toMeters;
        const curbVerticalVolume = curbDepth * curbHeight * length;
        const gutterHorizontalVolume = (gutterWidth + curbDepth) * flagThickness * length;
        return (curbVerticalVolume + gutterHorizontalVolume) * quantity;
      }
      case 'stairs': {
        const run = parseFloat(params.run || '0') * getUnitInfo(params.runUnit || 'inches').toMeters;
        const rise = parseFloat(params.rise || '0') * getUnitInfo(params.riseUnit || 'inches').toMeters;
        const width = parseFloat(params.stairWidth || '0') * getUnitInfo(params.stairWidthUnit || 'inches').toMeters;
        const platformDepth = parseFloat(params.platformDepth || '0') * getUnitInfo(params.platformDepthUnit || 'inches').toMeters;
        const numSteps = parseInt(params.numberOfSteps || '0');

        let volume = 0;
        for (let stepCount = 0; stepCount < numSteps; stepCount++) {
          if (stepCount === numSteps - 1) {
            volume += width * rise * (stepCount + 1) * platformDepth;
          } else {
            volume += width * rise * (stepCount + 1) * run;
          }
        }
        return volume;
      }
      default:
        return 0;
    }
  };

  const computeResult = (): CalculationResult | null => {
    const nextErrors = getValidationErrors();
    if (Object.keys(nextErrors).length > 0) return null;

    const price = parseFloat(unitPrice);
    const reservePercent = parseFloat(reserveVolume || '0');
    const baseVolumeInMeters = calculateVolume();
    const ratio = concreteRatios[concreteGrade];

    const volumeInMeters = baseVolumeInMeters * (1 + reservePercent / 100);
    const volumeInCubicFeet = volumeInMeters * CUBIC_METERS_TO_CUBIC_FEET;
    const volumeInCubicYards = volumeInMeters * CUBIC_METERS_TO_CUBIC_YARDS;
    const weightInKg = volumeInMeters * CONCRETE_DENSITY_KG_PER_M3;
    const weightInLbs = volumeInCubicFeet * CONCRETE_DENSITY_LBS_PER_FT3;
    const bags60lb = Math.ceil(weightInLbs / 60);
    const bags80lb = Math.ceil(weightInLbs / 80);

    const totalCost = isMetricSystem()
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

  useEffect(() => {
    const nextErrors = getValidationErrors();
    setErrors(nextErrors);
    setResult(Object.keys(nextErrors).length > 0 ? null : computeResult());
  }, [params, projectType, concreteGrade, reserveVolume, unitPrice]);

  const updateParam = (key: keyof ProjectParams, value: string) => {
    setParams((prev) => ({ ...prev, [key]: value }));
  };

  const resetForm = () => {
    setParams(DEFAULT_PARAMS);
    setReserveVolume('0');
    setUnitPrice('160');
  };

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

    const data =
      `Quikrete Calculator Results\n\n` +
      `Project Type: ${projectTypeName}\n` +
      `Dimensions: ${dimensionsText}\n` +
      `Concrete Grade: ${concreteGrade}\n` +
      `Reserve Volume: ${reserveVolume}%\n\n` +
      `Concrete Volume (including reserve):\n` +
      `  ${result.volumeCubicFeet} cubic feet (ft³)\n` +
      `  ${result.volumeCubicYards} cubic yards (yd³)\n` +
      `  ${result.volumeCubicMeters} cubic meters (m³)\n\n` +
      `Weight Needed:\n` +
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
    a.download = 'quikrete-calculator-results.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

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
    opts: { unitKey?: keyof ProjectParams; placeholder?: string; integer?: boolean; suffix?: string; errorKey?: string } = {}
  ) => {
    const value = (params[valueKey] as string) ?? '';
    const unit = opts.unitKey ? (params[opts.unitKey] as UnitType) : undefined;
    const hint = unit ? metricHint(value, unit) : null;
    const error = opts.errorKey ? errors[opts.errorKey] : undefined;

    return (
      <div>
        <label className="mb-2 block text-sm font-medium text-muted-foreground">{label}</label>
        <div className="flex items-center gap-3">
          <div
            className={`flex items-stretch flex-1 min-w-0 rounded-lg border bg-background transition-shadow focus-within:ring-2 focus-within:ring-primary focus-within:border-transparent ${
              error ? 'border-destructive' : 'border-border'
            }`}
          >
            <input
              type="number"
              value={value}
              onChange={(e) => updateParam(valueKey, e.target.value)}
              placeholder={opts.placeholder}
              step={opts.integer ? '1' : '0.01'}
              min={opts.integer ? '1' : '0'}
              className="w-full min-w-0 flex-1 rounded-lg bg-transparent px-3 py-2.5 text-foreground outline-none"
            />
            {opts.unitKey ? (
              <div className="relative flex w-20 shrink-0 items-center border-l border-border">
                <select
                  value={unit}
                  onChange={(e) => updateParam(opts.unitKey!, e.target.value)}
                  className="h-full w-full cursor-pointer appearance-none bg-transparent py-2.5 pl-3 pr-8 text-sm text-foreground outline-none"
                  aria-label={`${label} unit`}
                >
                  {unitOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
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
          <span className="w-24 shrink-0 whitespace-nowrap text-sm text-muted-foreground">{hint ?? ''}</span>
        </div>
        {error ? <p className="mt-1 text-sm text-destructive">{error}</p> : null}
      </div>
    );
  };

  const renderDimensionFields = () => {
    switch (projectType) {
      case 'slabs':
        return (
          <div className="space-y-4">
            {renderField('Length (L)', 'length', { unitKey: 'lengthUnit', placeholder: '5', errorKey: 'length' })}
            {renderField('Width (W)', 'width', { unitKey: 'widthUnit', placeholder: '2.5', errorKey: 'width' })}
            {renderField('Thickness or Height (H)', 'height', { unitKey: 'heightUnit', placeholder: '5', errorKey: 'height' })}
            {renderField('Quantity', 'quantity', { integer: true, suffix: 'pcs', placeholder: '1', errorKey: 'quantity' })}
          </div>
        );
      case 'footings':
        return (
          <div className="space-y-4">
            {renderField('Diameter (D)', 'diameter', { unitKey: 'diameterUnit', placeholder: '2.5', errorKey: 'diameter' })}
            {renderField('Depth or Height (H)', 'depth', { unitKey: 'depthUnit', placeholder: '6', errorKey: 'depth' })}
            {renderField('Quantity', 'quantity', { integer: true, suffix: 'pcs', placeholder: '1', errorKey: 'quantity' })}
          </div>
        );
      case 'tube':
        return (
          <div className="space-y-4">
            {renderField('Outer Diameter (D1)', 'outerDiameter', {
              unitKey: 'outerDiameterUnit',
              placeholder: '5',
              errorKey: 'outerDiameter',
            })}
            {renderField('Inner Diameter (D2)', 'innerDiameter', {
              unitKey: 'innerDiameterUnit',
              placeholder: '4',
              errorKey: 'innerDiameter',
            })}
            {renderField('Length or Height (H)', 'height', { unitKey: 'heightUnit', placeholder: '6', errorKey: 'height' })}
            {renderField('Quantity', 'quantity', { integer: true, suffix: 'pcs', placeholder: '1', errorKey: 'quantity' })}
          </div>
        );
      case 'curb':
        return (
          <div className="space-y-4">
            {renderField('Curb Depth', 'curbDepth', { unitKey: 'curbDepthUnit', placeholder: '4', errorKey: 'curbDepth' })}
            {renderField('Gutter Width', 'gutterWidth', {
              unitKey: 'gutterWidthUnit',
              placeholder: '10',
              errorKey: 'gutterWidth',
            })}
            {renderField('Curb Height', 'curbHeight', { unitKey: 'curbHeightUnit', placeholder: '4', errorKey: 'curbHeight' })}
            {renderField('Flag Thickness', 'flagThickness', {
              unitKey: 'flagThicknessUnit',
              placeholder: '5',
              errorKey: 'flagThickness',
            })}
            {renderField('Length', 'length', { unitKey: 'lengthUnit', placeholder: '10', errorKey: 'length' })}
            {renderField('Quantity', 'quantity', { integer: true, suffix: 'pcs', placeholder: '1', errorKey: 'quantity' })}
          </div>
        );
      case 'stairs':
        return (
          <div className="space-y-4">
            {renderField('Run', 'run', { unitKey: 'runUnit', placeholder: '4', errorKey: 'run' })}
            {renderField('Rise', 'rise', { unitKey: 'riseUnit', placeholder: '6', errorKey: 'rise' })}
            {renderField('Width', 'stairWidth', { unitKey: 'stairWidthUnit', placeholder: '50', errorKey: 'stairWidth' })}
            {renderField('Platform Depth', 'platformDepth', {
              unitKey: 'platformDepthUnit',
              placeholder: '5',
              errorKey: 'platformDepth',
            })}
            {renderField('Number of Steps', 'numberOfSteps', { integer: true, placeholder: '5', errorKey: 'numberOfSteps' })}
          </div>
        );
      default:
        return null;
    }
  };

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
  const primaryVolume = result ? (useMetric ? result.volumeCubicMeters : result.volumeCubicYards) : 0;
  const primaryVolumeUnit = useMetric ? 'm³' : 'yd³';
  const primaryVolumeLabel = useMetric ? 'Cubic Meters' : 'Cubic Yards';

  return (
    <div>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="flex items-center text-2xl font-semibold text-foreground">
          <Calculator className="mr-2 h-6 w-6" />
          Quikrete Concrete Calculator
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
            <h3 className="mb-3 text-lg font-medium text-card-foreground">Project Type</h3>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
              {Object.entries(projectTypes).map(([key, config]) => (
                <button
                  key={key}
                  onClick={() => setProjectType(key as ProjectType)}
                  className={`flex cursor-pointer flex-col items-center gap-2 rounded-lg border-2 p-3 text-center transition-all duration-200 ${
                    projectType === key
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-border text-muted-foreground hover:border-border/80'
                  }`}
                >
                  <img src={config.icon} alt={config.name} className="h-12 w-12 object-contain" />
                  <span className="text-xs font-medium leading-tight">{config.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-medium text-card-foreground">Dimensions</h3>
            <div className="flex flex-col gap-6 lg:flex-row">
              <div className="flex-1">{renderDimensionFields()}</div>
              <div className="flex flex-1 items-center justify-center">
                <div className="w-full">
                  <img
                    src={getProjectTypeImage(projectType)}
                    alt={`${projectTypes[projectType].name} diagram`}
                    className="h-auto w-full rounded-lg border border-border bg-muted/20 p-4 object-contain dark:bg-white/20"
                  />
                  <p className="mt-2 text-center text-sm text-muted-foreground">{projectTypes[projectType].name} Shape</p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-medium text-card-foreground">Materials &amp; Pricing</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-muted-foreground">Reserve Volume (%)</label>
                <div
                  className={`flex min-w-0 items-stretch rounded-lg border bg-background transition-shadow focus-within:border-transparent focus-within:ring-2 focus-within:ring-primary ${
                    errors.reserveVolume ? 'border-destructive' : 'border-border'
                  }`}
                >
                  <input
                    type="number"
                    value={reserveVolume}
                    onChange={(e) => setReserveVolume(e.target.value)}
                    className="min-w-0 flex-1 bg-transparent px-3 py-2.5 text-foreground outline-none"
                    placeholder="0"
                    step="1"
                    min="0"
                    max="100"
                  />
                  <span className="flex w-20 shrink-0 items-center justify-center border-l border-border px-3 text-sm text-muted-foreground">
                    %
                  </span>
                </div>
                {errors.reserveVolume ? <p className="mt-1 text-sm text-destructive">{errors.reserveVolume}</p> : null}
                {!errors.reserveVolume ? (
                  <p className="mt-1 text-xs text-muted-foreground">
                    Add extra volume for waste, spills, and measurement variations
                  </p>
                ) : null}
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-muted-foreground">Unit Price ({getPriceUnit()})</label>
                <input
                  type="number"
                  value={unitPrice}
                  onChange={(e) => setUnitPrice(e.target.value)}
                  className={`w-full rounded-lg border bg-background px-3 py-2.5 text-foreground transition-shadow outline-none focus:border-transparent focus:ring-2 focus:ring-primary ${
                    errors.unitPrice ? 'border-destructive' : 'border-border'
                  }`}
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                />
                {errors.unitPrice ? <p className="mt-1 text-sm text-destructive">{errors.unitPrice}</p> : null}
                {!errors.unitPrice ? (
                  <p className="mt-1 text-xs text-muted-foreground">
                    For current local pricing, contact suppliers or the{' '}
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
                ) : null}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-lg border border-primary/30 bg-primary/5 px-4 py-3 text-sm text-muted-foreground">
            <span className="text-primary">💡</span>
            <span>
              <span className="font-medium text-foreground">Tip:</span> Results update automatically as you input dimensions, reserve volume, and unit price.
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
                    <div className="text-3xl font-bold text-primary">${result.totalCost.toLocaleString()}</div>
                    <div className="mt-1 text-xs text-muted-foreground">
                      Based on ${unitPrice} / {priceUnitShort}
                    </div>
                  </div>

                  <div className="divide-y divide-border border-t border-border px-5">
                    <ResultRow icon={<Scale className="h-4 w-4" />} label="Weight" value={`${result.weightLbs.toLocaleString()} lbs`} />
                    <ResultRow icon={<Package className="h-4 w-4" />} label="Concrete Bags (80lb)" value={`${result.bags80lb} Bags`} />
                    <ResultRow icon={<Package className="h-4 w-4" />} label="Concrete Bags (60lb)" value={`${result.bags60lb} Bags`} />
                    <ResultRow icon={<Percent className="h-4 w-4" />} label="Reserve Included" value={`${reserveVolume || '0'}%`} />
                  </div>

                  <div className="border-t border-border px-5 py-4">
                    <div className="mb-2 text-sm font-medium text-foreground">Volume Breakdown</div>
                    <ul className="space-y-1.5 text-sm text-muted-foreground">
                      <li className="flex justify-between">
                        <span>• Cubic Feet</span>
                        <span className="font-medium text-foreground">{result.volumeCubicFeet.toLocaleString()} ft³</span>
                      </li>
                      <li className="flex justify-between">
                        <span>• Cubic Yards</span>
                        <span className="font-medium text-foreground">{result.volumeCubicYards.toLocaleString()} yd³</span>
                      </li>
                      <li className="flex justify-between">
                        <span>• Cubic Meters</span>
                        <span className="font-medium text-foreground">{result.volumeCubicMeters.toLocaleString()} m³</span>
                      </li>
                    </ul>
                  </div>

                  <div className="border-t border-border px-5 py-4">
                    <div className="mb-2 text-sm font-medium text-foreground">Required Materials</div>
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
                  <p className="text-sm text-muted-foreground">Enter valid dimensions and a unit price to see your estimate.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
