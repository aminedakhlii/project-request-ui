/**
 * Service categories and sub-products for the project request / new project forms.
 * Used by both the public lead form and the customer new-project form.
 */

export type ServiceControlType = 'dropdown' | 'multicheck' | 'number_group' | 'yn_then_multicheck';

export interface ServiceOption {
  value: string;
  label: string;
}

export interface ServiceCategoryConfig {
  id: string;
  label: string;
  type: ServiceControlType;
  /** Brand logo shown to the left of the category header (path under src/assets). */
  logoUrl?: string;
  /** For dropdown: list of sub-products */
  options?: ServiceOption[];
  /** For number_group / multicheck: items with optional quantity */
  items?: {
    id: string;
    label: string;
    hasQuantity?: boolean;
    /** Show a brief description text input below the number input */
    hasDescription?: boolean;
    /** Show a customer-supplied Y/N radio below the number input */
    hasCustomerSupplied?: boolean;
  }[];
  /** For yn_then_multicheck: "Customer will supply all material" Y/N then list */
  supplyMaterialLabel?: string;
}

/** "How did you hear about us?" options */
export const HEAR_ABOUT_US_OPTIONS: { value: string; label: string }[] = [
  { value: 'google', label: 'Google' },
  { value: 'bing', label: 'Bing' },
  { value: 'facebook_instagram', label: 'Facebook / Instagram' },
  { value: 'nextdoor', label: 'Next Door' },
  { value: 'mail', label: 'Mail' },
  { value: 'tv', label: 'TV' },
  { value: 'radio', label: 'Radio' },
  { value: 'referral', label: 'Referral' },
  { value: 'bbb', label: 'BBB' },
];

/** Hourly options for the appointment time dropdown (8 am – 9 pm) */
export const APPOINTMENT_HOURS: { value: string; label: string }[] = [
  { value: '08:00', label: '8:00 AM' },
  { value: '09:00', label: '9:00 AM' },
  { value: '10:00', label: '10:00 AM' },
  { value: '11:00', label: '11:00 AM' },
  { value: '12:00', label: '12:00 PM' },
  { value: '13:00', label: '1:00 PM' },
  { value: '14:00', label: '2:00 PM' },
  { value: '15:00', label: '3:00 PM' },
  { value: '16:00', label: '4:00 PM' },
  { value: '17:00', label: '5:00 PM' },
  { value: '18:00', label: '6:00 PM' },
  { value: '19:00', label: '7:00 PM' },
  { value: '20:00', label: '8:00 PM' },
  { value: '21:00', label: '9:00 PM' },
];

