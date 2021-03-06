import {
	describe,
	it,
	expect,
	inject,
	beforeEach,
	beforeEachProviders
} from "@angular/core/testing";

import {
	IntegerWidget,
	TextLineWidget,
	StringWidget
} from "./widgets";

import { WidgetRegistry } from "./widgetregistry";

describe("WidgetRegistry", () => {

	let STRING_TYPE = "string";
	let INT_TYPE = "integer";
	let TEXTLINE_TYPE = "textline";

	let A_NOT_REGISTERED_TYPE = "FOOBARSTRING";
	let THE_DEFAULT_FIELD_TYPE = class { };
	let THE_TYPE = "date";
	let THE_FIELD_TYPE = class { };

	let registry: WidgetRegistry;

	beforeEach(() => {
		registry = new WidgetRegistry();
	});

	it("should be initialized with primitives widgets", () => {
		let stringWidget = registry.getWidgetType(STRING_TYPE);
		let integerWidget = registry.getWidgetType(INT_TYPE);
		let textlineWidget = registry.getWidgetType(TEXTLINE_TYPE);

		expect(stringWidget).toBe(StringWidget);
		expect(integerWidget).toBe(IntegerWidget);
		expect(textlineWidget).toBe(TextLineWidget);
	});

	it("should return a default widget if there is no matching string in widgets", () => {
		let widget = registry.getWidgetType(A_NOT_REGISTERED_TYPE);

		expect(widget).not.toBe(null);
	});

	it("should return the widget type set when there is no matching type registered", () => {
		registry.setDefaultWidgetType(THE_DEFAULT_FIELD_TYPE);

		let widget = registry.getWidgetType(A_NOT_REGISTERED_TYPE);

		expect(widget).toBe(THE_DEFAULT_FIELD_TYPE);
	});

	it("should register a widget type", () => {
		registry.registerWidgetType(THE_TYPE, THE_FIELD_TYPE);

		let widget = registry.getWidgetType(THE_TYPE);

		expect(widget).toBe(THE_FIELD_TYPE);
	});

});
