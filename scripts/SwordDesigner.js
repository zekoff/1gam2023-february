// SwordDesigner.js
// Sword Designer Functions

/**
Update DMG, SPD, and DUR parameters from the selected design elements.

dc: DesignController instance, passed from event
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
	attributeArray.push(`[b]Total Enhancement[/b]: ${dmgTotal + spdTotal + durTotal}`);
	runtime.objects.WeaponAttributes.getFirstInstance().text = attributeArray.join("\n");
}