/** Exterior services (side-by-side right column). */
export const EXTERIOR_SERVICES_CONFIG: ServiceCategoryConfig[] = [
  {
    id: 'roofing',
    label: 'Roofing',
    type: 'dropdown',
    options: [
      { value: 'roof_repair', label: 'Roof Repair' },
      { value: 'asphalt_shingles', label: 'Asphalt Shingles' },
      { value: 'cedar_roof', label: 'Cedar Roof' },
      { value: 'metal_roof', label: 'Metal Roof' },
      { value: 'flat_roof', label: 'Flat Roof' }
    ]
  },
  {
    id: 'siding',
    label: 'Siding',
    type: 'dropdown',
    options: [
      { value: 'vinyl_siding', label: 'Vinyl Siding' },
      { value: 'james_hardie', label: 'James Hardie Cement Siding' },
      { value: 'certainteed', label: 'CertainTeed Cement Siding' }
    ]
  },
  {
    id: 'andersen_windows',
    label: 'Andersen windows',
    type: 'number_group',
    logoUrl: 'assets/brand/andersen.png',
    items: [
      { id: 'repair', label: 'Andersen windows to repair', hasQuantity: true, hasDescription: true },
      { id: 'replacing_awning', label: 'Andersen awning windows', hasQuantity: true, hasDescription: true },
      { id: 'replacing_double_hung', label: 'Andersen double hung windows', hasQuantity: true, hasDescription: true },
      { id: 'replacing_bay', label: 'Andersen bay windows', hasQuantity: true, hasDescription: true },
      { id: 'replacing_casement', label: 'Andersen casement windows', hasQuantity: true, hasDescription: true },
      { id: 'replacing_slider', label: 'Andersen slider windows', hasQuantity: true, hasDescription: true },
      { id: 'replacing_picture', label: 'Andersen picture windows', hasQuantity: true, hasDescription: true },
      { id: 'replacing_trapezoid', label: 'Andersen trapezoid windows', hasQuantity: true, hasDescription: true }
    ]
  },
  {
    id: 'andersen_doors',
    label: 'Andersen doors',
    type: 'number_group',
    logoUrl: 'assets/brand/andersen.png',
    items: [
      { id: 'ext_door', label: 'Andersen exterior door', hasQuantity: true, hasCustomerSupplied: true },
      { id: 'patio_sliding', label: 'Andersen patio / sliding door', hasQuantity: true, hasCustomerSupplied: true }
    ]
  },
  {
    id: 'windows',
    label: 'Windows',
    type: 'number_group',
    items: [
      { id: 'repair', label: 'Windows to repair', hasQuantity: true, hasDescription: true },
      { id: 'replacing_awning', label: 'Awning windows', hasQuantity: true, hasDescription: true },
      { id: 'replacing_double_hung', label: 'Double hung windows', hasQuantity: true, hasDescription: true },
      { id: 'replacing_bay', label: 'Bay windows', hasQuantity: true, hasDescription: true },
      { id: 'replacing_casement', label: 'Casement windows', hasQuantity: true, hasDescription: true },
      { id: 'replacing_slider', label: 'Slider windows', hasQuantity: true, hasDescription: true },
      { id: 'replacing_picture', label: 'Picture windows', hasQuantity: true, hasDescription: true },
      { id: 'replacing_trapezoid', label: 'Trapezoid windows', hasQuantity: true, hasDescription: true }
    ]
  },
  {
    id: 'gutters',
    label: 'Seamless Gutters',
    type: 'multicheck',
    items: [
      { id: 'cleaning', label: 'Gutter cleaning' },
      { id: 'repair', label: 'Gutter repair' },
      { id: 'leaf_protection', label: 'Gutter leaf protection' },
      { id: 'install_5', label: '5\" seamless gutter installation and downspouts/leaders' },
      { id: 'install_6', label: '6\" seamless gutter installation and downspouts/leaders' },
      { id: 'replace_downspouts', label: 'Replace downspouts/leaders only' }
    ]
  },
  {
    id: 'bilco',
    label: 'Bilco doors',
    type: 'multicheck',
    logoUrl: 'assets/brand/bilco.png',
    items: [
      { id: 'bilco_door', label: 'Bilco Door' },
      { id: 'stakwel', label: 'StakWEL' },
      { id: 'scapewel', label: 'ScapeWEL' }
    ]
  },
  {
    id: 'decks',
    label: 'Decks',
    type: 'dropdown',
    options: [
      { value: 'repair_pine', label: 'Repair Pine Pressure Treated Deck' },
      { value: 'repair_redwood_cedar', label: 'Repair Red Wood Cedar Deck' },
      { value: 'repair_trex', label: 'Repair TREX Deck' },
      { value: 'replace_pine', label: 'Replace entire Deck - Pine Pressure Treated wood' },
      { value: 'replace_redwood_cedar', label: 'Replace entire Deck - Red Wood Cedar Deck' },
      { value: 'replace_trex', label: 'Replace entire Deck - TREX Deck' }
    ]
  },
  {
    id: 'glass',
    label: 'Glass',
    type: 'multicheck',
    items: [
      { id: 'replace_broken_glass', label: 'Replace broken glass' },
      { id: 'replace_sliding_door_glass', label: 'Replace broken sliding door glass' },
      { id: 'shower_glass_enclosure', label: 'Shower glass enclosure' }
    ]
  },
  {
    id: 'additions',
    label: 'Additions',
    type: 'multicheck',
    items: [
      { id: 'new_addition', label: 'Build a new addition' },
      { id: 'detached_garage', label: 'Build a new detached garage' },
      { id: 'shed', label: 'Build a new shed' }
    ]
  },
  {
    id: 'exterior_door',
    label: 'Exterior Door',
    type: 'number_group',
    items: [
      { id: 'ext_door', label: 'Exterior door', hasQuantity: true, hasCustomerSupplied: true },
      { id: 'patio_sliding', label: 'Patio / sliding door', hasQuantity: true, hasCustomerSupplied: true }
    ]
  },
  {
    id: 'hvac',
    label: 'HVAC',
    type: 'number_group',
    items: [
      { id: 'mini_split', label: 'How many mini split units?', hasQuantity: true },
      { id: 'central_air', label: 'How many central air conditioning units?', hasQuantity: true }
    ]
  },
  {
    id: 'exterior_electrical',
    label: 'Exterior Electrical Work',
    type: 'number_group',
    items: [
      { id: 'outlets', label: 'How many outlets/receptacles?', hasQuantity: true },
      { id: 'light_switches', label: 'How many light switches?', hasQuantity: true },
      { id: 'ceiling_fan', label: 'How many ceiling fans?', hasQuantity: true },
      { id: 'light_fixtures', label: 'How many light fixtures?', hasQuantity: true }
    ]
  }
];

