export default function dateFilter(value, format = "date") {
	const options = {};

	if (format.includes("date")) {
		options.day = "2-digit";
		options.month = "2-digit";
		options.year = "numeric";
	}
	if (format.includes("dateM")) {
		options.month = "long";
	}
	if (format.includes("dateY")) {
		options.year = "2-digit";
	}
	if (format.includes("time")) {
		options.minute = "2-digit";
		options.hour = "2-digit";
	}

	return new Intl.DateTimeFormat("ru-Ru", options).format(new Date(value));
}
