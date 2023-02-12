// SwordDesigner.js
// Sword Designer Functions

/**
Update DMG, SPD, and DUR parameters from the selected design elements.
*/
export function updateDesignParameters(runtime) {
	const dc = runtime.objects.DesignController.getFirstInstance();
	let dmgTotal = 0;
	let spdTotal = 0;
	let durTotal = 0;
	if (dc.instVars.BladeType) {
		const bladeTypeData = runtime.objects.BladeTypes.getFirstInstance();
		const bladeIndex = dc.instVars.BladeIndex;
		dmgTotal += bladeTypeData.getAt(1, bladeIndex);
		spdTotal += bladeTypeData.getAt(2, bladeIndex);
		durTotal += bladeTypeData.getAt(3, bladeIndex);
	}
	if (dc.instVars.HiltType) {
		const hiltTypeData = runtime.objects.HiltTypes.getFirstInstance();
		const hiltIndex = dc.instVars.HiltIndex;
		dmgTotal += hiltTypeData.getAt(1, hiltIndex);
		spdTotal += hiltTypeData.getAt(2, hiltIndex);
		durTotal += hiltTypeData.getAt(3, hiltIndex);
	}
	if (dc.instVars.StyleType) {
		const styleTypeData = runtime.objects.StyleTypes.getFirstInstance();
		const styleIndex = dc.instVars.StyleIndex;
		dmgTotal += styleTypeData.getAt(1, styleIndex);
		spdTotal += styleTypeData.getAt(2, styleIndex);
		durTotal += styleTypeData.getAt(3, styleIndex);
	}
	dc.instVars.DMG = dmgTotal;
	dc.instVars.SPD = spdTotal;
	dc.instVars.DUR = durTotal;
	const attributeArray = [];
	attributeArray.push(`[b]DMG[/b]: ${dmgTotal}`);
	attributeArray.push(`[b]SPD[/b]: ${spdTotal}`);
	attributeArray.push(`[b]DUR[/b]: ${durTotal}`);
// 	attributeArray.push(`[b]Total Enhancement[/b]: ${dmgTotal + spdTotal + durTotal}`);
	runtime.objects.WeaponAttributes.getFirstInstance().text = attributeArray.join("\n");
}

/**
 * Given a string containing items to pick packed with a separator, return another
 * string packed with results picked from the bag.
 */
export function pickFromBag(bagString, num, separator="|") {
	if (!num) return "";
	const bagArray = bagString.split("|");
	if (bagArray.length <= num) return bagString;
	const resultArray = [];
	for (let i = 0; i < num; i++) {
		const bagIndex = Math.floor(Math.random() * bagArray.length);
		resultArray.push(bagArray.at(bagIndex));
		bagArray.splice(bagIndex, 1);
	}
	return resultArray.join(separator);
}

export function getSwordName(material, style) {
	const prefixes = [
		"Vorpal", "Punishing", "Deadly", "Lightning", "Icy", "Chilled", "Flaming",
		"Keen", "Magic", "Argent", "Fervent", "Gripping", "Furious", "Sparkling", "Shadow",
		"Lambent", "Fragile", "Final", "Vigorous", "Pure", "Fanciful"
	];
	const suffixes = [
		"the Moon", "the Sun", "Insanity", "Chaos", "the Highlands", "Fervor", "Fury",
		"Ripping", "the Gladiator", "the Warrior", "the Cleric", "the Badlands", "the Lower Planes",
		"the Clouds", "Rage", "Vengeance", "Protection"
	]
	const nameComponents = []
	if (Math.random() < 0.7) nameComponents.push(prefixes.at(Math.floor(prefixes.length * Math.random())));
	if (Math.random() < 0.5) nameComponents.push(material);
	nameComponents.push(style);
	if (Math.random() < 0.7) nameComponents.push("of " + suffixes.at(Math.floor(suffixes.length * Math.random())));
	return nameComponents.join(" ");
}