/** Interior services (side-by-side left column) */
export const INTERIOR_SERVICES_CONFIG: ServiceCategoryConfig[] = [
  {
    id: 'flooring',
    label: 'Flooring',
    type: 'multicheck',
    items: [
      { id: 'hardwood_install', label: 'Installation of hardwood floor' },
      { id: 'hardwood_refinish', label: 'Hardwood floor refinishing' },
      { id: 'ceramic_tiles', label: 'Ceramic Tiles' },
      { id: 'lvp', label: 'LVP Flooring' }
    ]
  },
  {
    id: 'bathroom',
    label: 'Bathroom',
    type: 'multicheck',
    items: [
      { id: 'main_bathroom', label: 'Main Bathroom remodeling' },
      { id: 'master_bathroom', label: 'Master Bathroom remodeling' },
      { id: 'half_bathroom', label: 'Half Bathroom remodeling' },
      { id: 'toilet_only', label: 'Replacing toilet only' },
      { id: 'vanity_only', label: 'Replacing Vanity only' },
      { id: 'tub_only', label: 'Replacing Tub only' },
      { id: 'tub_to_shower', label: 'Converting tub to shower' }
    ]
  },
  {
    id: 'kitchen',
    label: 'Kitchen',
    type: 'dropdown',
    options: [
      { value: 'full_remodel', label: 'Full remodeling' },
      { value: 'cabinets_only', label: 'Replacing cabinets only' }
    ]
  },
  {
    id: 'drywall',
    label: 'Drywall',
    type: 'dropdown',
    options: [
      { value: 'repair', label: 'Repair' },
      { value: 'new_installation', label: 'Installation of new drywall' }
    ]
  },
  {
    id: 'finish_carpentry',
    label: 'Finish Carpentry',
    type: 'yn_then_multicheck',
    supplyMaterialLabel: 'Customer supplied material',
    items: [
      { id: 'entire_house', label: 'Baseboard trim entire house' },
      { id: 'living_room', label: 'Living room' },
      { id: 'dining_room', label: 'Dining room' },
      { id: 'master_bedroom', label: 'Master bedroom' },
      { id: 'bedroom_1', label: '1st Bedroom' },
      { id: 'bedroom_2', label: '2nd Bedroom' },
      { id: 'bedroom_3', label: '3rd Bedroom' },
      { id: 'bedroom_4', label: '4th Bedroom' },
      { id: 'bedroom_5', label: '5th Bedroom' },
      { id: 'kitchen', label: 'Kitchen' },
      { id: 'master_bath', label: 'Master bathroom' },
      { id: 'bath_2', label: '2nd bathroom' },
      { id: 'half_bath', label: 'Half bathroom' },
      { id: 'basement', label: 'Basement' }
    ]
  },
  {
    id: 'crown_molding',
    label: 'Crown Molding',
    type: 'yn_then_multicheck',
    supplyMaterialLabel: 'Customer supplied material',
    items: [
      { id: 'entire_house', label: 'Entire house' },
      { id: 'kitchen', label: 'Kitchen' },
      { id: 'master_bath', label: 'Master bathroom' },
      { id: 'bath_2', label: '2nd bathroom' },
      { id: 'half_bath', label: 'Half bathroom' },
      { id: 'living_room', label: 'Living room' },
      { id: 'dining_room', label: 'Dining room' },
      { id: 'master_bedroom', label: 'Master bedroom' },
      { id: 'bedroom_2', label: '2nd Bedroom' },
      { id: 'bedroom_3', label: '3rd Bedroom' },
      { id: 'bedroom_4', label: '4th Bedroom' },
      { id: 'bedroom_5', label: '5th Bedroom' },
      { id: 'basement', label: 'Basement' },
      { id: 'laundry', label: 'Laundry room' },
      { id: 'foyer', label: 'Foyer' },
      { id: 'hallway', label: 'Hallway' }
    ]
  },
  {
    id: 'interior_door',
    label: 'Interior Door',
    type: 'number_group',
    items: [
      { id: 'bedroom', label: 'Bedroom door', hasQuantity: true, hasCustomerSupplied: true },
      { id: 'bathroom', label: 'Bathroom door', hasQuantity: true, hasCustomerSupplied: true }
    ]
  },
  {
    id: 'interior_electrical',
    label: 'Interior Electrical Work',
    type: 'number_group',
    items: [
      { id: 'outlets', label: 'How many outlets/receptacles?', hasQuantity: true },
      { id: 'light_switches', label: 'How many light switches?', hasQuantity: true },
      { id: 'ceiling_fan', label: 'How many ceiling fans?', hasQuantity: true },
      { id: 'light_fixtures', label: 'How many light fixtures?', hasQuantity: true },
      { id: 'recessed_4', label: 'How many 4 inch recessed ceiling lights?', hasQuantity: true },
      { id: 'recessed_6', label: 'How many 6 inch recessed ceiling lights?', hasQuantity: true }
    ]
  },
  {
    id: 'plumbing',
    label: 'Plumbing',
    type: 'number_group',
    items: [
      { id: 'hot_water_tank', label: 'How many hot water tanks?', hasQuantity: true },
      { id: 'furnace', label: 'How many furnaces?', hasQuantity: true },
      { id: 'plumbing_fixtures', label: 'How many plumbing fixtures?', hasQuantity: true }
    ]
  },
];

