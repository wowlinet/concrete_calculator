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

type MixType = 'concrete' | 'mortar' | 'cement-water';
type VolumeUnit = 'cm3' | 'm3' | 'ft3' | 'yd3' | 'ml' | 'l' | 'us-gal' | 'uk-gal';

interface CalculationResult {
  dryVolume: number;
  totalVolume: number;
  totalDryVolume: number;
  cementVolume: number;
  cementWeight: number;
  cementBags: number;
  sandVolume?: number;
  gravelVolume?: number;
  waterVolume?: number;
  waterWeight?: number;
}

interface ProjectParams {
  mixType: MixType;
  wetVolume: string;
  wetVolumeUnit: VolumeUnit;
  dryToWetRatio: string;
  waste: string;
  concreteRatio: string;
  mortarRatio: string;
  cementDensity: string;
  bagSize: string;
}

const CONCRETE_RATIOS = {
  '1:5:10': { cement: 1, sand: 5, gravel: 10, strength: '5.0 MPa or 725 psi' },
  '1:4:8': { cement: 1, sand: 4, gravel: 8, strength: '7.5 MPa or 1085 psi' },
  '1:3:6': { cement: 1, sand: 3, gravel: 6, strength: '10.0 MPa or 1450 psi' },
  '1:2:4': { cement: 1, sand: 2, gravel: 4, strength: '15.0 MPa or 2175 psi' },
  '1:1.5:3': { cement: 1, sand: 1.5, gravel: 3, strength: '20.0 MPa or 2900 psi' },
  '1:1:2': { cement: 1, sand: 1, gravel: 2, strength: '25.0 MPa or 3625 psi' },
  '1:2:3': { cement: 1, sand: 2, gravel: 3, strength: '31.0 MPa or 4500 psi' },
  '1:1:1.5': { cement: 1, sand: 1, gravel: 1.5, strength: 'Custom mix' },
} as const;

const MORTAR_RATIOS = {
  '1:6': { cement: 1, sand: 6, application: 'for interior plaster' },
  '1:5': { cement: 1, sand: 5, application: 'for brickwork mortar' },
  '1:4': { cement: 1, sand: 4, application: 'for exterior plaster' },
  '1:3': { cement: 1, sand: 3, application: 'rich mortar mix' },
} as const;

const DEFAULT_PARAMS: ProjectParams = {
  mixType: 'concrete',
  wetVolume: '1',
  wetVolumeUnit: 'm3',
  dryToWetRatio: '1.54',
  waste: '10',
  concreteRatio: '1:1.5:3',
  mortarRatio: '1:4',
  cementDensity: '1440',
  bagSize: '50',
};

const volumeUnitOptions: { value: VolumeUnit; label: string }[] = [
  { value: 'm3', label: 'm³' },
  { value: 'cm3', label: 'cm³' },
  { value: 'ft3', label: 'ft³' },
  { value: 'yd3', label: 'yd³' },
  { value: 'ml', label: 'ml' },
  { value: 'l', label: 'L' },
  { value: 'us-gal', label: 'US gal' },
  { value: 'uk-gal', label: 'UK gal' },
];