/** Contractor form: simplified categories with service-name-only options (no "how many", consolidated e.g. one "Bathroom remodeling"). */
export interface ContractorCategoryConfig {
  id: string;
  label: string;
  /** Optional brand logo (URL or assets path). */
  logoUrl?: string;
  items: { id: string; label: string }[];
}

/** Exterior services for contractor form – service names only, multi-select checklists. */
export const CONTRACTOR_EXTERIOR_SERVICES_CONFIG: ContractorCategoryConfig[] = [
  {
    id: 'roofing',
    label: 'Roofing',
    items: [
      { id: 'roof_repair', label: 'Roof repair' },
      { id: 'asphalt_shingles', label: 'Asphalt shingles' },
      { id: 'cedar_roof', label: 'Cedar roof' },
      { id: 'metal_roof', label: 'Metal roof' },
      { id: 'flat_roof', label: 'Flat roof' }
    ]
  },
  {
    id: 'siding',
    label: 'Siding',
    items: [
      { id: 'vinyl_siding', label: 'Vinyl siding' },
      { id: 'james_hardie', label: 'James Hardie cement siding' },
      { id: 'certainteed', label: 'CertainTeed cement siding' }
    ]
  },
  {
    id: 'andersen_windows',
    label: 'Andersen windows',
    items: [
      { id: 'repair', label: 'Andersen windows to repair' },
      { id: 'replacing_awning', label: 'Andersen awning windows' },
      { id: 'replacing_double_hung', label: 'Andersen double hung windows' },
      { id: 'replacing_bay', label: 'Andersen bay windows' },
      { id: 'replacing_casement', label: 'Andersen casement windows' },
      { id: 'replacing_slider', label: 'Andersen slider windows' },
      { id: 'replacing_picture', label: 'Andersen picture windows' },
      { id: 'replacing_trapezoid', label: 'Andersen trapezoid windows' }
    ]
  },
  {
    id: 'andersen_doors',
    label: 'Andersen doors',
    items: [
      { id: 'ext_door', label: 'Andersen exterior door' },
      { id: 'patio_sliding', label: 'Andersen patio / sliding door' }
    ]
  },
  {
    id: 'windows',
    label: 'Windows',
    items: [
      { id: 'repair', label: 'Window repair' },
      { id: 'replacing_awning', label: 'Awning windows' },
      { id: 'replacing_double_hung', label: 'Double hung windows' },
      { id: 'replacing_bay', label: 'Bay windows' },
      { id: 'replacing_casement', label: 'Casement windows' },
      { id: 'replacing_slider', label: 'Slider windows' },
      { id: 'replacing_picture', label: 'Picture windows' },
      { id: 'replacing_trapezoid', label: 'Trapezoid windows' }
    ]
  },
  {
    id: 'gutters',
    label: 'Seamless Gutters',
    items: [
      { id: 'cleaning', label: 'Gutter cleaning' },
      { id: 'repair', label: 'Gutter repair' },
      { id: 'leaf_protection', label: 'Gutter leaf protection' },
      { id: 'install_5', label: '5" seamless gutter installation and downspouts/leaders' },
      { id: 'install_6', label: '6" seamless gutter installation and downspouts/leaders' },
      { id: 'replace_downspouts', label: 'Replace downspouts/leaders only' }
    ]
  },
  {
    id: 'bilco',
    label: 'Bilco Door',
    items: [
      { id: 'bilco_door', label: 'Bilco Door' },
      { id: 'stakwel', label: 'StakWEL' },
      { id: 'scapewel', label: 'ScapeWEL' }
    ]
  },
  {
    id: 'decks',
    label: 'Decks',
    items: [
      { id: 'repair_pine', label: 'Repair pine pressure treated deck' },
      { id: 'repair_redwood_cedar', label: 'Repair redwood/cedar deck' },
      { id: 'repair_trex', label: 'Repair TREX deck' },
      { id: 'replace_pine', label: 'Replace deck – pine pressure treated' },
      { id: 'replace_redwood_cedar', label: 'Replace deck – redwood/cedar' },
      { id: 'replace_trex', label: 'Replace deck – TREX' }
    ]
  },
  {
    id: 'glass',
    label: 'Glass',
    items: [
      { id: 'replace_broken_glass', label: 'Replace broken glass' },
      { id: 'replace_sliding_door_glass', label: 'Replace broken sliding door glass' },
      { id: 'shower_glass_enclosure', label: 'Shower glass enclosure installation' }
    ]
  },
  {
    id: 'additions',
    label: 'Additions',
    items: [
      { id: 'new_addition', label: 'New addition' },
      { id: 'detached_garage', label: 'Detached garage' },
      { id: 'shed', label: 'Shed' }
    ]
  },
  {
    id: 'exterior_door',
    label: 'Exterior Door',
    items: [
      { id: 'ext_door', label: 'Exterior door' },
      { id: 'patio_sliding', label: 'Patio / sliding door' }
    ]
  },
  {
    id: 'hvac',
    label: 'HVAC',
    items: [
      { id: 'mini_split', label: 'Mini split units' },
      { id: 'central_air', label: 'Central air conditioning' }
    ]
  },
  {
    id: 'exterior_electrical',
    label: 'Exterior Electrical',
    items: [
      { id: 'outlets', label: 'Outlets / receptacles' },
      { id: 'light_switches', label: 'Light switches' },
      { id: 'ceiling_fan', label: 'Ceiling fans' },
      { id: 'light_fixtures', label: 'Light fixtures' }
    ]
  }
];

/** Interior services for contractor form – service names only, consolidated (e.g. one Bathroom remodeling). */
export const CONTRACTOR_INTERIOR_SERVICES_CONFIG: ContractorCategoryConfig[] = [
  {
    id: 'flooring',
    label: 'Flooring',
    items: [
      { id: 'hardwood_install', label: 'Hardwood floor installation' },
      { id: 'hardwood_refinish', label: 'Hardwood floor refinishing' },
      { id: 'ceramic_tiles', label: 'Ceramic tiles' },
      { id: 'lvp', label: 'LVP flooring' }
    ]
  },
  {
    id: 'bathroom',
    label: 'Bathroom',
    items: [
      { id: 'remodeling', label: 'Bathroom remodeling' }
    ]
  },
  {
    id: 'kitchen',
    label: 'Kitchen',
    items: [
      { id: 'full_remodel', label: 'Full remodeling' },
      { id: 'cabinets_only', label: 'Cabinets only' }
    ]
  },
  {
    id: 'drywall',
    label: 'Drywall',
    items: [
      { id: 'repair', label: 'Repair' },
      { id: 'new_installation', label: 'New drywall installation' }
    ]
  },
  {
    id: 'finish_carpentry',
    label: 'Finish Carpentry',
    items: [
      { id: 'baseboard_trim', label: 'Baseboard trim' }
    ]
  },
  {
    id: 'crown_molding',
    label: 'Crown Molding',
    items: [
      { id: 'crown_molding', label: 'Crown molding' }
    ]
  },
  {
    id: 'interior_door',
    label: 'Interior Door',
    items: [
      { id: 'bedroom', label: 'Bedroom door' },
      { id: 'bathroom', label: 'Bathroom door' }
    ]
  },
  {
    id: 'interior_electrical',
    label: 'Interior Electrical',
    items: [
      { id: 'outlets', label: 'Outlets / receptacles' },
      { id: 'light_switches', label: 'Light switches' },
      { id: 'ceiling_fan', label: 'Ceiling fans' },
      { id: 'light_fixtures', label: 'Light fixtures' },
      { id: 'recessed_4', label: '4" recessed ceiling lights' },
      { id: 'recessed_6', label: '6" recessed ceiling lights' }
    ]
  },
  {
    id: 'plumbing',
    label: 'Plumbing',
    items: [
      { id: 'hot_water_tank', label: 'Hot water tanks' },
      { id: 'furnace', label: 'Furnaces' },
      { id: 'plumbing_fixtures', label: 'Plumbing fixtures' }
    ]
  }
];