export default function CementCalculator() {
  const [params, setParams] = useState<ProjectParams>(DEFAULT_PARAMS);
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showDryVolumeInfo, setShowDryVolumeInfo] = useState(false);
  const [showTotalVolumeInfo, setShowTotalVolumeInfo] = useState(false);

  const volumeToM3 = (value: number, unit: VolumeUnit): number => {
    const conversions: Record<VolumeUnit, number> = {
      cm3: 0.000001,
      m3: 1,
      ft3: 0.0283168,
      yd3: 0.764555,
      ml: 0.000001,
      l: 0.001,
      'us-gal': 0.00378541,
      'uk-gal': 0.00454609,
    };

    return value * conversions[unit];
  };

  const getVolumeUnitSymbol = (unit: VolumeUnit): string => {
    const symbols: Record<VolumeUnit, string> = {
      cm3: 'cm³',
      m3: 'm³',
      ft3: 'ft³',
      yd3: 'yd³',
      ml: 'ml',
      l: 'L',
      'us-gal': 'US gal',
      'uk-gal': 'UK gal',
    };

    return symbols[unit];
  };

  const calculateDryVolumeDisplay = (): string => {
    const wetVol = parseFloat(params.wetVolume || '0');
    const ratio = parseFloat(params.dryToWetRatio || '1');
    const dryVol = wetVol * ratio;
    return Number.isFinite(dryVol) ? parseFloat(dryVol.toFixed(2)).toString() : '';
  };

  const calculateTotalVolumeDisplay = (): string => {
    const wetVol = parseFloat(params.wetVolume || '0');
    const ratio = parseFloat(params.dryToWetRatio || '1');
    const waste = parseFloat(params.waste || '0');
    const totalVol = wetVol * ratio * (1 + waste / 100);
    return Number.isFinite(totalVol) ? parseFloat(totalVol.toFixed(2)).toString() : '';
  };

  const getValidationErrors = (): Record<string, string> => {
    const nextErrors: Record<string, string> = {};

    if (!params.wetVolume || parseFloat(params.wetVolume) <= 0) {
      nextErrors.wetVolume = 'Please enter a valid wet volume';
    }
    if (!params.dryToWetRatio || parseFloat(params.dryToWetRatio) <= 0) {
      nextErrors.dryToWetRatio = 'Please enter a valid ratio';
    }
    if (params.waste === '' || parseFloat(params.waste) < 0 || parseFloat(params.waste) > 100) {
      nextErrors.waste = 'Waste must be between 0 and 100';
    }
    if (!params.cementDensity || parseFloat(params.cementDensity) <= 0) {
      nextErrors.cementDensity = 'Please enter a valid density';
    }
    if (!params.bagSize || parseFloat(params.bagSize) <= 0) {
      nextErrors.bagSize = 'Please enter a valid bag size';
    }

    return nextErrors;
  };

  const buildCalculationResult = (): CalculationResult => {
    const wetVolumeM3 = volumeToM3(parseFloat(params.wetVolume), params.wetVolumeUnit);
    const dryToWetRatio = parseFloat(params.dryToWetRatio);
    const wastePercent = parseFloat(params.waste);

    const dryVolume = wetVolumeM3 * dryToWetRatio;
    const totalVolume = wetVolumeM3 * (1 + wastePercent / 100);
    const totalDryVolume = totalVolume * dryToWetRatio;

    let cementVolume = 0;
    let sandVolume: number | undefined;
    let gravelVolume: number | undefined;

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
      cementVolume = totalDryVolume;
    }

    const cementDensity = parseFloat(params.cementDensity);
    const cementWeight = cementVolume * cementDensity;
    const bagSize = parseFloat(params.bagSize);
    const cementBags = Math.ceil(cementWeight / bagSize);
    const waterWeight = cementWeight * 0.4;
    const waterVolume = waterWeight / 1000;

    return {
      dryVolume: parseFloat(dryVolume.toFixed(2)),
      totalVolume: parseFloat(totalVolume.toFixed(2)),
      totalDryVolume: parseFloat(totalDryVolume.toFixed(2)),
      cementVolume: parseFloat(cementVolume.toFixed(2)),
      cementWeight: parseFloat(cementWeight.toFixed(2)),
      cementBags,
      sandVolume: sandVolume !== undefined ? parseFloat(sandVolume.toFixed(2)) : undefined,
      gravelVolume: gravelVolume !== undefined ? parseFloat(gravelVolume.toFixed(2)) : undefined,
      waterVolume: parseFloat(waterVolume.toFixed(2)),
      waterWeight: parseFloat(waterWeight.toFixed(2)),
    };
  };

  useEffect(() => {
    const defaultRatios: Record<MixType, string> = {
      concrete: '1.54',
      mortar: '1.22',
      'cement-water': '1',
    };

    setParams((prev) => ({
      ...prev,
      dryToWetRatio: defaultRatios[prev.mixType],
    }));
  }, [params.mixType]);

  useEffect(() => {
    const nextErrors = getValidationErrors();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setResult(null);
      return;
    }

    setResult(buildCalculationResult());
  }, [params]);

  const updateParam = (key: keyof ProjectParams, value: string) => {
    setParams((prev) => ({ ...prev, [key]: value }));
  };

  const resetForm = () => {
    setParams(DEFAULT_PARAMS);
  };

  const exportResult = () => {
    if (!result) return;

    let ratioInfo = '';
    if (params.mixType === 'concrete') {
      const ratio = CONCRETE_RATIOS[params.concreteRatio as keyof typeof CONCRETE_RATIOS];
      ratioInfo = `Concrete Mix Ratio: ${params.concreteRatio} (${ratio.strength})\n`;
    } else if (params.mixType === 'mortar') {
      const ratio = MORTAR_RATIOS[params.mortarRatio as keyof typeof MORTAR_RATIOS];
      ratioInfo = `Mortar Mix Ratio: ${params.mortarRatio} (${ratio.application})\n`;
    } else {
      ratioInfo = 'Mix Ratio: Cement and Water Only\n';
    }

    const data =
      `Cement Calculator Results\n\n` +
      `Mix Type: ${params.mixType}\n` +
      `Wet Volume: ${params.wetVolume} ${getVolumeUnitSymbol(params.wetVolumeUnit)}\n` +
      `Dry to Wet Ratio: ${params.dryToWetRatio}:1\n` +
      `Waste: ${params.waste}%\n` +
      ratioInfo +
      `\nVolumes:\n` +
      `  Dry Volume: ${result.dryVolume} m³\n` +
      `  Total Volume: ${result.totalVolume} m³\n` +
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
      errorKey?: string;
      helperText?: string;
    } = {}
  ) => {
    const value = (params[valueKey] as string) ?? '';
    const error = opts.errorKey ? errors[opts.errorKey] : undefined;
    const unitValue = opts.unitKey ? (params[opts.unitKey] as string) : undefined;

    return (
      <div>
        <label className="mb-2 block text-sm font-medium text-muted-foreground">{label}</label>
        <div
          className={`flex min-w-0 items-stretch overflow-hidden rounded-lg border bg-background transition-shadow focus-within:border-transparent focus-within:ring-2 focus-within:ring-primary ${
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
            <div className="relative flex w-28 shrink-0 items-center border-l border-border">
              <select
                value={unitValue}
                onChange={(e) => updateParam(opts.unitKey!, e.target.value)}
                className="h-full w-full cursor-pointer appearance-none bg-transparent py-2.5 pl-3 pr-8 text-sm text-foreground outline-none"
                aria-label={`${label} unit`}
              >
                {volumeUnitOptions.map((option) => (
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
        {error ? <p className="mt-1 text-sm text-destructive">{error}</p> : null}
        {!error && opts.helperText ? <p className="mt-1 text-xs text-muted-foreground">{opts.helperText}</p> : null}
      </div>
    );
  };

  const renderReadonlyField = (
    label: string,
    value: string,
    onToggle: () => void,
    expanded: boolean,
    infoText: string
  ) => (
    <div>
      <div className="mb-2 flex items-center gap-2">
        <label className="text-sm font-medium text-muted-foreground">{label}</label>
        <button
          type="button"
          onClick={onToggle}
          className="text-primary transition-colors hover:text-primary/80"
          aria-label={`Toggle ${label} information`}
        >
          <Info className="h-4 w-4" />
        </button>
      </div>
      <div className="flex min-w-0 items-stretch overflow-hidden rounded-lg border border-border bg-muted/40">
        <input
          type="text"
          value={value}
          readOnly
          className="min-w-0 flex-1 cursor-not-allowed bg-transparent px-3 py-2.5 text-sm text-foreground outline-none"
        />
        <span className="flex w-28 shrink-0 items-center justify-center border-l border-border px-3 text-sm text-muted-foreground">
          {getVolumeUnitSymbol(params.wetVolumeUnit)}
        </span>
      </div>
      {expanded ? (
        <div className="mt-2 rounded-lg border border-primary/20 bg-primary/5 p-3">
          <p className="text-sm text-muted-foreground">{infoText}</p>
        </div>
      ) : null}
    </div>
  );

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

  const mixTypeLabel =
    params.mixType === 'concrete'
      ? 'Concrete'
      : params.mixType === 'mortar'
        ? 'Mortar'
        : 'Cement and Water';

  const mixRatioLabel =
    params.mixType === 'concrete'
      ? `${params.concreteRatio} (${CONCRETE_RATIOS[params.concreteRatio as keyof typeof CONCRETE_RATIOS].strength})`
      : params.mixType === 'mortar'
        ? `${params.mortarRatio} (${MORTAR_RATIOS[params.mortarRatio as keyof typeof MORTAR_RATIOS].application})`
        : 'Pure cement slurry';

  return (
    <div>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="flex items-center text-2xl font-semibold text-foreground">
          <Calculator className="mr-2 h-6 w-6" />
          Cement Calculator
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
            <h3 className="mb-4 text-lg font-medium text-card-foreground">Mix Type</h3>
            <div className="relative">
              <select
                value={params.mixType}
                onChange={(e) => updateParam('mixType', e.target.value)}
                className="h-11 w-full cursor-pointer appearance-none rounded-lg border border-border bg-background px-3 pr-10 text-sm text-foreground outline-none transition-shadow focus:border-transparent focus:ring-2 focus:ring-primary"
              >
                <option value="concrete">Concrete</option>
                <option value="mortar">Mortar</option>
                <option value="cement-water">Cement and Water Only</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-medium text-card-foreground">Volume Parameters</h3>
            <div className="space-y-4">
              {renderField('Wet Volume', 'wetVolume', {
                unitKey: 'wetVolumeUnit',
                placeholder: '1',
                errorKey: 'wetVolume',
              })}
              {renderField('Dry to Wet Ratio (Dry : 1)', 'dryToWetRatio', {
                placeholder: '1.54',
                errorKey: 'dryToWetRatio',
              })}

              <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
                <div className="flex items-start gap-2">
                  <Info className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <div className="text-sm text-muted-foreground">
                    <div className="mb-1 font-medium text-foreground">Default Ratios</div>
                    <div>Concrete: 1.54 : 1</div>
                    <div>Mortar: 1.22 : 1</div>
                    <div>Cement &amp; Water: 1 : 1</div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {renderReadonlyField(
                  'Dry Volume',
                  calculateDryVolumeDisplay(),
                  () => setShowDryVolumeInfo((prev) => !prev),
                  showDryVolumeInfo,
                  'This is the dry mix volume before water is added. Water lets fine particles settle into void spaces, so wet volume is smaller than dry volume.'
                )}
                {renderReadonlyField(
                  'Total Dry Volume',
                  calculateTotalVolumeDisplay(),
                  () => setShowTotalVolumeInfo((prev) => !prev),
                  showTotalVolumeInfo,
                  'This value includes both the dry-volume ratio and the additional waste allowance.'
                )}
              </div>

              {renderField('Waste (%)', 'waste', {
                placeholder: '10',
                step: '1',
                min: '0',
                max: '100',
                suffix: '%',
                errorKey: 'waste',
                helperText: 'Add extra material for spillage and site variation.',
              })}
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-medium text-card-foreground">Mix Design</h3>
            {params.mixType === 'concrete' ? (
              <div>
                <label className="mb-2 block text-sm font-medium text-muted-foreground">Concrete Mix Ratio</label>
                <div className="relative">
                  <select
                    value={params.concreteRatio}
                    onChange={(e) => updateParam('concreteRatio', e.target.value)}
                    className="h-11 w-full cursor-pointer appearance-none rounded-lg border border-border bg-background px-3 pr-10 text-sm text-foreground outline-none transition-shadow focus:border-transparent focus:ring-2 focus:ring-primary"
                  >
                    {Object.entries(CONCRETE_RATIOS).map(([key, value]) => (
                      <option key={key} value={key}>
                        {key} ({value.strength})
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  Ratio of cement to sand to gravel with estimated compressive strength.
                </p>
              </div>
            ) : params.mixType === 'mortar' ? (
              <div>
                <label className="mb-2 block text-sm font-medium text-muted-foreground">Mortar Mix Ratio</label>
                <div className="relative">
                  <select
                    value={params.mortarRatio}
                    onChange={(e) => updateParam('mortarRatio', e.target.value)}
                    className="h-11 w-full cursor-pointer appearance-none rounded-lg border border-border bg-background px-3 pr-10 text-sm text-foreground outline-none transition-shadow focus:border-transparent focus:ring-2 focus:ring-primary"
                  >
                    {Object.entries(MORTAR_RATIOS).map(([key, value]) => (
                      <option key={key} value={key}>
                        {key} ({value.application})
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  Ratio of cement to sand with the most common use case.
                </p>
              </div>
            ) : (
              <div className="rounded-lg border border-primary/20 bg-primary/5 p-4 text-sm text-muted-foreground">
                Cement and Water Only uses the full total dry volume as cement slurry.
              </div>
            )}
          </div>

          <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-medium text-card-foreground">Cement Properties</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {renderField('Cement Density (kg/m³)', 'cementDensity', {
                placeholder: '1440',
                step: '1',
                errorKey: 'cementDensity',
              })}
              {renderField('Bag Size (kg)', 'bagSize', {
                placeholder: '50',
                step: '1',
                errorKey: 'bagSize',
              })}
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-lg border border-primary/30 bg-primary/5 px-4 py-3 text-sm text-muted-foreground">
            <span className="text-primary">💡</span>
            <span>
              <span className="font-medium text-foreground">Tip:</span> Results update automatically as you change volume, ratio, waste, or bag settings.
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
                    <div className="mb-1 text-sm text-muted-foreground">Total Dry Volume</div>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-4xl font-bold text-primary">{result.totalDryVolume.toLocaleString()}</span>
                      <span className="text-xl font-semibold text-primary">m³</span>
                    </div>
                    <div className="mt-1 text-xs text-muted-foreground">Final dry volume including waste</div>
                  </div>

                  <div className="border-t border-border bg-primary/5 px-5 py-4">
                    <div className="mb-1 text-sm text-muted-foreground">Cement Bags Needed</div>
                    <div className="text-3xl font-bold text-primary">{result.cementBags.toLocaleString()} bags</div>
                    <div className="mt-1 text-xs text-muted-foreground">Based on {params.bagSize} kg bag size</div>
                  </div>

                  <div className="divide-y divide-border border-t border-border px-5">
                    <ResultRow icon={<Scale className="h-4 w-4" />} label="Cement Weight" value={`${result.cementWeight.toLocaleString()} kg`} />
                    <ResultRow icon={<Package className="h-4 w-4" />} label="Wet Volume Input" value={`${params.wetVolume} ${getVolumeUnitSymbol(params.wetVolumeUnit)}`} />
                    <ResultRow icon={<Percent className="h-4 w-4" />} label="Waste Included" value={`${params.waste || '0'}%`} />
                    <ResultRow icon={<Info className="h-4 w-4" />} label="Dry : Wet Ratio" value={`${params.dryToWetRatio}:1`} />
                  </div>

                  <div className="border-t border-border px-5 py-4">
                    <div className="mb-2 text-sm font-medium text-foreground">Volume Breakdown</div>
                    <ul className="space-y-1.5 text-sm text-muted-foreground">
                      <li className="flex justify-between">
                        <span>• Dry Volume</span>
                        <span className="font-medium text-foreground">{result.dryVolume.toLocaleString()} m³</span>
                      </li>
                      <li className="flex justify-between">
                        <span>• Total Volume</span>
                        <span className="font-medium text-foreground">{result.totalVolume.toLocaleString()} m³</span>
                      </li>
                      <li className="flex justify-between">
                        <span>• Total Dry Volume</span>
                        <span className="font-medium text-foreground">{result.totalDryVolume.toLocaleString()} m³</span>
                      </li>
                    </ul>
                  </div>

                  <div className="border-t border-border px-5 py-4">
                    <div className="mb-2 text-sm font-medium text-foreground">Material Breakdown</div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="rounded-lg bg-primary/5 p-3">
                        <div className="text-xs text-muted-foreground">Cement Volume</div>
                        <div className="text-sm font-bold text-primary">{result.cementVolume.toLocaleString()} m³</div>
                      </div>
                      <div className="rounded-lg bg-primary/5 p-3">
                        <div className="text-xs text-muted-foreground">Water Weight</div>
                        <div className="text-sm font-bold text-primary">{result.waterWeight?.toLocaleString()} kg</div>
                      </div>
                      {result.sandVolume !== undefined ? (
                        <div className="rounded-lg bg-primary/5 p-3">
                          <div className="text-xs text-muted-foreground">Sand Volume</div>
                          <div className="text-sm font-bold text-primary">{result.sandVolume.toLocaleString()} m³</div>
                        </div>
                      ) : null}
                      {result.gravelVolume !== undefined ? (
                        <div className="rounded-lg bg-primary/5 p-3">
                          <div className="text-xs text-muted-foreground">Gravel Volume</div>
                          <div className="text-sm font-bold text-primary">{result.gravelVolume.toLocaleString()} m³</div>
                        </div>
                      ) : null}
                      {result.waterVolume !== undefined ? (
                        <div className="rounded-lg bg-primary/5 p-3">
                          <div className="text-xs text-muted-foreground">Water Volume</div>
                          <div className="text-sm font-bold text-primary">{result.waterVolume.toLocaleString()} m³</div>
                        </div>
                      ) : null}
                    </div>
                  </div>

                  <div className="border-t border-border px-5 py-4">
                    <div className="mb-2 text-sm font-medium text-foreground">Mix Profile</div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="rounded-lg bg-primary/5 p-3">
                        <div className="text-xs text-muted-foreground">Mix Type</div>
                        <div className="text-sm font-bold text-primary">{mixTypeLabel}</div>
                      </div>
                      <div className="rounded-lg bg-primary/5 p-3">
                        <div className="text-xs text-muted-foreground">Selected Ratio</div>
                        <div className="text-sm font-bold text-primary">{mixRatioLabel}</div>
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
                    Enter valid volume, ratio, and cement settings to see a live estimate.
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