/** Flat selection model: key is categoryId or categoryId_itemId; value is string (dropdown), number, or boolean */
export type ServiceSelections = Record<string, string | number | boolean | null | undefined>;

/** Returns an empty ServiceSelections object with all keys initialized for form binding */
export function getDefaultServiceSelections(
  interior: ServiceCategoryConfig[] = INTERIOR_SERVICES_CONFIG,
  exterior: ServiceCategoryConfig[] = EXTERIOR_SERVICES_CONFIG
): ServiceSelections {
  const s: ServiceSelections = {};
  [...interior, ...exterior].forEach(cat => {
    if (cat.type === 'dropdown') {
      s[cat.id] = '';
    } else if (cat.type === 'multicheck' && cat.items) {
      cat.items.forEach(it => { s[`${cat.id}_${it.id}`] = false; });
    } else if (cat.type === 'number_group' && cat.items) {
      cat.items.forEach(it => {
        s[`${cat.id}_${it.id}`] = null;
        if (it.hasDescription) s[`${cat.id}_${it.id}_desc`] = '';
        if (it.hasCustomerSupplied) s[`${cat.id}_${it.id}_customer_supplied`] = null;
      });
    } else if (cat.type === 'yn_then_multicheck' && cat.items) {
      s[`${cat.id}_supply`] = null;
      cat.items.forEach(it => { s[`${cat.id}_${it.id}`] = false; });
    }
  });
  return s;
}

/** One project payload produced by buildProjectsFromSelections */
export interface ProjectPayload {
  /** Service description used to build the project name (e.g. "Windows: 2 awning, 1 bay") */
  name: string;
  interiorServices: string[];
  exteriorServices: string[];
}

/**
 * Number-group categories that collapse all chosen quantities into one project.
 * Everything else (including custom Settings categories) is split one project per choice.
 */
const GROUPED_NUMBER_CATEGORY_IDS = new Set([
  'andersen_windows',
  'andersen_doors',
  'windows',
  'exterior_door',
  'interior_door',
  'exterior_electrical',
  'interior_electrical'
]);

/**
 * Builds a list of per-project payloads from service selections.
 *
 * Rules:
 *  - GROUPED into one project: Andersen windows/doors, Windows, Finish Carpentry, Crown Molding,
 *    Exterior Door, Interior Door, Exterior Electrical, Interior Electrical.
 *  - SPLIT (one project per choice): everything else, including custom categories added in Settings.
 */
export function buildProjectsFromSelections(
  selections: ServiceSelections,
  interiorConfig: ServiceCategoryConfig[] = INTERIOR_SERVICES_CONFIG,
  exteriorConfig: ServiceCategoryConfig[] = EXTERIOR_SERVICES_CONFIG
): ProjectPayload[] {
  const projects: ProjectPayload[] = [];

  function getOpt(key: string) { return selections[key]; }
  function getNum(key: string): number {
    const v = selections[key];
    const n = typeof v === 'number' ? v : Number(v);
    return !isNaN(n) && n > 0 ? n : 0;
  }
  function getStr(key: string): string {
    const v = selections[key];
    return typeof v === 'string' ? v.trim() : '';
  }
  function isTruthy(key: string): boolean {
    const v = selections[key];
    return v === true || v === 'true' || v === 'Y';
  }
  function isSet(key: string): boolean {
    const v = selections[key];
    return v !== null && v !== undefined;
  }

  function pushProject(svc: string, side: 'interior' | 'exterior'): void {
    if (side === 'interior') {
      projects.push({ name: svc, interiorServices: [svc], exteriorServices: [] });
    } else {
      projects.push({ name: svc, interiorServices: [], exteriorServices: [svc] });
    }
  }

  function formatQtyPart(
    cat: ServiceCategoryConfig,
    it: NonNullable<ServiceCategoryConfig['items']>[number],
    qty: number
  ): string {
    const desc = it.hasDescription ? getStr(`${cat.id}_${it.id}_desc`) : '';
    const cs =
      it.hasCustomerSupplied && isSet(`${cat.id}_${it.id}_customer_supplied`)
        ? isTruthy(`${cat.id}_${it.id}_customer_supplied`)
          ? 'customer supplied'
          : 'contractor supplied'
        : '';
    let part = `${qty} × ${it.label}`;
    if (desc) part += ` (${desc})`;
    else if (cs) part += ` (${cs})`;
    return part;
  }

  function processCategory(cat: ServiceCategoryConfig, side: 'interior' | 'exterior'): void {
    if (cat.type === 'dropdown') {
      const val = getStr(cat.id);
      if (!val) return;
      const label = cat.options?.find((o) => o.value === val)?.label ?? val;
      pushProject(`${cat.label}: ${label}`, side);
      return;
    }

    if (cat.type === 'multicheck') {
      for (const it of cat.items || []) {
        if (getOpt(`${cat.id}_${it.id}`) === true) {
          pushProject(`${cat.label}: ${it.label}`, side);
        }
      }
      return;
    }

    if (cat.type === 'yn_then_multicheck') {
      const chosen = (cat.items || [])
        .filter((it) => getOpt(`${cat.id}_${it.id}`) === true)
        .map((it) => it.label);
      if (!chosen.length) return;
      const supply = isSet(`${cat.id}_supply`)
        ? isTruthy(`${cat.id}_supply`)
          ? ', customer supplied material'
          : ''
        : '';
      pushProject(`${cat.label}${supply}: ${chosen.join(', ')}`, side);
      return;
    }

    if (cat.type === 'number_group') {
      if (GROUPED_NUMBER_CATEGORY_IDS.has(cat.id)) {
        const parts: string[] = [];
        for (const it of cat.items || []) {
          const qty = getNum(`${cat.id}_${it.id}`);
          if (qty > 0) parts.push(formatQtyPart(cat, it, qty));
        }
        if (parts.length) {
          pushProject(`${cat.label}: ${parts.join(', ')}`, side);
        }
        return;
      }

      for (const it of cat.items || []) {
        const qty = getNum(`${cat.id}_${it.id}`);
        if (qty > 0) {
          pushProject(`${cat.label}: ${formatQtyPart(cat, it, qty)}`, side);
        }
      }
    }
  }

  for (const cat of interiorConfig) processCategory(cat, 'interior');
  for (const cat of exteriorConfig) processCategory(cat, 'exterior');

  return projects;
}

/** @deprecated Use buildProjectsFromSelections instead */
export function buildServicesFromSelections(
  selections: ServiceSelections,
  interiorConfig: ServiceCategoryConfig[] = INTERIOR_SERVICES_CONFIG,
  exteriorConfig: ServiceCategoryConfig[] = EXTERIOR_SERVICES_CONFIG
): { interiorServices: string[]; exteriorServices: string[]; descriptionAppendix: string } {
  const payloads = buildProjectsFromSelections(selections, interiorConfig, exteriorConfig);
  return {
    interiorServices: payloads.flatMap(p => p.interiorServices),
    exteriorServices: payloads.flatMap(p => p.exteriorServices),
    descriptionAppendix: ''
  };
}

/** Contractor selection model: key is categoryId_itemId; value is boolean (checked). */
export type ContractorServiceSelections = Record<string, boolean>;

const CONTRACTOR_CONFIGS = (interior: ContractorCategoryConfig[], exterior: ContractorCategoryConfig[]) =>
  [...interior, ...exterior];

/** Default contractor service selections (all unchecked). */
export function getDefaultContractorServiceSelections(
  interior: ContractorCategoryConfig[] = CONTRACTOR_INTERIOR_SERVICES_CONFIG,
  exterior: ContractorCategoryConfig[] = CONTRACTOR_EXTERIOR_SERVICES_CONFIG
): ContractorServiceSelections {
  const out: ContractorServiceSelections = {};
  CONTRACTOR_CONFIGS(interior, exterior).forEach(cat => {
    cat.items.forEach(it => { out[`${cat.id}_${it.id}`] = false; });
  });
  return out;
}

/** Build the list of selected service strings from contractor checkbox selections (for saving to application). */
export function getContractorServicesFromSelections(
  selections: ContractorServiceSelections,
  interior: ContractorCategoryConfig[] = CONTRACTOR_INTERIOR_SERVICES_CONFIG,
  exterior: ContractorCategoryConfig[] = CONTRACTOR_EXTERIOR_SERVICES_CONFIG
): string[] {
  const out: string[] = [];
  CONTRACTOR_CONFIGS(interior, exterior).forEach(cat => {
    cat.items.forEach(it => {
      if (selections[`${cat.id}_${it.id}`]) out.push(`${cat.label}: ${it.label}`);
    });
  });
  return out;
}

export interface ServiceViewGroup {
  id: string;
  label: string;
  items: string[];
}

/** Group saved "Category: Item" lines under config categories for profile display. */
export function groupServicesProvidedForDisplay(
  servicesProvided: string[] | undefined,
  config: ContractorCategoryConfig[]
): ServiceViewGroup[] {
  const selected = new Set(servicesProvided || []);
  const groups: ServiceViewGroup[] = [];
  for (const cat of config) {
    const items: string[] = [];
    for (const it of cat.items) {
      if (selected.has(`${cat.label}: ${it.label}`)) items.push(it.label);
    }
    if (items.length) groups.push({ id: cat.id, label: cat.label, items });
  }
  return groups;
}

/** Uncategorized service lines (legacy or custom entries). */
export function uncategorizedServicesProvided(
  servicesProvided: string[] | undefined,
  config: ContractorCategoryConfig[]
): string[] {
  const known = new Set<string>();
  for (const cat of config) {
    for (const it of cat.items) known.add(`${cat.label}: ${it.label}`);
  }
  return (servicesProvided || []).filter((line) => !known.has(line));
}

/** Options for contractor form (simplified labels). Used for matching contractors to projects. */
export function getAllContractorServiceOptions(
  interior: ContractorCategoryConfig[] = CONTRACTOR_INTERIOR_SERVICES_CONFIG,
  exterior: ContractorCategoryConfig[] = CONTRACTOR_EXTERIOR_SERVICES_CONFIG
): { value: string; label: string }[] {
  const out: { value: string; label: string }[] = [];
  CONTRACTOR_CONFIGS(interior, exterior).forEach(cat => {
    cat.items.forEach(it => {
      const value = `${cat.label}: ${it.label}`;
      if (!out.some(o => o.value === value)) out.push({ value, label: value });
    });
  });
  return out.sort((a, b) => a.label.localeCompare(b.label));
}
